/* ======================================================================
    converter.class.js V2.0.2
   ====================================================================== */
/*
	© 2010 Clément Ronzon (clem.rz -at- gmail.com)
	
	File: converter.class.js
	Description: UI for Proj4.js library
		---------------------------------------------------------------------
		|	/!\ Warning: needs JQuery 1.4.2 or later and Proj4.js libraries!	|
		---------------------------------------------------------------------
  License: CC by-nc as per http://creativecommons.org/licenses/by-nc/3.0/deed.en
	
	Version	|			Date		|						Author				|	Modifications
	----------------------------------------------------------------------
	1.0			|	2010-01-01	|	clem.rz -at- gmail.com	|	Creation of converter.class.js
	1.1			|	2010-08-01	|	clem.rz -at- gmail.com	|	Adding of m <-> km option for XY and ZXY projections
	1.2			|	2010-08-23	|	clem.rz -at- gmail.com	|	Rewriting the document for JQuery 1.4.2
	1.2.1		|	2010-08-24	|	clem.rz -at- gmail.com	|	Convert on enter key, sort CRS by country and by text
	1.2.2		|	2010-08-30	|	clem.rz -at- gmail.com	|	Correction for callback function in continueDefSource
	1.2.3		|	2010-09-01	|	clem.rz -at- gmail.com	|	check existing functions and remove empty optgroups
	1.2.4		|	2010-09-01	|	clem.rz -at- gmail.com	|	modification of showLoadingSign
	1.2.5		|	2010-09-01	|	clem.rz -at- gmail.com	|	callback function if defs ajax loading fails
	1.2.6		|	2010-09-02	|	clem.rz -at- gmail.com	|	toggleLoadingSing has been replaced with showLoadingSign
	1.2.7		|	2010-09-03	|	clem.rz -at- gmail.com	|	bug in the removing loop of continueDefSource, adding possibility
																									|	of specifying new codes like: ESRI, IAU2000, SR-ORG, and urls and urns
																									|	adding callback function for reload
	2.0 		|	2010-09-07	|	clem.rz -at- gmail.com	|	Creation of Proj4js.Proj object on selection only, this reduce memory usage
	2.0.1		|	2010-09-15	|	clem.rz -at- gmail.com	|	Show Hide loading sign issue
	2.0.2		|	2010-11-19	|	clem.rz -at- gmail.com	|	The CRS info link is optional
																									|	pass WGS84 array in case of CSV
	2.0.3		|	2011-04-04	|	clem.rz -at- gmail.com	|	Correction of dmsToDd function
	2.0.4		| 2011-04-15	|	clem.rz -at- gmail.com	|	Correction of xtdParseFloat when value isNaN returns 0
  2.0.5   | 2013-02-08  | clem.rz -at- gmail.com  | Modification of loadCRS in order to be polyvalent
                                                  | its content and the function getDefTitle have been moved to global.js.php
  2.0.6   | 2013-09-13  | clem.rz -at- gmail.com  | Update to new JQuery specs
  2.1.0   | 2013-10-06  | clem.rz -at- gmail.com  | Adition of the convergence information
  2.1.1   | 2013-10-13  | clem.rz -at- gmail.com  | Adition of getConvergence function
*/
/** ToDoList:
# Bounds visualization on the map
*/

/**
*
* Functions needed
*
*	Needs JQuery 1.4.2
*
**/
/*Remove all childrens of a node*/
if (typeof(removeAllChilds) != 'function') {
	function removeAllChilds(element) {
		//Nota: can't use the .empty() function of JQuery caus' it removes the listeners as well.
		if (element.hasChildNodes()) {
			while (element.childNodes.length >= 1) {
				element.removeChild(element.firstChild);
			}
		}
	}
}
/*Return an event*/
if (typeof(getEvent) != 'function') {
	function getEvent(event) {
		if (!event && window.event) {
			event = window.event;
		}
		return event;
	}
}
/*Return the target node of an event*/
if (typeof(getTargetNode) != 'function') {
	function getTargetNode(event) {
		var targetNode;
		event = getEvent(event);
		if (event != undefined) {
			if (event.target) {
				targetNode = event.target;
			} else if (event.srcElement) {
				targetNode = event.srcElement;
			}
			if (targetNode.nodeType == 3) {// defeat Safari bug
				targetNode = targetNode.parentNode;
			}
		}
		return targetNode;
	}
}
/*Return the key code of an event*/
if (typeof(getKeyCode) != 'function') {
	function getKeyCode(event) {
		event = getEvent(event);
		if (event.keyCode) {
			return event.keyCode;
		} else {
			return event.which;
		}
	}
}
/*Return a stack sorted*/
$.fn.sort = function() {
	return this.pushStack([].sort.apply(this, arguments), []);
};
/*Return options sorted*/
$.fn.sortOptions = function(sortCallback) {
	jQuery('option', this).sort(sortCallback)
												.appendTo(this);
	return this;
};
/*Return groups sorted*/
$.fn.sortGroups = function(sortCallback) {
	jQuery('optgroup', this).sort(sortCallback)
												.appendTo(this);
	return this;
};
/*Return the selected node with its options sorted by text (ASC)*/
$.fn.sortOptionsByText = function() {
	var byTextSortCallback = function(x, y) {
		var xText = jQuery(x).text().toUpperCase();
		var yText = jQuery(y).text().toUpperCase();
		return (xText < yText) ? -1 : (xText > yText) ? 1 : 0;
	};
	return this.sortOptions(byTextSortCallback);
};
/*Return the selected node with its options sorted by text (ASC)*/
$.fn.sortOptgroupsByLabel = function() {
	var byLabelSortCallback = function(x, y) {
		var xText = jQuery(x).prop('label').toUpperCase();
		var yText = jQuery(y).prop('label').toUpperCase();
		return (xText < yText) ? -1 : (xText > yText) ? 1 : 0;
	};
	return this.sortGroups(byLabelSortCallback);
};
/*Return the selected node with its options sorted by text (ASC)*/
$.fn.sortGrpsNOptionsByText = function() {
	var me = this;
	$('optgroup', this).each(function(idx) {
    $('optgroup:eq('+idx+')', me).sortOptionsByText();
  });
	return this.sortOptgroupsByLabel();
};
/*Return the selected node with its options sorted by value (ASC)*/
$.fn.sortOptionsByValue = function() {
	var byValueSortCallback = function(x, y) {
		var xVal = jQuery(x).val();
		var yVal = jQuery(y).val();
		return (xVal < yVal) ? -1 : (xVal > yVal) ? 1 : 0;
	};
	return this.sortOptions(byValueSortCallback);
};
/*Return the field format to use depending on the projection*/
if (typeof(transcodeCRSProj) != 'function') {
	function transcodeCRSProj(projName) {
		var crsProj;
		switch (projName) {
			case 'utm':
				crsProj = 'zxy';
				break;
			case 'lcc':
			case 'tmerc':
				crsProj = 'xy';
				break;
			case 'longlat':
				crsProj = 'dd';
				break;
			case 'csv':
				crsProj = 'textarea';
				break;
			default:
				/*alert('Unknown projection name!');
				return;
				break;*/
				crsProj = 'xy';
				break;
		}
		return crsProj;
	}
}
/*Return true if <input> is an array*/
if (typeof(is_array) != 'function') {
	function is_array(input) {
		return typeof(input)=='object'&&(input instanceof Array);
	}
}
/*Remove all the option nodes from a select node*/
if (typeof(removeOption) != 'function') {
	function removeOption(oSelect, optionValue) {
		$("option[value='"+optionValue.toString()+"']", oSelect).remove();
	}
}
/*Remove all the empty optgroup nodes from a select node*/
if (typeof(removeEmptyOptgroups) != 'function') {
	function removeEmptyOptgroups(oSelect) {
		$("optgroup:empty", oSelect).remove();
	}
}
/*Return the convergence angle
Source:
http://www.threelittlemaids.co.uk/magdec/transverse_mercator_projection.pdf
http://www.ga.gov.au/geodesy/datums/redfearn_geo_to_grid.jsp
http://www.threelittlemaids.co.uk/magdec/explain.html
*/
if (typeof(computeConvergence) != 'function') {
	function computeConvergence(a, b, lng0, UTMZone, WGS84) {
    var lng_0 = UTMZone ? degToRad(UTMZone*6-183) : lng0;
    var lat = degToRad(WGS84.y);
    var lng = degToRad(WGS84.x);
    var e2 = (a-b)/a;
    var eta2 = e2*Math.pow(Math.cos(lat),2)/(1-e2);
    var P = lng - lng_0;
    var J13 = Math.sin(lat);
    var J14 = (1+3*eta2+2*Math.pow(eta2,2))*Math.sin(lat)*Math.pow(Math.cos(lat),2)/3;
    var J15 = (2-Math.pow(Math.tan(lat),2))*Math.sin(lat)*Math.pow(Math.cos(lat),4)/15;
    var C = P*J13 + Math.pow(P,3)*J14+Math.pow(P,5)*J15;
    return radToDeg(C);
  }
}
/*Retrun the UTM zone*/
if (typeof(getUTMZone) != 'function') {
	function getUTMZone(WGS84lng) {
		return (WGS84lng >= 0) ? Math.floor((WGS84lng + 180) / 6) + 1 : Math.floor(WGS84lng / 6) + 31;
	}
}
/*Return the emisphere*/
if (typeof(getEmisphere) != 'function') {
	function getEmisphere(WGS84Lat) {
		return (WGS84Lat >= 0) ? 'n' : 's';
	}
}
/*Return undefined if not a number*/
if (typeof(getNumber) != 'function') {
	function getNumber(value) {
		if (isNaN(value)) {
			return;
		} else {
			return value;
		}
	}
}
/*Return the float parsed vale (. and , included)*/
if (typeof(xtdParseFloat) != 'function') {
	function xtdParseFloat(value) {
		var value = value.toString().replace(/\,/gi, '.');
		if (isNaN(value)) value = 0;
		return parseFloat(value);
	}
}
/*Return the rounded value*/
if (typeof(xtdRound) != 'function') {
	function xtdRound(value, decimals) {
		var valStr;
		decimals = (decimals != undefined) ? decimals : 0;
		valStr = value.toString();
		if (valStr == '' || valStr == 'NaN') {
			return '';
		} else {
			return Math.round(xtdParseFloat(value) * Math.pow(10, xtdParseFloat(decimals))) / Math.pow(10, xtdParseFloat(decimals));
		}
	}
}
/*Convert dms to dd*/
if (typeof(dmsToDd) != 'function') {
	function dmsToDd(dmsValue) {
		var value, cardinal;
		if (dmsValue == undefined) {
			return;
		}
		value = Math.abs(xtdParseFloat(dmsValue.D));
		value = value + Math.abs(xtdParseFloat(dmsValue.M)) / 60;
		value = value + Math.abs(xtdParseFloat(dmsValue.S)) / 3600;
		cardinal = (xtdParseFloat(dmsValue.D) >= 0) ? 1 : -1;
		cardinal = cardinal * ((dmsValue.C == 'N' || dmsValue.C == 'E') ? 1 : -1);
		return cardinal * value;
	}
}
/*Convert degrees to radians*/
if (typeof(degToRad) != 'function') {
	function degToRad(dValue) {
    return dValue*Math.PI/180;
  }
}
/*Convert radians to degrees*/
if (typeof(radToDeg) != 'function') {
	function radToDeg(rValue) {
    return rValue*180/Math.PI;
  }
}
/*Convert dd to dms*/
if (typeof(ddToDms) != 'function') {
	function ddToDms(ddValue, ddOpts) {
		var degrees, minutes_temp, minutes, seconds, cardinal;
		if (ddValue == '' || ddValue == undefined) {
			degrees = '';
			minutes = '';
			seconds = '';
			if (ddOpts) {
				cardinal = ddOpts.N ? 'N' : 'E';
			}
		} else {
			if (ddOpts) {
				cardinal = (ddValue >= 0) ? (ddOpts.N ? 'N' : 'E') : (ddOpts.S ? 'S' : 'W');
			}
			ddValue = Math.abs(ddValue);
			degrees = Math.floor(ddValue);
			minutes_temp = (ddValue - degrees) * 60;
			minutes = Math.floor(minutes_temp);
			seconds = (minutes_temp - minutes) * 60;
		}
		return {'C':cardinal,
						'D':degrees.toString(),
						'M':minutes.toString(),
						'S':seconds.toString()};
	}
}
/*Return the value converted form <lenghtUnit> to meters*/
if (typeof(getM) != 'function') {
	function getM(value, lenghtUnit) {
		var coef;
		coef = (lenghtUnit == 'm') ? 1 : 1000;
		return (xtdParseFloat(value) * coef).toString();
	}
}
/*Return the value converted from meters to <lenghtUnit>*/
if (typeof(setM) != 'function') {
	function setM(value, lenghtUnit) {
		var coef;
		coef = (lenghtUnit == 'm') ? 1 : 1000;
		return (xtdParseFloat(value) / coef).toString();
	}
}
/**
*
*	GeodesicConverter Class constructor
*	Parameters:
*		src(str) 								//Generic id for source containers
*		dest(str)								//Generic id for destination containers
*		[opt] units(obj) 				//All the units labels
*		[opt] labels(obj) 			//All the fields labels
*		[opt] HTMLWrapper(obj) 	//All the html wrappers and their properties
*		[opt] options(obj)			//All the options labels
*		defs(str OR obj)				//Can be the JSon URL of a Proj4 formated definitions, or an object of Proj4 formated definitions
*																Exaples of definitions:
*																		defs = "http://spatialreference.org/ref/epsg/2192/proj4js/"; //will get the def by JSON
*																		defs = {'EPSG:2192':'+proj=lcc +lat_1=46.8 +lat_0=46.8 +lon_0=2.337229166666667 +k_0=0.99987742 +x_0=600000 +y_0=2200000 +ellps=intl +units=m +no_defs'}; //will append the defs into a 'World' <optgroup/>
*																		defs = {'World':{'EPSG:2192':'+proj=lcc +lat_1=46.8 +lat_0=46.8 +lon_0=2.337229166666667 +k_0=0.99987742 +x_0=600000 +y_0=2200000 +ellps=intl +units=m +no_defs'}};
*		referer(str)						//Name of the variable that instantiate this class
*		[opt] nfo(str)					//Function to launch for system description, leave '' if not needed. Use a pipe '|' to retrieve the proj code
*		[opt] callback					//Callback function when transformation is done, the WGS84 array of objects {x, y} is passed to this function
*		[opt] readOnly					//If true, set the input fields (not the option ones) to read only and disable them.
*		[opt] errCallback				//When the ajax loading fails, it calls errCallback passing 3 parameters:
*	
*/
GeodesicConverter = function(src, dest, units, labels, HTMLWrapper, options, defs, referer, nfo, callback, readOnly, errCallback) {
	var metoo;
	this.Units = units ? units : {'dms':{'D':'°', 'M':'\'', 'S':'\'\''},
																'dd':{'x':{'DD':'°E'}, 'y':{'DD':'°N'}},
																'xy':{'XY':{'m':'m', 'km':'km'}},
																'zxy':{'XY':{'m':'m', 'km':'km'}},
																'csv':{'CSV':'', 'L':''}};
	this.Labels = labels ? labels :{'dms':{'x':'Lng = ', 'y':'Lat = '},
																	'dd':{'x':'Lng = ', 'y':'Lat = '},
																	'xy':{'x':'X = ', 'y':'Y = ', 'convergence':'Conv. = '},
																	'zxy':{'x':'X = ', 'y':'Y = ', 'z':'Fuseau = ', 'e':'Emisphère = ', 'convergence':'Conv. = '},
																	'csv':{'csv':'CSV : ', 'l':'Format :'}};
	this.Wrapper = HTMLWrapper ? HTMLWrapper : {'converter':['div', {'class':'unit_div'}],
																							'title':['h3'],
																							'set':['table', {'border':'0', 'cellspacing':'1', 'cellpadding':'0', 'class':'form_tbl'}],
																							'fields':['td', {'class':'field'}],
																							'label':['td', {'class':'label'}],
																							'container':['tr']};
	this.Options = options ? options : {'x':{'E':'Est','W':'Ouest'},
																		 	'y':{'N':'Nord','S':'Sud'},
																			'o':{'_DMS':'Deg. min. sec. ', '_DD':'Deg. décimaux'},
																			'e':{'n':'Nord ', 's':'Sud'},
																			'f':{'c':'CSV', 'm':'Manu.'},
																			'u':{'_M':'Mètres ', '_KM':'Kilomètres'}};
	this.Defs = defs;
	this.Referer = referer;
	this.idSource = src;
	this.idDest = dest;
  this.Source = $('#xy'+src)[0];
  this.crsSource = $('#crs'+src)[0];
	this.Dest = dest ? $('#xy'+dest)[0] : undefined;
	this.crsDest = dest ? $('#crs'+dest)[0] : undefined;
	this.ProjHash = {};
	this.converter = [];
	this.WGS84 = {0:{'x':undefined, 'y':undefined}};
	this.callback = callback;
  this.nfo = nfo;
	this.readOnly = readOnly ? readOnly : false;
	this.isManual = true;
	this.errCallback = errCallback;
	
	this.transform = function (id) {
    var crsSource, crsDest, projSource, projDest, pointInput, pointSource, pointDest, pointDestStr, idSource, idDest, fromWGS84, idx, xy, me;
		if (id == undefined) return;
		fromWGS84 = ((typeof(id) != 'string') && (id.x != undefined || id[0].x != undefined));
		this.WGS84 = [];
		if (fromWGS84) {
			if (id.x != undefined) {
				pointInput = id.x.toString()+','+id.y.toString();
				this.WGS84[0] = new Proj4js.Point(pointInput);
			} else {
				pointInput = '';
				me = this;
				$.each(id, function(idx) {
					pointInput = pointInput + this.x.toString() + ',' + this.y.toString();
					me.WGS84[idx] = new Proj4js.Point(this.x.toString() + ',' + this.y.toString());
					if (idx < id.length-1) pointInput = pointInput + "\n";
				});
			}
			projSource = this.ProjHash['WGS84'];
			projDest = this.ProjHash[$(this.crsSource).val()];
			idDest = $(this.crsSource).val()+'_'+$(this.crsSource).prop('id').substr(3);
		} else {
			crsSource = (this.idSource == id) ? this.crsSource : this.crsDest;
			crsDest = (this.idSource == id) ? this.crsDest : this.crsSource;
			if (!crsSource) return;
			idSource = $(crsSource).val()+'_'+id;
			if (crsDest) idDest = $(crsDest).val()+'_'+$(crsDest).prop('id').substr(3);
			projSource = undefined;
			if ($(crsSource).val() != undefined) {
				projSource = this.ProjHash[$(crsSource).val()];
			} else {
				//alert("Select a source coordinate system");
				return;
			}
			projDest = undefined;
			if (crsDest) {
				if ($(crsDest).val() != undefined) {
					projDest = this.ProjHash[$(crsDest).val()];
				} else {
					//alert("Select a destination coordinate system");
					return;
				}
			}
			if (this.converter[idSource]) {
				pointInput = this.converter[idSource].getXY();
			} else {
				return;
			}
		}
    if (pointInput) {
			pointInput = pointInput.split('\n');
			pointDestStr = '';
			for (idx in pointInput) {
				//Check for a valid value
				xy = pointInput[idx].split(',');
				if (pointInput[idx] == undefined || pointInput[idx] == '' || isNaN(xy[0]) || isNaN(xy[1]) || xy[0] == '' || xy[1] == '' || xy.length > 2) {
					pointDestStr = pointDestStr + 'INPUT ERROR ON LINE '+idx;
					if (idx < pointInput.length-1) {
						 pointDestStr = pointDestStr + "\n";
					}
					continue;
				}
				pointSource = new Proj4js.Point(pointInput[idx]);
				if (!fromWGS84) {
					//Prepare the definition in case of UTM
					if (this.converter[idSource].setOriginalProj == 'zxy') {
						projSource.zone = this.converter[idSource].getZ(idx);
						projSource.utmSouth = (this.converter[idSource].getE(idx) == 's') ? true : false;
						projSource.init();
					}
					//Get the WGS84 value to allow switching
					if (projSource.readyToUse && this.ProjHash['WGS84'].readyToUse) {
						if (projSource.srsCode == this.ProjHash['WGS84'].srsCode) {
							this.WGS84[idx] = pointSource.clone();
						} else {
							this.WGS84[idx] = Proj4js.transform(projSource, this.ProjHash['WGS84'], pointSource.clone());
						}
					} else {
						alert('Converter is not ready, please try again later.');
						return;
					}
				}
				if (projDest) {
					if (this.converter[idDest].setOriginalProj == 'zxy') {
						projDest.zone = getUTMZone(this.WGS84[idx].x);
						projDest.utmSouth = (getEmisphere(this.WGS84[idx].y) == 's') ? true : false;
						projDest.init();
					}
					if (projSource.readyToUse && projDest.readyToUse) {
						if (projSource.srsCode == projDest.srsCode) {
							pointDest = pointSource.clone();
						} else {
							pointDest = Proj4js.transform(projSource, projDest, pointSource.clone());
              if (idSource !== undefined) {
                if (this.converter[idSource].setProj != 'dd' && this.converter[idSource].setProj != 'dms' && this.converter[idSource].setProj != 'csv') this.converter[idSource].setConvergence(this.WGS84[0]);
              }
						}
						pointDestStr = pointDestStr + pointDest.x.toString() + ',' + pointDest.y.toString();
					} else {
						alert('Converter is not ready, please try again later.');
						return;
					}
					if (idx < pointInput.length-1) {
						 pointDestStr = pointDestStr + "\n";
					}
				}
			}
			if (projDest) {
				this.converter[idDest].setXY(pointDestStr, this.WGS84);
			}
			if (fromWGS84) {
				this.transform(this.idSource);
			} else {
				if (typeof(this.callback) == 'function') this.callback(this.WGS84); //[0]);
			}
    } else {
      //alert("Enter source coordinates");
      return;
    }
	}; //transform
	
	this.setDefSource = function (src, callback) {
		var sourceValue, destValue, me;
		this.Defs = src;
		sourceValue = $(this.crsSource).val();
		if (this.crsDest) destValue = $(this.crsDest).val();
		//load the object
		if (typeof(this.Defs) == 'object') {
			if (this.Defs.WGS84 !== undefined) {
				this.Defs = {'*World':this.Defs};
			}
			this.continueDefSource(this.Defs, sourceValue, destValue, callback);
		} else if (typeof(this.Defs) == 'string') { //Defs is an URL, load the definition via AJAX
			me = this;
			$.ajax({
				url: this.Defs,
				data: {'u':'u'}, //Without this IE6 throws an error
				type: "POST",
				cache: false,
				dataType: 'json',
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					if (typeof(me.errCallback) == 'function') errCallback(XMLHttpRequest, textStatus, errorThrown);
				},
				success: function (data, textStatus, XMLHttpRequest) {
					if (data.WGS84 !== undefined) {
						data = {'*World':data};
					}
					me.Defs = data;
					me.continueDefSource(me.Defs, sourceValue, destValue, callback);
				}
			});
		} else {
			return;
		}
	}; //setDefSource
	
	this.continueDefSource = function (newDefs, sourceValue, destValue, callback) {
		var country, crs, defFound, flag;
		flag = false;
		//Remove the olds that are not in the news
		for (crs in Proj4js.defs) {
			defFound = false;
			for (country in newDefs) {
				if (newDefs[country][crs] != undefined) {
					defFound = true;
					break;
				}
			}
			if (!defFound) {
				this.unloadCRS(crs.toString());
			}
		}
		removeEmptyOptgroups(this.crsSource);
		if (this.crsDest) removeEmptyOptgroups(this.crsDest);
		//Add the news that are not in the olds
		for (country in newDefs) {
			for (crs in newDefs[country]) {
				if (Proj4js.defs[crs] == undefined) {
					Proj4js.defs[crs] = newDefs[country][crs];
					this.loadCRS(country, crs, this.crsSource, this.crsDest);
					flag = true;
				}
			}
		}
		if (flag) { //Sort the selects and restore the selection
			$(this.crsSource).sortGrpsNOptionsByText();
			sourceValue = sourceValue ? sourceValue : $('option:first', this.crsSource).val();
			try {$(this.crsSource).val(sourceValue);} catch(e) {} //IE6 BUG
			if (this.crsDest) {
				$(this.crsDest).sortGrpsNOptionsByText();
				destValue = destValue ? destValue : $('option:first', this.crsDest).val();
				try {$(this.crsDest).val(destValue);} catch(e) {} //IE6 BUG
			}
		}
		if (typeof(callback) == 'function') callback();
	}; //continueDefSource
	
	this.loadCRS = function (grplabel, def, crsSource, crsDest) {
		buildCRSList(grplabel, def, crsSource, crsDest);
	}; //loadCRS
	
	this.unloadCRS = function (crs) {
		var removedFromSource, removedFromDest, country;
		removedFromSource = false;
		removedFromDest = false;
		if ($(this.crsSource).val() != crs) {
			removeOption(this.crsSource, crs);
			removedFromSource = true;
		}
		if (this.crsDest) {
			if ($(this.crsDest).val() != crs) {
				removeOption(this.crsDest, crs);
				removedFromDest = true;
			}
		}
		if (removedFromSource && removedFromDest) {
			delete Proj4js.defs[crs];
			delete this.ProjHash[crs];
			delete this.converter[crs+'_'+this.idSource];
			delete this.converter[crs+'_'+this.idDest];
			//Remove from Defs
			for (country in this.Defs) {
				if (this.Defs[country][crs] != undefined) {
					delete this.Defs[country][crs];
					break;
				}
			}
		}
	}; //unloadCRS
	
	this.showLoadingSign = function (doShow) {
		if (doShow) {
			$('#xy' + this.idSource).css('display', 'none');
			$('#loading' + this.idSource).css('display', 'block');
			if (this.Dest) {
				$('#xy' + this.idDest).css('display', 'none');
				$('#loading' + this.idDest).css('display', 'block');
			}
		} else {
			$('#xy' + this.idSource).css('display', 'block');
			$('#loading' + this.idSource).css('display', 'none');
			if (this.Dest) {
				$('#xy' + this.idDest).css('display', 'block');
				$('#loading' + this.idDest).css('display', 'none');
			}
		}
	}; //loadingSign
	
	this.unload = function () {
		this.showLoadingSign(true);
		removeAllChilds(this.crsSource);
		removeAllChilds(this.Source);
		if (this.crsDest) removeAllChilds(this.crsDest);
		if (this.Dest) removeAllChilds(this.Dest);
		delete Proj4js.defs;
		Proj4js.defs = {};
		delete this.ProjHash;
		this.ProjHash = {};
		this.converter = [];
		this.showLoadingSign(false);
	}; //unload
	
	this.reload = function (src, callback) {
		var me;
		this.showLoadingSign(true);
		me = this;
		this.setDefSource(src, function () {
			me.updateCrs(me.crsSource);
			if (me.crsDest) me.updateCrs(me.crsDest);
			me.showLoadingSign(false);
			if (typeof(callback) == 'function') callback();
		});
	}; //reload
	
	this.reset = function () {
		var crsCode;
		for (crsCode in this.converter) {
			this.converter[crsCode].reset();
		}
	}; //reset
	
	this.createProj = function (srsCode, callback) {
		var me, tmp;
		me = this;
		tmp = new Proj4js.Proj(srsCode, function(Proj4jsProj) {
			me.ProjHash[srsCode] = Proj4jsProj;
			if (typeof(callback) == 'function') callback(Proj4jsProj.srsCode);
		});
	};
	
  this.updateCrs = function (crs, doTransfoAtTheEnd) {
  	var container, proj, crsTitle, srsCode, crsProj, crsUnit, HTMLTag, HTMLTitle, id, tempTag, crsSource, me;
		doTransfoAtTheEnd = (doTransfoAtTheEnd == undefined) ? false : doTransfoAtTheEnd;
  	id = $(crs).prop('id').substr(3);
		if (this.idSource == id) {
			container = this.Source;
			crsSource = (this.crsDest) ? this.idDest : this.WGS84[0];
		} else {
			container = this.Dest;
			crsSource = this.idSource;
		}
		srsCode = $(crs).val();
    if (srsCode) {
      proj = this.ProjHash[srsCode];
			if (proj == undefined) {
				me = this;
				this.createProj(srsCode, function() {
					me.updateCrs(crs, doTransfoAtTheEnd);
				});
				return;
			}
			crsTitle = proj.title ? proj.title : srsCode;
			crsUnit = proj.units;
      if (!this.converter[srsCode+'_'+id]) {
				crsProj = (this.isManual) ? transcodeCRSProj(proj.projName) : 'csv';
				this.setCRS(srsCode, id, crsProj);
			}
      removeAllChilds(container);
			tempTag = new Tag(this.Wrapper.converter);
			HTMLTag = tempTag.JQObj;
			tempTag = new Tag(this.Wrapper.title);
			HTMLTitle = tempTag.JQObj;
			HTMLTitle.append(crsTitle);
			if (this.nfo != undefined) {
				tempTag = new Tag(['a', {'href':this.nfo.replace('|', srsCode)}]);
				tempTag.JQObj.append('[?]');
				HTMLTitle.append(tempTag.JQObj);
			}
			HTMLTag.append(HTMLTitle);
			HTMLTag.append(this.converter[srsCode+'_'+id].html);
			$(container).append(HTMLTag);
    }
		if (doTransfoAtTheEnd) {
			this.transform(crsSource);
		}
  }; //updateCrs
	
	this.setCRS = function (srsCode, id, crsProj) {
  	var oProj;
		if (crsProj == 'csv') {
			oProj = transcodeCRSProj(this.ProjHash[srsCode].projName);
			this.Units[crsProj].L = '';
			if (this.Labels[oProj].x != undefined) this.Units[crsProj].L = this.Labels[oProj].x.replace(' = ','') + ((this.Units[oProj].x != undefined) ? '(' + this.Units[oProj].x.DD + ')' : '(' + this.Units[oProj].XY['m'] + ')');
			if (this.Labels[oProj].y != undefined) this.Units[crsProj].L = this.Units[crsProj].L + ',' + this.Labels[oProj].y.replace(' = ','') + ((this.Units[oProj].y != undefined) ? '(' + this.Units[oProj].y.DD + ')' : '(' + this.Units[oProj].XY['m'] + ')');
			if (this.Labels[oProj].z != undefined) this.Units[crsProj].L = this.Labels[oProj].z.replace(' = ','') + ',' + this.Units[crsProj].L;
			if (this.Labels[oProj].e != undefined) this.Units[crsProj].L = this.Labels[oProj].e.replace(' = ','') + ',' + this.Units[crsProj].L;
		}
		this.converter[srsCode+'_'+id] = new GeodesicFieldSet(srsCode,
																								undefined,
																								crsProj,
																								this.Units[crsProj], //eval('this.Units.' + crsProj),
																								this.Labels[crsProj], //eval('this.Labels.' + crsProj),
																								this.Wrapper,
																								this.Options,
																								id,
																								this.Referer,
																								this.readOnly);
  }; //setCRS
  
  this.updateDisplay = function (input) {
  	var radio, crs, srsCode, id, crsProj, event;
		if (typeof(input) == 'string') { //Switch Manual <-> CSV
			for (srsCode in this.converter) {
				srsCode = srsCode.split('_')[0];
				crsProj = (this.isManual) ? transcodeCRSProj(this.ProjHash[srsCode].projName) : 'csv';
				this.setCRS(srsCode, this.idSource, crsProj);
				if (this.crsDest) this.setCRS(srsCode, this.idDest, crsProj);
				this.updateCrs(this.crsSource, true);
				if (this.crsDest) this.updateCrs(this.crsDest, true);
			}
		} else { //Switch dd <-> dms | m <-> km
			radio = getTargetNode(input); //event <=> input;
			id = $(radio).prop('name').split('_')[1]; //Source | Dest
			crs = (this.idSource == id) ? this.crsSource : this.crsDest;
			srsCode = $(crs).val();
			if (radio.value == 'dms' || radio.value == 'dd') { //dms | dd
				if (this.converter[srsCode+'_'+id].setProj != radio.value) {
					this.setCRS(srsCode, id, radio.value);
					this.updateCrs(crs, true);
				}
			} else { //m | km
				if (this.converter[srsCode+'_'+id].lengthUnit != radio.value) {
					this.converter[srsCode+'_'+id].setLengthUnit(radio.value);
					this.updateCrs(crs, true);
				}
			}
		}
	}; //updateDisplay
	
	this.setManualMode = function (isManual) {
		if (this.isManual != isManual) {
			this.isManual = isManual;
			this.reset();
			this.updateDisplay(this.idSource);
		}
	}; //setManualMode
	
	this.unload();
	this.reload(this.Defs, this.callback);
};

/**
*
* GeodesicFieldSet Class constructor
*	Parameters:
*		name(str)
*		[opt] values(str)
*		proj(str)
*		unit(obj)
*		labels(obj)
*		[opt] HTMLWrapper(obj)
*		options(obj)
*		target(str)
*		referer(str)
*		readOnly(bool)
*
*	proj can take the values:
*		dms (degrees minutes seconds)
*		dd (decimal degrees)
*		xy or zxy (cartesian)
*		csv (CSV input/outpu)
*
*/
GeodesicFieldSet = function(name, values, proj, unit, labels, HTMLWrapper, options, target, referer, readOnly) {
	var a, ENTER_KEY;
	ENTER_KEY = 13;
	a	= values ? values.split(',') : undefined;
	this.setName = name;
	this.setValues = values ? {'x':a[0], 'y':a[1], 'e':a[2], 'z':a[3], 'convergence':a[4]} : {'x':undefined, 'y':undefined, 'e':undefined, 'z':undefined, 'convergence':undefined};
	this.setOriginalProj = (proj == 'csv') ? transcodeCRSProj(eval(referer + '.ProjHash[this.setName].projName')) : proj;
  this.setLat0 = eval(referer + '.ProjHash[this.setName].lat0');
  this.setLng0 = eval(referer + '.ProjHash[this.setName].long0');
  this.setA = eval(referer + '.ProjHash[this.setName].a');
  this.setB = eval(referer + '.ProjHash[this.setName].b');
	this.setProj = proj;
	this.setUnit = unit.x ? unit : {'x':unit, 'y':unit};
	this.setLabels = labels;
	this.setId = name;
	this.setWrapper = HTMLWrapper ? HTMLWrapper : {'set':['table', {'border':'0', 'cellspacing':'1', 'cellpadding':'0', 'class':'form_tbl'}],
																									'fields':['td', {'class':'field'}],
																									'label':['td', {'class':'label'}],
																									'container':['tr']};
	this.setOptions = options;
	this.setTarget = target;
	this.setReferer = referer;
	this.setReadOnly = readOnly;
	this.lengthUnit = 'm';
	
	this.initialize = function() {
		var HTMLTag, tempTag, me;
		tempTag = new Tag(this.setWrapper.set);
		if (this.setWrapper.set[0] == 'table') {
			tempTag = new Tag(['tbody']);
		}
		HTMLTag = tempTag.JQObj;
		switch (this.setProj) {
			case 'dd':
			case 'dms':
				this.set = {'x':new GeodesicField(this.setName+'_'+this.setTarget, this.setValues.x, this.setProj, this.setUnit.x, this.setLabels.x, this.setId + '_X', this.setWrapper, this.setOptions.x, this.setReferer, this.setReadOnly),
										'y':new GeodesicField(this.setName+'_'+this.setTarget, this.setValues.y, this.setProj, this.setUnit.y, this.setLabels.y, this.setId + '_Y', this.setWrapper, this.setOptions.y, this.setReferer, this.setReadOnly),
										'o':new GeodesicField(this.setName+'_'+this.setTarget, this.setProj, 'dms_dd', this.setOptions.o, '', this.setId + '_DMS_DD', this.setWrapper, undefined, this.setReferer, this.setReadOnly)};
				HTMLTag.append(this.set.y.html);
				HTMLTag.append(this.set.x.html);
				HTMLTag.append(this.set.o.html);
				break;
			case 'xy':
				this.set = {'x':new GeodesicField(this.setName+'_'+this.setTarget, this.setValues.x, this.setProj, this.setUnit.x, this.setLabels.x, this.setId + '_X', this.setWrapper, this.setOptions.x, this.setReferer, this.setReadOnly, this.lengthUnit),
										'y':new GeodesicField(this.setName+'_'+this.setTarget, this.setValues.y, this.setProj, this.setUnit.y, this.setLabels.y, this.setId + '_Y', this.setWrapper, this.setOptions.y, this.setReferer, this.setReadOnly, this.lengthUnit),
										'u':new GeodesicField(this.setName+'_'+this.setTarget, this.lengthUnit, 'm_km', this.setOptions.u, '', this.setId + '_M_KM', this.setWrapper, undefined, this.setReferer, this.setReadOnly),
                    'convergence':new GeodesicField(this.setName+'_'+this.setTarget, this.setValues.Convergence, 'convergence', {'CONVERGENCE':'°'}, this.setLabels.convergence, this.setId + '_CONVERGENCE', this.setWrapper, undefined, this.setReferer, this.setReadOnly)};
				HTMLTag.append(this.set.x.html);
				HTMLTag.append(this.set.y.html);
        $(this.set.convergence.html).find('.key-label').prepend('<img src="'+dir_ws_images+'GN_'+this.setTarget+'.jpg" alt="" />');
				HTMLTag.append(this.set.convergence.html);
				HTMLTag.append(this.set.u.html);
				break;
			case 'zxy':
				this.set = {'e':new GeodesicField(this.setName+'_'+this.setTarget, 'n', 'e', this.setUnit.e, this.setLabels.e, this.setId + '_E', this.setWrapper, this.setOptions.e, this.setReferer, this.setReadOnly),
										'z':new GeodesicField(this.setName+'_'+this.setTarget, 31, 'z', this.setUnit.z, this.setLabels.z, this.setId + '_Z', this.setWrapper, this.setOptions.z, this.setReferer, this.setReadOnly),
										'x':new GeodesicField(this.setName+'_'+this.setTarget, this.setValues.x, this.setProj, this.setUnit.x, this.setLabels.x, this.setId + '_X', this.setWrapper, this.setOptions.x, this.setReferer, this.setReadOnly, this.lengthUnit),
										'y':new GeodesicField(this.setName+'_'+this.setTarget, this.setValues.y, this.setProj, this.setUnit.y, this.setLabels.y, this.setId + '_Y', this.setWrapper, this.setOptions.y, this.setReferer, this.setReadOnly, this.lengthUnit),
										'u':new GeodesicField(this.setName+'_'+this.setTarget, this.lengthUnit, 'm_km', this.setOptions.u, '', this.setId + '_M_KM', this.setWrapper, undefined, this.setReferer, this.setReadOnly),
                    'convergence':new GeodesicField(this.setName+'_'+this.setTarget, this.setValues.Convergence, 'convergence', {'CONVERGENCE':'°'}, this.setLabels.convergence, this.setId + '_CONVERGENCE', this.setWrapper, undefined, this.setReferer, this.setReadOnly)};
				HTMLTag.append(this.set.e.html);
				HTMLTag.append(this.set.z.html);
				HTMLTag.append(this.set.x.html);
				HTMLTag.append(this.set.y.html);
        $(this.set.convergence.html).find('.key-label').prepend('<img src="'+dir_ws_images+'GN_'+this.setTarget+'.jpg" alt="" />');
        HTMLTag.append(this.set.convergence.html);
				HTMLTag.append(this.set.u.html);
				break;
			case 'csv':
				this.setValues = values;
				this.set = {'csv':new GeodesicField(this.setName+'_'+this.setTarget, this.setValues, this.setProj, this.setUnit.x, this.setLabels.csv, this.setId + '_CSV', this.setWrapper, undefined, this.setReferer, this.setReadOnly),
										'l':new GeodesicField(this.setName+'_'+this.setTarget, undefined, 'l', this.setUnit.x, this.setLabels.l, this.setId + '_L', this.setWrapper, undefined, this.setReferer, this.setReadOnly)};
				HTMLTag.append(this.set.csv.html);
				HTMLTag.append(this.set.l.html);
				break;
			default:
				return;
				break;
		}
		if (this.setWrapper.set[0] == 'table') {
			tempTag = new Tag(this.setWrapper.set);
			tempTag.JQObj.append(HTMLTag);
			HTMLTag = tempTag.JQObj;
		}
		//Convert on Enter key
		me = this;
		$('input,select', HTMLTag).keyup(function(e) {
			if (getKeyCode(e) == ENTER_KEY) {
				eval(me.setReferer).transform(me.setTarget);
			}
		});
		return HTMLTag[0];
	}; //initialize
	
	this.setLengthUnit = function(lengthUnit) {
		this.lengthUnit = lengthUnit ? lengthUnit : this.lengthUnit;
		switch (this.setProj) {
			case 'zxy':
				this.set.z.setLengthUnit(this.lengthUnit);
			case 'xy':
				this.set.x.setLengthUnit(this.lengthUnit);
				this.set.y.setLengthUnit(this.lengthUnit);
				this.set.u.setLengthUnit(this.lengthUnit);
				break;
		}
	}; //setLengthUnit

	this.setX = function(value) {
		this.setValues.x = value;
		this.set.x.setValue(this.setValues.x);
	}; //setX
	
	this.setY = function(value) {
		this.setValues.y = value;
		this.set.y.setValue(this.setValues.y);
	}; //setY
  
  this.setConvergence = function(WGS84) {
		this.setValues.convergence = computeConvergence(this.setA, this.setB, this.setLng0 ? this.setLng0 : 0, this.setValues.z, WGS84);
		this.set.convergence.setValue(this.setValues.convergence);
  }; //setConvergence
  
  this.getConvergence = function() {
		return this.setValues.convergence;
  }; //getConvergence
	
	this.setZ = function(value) {
		if (this.set.z) {
			this.setValues.z = value;
			this.set.z.setValue(this.setValues.z);
		}
	}; //setZ
	
	this.setE = function(value) {
		if (this.set.e) {
			this.setValues.e = value;
			this.set.e.setValue(this.setValues.e);
		}
	}; //setE
	
	this.setCSV = function(value) {
		if (this.set.csv) {
			this.setValues = value;
			this.set.csv.setValue(this.setValues);
		}
	}; //setCSV
	
	this.setXY = function(value, WGS84) {
		var a, x, y, csv, arr, idx, csvArr;
		if (this.setProj == 'csv') {
			csvArr = [];
			arr = value.split('\n');
			for (idx in arr) {
				a = arr[idx].split(',');
				x = a[0];
				y = a[1];
				if (a.length == 2) {
					csv = '';
					if (this.setOriginalProj == 'zxy') {
						csv = getEmisphere(WGS84[idx].y).toString() + ',' + getUTMZone(WGS84[idx].x).toString() + ',';
						y = Math.abs(y);
					}
					csvArr.push(csv + x.toString() + ',' + y.toString());
				} else {
					csvArr.push(x);
				}
			}
			this.setCSV(csvArr.join('\n'));
		} else {
			a = value.split(',');
			x = a[0];
			y = a[1];
			if (this.setProj == 'zxy') {
				this.setE(getEmisphere(WGS84[0].y));
				this.setZ(getUTMZone(WGS84[0].x));
				y = Math.abs(y);
			}
			this.setX(x);
			this.setY(y);
      if (this.setProj != 'dd' && this.setProj != 'dms' && this.setProj != 'csv') this.setConvergence(WGS84[0]);
		}
	}; //setXY
	
	this.getX = function() {
		return getNumber(this.set.x.getValue());
	}; //getX
	
	this.getY = function() {
		return getNumber(this.set.y.getValue());
	}; //getY
	
	this.getZ = function(idx) {
		if (this.setProj == 'csv') {
			return this.getCSV().split('\n')[idx].split(',')[1];
		} else {
			return getNumber(this.set.z.getValue());
		}
	}; //getZ
	
	this.getE = function(idx) {
		if (this.setProj == 'csv') {
			return this.getCSV().split('\n')[idx].split(',')[0];
		} else {
			return this.set.e.getValue();
		}
	}; //getE
	
	this.getCSV = function() {
		return this.set.csv.getValue();
	}; //getCSV
	
	this.getXY = function() {
		var X, Y, CSVArr, eltArr, idx, CSVStr;
		if (this.setProj == 'csv') {
			if (this.setOriginalProj == 'zxy') {
				CSVArr = this.getCSV().split('\n');
				for (idx in CSVArr) {
					eltArr = CSVArr[idx].split(',');
					eltArr.shift();
					eltArr.shift();
					CSVArr[idx] = eltArr.join(',');
				}
				CSVStr = CSVArr.join('\n');
			} else {
				CSVStr = this.getCSV();
			}
			return CSVStr;
		} else {
			X = this.getX();
			Y = this.getY();
			if (isNaN(X) || isNaN(Y)) {
				return;
			} else {
				return X.toString() + ',' + Y.toString();
			}
		}
	}; //getXY
	
	this.reset = function() {
		if (this.setProj == 'csv') {
			this.setCSV('');
		} else {
			this.setX('');
			this.setY('');
			this.setE('n');
			this.setZ(31);
		}
	}; //reset
	
	this.html = this.initialize();
};

/**
*
* GeodesicField Class constructor
*	Parameters:
*		name(str)
*		value(str)
*		proj(str)
*		unit(obj)
*		label(obj)
*		[opt] id(str)
*		[opt] HTMLWrapper(obj)
*		options(obj)
*		referer(str)
*		readOnly(bool)
*		[opt] lengthUnit(str)
*
*	proj can take the following values:
*		dms (degrees minutes seconds)
*		dd (decimal degrees)
*		dms_dd (radio btns to switch dms<->dd)
*		m_km (radio btns to switch m<->km)
*		xy or zxy (cartesian)
*		z (UTM Zone)
*		e (Emisphere)
*		csv (textarea for CSV input/output)
*		l (container of the format to use for CSV)
*/
GeodesicField = function(name, value, proj, unit, label, id, HTMLWrapper, options, referer, readOnly, lengthUnit) {
	this.geodesicName = name;
	this.geodesicValue = value;
	this.geodesicProj = proj;
	this.geodesicUnit = unit;
	this.geodesicLabel = label;
	this.geodesicId = id ? id : name;
	this.geodesicWrapper = HTMLWrapper ? HTMLWrapper : {'fields':['td', {'class':'field'}],
																											'label':['td', {'class':'label'}],
																											'container':['tr']};
	this.geodesicOptions = options;
	this.geodesicReferer = referer;
	this.geodesicReadOnly = readOnly;
	this.geodesicAttributes = {'C':{'size':'1', 'disabled':this.geodesicReadOnly, 'readonly':this.geodesicReadOnly},
														 'D':{'size':'4', 'class':'d_input', 'disabled':this.geodesicReadOnly, 'readonly':this.geodesicReadOnly},
														 'M':{'size':'4', 'class':'m_input', 'disabled':this.geodesicReadOnly, 'readonly':this.geodesicReadOnly},
														 'S':{'size':'6', 'class':'s_input', 'disabled':this.geodesicReadOnly, 'readonly':this.geodesicReadOnly},
														 'DD':{'size':'20', 'class':'dd_input', 'disabled':this.geodesicReadOnly, 'readonly':this.geodesicReadOnly},
														 'XY':{'size':'20', 'class':'xy_input', 'disabled':this.geodesicReadOnly, 'readonly':this.geodesicReadOnly},
														 'Z':{'size':'5', 'class':'z_input', 'disabled':this.geodesicReadOnly, 'readonly':this.geodesicReadOnly},
														 'E':{'size':'1', 'disabled':this.geodesicReadOnly, 'readonly':this.geodesicReadOnly},
														 'CSV':{'rows':'5', 'wrap':'off', 'cols':'18', 'disabled':this.geodesicReadOnly, 'readonly':this.geodesicReadOnly},
                             'CONVERGENCE':{'size':'10', 'class':'convergence_input', 'disabled':this.geodesicReadOnly, 'readonly':true}};
	this.geodesicLengthUnit = lengthUnit ? lengthUnit : 'm';
	
	this.initialize = function() {
		var HTMLTag, geoName, geoField, HTMLcell, HTMLfields, HTMLLabel, tempTag, tmpFunc;
		tempTag = new Tag(this.geodesicWrapper.container);
		HTMLTag = tempTag.JQObj;
		switch (this.geodesicProj) {
			case 'dms':
				this.geodesicValue = ddToDms(this.geodesicValue, this.geodesicOptions);
				this.geodesicFields = {'C':new Field(this.geodesicName + '_C', 'option', this.geodesicValue.C ? this.geodesicValue.C : '', this.geodesicAttributes.C, this.geodesicOptions),
															'D':new Field(this.geodesicName + '_D', 'text', isNaN(this.geodesicValue.D) ? '' : xtdRound(this.geodesicValue.D, 0), this.geodesicAttributes.D),
															'M':new Field(this.geodesicName + '_M', 'text', isNaN(this.geodesicValue.M) ? '' : xtdRound(this.geodesicValue.M, 0), this.geodesicAttributes.M),
															'S':new Field(this.geodesicName + '_S', 'text', isNaN(this.geodesicValue.S) ? '' : xtdRound(this.geodesicValue.S, 12), this.geodesicAttributes.S)};
				break;
			case 'dd':
				this.geodesicFields = {'DD':new Field(this.geodesicName + '_DD', 'text', isNaN(this.geodesicValue) ? '' : xtdRound(this.geodesicValue, 15), this.geodesicAttributes.DD)};
				break;
			case 'dms_dd':
				tmpFunc = this.geodesicReferer+'.updateDisplay(e);';
				this.geodesicFields = {'_DMS':new Field(this.geodesicName + '_DMS_DD', 'radio', 'dms', {'click':function(e) {eval(tmpFunc)}}),
															 '_DD':new Field(this.geodesicName + '_DMS_DD', 'radio', 'dd', {'click':function(e) {eval(tmpFunc)}})};
				$(this.geodesicFields['_'+this.geodesicValue.toUpperCase()].html).prop('checked', true);
				$(this.geodesicFields['_'+this.geodesicValue.toUpperCase()].html).prop('defaultChecked', true);
				break;
			case 'm_km':
				tmpFunc = this.geodesicReferer+'.updateDisplay(e);';
				this.geodesicFields = {'_M':new Field(this.geodesicName + '_M_KM', 'radio', 'm', {'click':function(e) {eval(tmpFunc)}}),
															 '_KM':new Field(this.geodesicName + '_M_KM', 'radio', 'km', {'click':function(e) {eval(tmpFunc)}})};
				$(this.geodesicFields['_'+this.geodesicLengthUnit.toUpperCase()].html).prop('checked', true);
				$(this.geodesicFields['_'+this.geodesicLengthUnit.toUpperCase()].html).prop('defaultChecked', true);
				break;
			case 'zxy':
			case 'xy':
				this.geodesicFields = {'XY':new Field(this.geodesicName + '_XY', 'text', isNaN(this.geodesicValue) ? '' : xtdRound(setM(this.geodesicValue, this.geodesicLengthUnit), 3), this.geodesicAttributes.XY)};
				break;
			case 'z':
				this.geodesicFields = {'Z':new Field(this.geodesicName + '_Z', 'text', isNaN(this.geodesicValue) ? '' : xtdRound(this.geodesicValue, 0), this.geodesicAttributes.Z)};
				break;
			case 'e':
				this.geodesicFields = {'E':new Field(this.geodesicName + '_E', 'option', this.geodesicValue ? this.geodesicValue : '', this.geodesicAttributes.E, this.geodesicOptions)};
				break;
			case 'csv':
				this.geodesicFields = {'CSV':new Field(this.geodesicName + '_CSV', 'textarea', this.geodesicValue ? this.geodesicValue : '', this.geodesicAttributes.CSV)};
				break;
			case 'l':
				this.geodesicFields = {'L':new Tag(['span'])};
				break;
      case 'convergence':
        this.geodesicFields = {'CONVERGENCE':new Field(this.geodesicName + '_CONVERGENCE', 'text', isNaN(this.geodesicValue) ? 0 : xtdRound(this.geodesicValue, 3), this.geodesicAttributes.CONVERGENCE)};
        break;
			default:
				return;
				break;
		}
		//Wrapp the fields
		tempTag = new Tag(this.geodesicWrapper.label);
		HTMLLabel = tempTag.JQObj.append(this.geodesicLabel);
		HTMLTag.append(HTMLLabel);
		tempTag = new Tag(this.geodesicWrapper.fields);
		HTMLcell = tempTag.JQObj;
		for (geoName in this.geodesicFields) {
			geoField = this.geodesicFields[geoName];
			tempTag = new Tag(['label', {'for':this.geodesicFields[geoName].fieldId}]);
			HTMLfields = tempTag.JQObj;
			HTMLfields.append(geoField.JQObj);
			if (this.geodesicUnit) {
				if (this.geodesicUnit[geoName]) {
					if (this.geodesicUnit[geoName][this.geodesicLengthUnit]) {
						HTMLfields.append(this.geodesicUnit[geoName][this.geodesicLengthUnit]);
					} else {
						HTMLfields.append(this.geodesicUnit[geoName]);
					}
				}
			}
			HTMLfields.append('&nbsp;');
			HTMLcell.append(HTMLfields);
			HTMLTag.append(HTMLcell);
		}
		return HTMLTag[0];
	}; //initialize
	
	this.setLengthUnit = function(lengthUnit) {
		this.geodesicLengthUnit = lengthUnit ? lengthUnit : this.geodesicLengthUnit;
		switch (this.geodesicProj) {
			case 'm_km':
				/* Bug IE: the select attribute of the option tag makes that the selection
				do not change wether it's selected or not */
				var chkRadio = $('input[value='+this.geodesicLengthUnit+']', this.html);
				var unchkRadio = $('input:not([value='+this.geodesicLengthUnit+'])', this.html);
				var radios = $('input', this.html);
				if(unchkRadio.is(':checked') == true) {
					unchkRadio.prop('checked', false);
					unchkRadio.prop('defaultChecked', false);
				}
				if(chkRadio.is(':checked') == false) {
					chkRadio.prop('checked', true);
					chkRadio.prop('defaultChecked', true);
				}
				break;
			case 'zxy':
			case 'xy':
				$($('label', this.html).contents()[1]).replaceWith(this.geodesicUnit.XY[this.geodesicLengthUnit]);
				break;
		}
	}; //setLengthUnit

	this.setValue = function (value) {
		this.geodesicValue = value;
		switch (this.geodesicProj) {
			case 'dms':
				this.geodesicValue = ddToDms(this.geodesicValue, this.geodesicOptions);
				this.geodesicFields.C.setValue(((this.geodesicValue.C != undefined) ? this.geodesicValue.C : ''));
				this.geodesicFields.D.setValue((isNaN(this.geodesicValue.D) ? '' : xtdRound(this.geodesicValue.D, 0)));
				this.geodesicFields.M.setValue((isNaN(this.geodesicValue.M) ? '' : xtdRound(this.geodesicValue.M, 0)));
				this.geodesicFields.S.setValue((isNaN(this.geodesicValue.S) ? '' : xtdRound(this.geodesicValue.S, 12)));
				break;
			case 'dd':
				this.geodesicFields.DD.setValue((isNaN(this.geodesicValue) ? '' : xtdRound(this.geodesicValue, 15)));
				break;
			case 'zxy':
			case 'xy':
				this.geodesicFields.XY.setValue((isNaN(this.geodesicValue) ? '' : xtdRound(setM(this.geodesicValue, this.geodesicLengthUnit), ((this.geodesicLengthUnit == 'm') ? 2 : 5)))); //cm
				break;
			case 'e':
				this.geodesicFields.E.setValue(((this.geodesicValue != undefined) ? this.geodesicValue : ''));
				break;
			case 'z':
				this.geodesicFields.Z.setValue((isNaN(this.geodesicValue) ? '' : xtdRound(this.geodesicValue, 0)));
				break;
			case 'csv':
				this.geodesicFields.CSV.setValue(this.geodesicValue);
				break;
      case 'convergence':
        this.geodesicFields.CONVERGENCE.setValue(xtdRound(this.geodesicValue, 4));
        break;
			default:
				return;
				break;
		}
	}; //setValue
	
	this.getValue = function() {
		var value;
		switch (this.geodesicProj) {
			case 'dms':
				this.geodesicValue = {'C':this.geodesicFields.C.getValue(),
															'D':xtdParseFloat(this.geodesicFields.D.getValue()),
															'M':xtdParseFloat(this.geodesicFields.M.getValue()),
															'S':xtdParseFloat(this.geodesicFields.S.getValue())};
				value = dmsToDd(this.geodesicValue);
				break;
			case 'dd':
				this.geodesicValue = xtdParseFloat(this.geodesicFields.DD.getValue());
				value = this.geodesicValue;
				break;
			case 'zxy':
			case 'xy':
				this.geodesicValue = xtdParseFloat(getM(this.geodesicFields.XY.getValue(), this.geodesicLengthUnit));
				value = this.geodesicValue;
				break;
			case 'e':
				this.geodesicValue = this.geodesicFields.E.getValue();
				value = this.geodesicValue;
				break;
			case 'z':
				this.geodesicValue = xtdParseFloat(this.geodesicFields.Z.getValue());
				value = this.geodesicValue;
				break;
			case 'csv':
				this.geodesicValue = this.geodesicFields.CSV.getValue();
				value = this.geodesicValue;
				break;
			default:
				return;
				break;
		}
		return value;
	}; //getValue
	
	this.html = this.initialize();
};

/**
*
* Field Class constructor
*	Parameters:
*		name(str)
*		type(str)
*		value(str|float)
*		attributes(obj)
*		options(arr)
*
*/
Field = function(name, type, value, attributes, options) {
	this.fieldId = name + '_id_' + Math.floor(Math.random()*10001);
	this.fieldType = type;
	this.fieldValue = value ? value : '';
	this.fieldAttributes = attributes ? attributes : {};
	this.fieldAttributes.name = name;
	this.fieldOptions = options;
	switch (this.fieldType) {
		case 'text':
		case 'radio':
			this.fieldTagName = 'input';
			break;
		case 'option':
			this.fieldTagName = 'select';
			break;
		case 'textarea':
			this.fieldTagName = 'textarea';
			break;
		default:
			this.fieldTagName = 'input';
			break;
	}
	
	this.initialize = function() {
		var myTag;
		switch (this.fieldType) {
			case 'option':
				this.fieldAttributes.val = this.fieldValue;
				myTag = new Tag([this.fieldTagName, this.fieldAttributes, this.fieldOptions]);
				break;
			case 'textarea':
				this.fieldAttributes.val = this.fieldValue;
				this.fieldAttributes.id = this.fieldId;
				myTag = new Tag([this.fieldTagName, this.fieldAttributes]);
				break;
			default:
				this.fieldAttributes.type = this.fieldType;
				this.fieldAttributes.val = this.fieldValue;
				this.fieldAttributes.id = this.fieldId;
				myTag = new Tag([this.fieldTagName, this.fieldAttributes]);
				break;
		}
		return myTag;
	}; //initialize
	
	this.getValue = function() {
		this.fieldValue = this.JQObj.val();
		return this.fieldValue;
	}; //getValue
	
	this.setValue = function(value) {
		this.fieldValue = value;
		this.fieldAttributes.val = this.fieldValue;
		this.field.setValue(this.fieldValue);
		this.html = this.field.html;
		this.JQObj = this.field.JQObj;
	}; //setValue
	
	this.field = this.initialize();
	this.html = this.field.html;
	this.JQObj = this.field.JQObj;
};

/**
*
* Tag Class constructor
*	parameters:
*		array[name(str), attributes(obj), options(arr)]
*
*/
Tag = function(array) {
	this.tagName = array[0]; //tagName;
	this.tagAttributes = array[1] ? array[1] : {}; //attributes ? attributes : {};
	this.tagOptions = array[2] ? array[2] : []; //options ? options : [];
	
	this.initialize = function() {
		var HTMLTag;
		if (this.tagName == '') {
			return;
		}
		if (this.tagAttributes.val) { // Prevent scientific notation due to the Number.toString() method
			if (typeof(this.tagAttributes.val) == 'number' && this.tagAttributes.val.toString().split('e').length > 1) {
				this.tagAttributes.val = xtdRound(this.tagAttributes.val);
			}
		}
		HTMLTag = $('<'+this.tagName+'/>', this.tagAttributes);
		if (this.tagName == 'select') { //If it's a drop-down list, insert the options
			$.each(this.tagOptions, function(optVal, optText) {
				HTMLTag.append($('<option/>', {val : optVal, text : optText}));
			});
		}
		if (this.tagAttributes.type) { //Remove borders if necessary
			if (this.tagAttributes.type == 'radio' || this.tagAttributes.type == 'checkbox') {
				HTMLTag.css('border', '0px none');
			}
		}
		return HTMLTag;
	}; //initialize
	
	this.setValue = function(value) {
		this.tagAttributes.val = value;
		// Prevent scientific notation due to the Number.toString() method
		if (typeof(this.tagAttributes.val) == 'number' && this.tagAttributes.val.toString().split('e').length > 1) {
			this.tagAttributes.val = xtdRound(this.tagAttributes.val);
		}
		$(this.html).val(this.tagAttributes.val);
		this.JQObj = $(this.html);
	}; //setValue
	
	this.JQObj = this.initialize();
	this.html = this.JQObj[0];
};
