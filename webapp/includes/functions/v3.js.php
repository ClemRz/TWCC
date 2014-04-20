<?php
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
?>
    <script type="text/javascript" src="http://maps.google.com/maps/api/js?v=3&amp;libraries=geometry,adsense,places&amp;sensor=false&amp;language=<?php echo LANGUAGE_CODE; ?>"></script>
    <script type="text/javascript" src="js/polylineEdit.js"></script>
    <script type="text/javascript">
    //<![CDATA[
    //google.maps.visualRefresh = true; //visual bug
    var map, geocoder, elevator, marker, myTitle, infoWindow,
        adsManager_1, adsManager_2, publisher_id, channels_id, ads_flag, polyline, rightClickDisabled,
        autocomplete, maxZoomService, tmpOverlay, true_north_path, src_grid_north_path,
        dst_grid_north_path, magnetic_north_path;
    myTitle = '<?php echo DRAG_ME; ?>';
    publisher_id = '<?php echo ADSENSE_ID; ?>';
    channels_id = {adUnit:'<?php echo ADUNIT_CHANNEL; ?>'};
    ads_flag = false;
    
    function createControl(fkidx, cssOptions, content) {
      var controlDiv, bannerHeight;
      bannerHeight = $('#h-container').height();
      cssOptions = (cssOptions == undefined) ? {} : cssOptions;
      cssOptions.width = (cssOptions.width == undefined) ? '50%' : cssOptions.width;
      cssOptions.height = (cssOptions.height == undefined) ? bannerHeight.toString()+'px' : cssOptions.height;
      cssOptions['background-color'] = (cssOptions['background-color'] == undefined) ? 'transparent' : cssOptions['background-color'];
      controlDiv = $('<div><\/div>').css(cssOptions).prop('index', fkidx);
      if (content != undefined) controlDiv.append(content);
      return controlDiv[0];
    }
    
    function getNormalizedCoord(coord, zoom) {
      var y = coord.y;
      var x = coord.x;
      var tileRange = 1 << zoom;
      if (y < 0 || y >= tileRange) {
        return null;
      }
      if (x < 0 || x >= tileRange) {
        x = (x % tileRange + tileRange) % tileRange;
      }
      return {
        x: x,
        y: y
      };
    }
    
    function getOsmMapnikMapType() {
      var mapType = new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
          var normalizedCoord = getNormalizedCoord(coord, zoom);
          if (!normalizedCoord) {
            return null;
          }
          return "http://tile.openstreetmap.org/" +
          zoom + "/" + normalizedCoord.x + "/" + normalizedCoord.y + ".png";
        },
        tileSize: new google.maps.Size(256, 256),
        isPng: true,
        maxZoom: 19,
        minZoom: 0,
        alt: "OpenStreetMap Mapnik Layer",
        name: "OSM Mapnik"
      });
      return mapType;
    }
    
    function getOsmTonerMapType() {
      var mapType = new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
          var normalizedCoord = getNormalizedCoord(coord, zoom);
          if (!normalizedCoord) {
            return null;
          }
          return "http://a.tile.stamen.com/toner/" +
          zoom + "/" + normalizedCoord.x + "/" + normalizedCoord.y + ".png";
        },
        tileSize: new google.maps.Size(256, 256),
        isPng: false,
        maxZoom: 21,
        minZoom: 0,
        alt: "OpenStreetMap Toner Layer",
        name: "OSM Toner"
      });
      return mapType;
    }
    
    function getFalkMapType() {
      var mapType = new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
          var normalizedCoord = getNormalizedCoord(coord, zoom);
          if (!normalizedCoord) {
            return null;
          }
          return "http://ec2.cdn.ecmaps.de/WmsGateway.ashx.jpg?ZoomLevel=" +
          zoom + "&TileX=" + normalizedCoord.x + "&TileY=" + normalizedCoord.y + "&Experience=falk&MapStyle=Falk%20OSM";
        },
        tileSize: new google.maps.Size(256, 256),
        isPng: false,
        maxZoom: 16,
        minZoom: 0,
        alt: "Falk OpenStreetMap Layer",
        name: "Falk OSM"
      });
      return mapType;
    }
    
    function getEsriSatMapType() {
      var mapType = new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
          var normalizedCoord = getNormalizedCoord(coord, zoom);
          if (!normalizedCoord) {
            return null;
          }
          return "http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/" +
          zoom + "/" + normalizedCoord.y + "/" + normalizedCoord.x + ".jpg";
        },
        tileSize: new google.maps.Size(256, 256),
        isPng: false,
        maxZoom: 18,
        minZoom: 0,
        alt: "ESRI Satellite Layer",
        name: "ESRI Satellite"
      });
      return mapType;
    }
    
    function getReliefMapType() {
      var mapType = new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
          var normalizedCoord = getNormalizedCoord(coord, zoom);
          if (!normalizedCoord) {
            return null;
          }
          return "http://www.maps-for-free.com/layer/relief/z" +
          zoom + "/row" + normalizedCoord.y + "/" + zoom + "_" + normalizedCoord.x + "-" + normalizedCoord.y + ".jpg";
        },
        tileSize: new google.maps.Size(256, 256),
        isPng: false,
        maxZoom: 11,
        minZoom: 0,
        alt: "Relief layer",
        name: "Relief"
      });
      return mapType;
    }
    
    function getMapTopoMapType() {
      var mapType = new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
          var normalizedCoord = getNormalizedCoord(coord, zoom);
          if (!normalizedCoord) {
            return null;
          }
          return "http://tile1.maptoolkit.net/terrain/" +
          zoom + "/" + normalizedCoord.x + "/" + normalizedCoord.y + ".png";
        },
        tileSize: new google.maps.Size(256, 256),
        isPng: false,
        maxZoom: 17,
        minZoom: 0,
        alt: "Maptookit Topo Layer (OpenStreetMap)",
        name: "Maptookit Topo (OSM)"
      });
      return mapType;
    }
    
    function getOsmTopoMapType() {
      var mapType = new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
          var normalizedCoord = getNormalizedCoord(coord, zoom);
          if (!normalizedCoord) {
            return null;
          }
          return "http://tile2.opentopomap.org/tiles/" +
          zoom + "/" + normalizedCoord.x + "/" + normalizedCoord.y + ".png";
        },
        tileSize: new google.maps.Size(256, 256),
        isPng: false,
        maxZoom: 21, //TBR
        minZoom: 0,
        alt: "OpenStreetMap OpenTopoMap Layer",
        name: "OSM OpenTopoMap"
      });
      return mapType;
    }
    
    function getAsterMapType() {
      var mapType = new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
          var normalizedCoord = getNormalizedCoord(coord, zoom);
          if (!normalizedCoord) {
            return null;
          }
          return "http://korona.geog.uni-heidelberg.de:8004/tms_hs.ashx?z=" +
          zoom + "&x=" + normalizedCoord.x + "&y=" + normalizedCoord.y;
        },
        tileSize: new google.maps.Size(256, 256),
        isPng: false,
        maxZoom: 12,
        minZoom: 0,
        alt: "ASTER GDEM & SRTM Layer",
        name: "ASTER GDEM & SRTM"
      });
      return mapType;
    }
    
    function getOsmLandMapType() {
      var mapType = new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
          var normalizedCoord = getNormalizedCoord(coord, zoom);
          if (!normalizedCoord) {
            return null;
          }
          return "http://a.tile3.opencyclemap.org/landscape/" +
          zoom + "/" + normalizedCoord.x + "/" + normalizedCoord.y + ".png";
        },
        tileSize: new google.maps.Size(256, 256),
        isPng: false,
        maxZoom: 18,
        minZoom: 0,
        alt: "OpenStreetMap Landscape Layer",
        name: "OSM Landscape"
      });
      return mapType;
    }
    
    function getOsmWandMapType() {
      var mapType = new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
          var normalizedCoord = getNormalizedCoord(coord, zoom);
          if (!normalizedCoord) {
            return null;
          }
          return "http://www.wanderreitkarte.de/topo/" +
          zoom + "/" + normalizedCoord.x + "/" + normalizedCoord.y + ".png";
        },
        tileSize: new google.maps.Size(256, 256),
        isPng: false,
        maxZoom: 21, //TBR
        minZoom: 0,
        alt: "OpenStreetMap Wanderreitkarte Layer",
        name: "OSM Wanderreitkarte"
      });
      return mapType;
    }
    
    function getEsriTopoMapType() {
      var mapType = new google.maps.ImageMapType({
        getTileUrl: function(coord, zoom) {
          var normalizedCoord = getNormalizedCoord(coord, zoom);
          if (!normalizedCoord) {
            return null;
          }
          return "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/" +
          zoom + "/" + normalizedCoord.y + "/" + normalizedCoord.x + ".jpg";
        },
        tileSize: new google.maps.Size(256, 256),
        isPng: false,
        maxZoom: 19,
        minZoom: 0,
        alt: "Esri Topo Layer",
        name: "Esri Topo"
      });
      return mapType;
    }
    
    function initMap() {
      var mapOptions, osmMapnikMapType, osmTonerMapType, falkMapType, esriSatMapType, reliefMapType, mapTopoMapType, osmTopoMapType, asterMapType, osmLandMapType, osmWandMapType, esriTopoMapType, panorama, panoramaOptions, streetViewCustomCloseBtn;
      rightClickDisabled = false;
      /*if(typeof(google) === "undefined") {
        alert('Google is not ready');
        readyToTransform('map');
        return;
      }*/
      google.maps.Polyline.prototype.getBounds = function() {
        var bounds;
        bounds = new google.maps.LatLngBounds();
        this.getPath().forEach(function(e) {
          bounds.extend(e);
        });
        return bounds;
      };
      geocoder = new google.maps.Geocoder();
      elevator = new google.maps.ElevationService();
      //var closeBtn = $('');
      panoramaOptions = {
        addressControlOptions: {position: google.maps.ControlPosition.BOTTOM_CENTER},
        panControlOptions: {position: google.maps.ControlPosition.LEFT_TOP},
        zoomControlOptions: {position: google.maps.ControlPosition.LEFT_TOP},
        visible: false
      };
      panorama = new google.maps.StreetViewPanorama(document.getElementById("map"), panoramaOptions);
      mapOptions = {
        zoom: <?php echo DEFAULT_ZOOM; ?>,
        center: new google.maps.LatLng(0, 0),
        mapTypeId: <?php echo DEFAULT_MAP_TYPE; ?>,
        mapTypeControl: true,
        mapTypeControlOptions: {
//          style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          mapTypeIds: [
            google.maps.MapTypeId.ROADMAP,
            google.maps.MapTypeId.SATELLITE,
            google.maps.MapTypeId.HYBRID,
            google.maps.MapTypeId.TERRAIN,
            'OSM',
            'OSMTONER',
            'FALK',
            'ESRISAT',
            'RF',
            'MAPTOPO',
//            'OSMTOPO',
            'ASTER',
            'OSMLAND',
//            'OSMWAND',
            'ESRITOPO'
          ],
          position: google.maps.ControlPosition.RIGHT
        },
        zoomControl: true,
        zoomControlOptions: {position: google.maps.ControlPosition.LEFT_TOP, style: google.maps.NavigationControlStyle.SMALL},
        panControl: false,
        rotateControl: false,
        scaleControl: true,
        scaleControlOptions: {position: google.maps.ControlPosition.BOTTOM_RIGHT},
        streetView: panorama
      };
      map = new google.maps.Map(document.getElementById('map'), mapOptions);
      
      //Set the CanvasProjectionOverlay Class
      function CanvasProjectionOverlay() {}
      CanvasProjectionOverlay.prototype = new google.maps.OverlayView();
      CanvasProjectionOverlay.prototype.constructor = CanvasProjectionOverlay;
      CanvasProjectionOverlay.prototype.onAdd = function(){};
      CanvasProjectionOverlay.prototype.draw = function(){};
      CanvasProjectionOverlay.prototype.onRemove = function(){};
      tmpOverlay = new CanvasProjectionOverlay();
      tmpOverlay.setMap(map);

      osmMapnikMapType = getOsmMapnikMapType();
      osmTonerMapType = getOsmTonerMapType();
      falkMapType = getFalkMapType();
      esriSatMapType = getEsriSatMapType();
      reliefMapType = getReliefMapType();
      mapTopoMapType = getMapTopoMapType();
      osmTopoMapType = getOsmTopoMapType();
      asterMapType = getAsterMapType();
      osmLandMapType = getOsmLandMapType();
      osmWandMapType = getOsmWandMapType();
      esriTopoMapType = getEsriTopoMapType();
      
      map.mapTypes.set('OSM', osmMapnikMapType);
      map.mapTypes.set('OSMTONER', osmTonerMapType);
      map.mapTypes.set('FALK', falkMapType);
      map.mapTypes.set('ESRISAT', esriSatMapType);
      map.mapTypes.set('RF', reliefMapType);
      map.mapTypes.set('MAPTOPO', mapTopoMapType);
      map.mapTypes.set('OSMTOPO', osmTopoMapType);
      map.mapTypes.set('ASTER', asterMapType);
      map.mapTypes.set('OSMLAND', osmLandMapType);
      map.mapTypes.set('OSMWAND', osmWandMapType);
      map.mapTypes.set('ESRITOPO', esriTopoMapType);
      
      setTimeout("readyToTransform('map', true)", <?php echo MAP_TIMEOUT_MS; ?>);
      panorama.controls[google.maps.ControlPosition.TOP_LEFT].push(createControl(1));
      panorama.controls[google.maps.ControlPosition.TOP_RIGHT].push(createControl(2));
      streetViewCustomCloseBtn = $('<div style="z-index: 1; margin: 3px; position: absolute; right: 0px; top: 70px;"><div title="<?php echo CLOSE; ?>" style="position: absolute; left: 0px; top: 0px; z-index: 2;"><div style="width: 16px; height: 16px; overflow: hidden; position: absolute; left: 0px; top: 0px;"><img src="http://maps.gstatic.com/mapfiles/api-3/images/cb_scout2.png" draggable="false" style="position: absolute; left: -490px; top: -102px; width: 1028px; height: 214px; -webkit-user-select: none; border: 0px; padding: 0px; margin: 0px;" alt="X"><\/div><div style="width: 16px; height: 16px; overflow: hidden; position: absolute; left: 0px; top: 0px; display: none;"><img src="http://maps.gstatic.com/mapfiles/api-3/images/cb_scout2.png" draggable="false" style="position: absolute; left: -539px; top: -102px; width: 1028px; height: 214px; -webkit-user-select: none; border: 0px; padding: 0px; margin: 0px;" alt="X"><\/div><\/div><div style="z-index: 1; font-size: 1px; background-color: rgb(187, 187, 187); width: 16px; height: 16px;"><\/div><\/div>');
      streetViewCustomCloseBtn.bind("click", function(event) {
        event.preventDefault();
        panorama.setVisible(false);
      });
      panorama.controls[google.maps.ControlPosition.RIGHT_TOP].push(createControl(3, {'width':'','height':''}, streetViewCustomCloseBtn));
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(createControl(1));
      map.controls[google.maps.ControlPosition.TOP_RIGHT].push(createControl(2));
      map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(createControl(3, {'width':'','height':''}, $('#license')));
      map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(createControl(4, {'width':'','height':''}, $('#c-container')));
      map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(createControl(5, {'width':'','height':''}, $('#o-container')));
      map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(createControl(6, {'width':'','height':''}, $('#d-container')));
      
      autocomplete = new google.maps.places.Autocomplete($('#find-location')[0], {bounds: map.getBounds()});
      maxZoomService = new google.maps.MaxZoomService();
      google.maps.event.addListener(autocomplete, 'place_changed', function() {
        var place = autocomplete.getPlace();
        if(place.geometry) transform(place.geometry.location);
      });
      google.maps.event.addListener(map, 'bounds_changed', function() {
        autocomplete.setBounds(map.getBounds());
      });
      google.maps.event.addDomListener($('#ui-container')[0], 'mouseover', function () {
        map.setOptions({scrollwheel:false});
        rightClickDisabled = true;
      });
      google.maps.event.addDomListener($('#ui-container')[0], 'mouseout', function () {
        map.setOptions({scrollwheel:true});
        rightClickDisabled = false;
      });
      map.controls[google.maps.ControlPosition.RIGHT_TOP].push(createControl(7, {'width':'','height':''}, $('#ui-container')));
      initAdsManager();
      infowindow = new google.maps.InfoWindow({content: myTitle});
      google.maps.event.addListener(infowindow, 'domready', function() {
        $('#zoom-btn').button({ icons: {primary:'ui-icon-zoomin'}, text: false });
      });
      google.maps.event.addListener(map, 'click', function(event) {
        infowindow.close();
        transform(event.latLng); //call setMarker
        hideAll();
      });
      $('#view-map').bind("click", function(event) {
        event.preventDefault();
        codeAddress($('#find-location').val());
        hideAll();
      });
      $('#location-form').bind("submit", function(event) {
        event.preventDefault();
        $('#view-map').click();
      });
      setAppVersion();      
      google.maps.event.addListener(map, "rightclick", function (mouseEvent) {
        if (!converterHash.isManual && !rightClickDisabled) {
          var WGS84 = converterHash.WGS84;
          WGS84.push({'x':mouseEvent.latLng.lng(), 'y':mouseEvent.latLng.lat()});
          converterHash.transform(WGS84); //call setMarker
        }
      });
      google.maps.event.addListenerOnce(map, 'tilesloaded', function() {
        $('.pac-container')
              .css('left', ($('#find-location').offset().left).toString() + 'px')
              .css('top', ($('#find-location').offset().top+20).toString() + 'px');
        readyToTransform('map');
      });
    }

    function getNeedle(WGS84Origin, angle, distance) {
      var origin, vertice, needle;
      if (tmpOverlay.getProjection() !== undefined) {
        origin = tmpOverlay.getProjection().fromLatLngToContainerPixel(WGS84Origin);
        vertice = new google.maps.Point(Math.round(origin.x+(distance)*Math.sin(angle)), Math.round(origin.y-(distance)*Math.cos(angle)));
        needle = [WGS84Origin, tmpOverlay.getProjection().fromContainerPixelToLatLng(vertice)];
      }
      return needle;
    }
    
    function drawAzimuts(WGS84) {
      var north, color, mag_declination, distance, detlta, convergence, opacity, weight, true_symbol, src_grid_symbol,
      dst_grid_symbol, magnetic_symbol, wdt, wmmDate, wmm, dstFieldSet, srcFieldSet, sc;
      distance = 80; //px
      delta = 15; //px
      color = 'black';
      opacity = 1.0; //%
      weight = 1; //px
      dstFieldSet = converterHash.converter[$(converterHash.crsDest).val() + "_Dest"];
      srcFieldSet = converterHash.converter[$(converterHash.crsSource).val() + "_Source"];
      wdt = new Date();
      wmmDate = wdt.getFullYear() + ((wdt.getMonth() + 1)/12.0);
      wmm = new WorldMagneticModel();
      mag_declination = wmm.declination(0.0, WGS84.lat(), WGS84.lng(), wmmDate);
      setMagneticDeclination(mag_declination);
      mag_declination = degToRad(mag_declination);
      if (mag_declination !== undefined) {
        north = getNeedle(WGS84, mag_declination, distance+delta);
        if (north !== undefined) {
          if (magnetic_north_path) {
            magnetic_north_path.setPath(north);
          } else {
            magnetic_symbol = {
              path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
              fillColor: 'black',
              fillOpacity: 1.0,
              scale: 2.0,
              strokeColor: 'black',
              strokeWeight: 0
            };
            magnetic_north_path = new google.maps.Polyline({
              path: north,
              geodesic: false,
              strokeColor: color,
              strokeOpacity: opacity,
              strokeWeight: weight,
              icons: [{icon: magnetic_symbol, offset: '100%'}]
            });
            magnetic_north_path.setMap(map);
          }
        }
      } else {
        if (magnetic_north_path) magnetic_north_path.setMap();
        magnetic_north_path = undefined;
      }
      if (srcFieldSet.getConvergence() !== undefined) {
        convergence = degToRad(srcFieldSet.getConvergence());
        north = getNeedle(WGS84, convergence, distance);
        if (north !== undefined) {
          if (src_grid_north_path) {
            src_grid_north_path.setPath(north);
          } else {
            grid_symbol = {
              path: 'M 1,1 1,-1 -1,-1 -1,1 z', //'m 14.355469,1040.6434 0,-3.3593 12.128906,-0.02 0,10.625 c -1.862006,1.4844 -3.782577,2.6009 -5.761719,3.3496 -1.979187,0.7487 -4.010435,1.1231 -6.09375,1.1231 -2.812514,0 -5.3678497,-0.6022 -7.6660154,-1.8067 -2.2981839,-1.2044 -4.0332082,-2.9459 -5.2050781,-5.2246 C 0.58593479,1043.0523 -2.1289063e-6,1040.5067 0,1037.6942 c -2.1289063e-6,-2.7864 0.58267958,-5.3873 1.7480469,-7.8027 1.1653595,-2.4154 2.8417901,-4.209 5.0292968,-5.3809 2.187489,-1.1718 4.7070173,-1.7578 7.5585943,-1.7578 2.070293,0 3.942036,0.3353 5.615234,1.0059 1.673153,0.6706 2.985001,1.6048 3.935547,2.8027 0.950494,1.1979 1.673149,2.7604 2.167968,4.6875 l -3.417968,0.9375 c -0.429712,-1.4583 -0.963566,-2.6041 -1.601563,-3.4375 -0.638043,-0.8333 -1.549501,-1.5006 -2.734375,-2.002 -1.184915,-0.5012 -2.500018,-0.7519 -3.945312,-0.7519 -1.731786,0 -3.22918,0.2637 -4.4921877,0.791 -1.2630316,0.5274 -2.2819108,1.2207 -3.0566407,2.0801 -0.7747477,0.8594 -1.3769607,1.8034 -1.8066406,2.832 -0.7291731,1.7709 -1.093756,3.6914 -1.09375,5.7617 -6e-6,2.5521 0.4394467,4.6875 1.3183594,6.4063 0.878898,1.7187 2.1581936,2.9948 3.8378906,3.8281 1.679675,0.8334 3.463527,1.25 5.351563,1.25 1.640606,0 3.242167,-0.3157 4.804687,-0.9473 1.562477,-0.6315 2.747372,-1.3053 3.554687,-2.0214 l 0,-5.3321 z', // m 22,11 0,-28.6328 3.8867188,0 15.0390622,22.4804 0,-22.4804 3.632813,0 0,28.6328 -3.886719,0 -15.0390625,-22.5 0,22.5 z',
              fillColor: 'red',
              fillOpacity: 1.0,
              scale: 2.5,
              strokeColor: 'red',
              strokeWeight: 0
              //,anchor: new google.maps.Point(20,0)
            };
            src_grid_north_path = new google.maps.Polyline({
              path: north,
              geodesic: false,
              strokeColor: 'red',
              strokeOpacity: opacity,
              strokeWeight: weight,
              icons: [{icon: grid_symbol, offset: '100%'}]
            });
            src_grid_north_path.setMap(map);
          }
        }
      } else {
        if (src_grid_north_path) src_grid_north_path.setMap();
        src_grid_north_path = undefined;
      }
      if (dstFieldSet.getConvergence() !== undefined) {
        sc = (typeof(surveyConvention) === "undefined") ? true : surveyConvention;
        convergence = degToRad(dstFieldSet.getConvergence());
        convergence *= (sc) ? -1 : 1
        north = getNeedle(WGS84, convergence, distance);
        if (north !== undefined) {
          if (dst_grid_north_path) {
            dst_grid_north_path.setPath(north);
          } else {
            grid_symbol = {
              path: 'M 1,1 1,-1 -1,-1 -1,1 z', //'m 14.355469,1040.6434 0,-3.3593 12.128906,-0.02 0,10.625 c -1.862006,1.4844 -3.782577,2.6009 -5.761719,3.3496 -1.979187,0.7487 -4.010435,1.1231 -6.09375,1.1231 -2.812514,0 -5.3678497,-0.6022 -7.6660154,-1.8067 -2.2981839,-1.2044 -4.0332082,-2.9459 -5.2050781,-5.2246 C 0.58593479,1043.0523 -2.1289063e-6,1040.5067 0,1037.6942 c -2.1289063e-6,-2.7864 0.58267958,-5.3873 1.7480469,-7.8027 1.1653595,-2.4154 2.8417901,-4.209 5.0292968,-5.3809 2.187489,-1.1718 4.7070173,-1.7578 7.5585943,-1.7578 2.070293,0 3.942036,0.3353 5.615234,1.0059 1.673153,0.6706 2.985001,1.6048 3.935547,2.8027 0.950494,1.1979 1.673149,2.7604 2.167968,4.6875 l -3.417968,0.9375 c -0.429712,-1.4583 -0.963566,-2.6041 -1.601563,-3.4375 -0.638043,-0.8333 -1.549501,-1.5006 -2.734375,-2.002 -1.184915,-0.5012 -2.500018,-0.7519 -3.945312,-0.7519 -1.731786,0 -3.22918,0.2637 -4.4921877,0.791 -1.2630316,0.5274 -2.2819108,1.2207 -3.0566407,2.0801 -0.7747477,0.8594 -1.3769607,1.8034 -1.8066406,2.832 -0.7291731,1.7709 -1.093756,3.6914 -1.09375,5.7617 -6e-6,2.5521 0.4394467,4.6875 1.3183594,6.4063 0.878898,1.7187 2.1581936,2.9948 3.8378906,3.8281 1.679675,0.8334 3.463527,1.25 5.351563,1.25 1.640606,0 3.242167,-0.3157 4.804687,-0.9473 1.562477,-0.6315 2.747372,-1.3053 3.554687,-2.0214 l 0,-5.3321 z', // m 22,11 0,-28.6328 3.8867188,0 15.0390622,22.4804 0,-22.4804 3.632813,0 0,28.6328 -3.886719,0 -15.0390625,-22.5 0,22.5 z',
              fillColor: 'black',
              fillOpacity: 1.0,
              scale: 2.5,
              strokeColor: 'black',
              strokeWeight: 0
              //,anchor: new google.maps.Point(20,0)
            };
            dst_grid_north_path = new google.maps.Polyline({
              path: north,
              geodesic: false,
              strokeColor: color,
              strokeOpacity: opacity,
              strokeWeight: weight,
              icons: [{icon: grid_symbol, offset: '100%'}]
            });
            dst_grid_north_path.setMap(map);
          }
        }
      } else {
        if (dst_grid_north_path) dst_grid_north_path.setMap();
        dst_grid_north_path = undefined;
      }
      if (src_grid_north_path !== undefined || dst_grid_north_path !== undefined || magnetic_north_path !== undefined) {
        north = getNeedle(WGS84, 0, distance);
        if (north !== undefined) {
          if (true_north_path) {
            true_north_path.setPath(north);
          } else {
            true_symbol = {
                path: 'M 0,-225 30,-140 120,-140 50,-85 75,0 0,-50 -75,0 -50,-85 -120,-140 -30,-140 z',
                fillColor: 'black',
                fillOpacity: 1.0,
                scale: 0.04,
                strokeColor: 'black',
                strokeWeight: 0
              };
            true_north_path = new google.maps.Polyline({
              path: north,
              geodesic: false,
              strokeColor: color,
              strokeOpacity: opacity,
              strokeWeight: weight,
              icons: [{icon: true_symbol, offset: '100%'}]
            });
            true_north_path.setMap(map);
          }
        }
      } else {
        if (true_north_path) true_north_path.setMap();
        true_north_path = undefined;
      }
    }
    
    function setMarker(WGS84) {
      var myLatLng, image, shadow, shape, myLatLngArray, bounds;
      if (WGS84.length == 1) { //marker
        if (polyline) {
          polyline.stopEdit();
          polyline.setMap();
          polyline = undefined;
        }
        WGS84 = WGS84[0];
        image = new google.maps.MarkerImage(dir_ws_images + 'twcc_icon.png',
            new google.maps.Size(40, 55),
            new google.maps.Point(0,0),
            new google.maps.Point(19, 55));
        shadow = new google.maps.MarkerImage(dir_ws_images + 'twcc_icon_shadow.png',
            new google.maps.Size(47, 33),
            new google.maps.Point(0,0),
            new google.maps.Point(6, 33));
        shape = {coord: [0, 0, 0, 35, 40, 35, 40, 0],type: 'poly'};
        if (WGS84.lat) {
          myLatLng = WGS84;
        } else {
          myLatLng = new google.maps.LatLng(WGS84.y, WGS84.x);
        }
        //Draw arrows
        drawAzimuts(myLatLng);
        if (marker) {
          marker.setPosition(myLatLng);
        } else {
          marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: myTitle,
            shadow: shadow,
            icon: image,
            shape: shape,
            draggable: true
          });
          google.maps.event.addListener(marker, 'dragend', function() {
            var latlng = marker.getPosition();
            transform(latlng); //call setMarker
          });
          google.maps.event.addListener(marker, 'dragstart', function() {
            infowindow.close();
            hideAll();
          });
          marker.setMap(map);
        }
        codeLatLng(myLatLng);
        setLength();
      } else { //polyline
        if (marker) {
          infowindow.close();
          marker.setMap();
          marker = undefined;
        }
        if (magnetic_north_path) magnetic_north_path.setMap();
        if (true_north_path) true_north_path.setMap();
        if (src_grid_north_path) src_grid_north_path.setMap();
        if (dst_grid_north_path) dst_grid_north_path.setMap();
        magnetic_north_path = undefined;
        true_north_path = undefined;
        src_grid_north_path = undefined;
        dst_grid_north_path = undefined;
        myLatLngArray = [];
        $.each(WGS84, function() {
          if (this.lat == undefined && this.x == undefined) return true; //INPUT ERROR => continue
          myLatLng = (this.lat) ? this : new google.maps.LatLng(this.y, this.x);
          myLatLngArray.push(myLatLng);
        });
        if (polyline) {
          polyline.stopEdit();
          polyline.setPath(myLatLngArray);
        } else {
          polyline = new google.maps.Polyline({path: myLatLngArray, geodesic: true});
          polyline.setMap(map);
        }
        polyline.runEdit(true, function (poly) {
          var WGS84 = [];
          poly.getPath().forEach(function (vtx, idx) {
            WGS84.push({'x':vtx.lng(), 'y':vtx.lat()});
          });
          converterHash.transform(WGS84); //call setMarker
        });
        if ($('#auto-zoom-toggle').is(':checked') == true) {
          bounds = polyline.getBounds();
          if (bounds) {
            map.fitBounds(bounds);
            map.setZoom(map.getZoom()-1);
          }
        }
        setLength(google.maps.geometry.spherical.computeLength(polyline.getPath()));
        setArea(google.maps.geometry.spherical.computeArea(polyline.getPath()));
      }
    }
    
    //from http://forum.webrankinfo.com/maps-api-suggestion-villes-t129145.html
    function address_component(results, address_type, name_type){
      var res, i, j;
      address_type = (address_type == null) ? 'country' : address_type;
      name_type = (name_type == null) ? 'long_name' : name_type;

      if(results.length>0){
        res = results[0];
        for(i=0; i<res.address_components.length; i++){
          for(j=0; j<res.address_components[i].types.length; j++){
            if(res.address_components[i].types[j] == address_type){
              if(res.address_components[i][name_type]){
                return res.address_components[i][name_type];
              }
            }
          }
        }
      }
    }
    
    function codeLatLng(latlng) {
      var html, elevation, directLink, iso, timezoneWS, TZParameters, timeStamp;
      elevation = '';
      timeStamp = Math.round((new Date().getTime())/1000);
      elevator.getElevationForLocations({'locations': [latlng]}, function(results, status) {
        timezoneWS = "https://maps.googleapis.com/maps/api/timezone/json";
        TZParameters = {location: latlng.toUrlValue(),
                        timestamp: timeStamp,
                        sensor: 'false',
                        language: '<?php echo LANGUAGE_CODE; ?>'};
        var TZdata=new Object();TZdata.status="KO";
        //$.getJSON(timezoneWS, TZParameters, function(TZdata) {
        $.ajax({
          dataType: "json",
          url: timezoneWS,
          data: TZParameters,
          crossDomain: true,
          success: function(TZdata) {
            if (status == google.maps.ElevationStatus.OK) {
              if (results[0]) {
                elevation = '<p style="float:right;"><img src="' + dir_ws_images + 'elevation_icon.png" alt="<?php echo ELEVATION; ?>" title="<?php echo ELEVATION; ?>" style="float:left;"> ' + results[0].elevation.toString().split('.')[0] + 'm<\/p>';
              }
            }
            geocoder.geocode({'latLng': latlng, 'language': '<?php echo LANGUAGE_CODE; ?>'}, function(results, status) {
              html = '';
              if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                  html = '<p>';
                  html = html + '<a id="zoom-btn" href="JavaScript:doZoom();" title="<?php echo ZOOM; ?>" style="float:right;"><?php echo ZOOM; ?><\/a>';
                  html = html + '<img src="' + dir_ws_images + 'address_icon.png" alt="<?php echo ADDRESS; ?>" title="<?php echo ADDRESS; ?>" style="float:left;"> ' + results[0].formatted_address + ' ';
                  iso = address_component(results, 'country', 'short_name');
                  if (iso && iso != '') {
                    html = html + '<img src="' + dir_ws_images + 'flags/' + iso + '.png" alt="' + iso + '" style="vertical-align:middle;">';
                  }
                  html = html + '<\/p>';
                }
              }
              html = '<div class="iw-content"><h3>' + myTitle + '<\/h3>' + html + '<div class="divp">' + elevation + '<p style="float:left;"><img src="' + dir_ws_images + 'gps_icon.png" alt="GPS (WGS84)" title="GPS (WGS84)" style="float:left;"><\/p><p style="float:left;">' + Math.round(latlng.lat()*10000000)/10000000 + '°N<br>' + Math.round(latlng.lng()*10000000)/10000000 + '°E<\/p>';
              if (TZdata.status == "OK") {
                var offset = (TZdata.dstOffset + TZdata.rawOffset)/3600;
                html = html + '<p style="float:left;">' + TZdata.timeZoneName + ', GMT';
                if (offset > 0) html = html + '+';
                if (offset != 0) html = html + offset;
                html = html + '<\/p>';
              }
              html = html + '<\/div>';
              directLink = '<div><a href="JavaScript:getDirectLink(\'directurl\');" id="directurl" style="text-decoration:none;" title="<?php echo DIRECT_LINK; ?>"><img src="' + dir_ws_images + 'url.png" alt="<?php echo DIRECT_LINK; ?>" style="border:0px none;vertical-align:middle;"> <?php echo DIRECT_LINK; ?><\/a><\/div>';
              html = html + directLink + '<\/div>';
<?php if (IW_ADS_ENABLED) { ?>
              if (!ads_flag) {
                ads_flag = true;
                html = $(html).append($('#twcc-ads>ins').clone(true));
                html = html[0];
              }
<?php } ?>
              infowindow.close();
              infowindow.setContent(html);
              infowindow.open(map, marker);
            });
          }
        });
      });
    }
    
    function doZoom() {
      var latlng;
      $('#zoom-btn').button("option", "disabled", true);
      latlng = marker.getPosition();
      maxZoomService.getMaxZoomAtLatLng(latlng, function(response) {
        $('#zoom-btn').button("option", "disabled", false);
        map.setCenter(latlng);
        if (response.status != google.maps.MaxZoomStatus.OK) {
          alert("Error in MaxZoomService");
          return;
        } else {
          map.setZoom(response.zoom);
        }
      });
    }
    
    function codeAddress(address) {
      var latlng;
      if (isW3WCoordinates(address)) {
        transformWithW3WCoordinates(address);
      } else {
        geocoder.geocode({'address': address, 'language': '<?php echo LANGUAGE_CODE; ?>'}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            latlng = results[0].geometry.location;
            transform(latlng); //call setMarker
          } else {
            alert("<?php echo GEOCODER_FAILED; ?>" + status);
          }
        });
      }
    }
    
    function getAPIVersion() {
      return google.maps.version;
    }
    
    function initAdsManager() {
      var adsManagerOptions_1, adsManagerOptions_2;
      adsManagerOptions = {
        format: google.maps.adsense.AdFormat.<?php echo MAP_AD_FORMAT_1; ?>,
        position: google.maps.ControlPosition.LEFT_BOTTOM,
        map: map,
        visible: true,
        publisherId: publisher_id,
        backgroundColor: "#FFFFFF",
        borderColor: "#FFFFFF"
      };
      adsManager_1 = new google.maps.adsense.AdUnit($('<div id="c-ads-1" style="margin-left:4px;padding:2px;" class="trsp-panel ui-corner-bottom"><\/div>')[0], adsManagerOptions);
      adsManager_1.setChannelNumber(channels_id.adUnit);
      
      adsManagerOptions = {
        format: google.maps.adsense.AdFormat.<?php echo MAP_AD_FORMAT_2; ?>,
        position: google.maps.ControlPosition.LEFT_BOTTOM,
        map: map,
        visible: true,
        publisherId: publisher_id,
        backgroundColor: "#FFFFFF",
        borderColor: "#FFFFFF"
      };
      adsManager_2 = new google.maps.adsense.AdUnit($('<div id="c-ads-2" style="margin-left:4px;padding:2px;" class="trsp-panel ui-corner-top"><\/div>')[0], adsManagerOptions);
      adsManager_2.setChannelNumber(channels_id.adUnit);
    }
    
    function unload() {
    
    }
    //]]>
    </script>
