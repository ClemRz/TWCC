
/**
* Remove all childrens of a node
*/
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

/**
* Return an event
*/
if (typeof(getEvent) != 'function') {
  function getEvent(event) {
    if (!event && window.event) {
      event = window.event;
    }
    return event;
  }
}

/**
* Return the target node of an event
*/
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

/**
* Return the key code of an event
*/
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

/**
* Return a stack sorted
*/
$.fn.sort = function() {
  return this.pushStack([].sort.apply(this, arguments), []);
};

/**
* Return options sorted
*/
$.fn.sortOptions = function(sortCallback) {
  jQuery('option', this).sort(sortCallback)
                        .appendTo(this);
  return this;
};

/**
* Return groups sorted
*/
$.fn.sortGroups = function(sortCallback) {
  jQuery('optgroup', this).sort(sortCallback)
                        .appendTo(this);
  return this;
};

/**
* Return the selected node with its options sorted by text (ASC)
*/
$.fn.sortOptionsByText = function() {
  var byTextSortCallback = function(x, y) {
    var xText = jQuery(x).text().toUpperCase();
    var yText = jQuery(y).text().toUpperCase();
    return (xText < yText) ? -1 : (xText > yText) ? 1 : 0;
  };
  return this.sortOptions(byTextSortCallback);
};

/**
* Return the selected node with its options sorted by text (ASC)
*/
$.fn.sortOptgroupsByLabel = function() {
  var byLabelSortCallback = function(x, y) {
    var xText = jQuery(x).prop('label').toUpperCase();
    var yText = jQuery(y).prop('label').toUpperCase();
    return (xText < yText) ? -1 : (xText > yText) ? 1 : 0;
  };
  return this.sortGroups(byLabelSortCallback);
};

/**
* Return the selected node with its options sorted by text (ASC)
*/
$.fn.sortGrpsNOptionsByText = function() {
  var me = this;
  $('optgroup', this).each(function(idx) {
    $('optgroup:eq('+idx+')', me).sortOptionsByText();
  });
  return this.sortOptgroupsByLabel();
};

/**
* Return the selected node with its options sorted by value (ASC)
*/
$.fn.sortOptionsByValue = function() {
  var byValueSortCallback = function(x, y) {
    var xVal = jQuery(x).val();
    var yVal = jQuery(y).val();
    return (xVal < yVal) ? -1 : (xVal > yVal) ? 1 : 0;
  };
  return this.sortOptions(byValueSortCallback);
};

/**
* Return the field format to use depending on the projection
*/
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
      case 'W3wConnector':
        crsProj = 'xx';
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

/**
* Return true if <input> is an array
*/
if (typeof(is_array) != 'function') {
  function is_array(input) {
    return typeof(input)=='object'&&(input instanceof Array);
  }
}

/**
* Remove all the option nodes from a select node
*/
if (typeof(removeOption) != 'function') {
  function removeOption(oSelect, optionValue) {
    $("option[value='"+optionValue.toString()+"']", oSelect).remove();
  }
}

/**
* Remove all the empty optgroup nodes from a select node
*/
if (typeof(removeEmptyOptgroups) != 'function') {
  function removeEmptyOptgroups(oSelect) {
    $("optgroup:empty", oSelect).remove();
  }
}
/*Return the convergence angle
surveyConvention MUST BE A GLOBAL VARIABLE.
surveyConvention is true if omitted
Source:
http://www.threelittlemaids.co.uk/magdec/transverse_mercator_projection.pdf
http://www.ga.gov.au/geodesy/datums/redfearn_geo_to_grid.jsp
http://www.threelittlemaids.co.uk/magdec/explain.html
*/
if (typeof(computeConvergence) != 'function') {
  function computeConvergence(a, b, lng0, UTMZone, WGS84) {
    var sc = (typeof(surveyConvention) === "undefined") ? true : surveyConvention;
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
    C *= (sc) ? -1 : 1
    return radToDeg(C);
  }
}

/**
* Retrun the UTM zone
*/
if (typeof(getUTMZone) != 'function') {
  function getUTMZone(WGS84lng) {
    return (WGS84lng >= 0) ? Math.floor((WGS84lng + 180) / 6) + 1 : Math.floor(WGS84lng / 6) + 31;
  }
}

/**
* Return the emisphere
*/
if (typeof(getEmisphere) != 'function') {
  function getEmisphere(WGS84Lat) {
    return (WGS84Lat >= 0) ? 'n' : 's';
  }
}

/**
* Return undefined if not a number
*/
if (typeof(getNumber) != 'function') {
  function getNumber(value) {
    if (isNaN(value)) {
      return;
    } else {
      return value;
    }
  }
}

/**
* Return the float parsed vale (. and , included)
*/
if (typeof(xtdParseFloat) != 'function') {
  function xtdParseFloat(value) {
    var value = value.toString().replace(/\,/gi, '.');
    if (isNaN(value)) value = 0;
    return parseFloat(value);
  }
}

/**
* Return the rounded value
*/
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

/**
* Convert dms to dd
*/
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

/**
* Convert degrees to radians
*/
if (typeof(degToRad) != 'function') {
  function degToRad(dValue) {
    return dValue*Math.PI/180;
  }
}

/**
* Convert radians to degrees
*/
if (typeof(radToDeg) != 'function') {
  function radToDeg(rValue) {
    return rValue*180/Math.PI;
  }
}

/**
* Convert dd to dms
*/
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

/**
* Return the value converted form <lenghtUnit> to meters
*/
if (typeof(getM) != 'function') {
  function getM(value, lenghtUnit) {
    var coef;
    coef = (lenghtUnit == 'm') ? 1 : 1000;
    return (xtdParseFloat(value) * coef).toString();
  }
}

/**
* Return the value converted from meters to <lenghtUnit>
*/
if (typeof(setM) != 'function') {
  function setM(value, lenghtUnit) {
    var coef;
    coef = (lenghtUnit == 'm') ? 1 : 1000;
    return (xtdParseFloat(value) / coef).toString();
  }
}