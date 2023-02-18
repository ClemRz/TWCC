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

/**
 * Events triggered by TWCCMap and attached to the map container:
 *  - marker.dragend (evt, latLng)
 *  - map.click (evt, mouseEvt)
 *  - map.rightclick (evt, mouseEvt)
 *  - polyline.editend (evt, WGS84)
 *  - map.metricschanged (metrics)
 */

import {Map, View, Feature, Overlay, VERSION} from 'ol'; // jshint ignore:line
import {register} from 'ol/proj/proj4.js'; // jshint ignore:line
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js'; // jshint ignore:line
import {OSM, XYZ, Stamen} from 'ol/source'; // jshint ignore:line
import VectorSource from 'ol/source/Vector'; // jshint ignore:line
import {Point, LineString, Polygon} from 'ol/geom'; // jshint ignore:line
import {default as Type} from 'ol/geom/Geometry.js'; // jshint ignore:line
import {Icon, Style, Stroke, Fill, Text, Circle as CircleStyle} from 'ol/style.js'; // jshint ignore:line
import {defaults as defaultControls, FullScreen, ScaleLine, Control} from 'ol/control.js'; // jshint ignore:line
import {GPX, GeoJSON, IGC, KML, TopoJSON} from 'ol/format.js'; // jshint ignore:line
import {defaults as defaultInteractions, DragRotateAndZoom, Modify, DragAndDrop} from 'ol/interaction.js'; // jshint ignore:line
import {fromLonLat, toLonLat} from 'ol/proj.js'; // jshint ignore:line
import {degreesToStringHDMS} from 'ol/coordinate.js'; // jshint ignore:line
import Geocoder from '@kirtandesai/ol-geocoder'; // jshint ignore:line
import LayerGroup from 'ol/layer/Group'; // jshint ignore:line
import {getLength, getArea} from 'ol/sphere'; // jshint ignore:line
import LayerSwitcher from 'ol-layerswitcher'; // jshint ignore:line
import Graticule from 'ol-ext/control/Graticule'; // jshint ignore:line

(function ($, proj4) {
        "use strict";

        if (window.TWCCMap !== undefined) {
            return;
        }

        var instance;
        var init = function (opts) {
            var _measurements, _olMap, _olView, _olDefaultSource, _olMarkerModifyInteraction,
                _olLinestringModifyInteraction, _olDragAndDropInteraction, _olAzimuthsVectorSource,
                _olLinestringVectorSource, _olMarkerVectorSource, _olGeocoder, _olGraticule, _$infowindow, _olOverlay,
                _olScaleLineControl,
                _dfd = null,
                _options = {
                    mapOptions: {
                        zoom: 2,
                        center: [0, 0],
                        azimuthOpacity: 0.7
                    },
                    mapContainerElt: $('#map')[0],
                    context: {
                        languageCode: 'en'
                    }
                };

            var GOOGLE = {
                HYBRID: {
                    title: 'Hybrid',
                    lyrs: 'y'
                },
                SATELLITE: {
                    title: 'Satellite',
                    lyrs: 's'
                },
                TERRAIN: {
                    title: 'Terrain',
                    lyrs: 'p'
                },
                ROAD: {
                    title: 'Road',
                    lyrs: 'm'
                }
            };

            $.extend(true, _options, opts);

            _measurements = {
                anglesInRadians: {},
                booleans: {autoZoom: true},
                metrics: {},
                setAngleInRadians: function (key, angleInRadians) {
                    _measurements.anglesInRadians[key] = angleInRadians;
                },
                setAngleInDegrees: function (key, angleInDegrees) {
                    _measurements.setAngleInRadians(key, _options.utils.degToRad(angleInDegrees));
                },
                getAngleInRadians: function (key) {
                    return _measurements.anglesInRadians[key];
                },
                setBoolean: function (key, bool) {
                    _measurements.booleans[key] = !!bool;
                },
                getBoolean: function (key) {
                    return _measurements.booleans[key];
                },
                setMetrics: function (key, value) {
                    _measurements.metrics[key] = value;
                },
                getMetrics: function (key) {
                    return _measurements.metrics[key];
                }
            };

            function Ring_(n) {
                this._array = n;
                this._index = 0;
                var self = this;
                this.get = function () {
                    var ret = self._array[self._index];
                    ++self._index;
                    if (self._index === self._array.length) {
                        self._index = 0;
                    }
                    return ret;
                };
            }

            function _t() {
                return _options.utils.t.apply(this, arguments); // jshint ignore:line
            }

            function _newDeferred() {
                return _options.utils.newDeferred.apply(this, arguments); // jshint ignore:line
            }

            function _trigger(eventName, data) {
                _options.utils.trigger($(_options.mapContainerElt), eventName, data);
            }

            function _getPreferenceCookie(prefId) {
                return _options.utils.getPreferenceCookie(prefId);
            }

            function _fromLonLat(xy) {
                return fromLonLat(xy, _olView.getProjection());
            }

            function _toLonLat(xy) {
                return toLonLat(xy, _olView.getProjection());
            }

            function _getXY(wgs84) {
                return _fromLonLat([wgs84.x, wgs84.y]);
            }

            function _setMetrics(length, area) {
                _measurements.setMetrics('length', length);
                _measurements.setMetrics('area', area);
                _trigger('map.metrics_changed', {
                    length: length,
                    area: area
                });
            }

            function _setLinestringMetrics() {
                var feature = _olLinestringVectorSource.getFeatures()[0];
                if (feature) {
                    var geometry = feature.getGeometry();
                    var coordinates = geometry.getCoordinates();
                    coordinates.push(coordinates[0]);
                    var polygon = new Polygon([coordinates]);
                    _setMetrics(getLength(geometry), getArea(polygon));
                }
            }

            function _closeInfowindow() {
                _olOverlay.setPosition(undefined);
            }

            function _getGraticule(opts) {
                return new Graticule($.extend({
                    projection: _olView.getProjection(),
                    formatCoordX: function (c) {
                        return degreesToStringHDMS('EW', c); //TODO clement depends on the srs
                    },
                    formatCoordY: function (c) {
                        return degreesToStringHDMS('NS', c);
                    },
                    style: new Style({
                        stroke: new Stroke({
                            color: 'rgba(255,120,0,0.5)', //TODO clement depends on if this is source or dest
                            width: 1
                        }),
                        text: new Text({
                            stroke: new Stroke({color: '#fff', width: 2}),
                            fill: new Fill({color: '#000'})
                        })
                    })
                }, opts));
            }

            function _updateAzimuths(xy) {
                _olAzimuthsVectorSource.getFeatures().forEach(function (feature) {
                    //Even if xy has not changed, we need to force the re-rendering so the rotation is taken into account
                    feature.getGeometry().setCoordinates(xy || feature.getGeometry().getCoordinates());
                    var name = feature.get('name');
                    var rotation = _measurements.getAngleInRadians(name) || 0;
                    var opacity = name !== 'true' && !rotation ? 0 : _options.mapOptions.azimuthOpacity;
                    var image = feature.get('style').getImage();
                    image.setRotation(rotation);
                    image.setOpacity(opacity);
                });
            }

            function _getSvgSource(xmlStr) {
                return 'data:image/svg+xml,' + escape('<?xml version="1.0" encoding="UTF-8" standalone="no"?>' + xmlStr);
            }

            function _createAzimuths(xy) {
                // noinspection CssInvalidPropertyValue
                var gnArrowSrc = _getSvgSource('<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="97" viewBox="0 0 16 97" enable-background="new 0 0 512 512" xml:space="preserve"><path style="stroke:#fff;stroke-width:2;" d="M 8,12.943205 8,96.999397"/><rect style="fill:#fff;stroke:#fff;stroke-width:1;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;" width="8.779562" height="8.2131386" x="3.610219" y="4.5313869"/></svg>');
                // noinspection CssInvalidPropertyValue
                var norths = {
                    'true': {
                        src: _getSvgSource('<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="97" viewBox="0 0 16 97" enable-background="new 0 0 512 512" xml:space="preserve"><polygon style="fill:#fff;stroke:#fff;stroke-width:37.61520004;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10" stroke-miterlimit="10" points="374.185,309.08 401.33,467.31 259.216,392.612 117.104,467.31 144.25,309.08 29.274,197.007 188.165,173.919 259.216,29.942 330.27,173.919 489.16,197.007 " transform="matrix(0.03217603,0,0,0.03217603,-0.33683664,-0.35833699)"/><path style="stroke:#fff;stroke-width:2;" d="M 8,12.943205 8,96.999397"/></svg>')
                    },
                    magneticDeclination: {
                        src: _getSvgSource('<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 16 97" xml:space="preserve" width="16" height="97"><g transform="matrix(0.07106223,0,0,0.07106223,-0.43846047,1.8741008e-6)"><path style="fill:#fff" d="m 7.954,226.53 c -2.23,4.623 -2.295,8.072 -0.609,9.915 3.911,4.275 15.926,-3.905 23.323,-9.051 l 58.416,-40.662 c 7.397,-5.145 20.402,-11.835 29.414,-11.993 0.897,-0.016 1.8,-0.011 2.703,0.011 9.007,0.218 21.958,7.016 29.3,12.238 l 56.403,40.151 c 7.343,5.221 19.303,13.473 23.301,9.219 1.74,-1.849 1.751,-5.33 -0.381,-9.997 L 129.648,7.047 c -4.264,-9.333 -11.335,-9.404 -15.79,-0.163 L 7.954,226.53 Z"/><path style="stroke:#fff;stroke-width:28.14434624;" d="m 118.74748,174.45383 0,1190.45957"/></g></svg>'),
                        rotation: _measurements.getAngleInRadians('magneticDeclination')
                    },
                    srcConvergence: {
                        src: gnArrowSrc,
                        color: '#f00',
                        rotation: _measurements.getAngleInRadians('srcConvergence')
                    },
                    dstConvergence: {
                        src: gnArrowSrc,
                        rotation: _measurements.getAngleInRadians('dstConvergence')
                    }
                };
                for (var name in norths) {
                    if (!norths.hasOwnProperty(name)) {
                        continue;
                    }
                    var north = norths[name];
                    _olAzimuthsVectorSource.addFeature(new Feature({
                        geometry: new Point(xy),
                        name: name,
                        style: new Style({
                            image: new Icon($.extend({
                                anchor: [0.5, 1],
                                rotateWithView: true,
                                opacity: name !== 'true' && !north.rotation ? 0 : _options.mapOptions.azimuthOpacity,
                                scale: 0.75,
                                color: '#000'
                            }, north))
                        })
                    }));
                }
            }

            function _clearAzimuthsSource() {
                _olAzimuthsVectorSource.clear();
            }

            function _removeErrors(wgs84Array) {
                var newWgs84Array = [];
                $.each(wgs84Array, function () {
                    if (this.lat === undefined && this.x === undefined || this.error) {
                        return true;
                    } //INPUT ERROR => continue
                    newWgs84Array.push(this);
                });
                return newWgs84Array;
            }

            function _linestringStyleFunction(feature) {
                var styles = [
                    new Style({
                        stroke: new Stroke({
                            color: 'rgba(0,0,0,0.5)',
                            width: 2
                        })
                    })
                ];
                var index = 0;
                var linestring = feature.getGeometry();
                var length = linestring.getCoordinates().length - 1;
                var textOptions = {
                    font: '10px Arial',
                    stroke: new Stroke({color: '#fff', width: 2}),
                    fill: new Fill({color: '#000'})
                };
                linestring.forEachSegment(function (start, end) {
                    ++index;
                    styles.push(new Style({
                        geometry: new Point(start),
                        text: new Text($.extend(textOptions, {
                            text: index.toString()
                        }))
                    }));
                    if (index === length) {
                        styles.push(new Style({
                            geometry: new Point(end),
                            text: new Text($.extend(textOptions, {
                                text: (index + 1).toString()
                            }))
                        }));
                    }
                });
                return styles;
            }

            function _getXyArray(wgs84Array) {
                return wgs84Array.map(_getXY);
            }

            function _updateMarkerPosition(xy) {
                _olMarkerVectorSource.getFeatures().forEach(function (feature) {
                    feature.getGeometry().setCoordinates(xy);
                });
            }

            function _updateLinestringPosition(xyArray) {
                _olLinestringVectorSource.getFeatures()[0].getGeometry().setCoordinates(xyArray);
            }

            function _createMarker(xy) {
                _olMarkerVectorSource.addFeature(
                    new Feature({
                        geometry: new Point(xy),
                        style: new Style({
                            image: new Icon({
                                src: _options.system.dirWsImages + 'twcc_icon_with_shadow.png',
                                anchor: [19, 1],
                                anchorXUnits: 'pixels'
                            })
                        })
                    })
                );
            }

            function _createLinestring(xyArray) {
                _olLinestringVectorSource.addFeature(
                    new Feature({
                        geometry: new LineString(xyArray)
                    })
                );
            }

            function _clearMarkerSource() {
                _olMarkerVectorSource.clear();
                _olMap.removeInteraction(_olMarkerModifyInteraction);
            }

            function _clearLinestringSource() {
                _olLinestringVectorSource.clear();
                _olMap.removeInteraction(_olLinestringModifyInteraction);
            }

            function _setAutoZoom() {
                if (_measurements.getBoolean('autoZoom') === true) {
                    _olMap.getView().fit(
                        _olLinestringVectorSource.getExtent(),
                        {
                            duration: 200,
                            padding: [0, 270, 36, 204]
                        }
                    );
                }
            }

            function _flyTo(xy) { //TODO clement this is not very nice when moving too close or too far away
                var dfd = new $.Deferred();
                var duration = 200;

                _olView.animate({
                    center: xy,
                    duration: duration
                }, dfd.resolve);

                return dfd.promise();
            }

            function _zoomTo(zoom) {
                var dfd = new $.Deferred();
                var duration = 200;

                _olView.animate({
                    zoom: zoom,
                    duration: duration
                }, dfd.resolve);

                return dfd.promise();
            }

            function _flyAndZoom() {
                $('#zoom-btn').button("option", "disabled", true);
                var xy = _olMarkerVectorSource.getFeatures()[0].getGeometry().getCoordinates();
                $.when(_flyTo(xy), _zoomTo(10))
                    .done(function () {
                        $('#zoom-btn').button("option", "disabled", false);
                    });
            }

            function _setLineStringSource(WGS84Array) {
                if (!_olLinestringVectorSource) {
                    return;
                }
                var xyArray = _getXyArray(WGS84Array);
                if (_olLinestringVectorSource.getFeatures().length) {
                    _updateLinestringPosition(xyArray);
                } else {
                    _createLinestring(xyArray);
                    _olMap.addInteraction(_olLinestringModifyInteraction);
                }
                _setLinestringMetrics();
                _setAutoZoom();
            }

            function _buildInfowindow(xy) {
                var elevationPromise, timezonePromise, reverseGeocoderPromise, html,
                    elevation = '',
                    direction = '',
                    timezone = '',
                    lonLat = _toLonLat(xy),
                    timezoneParameters = {
                        key: _options.mapOptions.timezonedbKey,
                        format: 'json',
                        by: 'position',
                        lng: lonLat[0],
                        lat: lonLat[1],
                        fields: 'abbreviation,gmtOffset'
                    },
                    lat = degreesToStringHDMS('NS', lonLat[1]),
                    lng = degreesToStringHDMS('EW', lonLat[0]);

                elevationPromise = $.get('https://elevation-api.io/api/elevation', {
                    points: lonLat[1] + ',' + lonLat[0]
                }).done(function (response) {
                    if (response.elevations) {
                        var elev = response.elevations[0].elevation.toString();
                        if (elev !== '-9999') {
                            elevation = '<p><img src="' + _options.system.dirWsImages + 'elevation_icon.png" alt="' + _t('elevation') + '" title="' + _t('elevation') + '" width="38" height="30"> ' + elev + _t('unitMeter') + '</p>';
                        }
                    }
                }).fail(function () {
                    _trigger('xhr.failed', 'Elevation API');
                });

                timezonePromise = $.get('https://api.timezonedb.com/v2.1/get-time-zone', timezoneParameters).done(function (response) {
                    if (response.status === 'OK') {
                        var offset = response.gmtOffset / 3600;
                        timezone = '<p>' + response.abbreviation + ' (GMT';
                        if (offset > 0) {
                            timezone += '+';
                        }
                        if (offset !== 0) {
                            timezone = timezone + offset;
                        }
                        timezone = timezone + ')</p>';
                    }
                }).fail(function () {
                    _trigger('xhr.failed', 'Timezonedb API');
                });

                reverseGeocoderPromise = $.get('https://nominatim.openstreetmap.org/reverse', {
                    format: 'json',
                    lat: lonLat[1],
                    lon: lonLat[0],
                    'accept-language': _options.context.languageCode
                }).done(function (response) {
                    if (response && !response.error) {
                        var iso = response.address.country_code.toUpperCase();
                        direction =
                            '<img src="' + _options.system.dirWsImages + 'address_icon.png" alt="' + _t('address') + '" title="' + _t('address') + '" width="38" height="30">' +
                            '<p>' + response.display_name +
                            '   <img src="' + _options.system.dirWsImages + 'flags/' + iso + '.png" alt="' + iso + '" width="22" height="15">' +
                            '</p>';
                    }
                }).fail(function () {
                    _trigger('xhr.failed', 'Nominatim API');
                });
                _closeInfowindow();
                $.when(reverseGeocoderPromise, elevationPromise, timezonePromise).always(function () {
                    html =
                        '<div id="popup" class="ol-popup">' +
                        '   <a href="#" id="popup-closer" class="ol-popup-closer"></a>' +
                        '   <div class="popup-content" dir="' + _t('dir') + '">' +
                        '       <h3>' + _t('dragMe') + '</h3>' +
                        '       <div>' + direction +
                        '           <a id="zoom-btn" href="#" title="' + _t('zoom') + '">' + _t('zoom') + '</a>' +
                        '       </div>' +
                        '       <div>' +
                        '           <img src="' + _options.system.dirWsImages + 'gps_icon.png" alt="GPS (WGS84)" title="GPS (WGS84)" width="38" height="30">' +
                        '           <p>' + lat + '<br>' + lng + '</p>' + timezone + elevation +
                        '       </div>' +
                        '   </div>' +
                        '</div>';
                    _$infowindow.innerHTML = html;
                    $('#zoom-btn')
                        .button({icons: {primary: 'ui-icon-zoomin'}, text: false})
                        .click(function () {
                            _flyAndZoom();
                        });
                    $('#popup-closer').click(function (evt) {
                        _closeInfowindow();
                        this.blur();
                        evt.stopPropagation();
                        evt.preventDefault();
                        return false;
                    });
                    _trigger('infowindow.dom_ready');
                    _olOverlay.setPosition(xy);
                });
            }

            function _setMarkerSource(wgs84) {
                if (!_olMarkerVectorSource) {
                    return;
                }
                var xy = _getXY(wgs84);
                if (_olMarkerVectorSource.getFeatures().length) {
                    _updateMarkerPosition(xy);
                } else {
                    _createMarker(xy);
                    _olMap.addInteraction(_olMarkerModifyInteraction);
                }
                if (_olAzimuthsVectorSource.getFeatures().length) {
                    _updateAzimuths(xy);
                } else {
                    _createAzimuths(xy);
                }
                _flyTo(xy);
                _buildInfowindow(xy);
                _setMetrics();
            }

            function _setGeometricPointer(wgs84) {
                if (wgs84.length === 1) { // marker
                    _clearLinestringSource();
                    _setMarkerSource(wgs84[0]);
                } else { // linestring
                    _closeInfowindow();
                    _clearMarkerSource();
                    _clearAzimuthsSource();
                    _setLineStringSource(wgs84);
                }
            }

            function _setGraticule() {
                var _graticule = new GridOverlay(_olMap); // jshint ignore:line
                _graticule.setMap(_olMap);
            }

            function _getFlattenedMap(arr, func) {
                return arr.reduce(function (acc, c) { //Equivalent to flatMap
                    return acc.concat(func(c));
                }, []);
            }

            function _flatten(arr) {
                return _getFlattenedMap(arr, function (c) {
                    return c;
                });
            }

            function _flattenN2(arr) {
                return _flatten(_flatten(arr));
            }

            function _getGeometriesFlattenedCoordinates(geometry) {
                switch (geometry.getType()) {
                    case Type.POINT:
                        //module:ol/coordinate~Coordinate
                        return [geometry.getCoordinates()];
                    case Type.LINE_STRING:
                    case Type.LINEAR_RING:
                    case Type.MULTI_POINT:
                        //Array.<module:ol/coordinate~Coordinate>
                        return geometry.getCoordinates();
                    case Type.POLYGON:
                    case Type.MULTI_LINE_STRING:
                        //Array.<Array.<module:ol/coordinate~Coordinate>>
                        return _flatten(geometry.getCoordinates());
                    case Type.MULTI_POLYGON:
                        //Array.<Array.<Array.<module:ol/coordinate~Coordinate>>>
                        return _flattenN2(geometry.getCoordinates());
                    case Type.GEOMETRY_COLLECTION:
                        //Array.<module:ol/geom/Geometry~Geometry>
                        return _getFlattenedMap(geometry.getGeometries(), function (geometry) {
                            return _getGeometriesFlattenedCoordinates(geometry); //Array.<module:ol/coordinate~Coordinate>
                        });
                    case Type.CIRCLE:
                        //Array.<module:ol/coordinate~Coordinate>
                        return [geometry.getCenter()];
                    default:
                        return [];
                }
            }

            function _getGoogleTileLayer(type) {
                return new TileLayer({
                    title: type.title,
                    type: 'base',
                    visible: false,
                    preload: Infinity,
                    source: new XYZ({
                        attributions: '© Google <a href="https://developers.google.com/maps/terms" target="_blank">Terms of Use.</a>',
                        url: 'http://mt0.google.com/vt/lyrs=' + type.lyrs + '&hl=en&x={x}&y={y}&z={z}&s=Ga'
                    })
                });
            }

            function _restorePreferences() {
                var layers = _getPreferenceCookie('layers');
                if (layers) {
                    var optGroup = layers.opt;
                    if (optGroup) {
                        for (var layer in optGroup) {
                            if (!optGroup.hasOwnProperty(layer)) {
                                continue;
                            }
                            var $checkbox = $(".ol-control.layer-switcher label:contains('" + layer + "')")
                                .closest('li')
                                .children('input[type=checkbox]');
                            if ($checkbox.length && $checkbox[0].checked !== optGroup[layer]) {
                                $checkbox.click();
                            }
                        }
                    }
                    var baseGroup = layers.base;
                    if (baseGroup) {
                        for (var group in baseGroup) {
                            if (!baseGroup.hasOwnProperty(group)) {
                                continue;
                            }
                            var $radio = $(".ol-control.layer-switcher label:contains('" + group + "')")
                                .closest('li')
                                .find("label:contains('" + baseGroup[group] + "')")
                                .closest('li')
                                .children('input[type=radio]');
                            if ($radio.length) {
                                $radio.click();
                            }
                        }
                    }
                }
            }

            function _linestringListener(evt) {
                if (!evt.features) {
                    return;
                }
                var features;
                if ($.isFunction(evt.features.getArray)) {
                    features = evt.features.getArray();
                } else if ($.isArray(evt.features)) {
                    features = evt.features;
                } else {
                    return;
                }
                var xy = _getFlattenedMap(features, function (feature) {
                    return _getGeometriesFlattenedCoordinates(feature.getGeometry());
                });
                _trigger('linestring.edit_end', xy.map(_toLonLat));
                _setLinestringMetrics();
            }

            function _bindEvents() {
                var $body = $('body');
                _olDefaultSource.once('tileloadend', function () {
                    _restorePreferences();
                    _trigger('map.tiles_loaded');
                    $('.ol-control.layer-switcher').on('change', 'input', function (evt) {
                        var $input = $(evt.target);
                        var title = $input.closest('li.group').children('label').text();
                        title += ' ' + $input.closest('li.layer').children('label').text();
                        if ($input.attr('type') === 'checkbox') {
                            title += ' ';
                            title += this.checked ? 'on' : 'off';
                        }
                        _trigger('map.layer.change', title);
                    });
                    _dfd.resolve();
                });
                _olDefaultSource.on('tileloaderror', _dfd.reject);
                _olMap.on('singleclick', function (evt) {
                    var feature = _olMap.forEachFeatureAtPixel(_olMap.getEventPixel(evt.originalEvent), function (feature) {
                        return feature;
                    });
                    if (feature) {
                        _buildInfowindow(feature.getGeometry().getCoordinates());
                    } else {
                        _closeInfowindow();
                        _trigger('map.click', _toLonLat(evt.coordinate));
                    }
                });
                _olGeocoder.on('addresschosen', function (evt) {
                    _trigger('place.changed', _toLonLat(evt.coordinate));
                });
                _olMarkerModifyInteraction.on('modifystart', function () {
                    _closeInfowindow();
                    _clearAzimuthsSource();
                    _trigger('marker.drag_start');
                });
                _olMarkerModifyInteraction.on('modifyend', function (evt) {
                    var feature = evt.features.getArray()[0];
                    _trigger('marker.drag_end', _toLonLat(feature.getGeometry().getCoordinates()));
                });
                _olLinestringModifyInteraction.on('modifyend', _linestringListener);
                _olDragAndDropInteraction.on('addfeatures', _linestringListener);
                _olMap.getViewport().addEventListener('contextmenu', function (evt) {
                    var feature = _olMap.forEachFeatureAtPixel(_olMap.getEventPixel(evt), function (feature) {
                        return feature;
                    });
                    if (feature) {
                        _trigger('linestring.remove_vertice', _toLonLat(feature.getGeometry().getCoordinates()));
                    } else {
                        _trigger('linestring.add_vertice', _toLonLat(_olMap.getEventCoordinate(evt)));
                    }
                    _setLinestringMetrics();
                    evt.stopPropagation();
                    evt.preventDefault();
                });
                $body.on('converter.source.selection_changed converterset.done', function (event, response) {
                    //TODO clement ad some way to control when it's displayed or not
                    /*register(proj4);
                    _olMap.removeControl(_olGraticule);
                    _olGraticule = _getGraticule({
                        projection: response.srsCode ? response.srsCode : response.selections.source,
                        formatCoordX: function (c) {
                            return (c / 1000).toFixed(0) + 'km'; //TODO clement depends on selection
                        },
                        formatCoordY: function (c) {
                            return (c / 1000).toFixed(1) + 'km';
                        }
                    });
                    _olMap.addControl(_olGraticule);*/
                });
                $body.on('converterset.wgs84_changed', function (event, response) {
                    var convergence = _options.utils.degToRad(response.convergenceInDegrees);
                    var mult = _options.utils.getConvergenceConvention() ? -1 : 1;
                    response.wgs84 = _removeErrors(response.wgs84);
                    _measurements.setAngleInDegrees('magneticDeclination', response.magneticDeclinationInDegrees);
                    _measurements.setAngleInRadians('srcConvergence', mult * convergence.source);
                    _measurements.setAngleInRadians('dstConvergence', mult * convergence.destination);
                    _setGeometricPointer(response.wgs84);
                    _trigger('converter.changed', response);
                });
                $body.on('converterset.convergence_changed', function (event, response) {
                    if (_olAzimuthsVectorSource.getFeatures().length) {
                        var convergence = _options.utils.degToRad(response.convergenceInDegrees);
                        var mult = _options.utils.getConvergenceConvention() ? -1 : 1;
                        _measurements.setAngleInRadians('srcConvergence', mult * convergence.source);
                        _measurements.setAngleInRadians('dstConvergence', mult * convergence.destination);
                        _updateAzimuths();
                    }
                });
                $body.on('ui.full_screen', function () {
                    $('.ol-full-screen button').trigger('click');
                });
                var units = new Ring_('degrees', 'imperial', 'nautical', 'metric', 'us');
                $('.ol-scale-line').click(function () {
                    _olScaleLineControl.setUnits(units.get());
                });
            }

            var _OnMapAds = (function (Control) {
                function OnMapAds(opt_options) {
                    var options = opt_options || {};
                    var $panel = $('#c-ads-1')[0];
                    Control.call(this, {
                        element: $panel,
                        target: options.target
                    });
                }

                if ( Control ) OnMapAds.__proto__ = Control;
                OnMapAds.prototype = Object.create( Control && Control.prototype );
                OnMapAds.prototype.constructor = OnMapAds;

                return OnMapAds;
            }(Control));

            function _initMap() {
                _dfd = _newDeferred('Map');
                //TODO clement find a way to get the max zoom for a layer and location
                //TODO clement check example of permalink
                //TODO clement turn on/off the graticule from the Options drawer or the ol-layerswitcher
                //TODO clement add extent to srs db for graticules

                register(proj4);

                var modifyStyle = new Style({
                    image: new CircleStyle({
                        radius: 6,
                        fill: null,
                        stroke: new Stroke({color: 'rgba(0,0,0,0.6)', width: 3})
                    })
                });
                _$infowindow = $('<div>')[0];
                _olScaleLineControl = new ScaleLine();
                _olAzimuthsVectorSource = new VectorSource();
                _olMarkerVectorSource = new VectorSource();
                _olLinestringVectorSource = new VectorSource();
                _olMarkerModifyInteraction = new Modify({
                    source: _olMarkerVectorSource,
                    style: modifyStyle,
                    pixelTolerance: 30
                });
                _olLinestringModifyInteraction = new Modify({
                    source: _olLinestringVectorSource,
                    style: modifyStyle
                });
                _olDragAndDropInteraction = new DragAndDrop({
                    formatConstructors: [
                        GPX,
                        GeoJSON,
                        IGC,
                        KML,
                        TopoJSON
                    ]
                });
                _olDefaultSource = new XYZ({
                    attributions: 'Tiles © <a target="_blank" href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
                    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
                });
                _olView = new View({
                    zoom: _options.mapOptions.zoom
                });
                _olGeocoder = new Geocoder('nominatim', {
                    provider: 'osm',
                    autoComplete: true,
                    autoCompleteMinLength: 2,
                    placeholder: _t('searchByAddress'),
                    targetType: 'glass-button',
                    lang: _options.context.languageCode,
                    limit: 5,
                    keepOpen: false,
                    preventDefault: true,
                    debug: false
                });
                _olOverlay = new Overlay({
                    element: _$infowindow,
                    autoPan: true,
                    autoPanAnimation: {duration: 200}
                });

                var center = _fromLonLat(_options.mapOptions.center);
                _olView.setCenter(center); //_fromLonLat needs _olView to be init. first
                _olMap = new Map({
                    controls: defaultControls().extend([
                        new FullScreen({
                            source: 'map-container'
                        }),
                        new LayerSwitcher(),
                        _olGeocoder,
                        _olScaleLineControl,
                        //new _OnMapAds()
                    ]),
                    interactions: defaultInteractions().extend([
                        new DragRotateAndZoom(),
                        _olDragAndDropInteraction
                    ]),
                    target: _options.mapContainerElt,
                    loadTilesWhileAnimating: true,
                    overlays: [_olOverlay],
                    layers: [
                        new LayerGroup({
                            title: 'Maps',
                            layers: [
                                new LayerGroup({
                                    title: 'ArcGIS',
                                    layers: [
                                        new TileLayer({
                                            title: 'Satellite',
                                            type: 'base',
                                            visible: false,
                                            preload: Infinity,
                                            source: new XYZ({
                                                attributions: 'Tiles © <a target="_blank" href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer">ArcGIS</a>',
                                                url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.jpg'
                                            })
                                        }),
                                        new TileLayer({
                                            title: 'Terrain',
                                            type: 'base',
                                            preload: Infinity,
                                            source: _olDefaultSource
                                        })
                                    ]
                                }),
                                new LayerGroup({
                                    title: 'OSM',
                                    layers: [
                                        new TileLayer({
                                            title: 'Stamen toner',
                                            type: 'base',
                                            visible: false,
                                            preload: Infinity,
                                            source: new Stamen({
                                                layer: 'toner'
                                            })
                                        }),
                                        new TileLayer({
                                            title: 'Stamen terrain',
                                            type: 'base',
                                            visible: false,
                                            preload: Infinity,
                                            source: new Stamen({
                                                layer: 'terrain'
                                            })
                                        }),
                                        new TileLayer({
                                            title: 'Open Street Map',
                                            type: 'base',
                                            visible: false,
                                            preload: Infinity,
                                            source: new OSM()
                                        })
                                    ]
                                }),
                                new LayerGroup({
                                    title: 'Google',
                                    layers: [
                                        _getGoogleTileLayer(GOOGLE.HYBRID),
                                        _getGoogleTileLayer(GOOGLE.SATELLITE),
                                        _getGoogleTileLayer(GOOGLE.TERRAIN),
                                        _getGoogleTileLayer(GOOGLE.ROAD)
                                    ]
                                })
                            ]
                        }),
                        new LayerGroup({
                            title: 'Features',
                            layers: [
                                new VectorLayer({
                                    title: 'Azimuths',
                                    style: function (feature) {
                                        return feature.get('style');
                                    },
                                    source: _olAzimuthsVectorSource
                                })
                            ]
                        }),
                        new VectorLayer({
                            style: function (feature) {
                                return feature.get('style');
                            },
                            source: _olMarkerVectorSource
                        }),
                        new VectorLayer({
                            style: _linestringStyleFunction,
                            source: _olLinestringVectorSource
                        })
                    ],
                    view: _olView
                });

                /*
                Default graticule based on map's SRS

                var graticule = new Graticule({
                    map: _olMap,
                    strokeStyle: new Stroke({
                        color: 'rgba(255,120,0,0.9)',
                        width: 2,
                        lineDash: [0.5, 4]
                    }),
                    showLabels: true
                });*/

                _bindEvents();
            }

            _initMap();
            return {
                promise: _dfd.promise(),
                setGraticule: _setGraticule,
                model: {
                    setAngleInRadians: _measurements.setAngleInRadians,
                    setAngleInDegrees: _measurements.setAngleInDegrees,
                    getMetrics: _measurements.getMetrics,
                    setBoolean: _measurements.setBoolean
                },
                getMap: function () {
                    return _olMap;
                },
                olVersion: VERSION
            };
        };

        // exports
        window.TWCCMap = {
            getInstance: function (opts) {
                instance = instance || init(opts);
                return instance;
            }
        };
    }
)(jQuery, proj4);