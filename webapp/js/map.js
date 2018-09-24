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

import {Map, View, Feature, Overlay} from 'ol';
import {register} from 'ol/proj/proj4.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {OSM, XYZ, Stamen} from 'ol/source';
import VectorSource from 'ol/source/Vector';
import {Point, LineString, Polygon} from 'ol/geom';
import {Icon, Style, Stroke, Fill, Text, Circle as CircleStyle} from 'ol/style.js';
import {defaults as defaultControls, FullScreen} from 'ol/control.js';
import {defaults as defaultInteractions, DragRotateAndZoom, Modify} from 'ol/interaction.js';
import {fromLonLat, toLonLat} from 'ol/proj.js';
import {degreesToStringHDMS} from 'ol/coordinate.js'
import Geocoder from 'ol-geocoder';
import LayerGroup from 'ol/layer/Group';
import {getLength, getArea} from 'ol/sphere';
import LayerSwitcher from 'ol-layerswitcher';
import Graticule from 'ol-ext/control/Graticule';

(function ($) {
        "use strict";
        /*global document, window, jQuery, console, Math */

        if (window.TWCCMap !== undefined) {
            return;
        }

        var instance;
        var init = function (opts) {
            var _measurements, _olMap, _geocoderService, _elevationService, _olView, _olDefaultSource, _olMarkerModify,
                _olLinestringModify, _olAzimuthsVectorSource, _olLinestringVectorSource, _olMarkerVectorSource,
                _olGeocoder, _olGraticule, _$infowindow, _polyline, _olOverlay,
                _dfd = null,
                _options = {
                    mapOptions: {
                        zoom: 2,
                        center: [0, 0],
                        azimuthOpacity: 0.7,
                        mapTypeControl: true,
                        mapTypeControlOptions: {
                            mapTypeIds: [
                                /*google.maps.MapTypeId.ROADMAP,
                                google.maps.MapTypeId.SATELLITE,
                                google.maps.MapTypeId.HYBRID,
                                google.maps.MapTypeId.TERRAIN*/
                            ],
                            //position: google.maps.ControlPosition.LEFT_TOP,
                            //style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
                        },
                        zoomControl: true,
                        zoomControlOptions: {
                            //position: google.maps.ControlPosition.LEFT_TOP,
                            //style: google.maps.NavigationControlStyle.SMALL
                        },
                        panControl: true,
                        panControlOptions: {
                            //position: google.maps.ControlPosition.LEFT_TOP
                        },
                        rotateControl: true,
                        scaleControl: true,
                        scaleControlOptions: {
                            //position: google.maps.ControlPosition.BOTTOM_RIGHT
                        }
                    },
                    mapContainerElt: $('#map')[0],
                    infowindowAdsSelector: null,
                    controls: {},
                    context: {
                        languageCode: 'en',
                        isDevEnv: false
                    },
                    timeout: 10000
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

            function _t() {
                return _options.utils.t.apply(this, arguments);
            }

            function _newDeferred() {
                return _options.utils.newDeferred.apply(this, arguments);
            }

            function _trigger(eventName, data) {
                _options.utils.trigger($(_options.mapContainerElt), eventName, data);
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

            function _createControl(obj) {
                var controlDiv,
                    opts = {
                        fkidx: 1,
                        css: {
                            width: '',
                            height: '',
                            backgroundColor: 'transparent'
                        }
                    };
                $.extend(opts, obj || {});
                controlDiv = $('<div>')
                    .css(opts.css || {})
                    .prop('index', opts.fkidx)
                    .addClass(opts['class']);
                if (opts.content !== undefined) {
                    controlDiv.append(opts.content);
                }
                return controlDiv[0];
            }

            function _getNormalizedCoordinates(coord, zoom) {
                var y = coord.y,
                    x = coord.x,
                    tileRange = 1 << zoom;
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

            function _getMapType(WMSProviderData) {
                var mapType,
                    replacer = function (match, p1) {
                        return eval(p1);
                    },
                    options = {
                        getTileUrl: function (coord, zoom) {
                            var url,
                                normalizedCoord = _getNormalizedCoordinates(coord, zoom);
                            if (!normalizedCoord) {
                                return null;
                            }
                            url = WMSProviderData.url
                                .replace(/\{z\}/ig, zoom)
                                .replace(/\{x\}/ig, normalizedCoord.x)
                                .replace(/\{y\}/ig, normalizedCoord.y)
                                .replace(/\[([^\]]+)\]/ig, replacer);
                            return url;
                        },
                        tileSize: _newGSize(256, 256),
                        isPng: WMSProviderData.isPng || false,
                        maxZoom: WMSProviderData.zoom.max,
                        minZoom: WMSProviderData.zoom.min || 0,
                        alt: WMSProviderData.alternativeText,
                        name: WMSProviderData.name
                    };
                if (WMSProviderData.options) {
                    $.extend(options, WMSProviderData.options);
                }
                mapType = new google.maps.ImageMapType(options);
                return mapType;
            }

            function _setPolylineGetBounds() {
                google.maps.Polyline.prototype.getBounds = function () {
                    var bounds = new google.maps.LatLngBounds();
                    this.getPath().forEach(function (e) {
                        bounds.extend(e);
                    });
                    return bounds;
                };
            }

            function _getStreetViewCloseBtn(panorama) {
                var $closeBtn = $('<div style="z-index: 1; margin: 3px; position: absolute; right: 0px; top: 70px;"><div title="' + _t('close') + '" style="position: absolute; left: 0px; top: 0px; z-index: 2;"><div style="width: 16px; height: 16px; overflow: hidden; position: absolute; left: 0px; top: 0px;"><img src="https://maps.gstatic.com/mapfiles/api-3/images/cb_scout2.png" draggable="false" style="position: absolute; left: -490px; top: -102px; width: 1028px; height: 214px; -webkit-user-select: none; border: 0px; padding: 0px; margin: 0px;" alt="X"><\/div><div style="width: 16px; height: 16px; overflow: hidden; position: absolute; left: 0px; top: 0px; display: none;"><img src="https://maps.gstatic.com/mapfiles/api-3/images/cb_scout2.png" draggable="false" style="position: absolute; left: -539px; top: -102px; width: 1028px; height: 214px; -webkit-user-select: none; border: 0px; padding: 0px; margin: 0px;" alt="X"><\/div><\/div><div style="z-index: 1; font-size: 1px; background-color: rgb(187, 187, 187); width: 16px; height: 16px;"><\/div><\/div>');
                $closeBtn.on("click", function (event) {
                    event.preventDefault();
                    panorama.setVisible(false);
                });
                return $closeBtn;
            }

            function _getGooglePromise(googleAsyncFunction, args, OK) {
                return $.Deferred(function (dfrd) {
                    googleAsyncFunction(args, function (results, status) {
                        if (status === OK || (results && results.status === OK)) {
                            dfrd.resolve(results[0] || results);
                        } else {
                            dfrd.reject(new Error(status));
                        }
                    });
                }).promise();
            }

            function _getGeocoderPromise(obj) {
                return _getGooglePromise(_geocoderService.geocode, obj, google.maps.GeocoderStatus.OK);
            }

            function _getElevationPromise(obj) {
                return _getGooglePromise(_elevationService.getElevationForLocations, obj, google.maps.ElevationStatus.OK);
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

            function _addListeners() {
                var $body = $('body');
                _olDefaultSource.on('tileloadend', _dfd.resolve);
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
                _olMarkerModify.on('modifystart', function () {
                    _closeInfowindow();
                    _clearAzimuthsSource();
                    _trigger('marker.dragstart');
                });
                _olMarkerModify.on('modifyend', function (evt) {
                    var feature = evt.features.getArray()[0];
                    _trigger('marker.dragend', _toLonLat(feature.getGeometry().getCoordinates()));
                });
                _olLinestringModify.on('modifyend', function (evt) {
                    var feature = evt.features.getArray()[0];
                    _trigger('linestring.editend', feature.getGeometry().getCoordinates().map(_toLonLat));
                    _setLinestringMetrics();
                });
                _olMap.getViewport().addEventListener('contextmenu', function (evt) {
                    var feature = _olMap.forEachFeatureAtPixel(_olMap.getEventPixel(evt), function (feature) {
                        return feature;
                    });
                    if (feature) {
                        _trigger('linestring.removevertice', _toLonLat(feature.getGeometry().getCoordinates()));
                    } else {
                        _trigger('linestring.addvertice', _toLonLat(_olMap.getEventCoordinate(evt)));
                    }
                    _setLinestringMetrics();
                    evt.stopPropagation();
                    evt.preventDefault();
                });
                $body.on('converter.source.selection_changed converterset.done', function (event, response) {
                    return; //TODO clement ad some way to control when it's displayed or not
                    register(proj4);
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
                    _olMap.addControl(_olGraticule);
                });
                $body.on('converterset.wgs84_changed', function (event, response) {
                    var convergence = _options.utils.degToRad(response.convergenceInDegrees);
                    response.wgs84 = _removeErrors(response.wgs84);
                    _measurements.setAngleInDegrees('magneticDeclination', response.magneticDeclinationInDegrees);
                    _measurements.setAngleInRadians('srcConvergence', convergence.source);
                    _measurements.setAngleInRadians('dstConvergence', convergence.destination);
                    _setGeometricPointer(response.wgs84);
                    _trigger('converter.changed', response);
                });
                $body.on('converterset.convergence_changed', function (event, response) {
                    if (_olAzimuthsVectorSource.getFeatures().length) {
                        var convergence = _options.utils.degToRad(response.convergenceInDegrees);
                        _measurements.setAngleInRadians('srcConvergence', convergence.source);
                        _measurements.setAngleInRadians('dstConvergence', convergence.destination);
                        _updateAzimuths();
                    }
                });
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

            function _initMap() {
                _dfd = _newDeferred('Map');
                //TODO clement check example of permalink
                //TODO clement ad scale line
                //TODO clement fix or remove full-screen btn from the Options drawer
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

                _olAzimuthsVectorSource = new VectorSource();
                _olMarkerVectorSource = new VectorSource();
                _olLinestringVectorSource = new VectorSource();
                _olMarkerModify = new Modify({
                    source: _olMarkerVectorSource,
                    style: modifyStyle,
                    pixelTolerance: 55 //TODO clement
                });
                _olLinestringModify = new Modify({
                    source: _olLinestringVectorSource,
                    style: modifyStyle
                });
                _olDefaultSource = new XYZ({
                    attributions: 'Tiles © <a target="_blank" href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
                    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
                });
                _olView = new View({
                    zoom: _options.mapOptions.zoom
                });
                _olGeocoder = new Geocoder('nominatim', {
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
                        _olGeocoder
                    ]),
                    interactions: defaultInteractions().extend([
                        new DragRotateAndZoom()
                    ]),
                    target: _options.mapContainerElt,
                    loadTilesWhileAnimating: true,
                    overlays: [_olOverlay],
                    layers: [
                        new LayerGroup({
                            title: 'Maps',
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
                                    title: 'ArcGIS satellite',
                                    type: 'base',
                                    visible: false,
                                    preload: Infinity,
                                    source: new XYZ({
                                        attributions: 'Tiles © <a target="_blank" href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer">ArcGIS</a>',
                                        url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}.jpg'
                                    })
                                }),
                                new TileLayer({
                                    title: 'Open Street Map',
                                    type: 'base',
                                    visible: false,
                                    preload: Infinity,
                                    source: new OSM()
                                }),
                                new TileLayer({
                                    title: 'ArcGIS terrain',
                                    type: 'base',
                                    preload: Infinity,
                                    source: _olDefaultSource
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

                /*
                _elevationService = new google.maps.ElevationService();
                _maxZoomService = new google.maps.MaxZoomService();
                _$infowindow = new google.maps.InfoWindow({content: _t('dragMe')});
                */
                _addListeners();
            }

            function _getSvgSource(xmlStr) {
                return 'data:image/svg+xml,' + escape('<?xml version="1.0" encoding="UTF-8" standalone="no"?>' + xmlStr);
            }

            function _createAzimuths(xy) {
                var gnArrowSrc = _getSvgSource('<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="16" height="97" viewBox="0 0 16 97" enable-background="new 0 0 512 512" xml:space="preserve"><path style="stroke:#fff;stroke-width:2;" d="M 8,12.943205 8,96.999397"/><rect style="fill:#fff;stroke:#fff;stroke-width:1;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;" width="8.779562" height="8.2131386" x="3.610219" y="4.5313869"/></svg>');
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
                    if (!norths.hasOwnProperty(name)) continue;
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

            function _clearAzimuthsSource() {
                _olAzimuthsVectorSource.clear();
            }

            function _newGPoint(x, y) {
                return new google.maps.Point(x, y);
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
                /*
                google.maps.event.addListener(_marker, 'click', function() {
                    _closeInfowindow();
                    _$infowindow.open(_map, _marker);
                });
                */

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
                _olMap.removeInteraction(_olMarkerModify);
            }

            function _clearLinestringSource() {
                _olLinestringVectorSource.clear();
                _olMap.removeInteraction(_olLinestringModify);
            }

            function _setAutoZoom() {
                if (_measurements.getBoolean('autoZoom') === true) {
                    var bounds = _polyline.getBounds();
                    if (bounds) {
                        _olMap.fitBounds(bounds);
                        _olMap.setZoom(_olMap.getZoom() - 1);
                    }
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
                    })
                    .fail(function () {
                        alert("Error in MaxZoomService");
                    });
            }

            function _setMetrics(length, area) {
                _measurements.setMetrics('length', length);
                _measurements.setMetrics('area', area);
                _trigger('map.metricschanged', {
                    length: length,
                    area: area
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
                    _olMap.addInteraction(_olLinestringModify);
                }
                _setLinestringMetrics();
                /*
                _setAutoZoom();
                */
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
                    _olMap.addInteraction(_olMarkerModify);
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
                    _clearMarkerSource();
                    _clearAzimuthsSource();
                    _setLineStringSource(wgs84);
                }
            }

            function _setGraticule() {
                var _graticule = new GridOverlay(_olMap);
                _graticule.setMap(_olMap);
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
                });

                timezonePromise = $.get('http://api.timezonedb.com/v2.1/get-time-zone', timezoneParameters).done(function (response) {
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
                });

                reverseGeocoderPromise = $.get('http://nominatim.openstreetmap.org/reverse', {
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
                });
                _closeInfowindow();
                $.when(reverseGeocoderPromise, elevationPromise, timezonePromise).always(function () {
                    html =
                        '<div id="popup" class="ol-popup">' +
                        '   <a href="#" id="popup-closer" class="ol-popup-closer"></a>' +
                        '   <div class="popup-content">' +
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

            _initMap();
            return {
                promise: _dfd.promise(),
                createControl: _createControl,
                setGraticule: _setGraticule,
                model: {
                    setAngleInRadians: _measurements.setAngleInRadians,
                    setAngleInDegrees: _measurements.setAngleInDegrees,
                    getMetrics: _measurements.getMetrics,
                    setBoolean: _measurements.setBoolean
                },
                getMap: function () {
                    return _olMap;
                }
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
)(jQuery);