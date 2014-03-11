/**
 * This file is part of TWCC.
 *
 * TWCC is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * TWCC is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with TWCC.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @copyright Copyright (c) 2010-2014 Clément Ronzon
 * @license http://www.gnu.org/licenses/agpl.txt
 */
/*USE:
$.getScript( "js/gridOverlayClass.js", function( data, textStatus, jqxhr ) {
  graticule = new gridOverlay(map);
  graticule.setMap(map);
});
*/

gridOverlay.prototype = new google.maps.OverlayView();

/** @constructor */
function gridOverlay(map) {
  //save for later
  this.map_ = map;

  //array for lines 
  this.lines_ = new Array();
  
  //array for labels
  this.divs_ = new Array();
  
  //Listeners
  this.idleLstnr_ = null;
}

/**
 * MANDATORY
 * onAdd is called once, when the map's panes are ready and the overlay has been
 * added to the map.
 */
gridOverlay.prototype.onAdd = function() {
  var me = this;
  this.idleLstnr_ = google.maps.event.addListener(this.map_,'idle',function(){me.safeRedraw();});
};

/**
 * MANDATORY
 * draw is called after onAdd and  whenever a map property changes that could change
 * the position of the element, such as zoom, center, or map type.
 */
gridOverlay.prototype.draw = function() {
};

/**
 * MANDATORY
 * The onRemove() method will be called automatically from the API if
 * we ever set the overlay's map property to 'null'.
 */
gridOverlay.prototype.onRemove = function() {
  //undraw everything
  this.unDraw();
  if(this.idleLstnr_ != null) google.maps.event.removeListener(this.idleLstnr_);
  this.idleLstnr_ = null;
};

/**
 * Redraw the graticule based on the current projection and zoom level
 */
gridOverlay.prototype.safeRedraw = function() {
  var overlayProjection, projName, projWhiteList, bnds, l, b, t, r, d, n, gr, west, south, east, north, i, j, panes, s, pts, pts2, e, q, p, x, y, dv, km, btn;
  
  //undraw everything
  this.unDraw();

	//determine projection name
	projName = converterHash.ProjHash[$(converterHash.crsDest).val()].projName;
	projWhiteList = new Array(
		'aea',
		'equi',
		'merc',
		'utm',
		'eqdc',
		'tmerc',
		'ortho',
		'nzmg',
		'mill',
		'sinu',
		'cea',
		'cass',
		'omerc',
		'lcc',
		'laea',
		'moll');
	if ($.inArray(projName, projWhiteList) == -1) return;

	//add a button to the HMI:
	if ($('#dspGrat').length == 0) {
		btn = $('<input type="checkbox" id="dspGrat"><label for="dspGrat">Toggle</label> ');
		btn.button({ icons: {primary:'ui-icon-graticule'}, text: false });
		var that = this;
		btn.click(function() {
			that.safeRedraw();
		});
		$('#xyDest h3').first().prepend(btn);
	}
	
	if (!$('#dspGrat').is(':checked')) {
		this.unDraw();
		return;
	}
	
  overlayProjection = this.getProjection();
  //determine graticule interval
  bnds = this.map_.getBounds();
  l = bnds.getSouthWest().lng();
  b = bnds.getSouthWest().lat();
  t = bnds.getNorthEast().lat();
  r = bnds.getNorthEast().lng();

  //sanity - limit to os grid area
/*  if (t < 49.0) return;
  if (b > 61.0) return;
  if (r < -8.0) return;  
  if (l > 2.0) return;*/ //Useless as it depends on the CRS
	
  //grid interval in km
  d = 100.0;
  switch (this.map_.getZoom()) // use same interval as Google's scale bar
  {
    case 5:
      d = 100.0;
      break;
    case 6:
      d = 100.0;
      break;
    case 7:
      d = 50.0;
      break;
    case 8:
      d = 20.0;
      break;
    case 9:
      d = 20.0;
      break;
    case 10:
      d = 10.0;
      break;
    case 11:
      d = 5.0;
      break;
    case 12:
      d = 2.0;
      break;
    case 13:
      d = 1.0;
      break;
    case 14:
      d = 0.5;
      break;
    case 15:
      d = 0.2;
      break;
    case 16:
      d = 0.1;
      break;
    case 17:
      d = 0.05;
      break;
    case 18:
      d = 0.02;
      break;
    case 19:
      d = 0.01;
      break;
    case 20:
      d = 0.01;
      break;
    case 21:
      d = 0.01;
      break;
    default:
      return;
  }
	
  gr = enclosingRect(l,b,t,r);

  west = gr.bl.east / 1000.0;
  south = gr.bl.north / 1000.0;
  east = gr.tr.east / 1000.0;
  north = gr.tr.north / 1000.0;
  
  //round iteration limits to the computed grid interval
  east = Math.ceil(east/d)*d;
  west = Math.floor(west/d)*d;
  north = Math.ceil(north/d)*d;
  south = Math.floor(south/d)*d;
	
  //Sanity / limit
  /*if (west <= 0.0) west = 0.0;
  if(east >= 700.0) east = 700.0;
  if(south < 0.0) south = 0.0;  
  if(north > 1300.0) north = 1300.0;*/ //Useless as it depends on the CRS
      
  this.lines_ = new Array();
  this.divs_ = new Array();
  
  i=0;//count inserted lines
  j=0;//count labels
  
  //panes/layer to write on
  panes = this.getPanes(); //$('<div></div>');//this.map_.getPanes().overlayImage;//floatShadow;//getPane(G_this.map_MARKER_SHADOW_PANE);
     
  //horizontal lines
  s = south;
  while(s<=north){
    pts = new Array();	
    //under 10km grid squares draw as straight line top to bottom	 
    if(d < 10.0){
      pts[0] = this.LatLngFromEN(east,s);
      pts[1] = this.LatLngFromEN(west,s);		
    }
    //over 10km grid squares draw as set of segments
    else{
      e = west;
      q = 0;
      while(e<=east){
        pts[q] = this.LatLngFromEN(e,s);
        q++;
        e += d;
      }
    }
    
    //line
    if(pts.length > 0) {
      this.lines_[i] = new google.maps.Polyline({
              path: pts,
              geodesic: false,
              strokeColor: "#000000",
              clickable: false,
              strokeWeight: 1
              //strokeOpacity: 1,
            });
      this.lines_[i].setMap(this.map_);
      i++;
    }
     
    //label arranged vertically
		n = Math.round((east-west)/(2*d)); //position in number of cells from the left
    p = overlayProjection.fromLatLngToDivPixel(this.LatLngFromEN(west+n*d,s));
    x = p.x + 3;
    dv = $("<div></div>").css({
            "position":"absolute",
            "left":Math.round(x.toString()),
            "top":Math.round(p.y.toString()),
            "color":"#0000",
            "fontFamily":"Arial",
            "fontSize":"x-small"
          })
          .attr("title",NE2NGR( (Math.floor(west+0.04)+n*d+0.4)*1000.0,(Math.floor(s+0.04)+0.4)*1000.0 ).substr(0,2) + " (" + Math.floor(s+0.04).toString() + " km North)");

    km = (Math.round(s)%100).toString();
    if (km.length < 2)
    km = "0" + km;
    if(d < 0.1) {
      km = (Math.round(s*100)%10000).toString();
      while (km.length < 4) km = "0" + km;
      km = km.substr(0,2) + "." + km.substr(2,2);
    } else if(d < 1.0) {
      km = (Math.round(s*10)%1000).toString();
      while (km.length < 3) km = "0" + km;
      km = km.substr(0,2) + "." + km.substr(2,1);
    }
    
    if(d >= 100.0) km = dv.attr("title").substr(0,2);
    dv.html(km);
    $(panes.overlayLayer).append(dv);
    this.divs_[j] = dv;
    j++;
    s += d;
  }
  
  //vertical lines
  e = west;
  while(e<=east){
    pts2 = new Array();		 

    //under 10km grid squares draw as straight line top to bottom	 
    if(d < 10.0){
      pts2[0] = this.LatLngFromEN(e,north);
      pts2[1] = this.LatLngFromEN(e,south);		
    }
    //over 10km grid squares draw as set of segments
    else{
      s = south;
      q = 0;
      while(s<=north){
        pts2[q] = this.LatLngFromEN(e,s);
        q++;
        s += d;
      }
    }
    
    //line
    if(pts2.length > 0) {
      this.lines_[i] = new google.maps.Polyline({
              path: pts2,
              geodesic: false,
              strokeColor: "#000000",
              clickable: false,
              strokeWeight: 1
              //strokeOpacity: 1
            });
      this.lines_[i].setMap(this.map_);
      i++;
    }

    //label arranged horizontally
		n = Math.round((north-south)/(2*d)); //position in number of cells from the bottom
    p = overlayProjection.fromLatLngToDivPixel(this.LatLngFromEN(e,south+n*d));

    y = p.y + 3;
    dv = $("<div></div>").css({
            "position":"absolute",
            "left":Math.round(p.x.toString()),
            "top":Math.round(y.toString()),
            "color":"#000000",
            "fontFamily":"Arial",
            "fontSize":"x-small"
          })
					.attr("title",NE2NGR((Math.floor(e+0.04)+0.4)*1000.0,(Math.floor(south+0.04)+n*d+0.4)*1000.0 ).substr(0,2) + " (" + Math.floor(e+0.04).toString() + " km East)");
		
    km = (Math.round(e)%100).toString();
    if (km.length < 2) km = "0" + km;
    if(d < 0.1){
      km = (Math.round(e*100)%10000).toString();
      while (km.length < 4) km = "0" + km;
      km = km.substr(0,2) + "." + km.substr(2,2);
    }
    else if(d < 1.0){
      km = (Math.round(e*10)%1000).toString();
      while (km.length < 3) km = "0" + km;
      km = km.substr(0,2) + "." + km.substr(2,1);
    }

    if(d >= 100.0) km = dv.attr("title").substr(0,2);
    
    if( e != (west+2*d) ){
      dv.html(km);
      $(panes.overlayLayer).append(dv);
      this.divs_[j] = dv;
      j++;
    }
    e += d; 
  }
};

/**
 * The undraw method is used to remove all grid elements from the map (lines and divs)
 */
gridOverlay.prototype.unDraw = function() {
  var panes;
  if (this.lines_ !== null) $.each(this.lines_, function(i, obj) {obj.setMap();});
  panes = this.getPanes();
  if (this.divs_ !== null) $.each(this.divs_, function(i, obj) {$(obj).remove();});
  this.divs_ = null;
};

/**
 * from east, north in KM to WGS84 Lat/Lon in a GLatLng
 */
gridOverlay.prototype.LatLngFromEN = function(eastKm,northKm) {
  var wgs84;
  wgs84 = GridToWGS84(northKm,eastKm);
  return new google.maps.LatLng(wgs84.y,wgs84.x);
}

/**
 * Convert WGS84 Latitude and Longitude (dd) to current grid Easting and Northing (km)
 */
function WGS84ToGrid(WGlat, WGlon){
	var projSource, projDest, pointSource, pointDest;

	projSource = converterHash.ProjHash['WGS84'];
	projDest = converterHash.ProjHash[$(converterHash.crsDest).val()];
	pointSource = new Proj4js.Point(WGlon.toString()+','+WGlat.toString());
	pointDest = Proj4js.transform(projSource, projDest, pointSource.clone());

	return {'x':pointDest.x,'y':pointDest.y};
}

/**
 * Convert current grid Easting and Northing (km) to WGS84 Latitude and Longitude (dd)
 */
function GridToWGS84(northKm, eastKm){
	var projSource, projDest, pointSource, pointDest;

	projSource = converterHash.ProjHash[$(converterHash.crsDest).val()];
	projDest = converterHash.ProjHash['WGS84'];
	pointSource = new Proj4js.Point((eastKm*1000).toString()+','+(northKm*1000).toString());
	pointDest = Proj4js.transform(projSource, projDest, pointSource.clone());

	return pointDest;
}

/**
 * convert northing and easting to letter and number grid system
 */
function NE2NGR(east,  north){
east = Math.round(east);
north = Math.round(north);
var eX = east / 500000;
var nX = north / 500000;
var tmp = Math.floor(eX) - 5.0 * Math.floor(nX) + 17.0; 
nX = 5 * (nX - Math.floor(nX));
eX = 20 - 5.0 * Math.floor(nX) + Math.floor(5.0 * (eX - Math.floor(eX)));
if (eX > 7.5) eX = eX + 1; // I is not used
if (tmp > 7.5) tmp = tmp + 1; // I is not used

var eing = east - (Math.floor(east / 100000)*100000);
var ning = north - (Math.floor(north / 100000)*100000);
var estr = eing.toString();
var nstr = ning.toString();
while(estr.length < 5)
	estr = "0" + estr;
while(nstr.length < 5)
	nstr = "0" + nstr;

var ngr = String.fromCharCode(tmp + 65) + 
          String.fromCharCode(eX + 65) + 
          " " + estr + " " + nstr;

return ngr;
}

/**
 * Return rectangle in N/E coords (km) that encloses the given wgs84 rectangle (dd)
 */
function enclosingRect(WGleft,WGbottom,WGtop,WGright){
	var bl = WGS84ToGrid(WGbottom,WGleft);
	var tr = WGS84ToGrid(WGtop,WGright);
	var br = WGS84ToGrid(WGbottom,WGright);
	var tl = WGS84ToGrid(WGtop,WGleft);
	
	var e = Math.min(bl.x,tl.x);
	var w = Math.max(br.x,tr.x);
	var s = Math.min(bl.y,br.y);
	var n = Math.max(tr.y,tl.y);
	
	return {'bl':{'east':e,'north':s},'tr':{'east':w,'north':n}};
}