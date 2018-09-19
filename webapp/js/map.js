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

import {Map, View, Feature, Graticule} from 'ol';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector.js';
import {Point, LineString} from 'ol/geom';
import {Icon, Style, Stroke, Fill, Text} from 'ol/style.js';
import {defaults as defaultControls, FullScreen} from 'ol/control.js';
import {defaults as defaultInteractions, DragRotateAndZoom, Modify} from 'ol/interaction.js';
import {fromLonLat, toLonLat} from 'ol/proj.js';
import Geocoder from 'ol-geocoder';

(function($) {
    "use strict";
    /*global document, window, jQuery, console, Math */

    if (window.TWCCMap !== undefined) {
        return;
    }

    var instance,
    init = function(opts) {
        var _model, _olMap, _geocoderService, _elevationService, _olView, _olOsmSource, _olModify, _olAzimutsVectorSource, _olMarkerVectorSource, _olGeocoder, _infowindow, _polyline, _maxZoomService, _tmpOverlay,
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
                locationSelector: null,
                infowindowAdsSelector: null,
                controls: {},
                context: {
                    languageCode: 'en',
                    isDevEnv: false
                },
                timeout: 10000
            };

        $.extend(true, _options, opts);

        _model = {
            anglesInRadians: {},
            booleans: {autoZoom:true},
            metrics: {},
            setAngleInRadians: function(key, angleInRadians) {
                _model.anglesInRadians[key] = angleInRadians;
            },
            setAngleInDegrees: function(key, angleInDegrees) {
                _model.setAngleInRadians(key, _options.utils.degToRad(angleInDegrees));
            },
            getAngleInRadians: function (key) {
                return _model.anglesInRadians[key];
            },
            setBoolean: function(key, bool) {
                _model.booleans[key] = !!bool;
            },
            getBoolean: function(key) {
                return _model.booleans[key];
            },
            setMetrics: function(key, value) {
                _model.metrics[key] = value;
            },
            getMetrics: function(key) {
                return _model.metrics[key];
            }
        };

        function _t() {
            return _options.utils.t.apply(this, arguments);
        }

        function _newDeferred() {
            return _options.utils.newDeferred.apply(this, arguments);
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

        function _getGeocoderService() {
            return _geocoderService;
        }

        function _createControl(obj) {
            var controlDiv,
                opts = {
                    fkidx:1,
                    css:{
                        width: '',
                        height: '',
                        backgroundColor: 'transparent'
                    }
                };
            $.extend(opts, obj||{});
            controlDiv = $('<div>')
                .css(opts.css||{})
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
                replacer = function(match, p1) {
                    return eval(p1);
                },
                options = {
                    getTileUrl: function(coord, zoom) {
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
                    isPng: WMSProviderData.isPng||false,
                    maxZoom: WMSProviderData.zoom.max,
                    minZoom: WMSProviderData.zoom.min||0,
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
            google.maps.Polyline.prototype.getBounds = function() {
                var bounds = new google.maps.LatLngBounds();
                this.getPath().forEach(function(e) {
                    bounds.extend(e);
                });
                return bounds;
            };
        }

        function _setCanvasProjectionOverlayClass() {
            function CanvasProjectionOverlay() {}
            CanvasProjectionOverlay.prototype = new google.maps.OverlayView();
            $.extend(CanvasProjectionOverlay.prototype, {
                constructor: CanvasProjectionOverlay,
                onAdd: function(){},
                draw: function(){},
                onRemove: function(){}
            });
            _tmpOverlay = new CanvasProjectionOverlay();
            _tmpOverlay.setMap(_olMap);
        }

        function _getStreetViewCloseBtn(panorama) {
            var closeBtn = $('<div style="z-index: 1; margin: 3px; position: absolute; right: 0px; top: 70px;"><div title="' + _t('close') + '" style="position: absolute; left: 0px; top: 0px; z-index: 2;"><div style="width: 16px; height: 16px; overflow: hidden; position: absolute; left: 0px; top: 0px;"><img src="https://maps.gstatic.com/mapfiles/api-3/images/cb_scout2.png" draggable="false" style="position: absolute; left: -490px; top: -102px; width: 1028px; height: 214px; -webkit-user-select: none; border: 0px; padding: 0px; margin: 0px;" alt="X"><\/div><div style="width: 16px; height: 16px; overflow: hidden; position: absolute; left: 0px; top: 0px; display: none;"><img src="https://maps.gstatic.com/mapfiles/api-3/images/cb_scout2.png" draggable="false" style="position: absolute; left: -539px; top: -102px; width: 1028px; height: 214px; -webkit-user-select: none; border: 0px; padding: 0px; margin: 0px;" alt="X"><\/div><\/div><div style="z-index: 1; font-size: 1px; background-color: rgb(187, 187, 187); width: 16px; height: 16px;"><\/div><\/div>');
            closeBtn.bind("click", function(event) {
                event.preventDefault();
                panorama.setVisible(false);
            });
            return closeBtn;
        }

        function _getGooglePromise(googleAsyncFunction, args, OK) {
            return $.Deferred(function(dfrd) {
                googleAsyncFunction(args, function(results, status) {
                    if(status === OK || (results && results.status === OK)) {
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

        function _getMaxZoomPromise(obj) {
            return _getGooglePromise(_maxZoomService.getMaxZoomAtLatLng, obj, google.maps.MaxZoomStatus.OK);
        }

        function _addListeners() {
            var $body = $('body');
            /*if (_options.locationSelector) {
                var autocompleteService = new google.maps.places.Autocomplete($(_options.locationSelector)[0], {bounds: _map.getBounds()});
                google.maps.event.addListener(autocompleteService, 'place_changed', function() {
                    var place = autocompleteService.getPlace();
                    _trigger('place.changed', place);
                });
                google.maps.event.addListener(_map, 'bounds_changed', function() {
                    autocompleteService.setBounds(_map.getBounds());
                });
                google.maps.event.addListenerOnce(_map, 'tilesloaded', function() {
                    $('.pac-container')
                        .css('left', ($(_options.locationSelector).offset().left).toString() + 'px')
                        .css('top', ($(_options.locationSelector).offset().top + 20).toString() + 'px');
                    _trigger('map.tilesloaded');
                });
            }
            google.maps.event.addListener(_map, 'click', function(event) {
                _infowindow.close();
                _trigger('map.click', event);
            });
            google.maps.event.addListener(_map, 'rightclick', function(event) {
                _trigger('map.rightclick', event);
            });
            google.maps.event.addListener(_map, 'zoom_changed', function() {
                if (_olMarkerVectorSource.getFeatures().length) {
                    setTimeout(function() {_createAzimuths(_marker.getPosition());}, 100);
                }
            });
            google.maps.event.addListener(_infowindow, 'domready', function() {
                $('#zoom-btn').button({ icons: {primary: 'ui-icon-zoomin'}, text: false });
                _trigger('infowindow.dom_ready');
            });
            google.maps.event.addListenerOnce(_map, 'idle', function(){
                setTimeout(function() {_dfd.resolve();}, 1000);
            });
            $body.on('click', '#zoom-btn', function() {
                _doZoom();
            });*/
            _olGeocoder.on('addresschosen', function (evt) {
                _trigger('place.changed', _toLonLat(evt.coordinate));
            });
            _olOsmSource.on('tileloadend', _dfd.resolve);
            _olOsmSource.on('tileloaderror', _dfd.reject);
            _olModify.on('modifystart', function () {
                _clearAzimuths();
                _trigger('marker.dragstart');
            });
            _olModify.on('modifyend', function (evt) {
                var feature = evt.features.getArray()[0];
                _trigger('marker.dragend', _toLonLat(feature.getGeometry().getCoordinates()));
            });
            $body.bind('converterset.wgs84_changed', function(event, response) {
                var convergence = _options.utils.degToRad(response.convergenceInDegrees);
                response.wgs84 = _removeErrors(response.wgs84);
                _model.setAngleInDegrees('magneticDeclination', response.magneticDeclinationInDegrees);
                _model.setAngleInRadians('srcConvergence', convergence.source);
                _model.setAngleInRadians('dstConvergence', convergence.destination);
                _setGeometricPointer(response.wgs84);
                _trigger('converter.changed', response);
            });
            $body.bind('converterset.convergence_changed', function(event, response) {
                if (_olAzimutsVectorSource.getFeatures().length) {
                    var convergence = _options.utils.degToRad(response.convergenceInDegrees);
                    _model.setAngleInRadians('srcConvergence', convergence.source);
                    _model.setAngleInRadians('dstConvergence', convergence.destination);
                    _updateAzimuths();
                }
            });
        }

        function _initMap() {
            _dfd = _newDeferred('Map');
            //TODO clement use //flyTo when changing coordinates
            //TODO clement adds graticule in the future
            //TODO clement check example of permalink
            //TODO clement ad scale line
            //TODO clement fix or remove full-screen btn from the Options drawer
            //TODO clement turn on/off the graticule from the Options drawer

            _olMarkerVectorSource = new VectorSource();
            _olAzimutsVectorSource = new VectorSource();
            _olModify = new Modify({
                source: _olMarkerVectorSource,
                pixelTolerance: 55 //TODO clement
            });
            _olOsmSource = new OSM();
            _olView = new View({
                //projection: 'EPSG:4326',
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

            var center = _fromLonLat(_options.mapOptions.center);
            _olView.setCenter(center); //_fromLonLat needs _olView to be init. first
            _olMap = new Map({
                controls: defaultControls().extend([
                    new FullScreen({
                        source: 'map-container'
                    }),
                    _olGeocoder
                ]),
                interactions: defaultInteractions().extend([
                    new DragRotateAndZoom(),
                    _olModify
                ]),
                target: _options.mapContainerElt,
                loadTilesWhileAnimating: true,
                layers: [
                    new TileLayer({
                        source: _olOsmSource
                    }),
                    new VectorLayer({
                        style: function (feature) {
                            return feature.get('style');
                        },
                        source: _olAzimutsVectorSource
                    }),
                    new VectorLayer({
                        style: function (feature) {
                            return feature.get('style');
                        },
                        source: _olMarkerVectorSource
                    })
                ],
                view: _olView
            });

            var graticule = new Graticule({
                map: _olMap,
                strokeStyle: new Stroke({
                    color: 'rgba(255,120,0,0.9)',
                    width: 2,
                    lineDash: [0.5, 4]
                }),
                showLabels: true
            });

            /*var panoramaOptions = {
                    addressControlOptions: {position: google.maps.ControlPosition.BOTTOM_CENTER},
                    panControlOptions: {position: google.maps.ControlPosition.LEFT_CENTER},
                    zoomControlOptions: {position: google.maps.ControlPosition.LEFT_CENTER},
                    visible: false
                },
                panorama = new google.maps.StreetViewPanorama(_options.mapContainerElt, panoramaOptions);
            _map = new google.maps.Map(_options.mapContainerElt);
            _options.mapOptions.streetView = panorama;
            $.each(_options.wmsProviders, function(key, WMSProviderData){
                if (WMSProviderData.isEnabled) {
                    _options.mapOptions.mapTypeControlOptions.mapTypeIds.push(WMSProviderData.code);
                    _map.mapTypes.set(WMSProviderData.code, _getMapType(WMSProviderData));
                }
            });
            if ($.inArray(_options.mapOptions.mapTypeId, _options.mapOptions.mapTypeControlOptions.mapTypeIds) < 0) {
                _options.mapOptions.mapTypeId = google.maps.MapTypeId.TERRAIN;
            }
            _map.setOptions(_options.mapOptions);
            _setPolylineGetBounds();
            _geocoderService = new google.maps.Geocoder();
            _elevationService = new google.maps.ElevationService();
            _maxZoomService = new google.maps.MaxZoomService();
            _infowindow = new google.maps.InfoWindow({content: _t('dragMe')});
            _setCanvasProjectionOverlayClass();
            panorama.controls[google.maps.ControlPosition.RIGHT_TOP].push(_createControl({
                fkidx:2,
                content:_getStreetViewCloseBtn(panorama)
            }));*/
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
                    rotation: _model.getAngleInRadians('magneticDeclination')
                },
                srcConvergence: {
                    src: gnArrowSrc,
                    color: '#f00',
                    rotation: _model.getAngleInRadians('srcConvergence')
                },
                dstConvergence: {
                    src: gnArrowSrc,
                    rotation: _model.getAngleInRadians('dstConvergence')
                }
            };
            for (var name in norths) {
                if (!norths.hasOwnProperty(name)) continue;
                var north = norths[name];
                _olAzimutsVectorSource.addFeature(new Feature({
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
            _olAzimutsVectorSource.getFeatures().forEach(function (feature) {
                //Even if xy has not changed, we need to force the re-rendering so the rotation is taken into account
                feature.getGeometry().setCoordinates(xy || feature.getGeometry().getCoordinates());
                var name = feature.get('name');
                var rotation = _model.getAngleInRadians(name) || 0;
                var opacity = name !== 'true' && !rotation ? 0 : _options.mapOptions.azimuthOpacity;
                var image = feature.get('style').getImage();
                image.setRotation(rotation);
                image.setOpacity(opacity);
            });
        }

        function _clearAzimuths() {
            _olAzimutsVectorSource.clear();
        }

        function _newGPoint(x, y) {
            return new google.maps.Point(x, y);
        }

        function _removeErrors(wgs84Array) {
            var newWgs84Array = [];
            $.each(wgs84Array, function() {
                if (this.lat === undefined && this.x === undefined || this.error) {
                    return true;
                } //INPUT ERROR => continue
                newWgs84Array.push(this);
            });
            return newWgs84Array;
        }

        function _getLatLngArray(wgs84Array) {
            var myLatLngArray = [];
            $.each(wgs84Array, function() {
                myLatLngArray.push(_getXY(this));
            });
            return myLatLngArray;
        }

        function _updateMarkerPosition(xy) {
            _olMarkerVectorSource.getFeatures().forEach(function (feature) {
                feature.getGeometry().setCoordinates(xy);
            });
        }

        function _updatePolylinePosition(myLatLngArray) {
            _polyline.stopEdit();
            _polyline.setPath(myLatLngArray);
        }

        function _trigger(eventName, data) {
            _options.utils.trigger($(_options.mapContainerElt), eventName, data);
        }

        function _createMarker(xy) {
            /*_marker = new google.maps.Marker({
                position: xy,
                map: _map,
                title: _t('dragMe'),
                shadow: _getMarkerShadow(),
                icon: _getMarkerIcon(),
                shape: {coord: [0, 0, 0, 35, 40, 35, 40, 0], type: 'poly'},
                draggable: true
            });
            google.maps.event.addListener(_marker, 'click', function() {
                _infowindow.close();
                _infowindow.open(_map, _marker);
            });
            google.maps.event.addListener(_marker, 'dragend', function() {
                _trigger('marker.dragend', _marker.getPosition());
            });
            google.maps.event.addListener(_marker, 'dragstart', function() {
                _infowindow.close();
                _clearAzimuths();
                _trigger('marker.dragstart');
            });*/

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

        function _createPolyline(myLatLngArray) {
            _polyline = new google.maps.Polyline({path: myLatLngArray, geodesic: true});
            $(_options.mapContainerElt).bind('polylineedit', function () {
                _setPolylineMetrics();
            });
            _polyline.setMap(_olMap);
        }

        function _resetMarker() {
            if (_olMarkerVectorSource.getFeatures().length) {
                _infowindow.close();
                _marker.setMap();
                _marker = undefined;
            }
        }

        function _resetPolyline() {
            if (_polyline) {
                _polyline.stopEdit();
                _polyline.setMap();
                _polyline = undefined;
            }
        }

        function _startPolylineEdit() {
            _polyline.runEdit(true, function(poly) {
                var wgs84 = [];
                poly.getPath().forEach(function(vtx) {
                    wgs84.push(vtx);
                });
                _trigger('polyline.editend', wgs84);
            });
        }

        function _setAutoZoom() {
            if (_model.getBoolean('autoZoom') === true) {
                var bounds = _polyline.getBounds();
                if (bounds) {
                    _olMap.fitBounds(bounds);
                    _olMap.setZoom(_olMap.getZoom() - 1);
                }
            }
        }

        function _setMetrics(length, area) {
            _model.setMetrics('length', length);
            _model.setMetrics('area', area);
            _trigger('map.metricschanged', {
                length: length,
                area: area
            });
        }

        function _setPolylineMetrics() {
            var path = _polyline.getPath();
            _setMetrics(google.maps.geometry.spherical.computeLength(path), google.maps.geometry.spherical.computeArea(path));
        }

        function _setPolyline(WGS84Array) {
            var myLatLngArray = _getLatLngArray(WGS84Array);
            if (_polyline) {
                _updatePolylinePosition(myLatLngArray);
            } else {
                _createPolyline(myLatLngArray);
            }
            _startPolylineEdit();
            _setAutoZoom();
            _setPolylineMetrics();
        }

        function _setMarker(wgs84) {
            if (!_olMarkerVectorSource) {
                return;
            }
            var xy = _getXY(wgs84);
            if (_olMarkerVectorSource.getFeatures().length) {
                _updateMarkerPosition(xy);
            } else {
                _createMarker(xy);
            }
            if (_olAzimutsVectorSource.getFeatures().length) {
                _updateAzimuths(xy);
            } else {
                _createAzimuths(xy);
            }
            //_buildInfowindow(xy);
            //_setMetrics();
        }

        function _setGeometricPointer(wgs84) {
            if (wgs84.length === 1) { //marker
                //_resetPolyline();
                _setMarker(wgs84[0]);
            } else { //polyline
                /*_resetMarker();
                _clearAzimuths();
                _setPolyline(wgs84);*/
            }
        }

        function _setGraticule() {
            var _graticule = new GridOverlay(_olMap);
            _graticule.setMap(_olMap);
        }

        //from http://forum.webrankinfo.com/maps-api-suggestion-villes-t129145.html
        function _getAddressComponent(result, address_type, name_type){
            var i, j, ret;
            address_type = (address_type === null) ? 'country' : address_type;
            name_type = (name_type === null) ? 'long_name' : name_type;

            if(result){
                for(i=0; i<result.address_components.length; i++){
                    for(j=0; j<result.address_components[i].types.length; j++){
                        if(result.address_components[i].types[j] == address_type){
                            if(result.address_components[i][name_type]){
                                ret = result.address_components[i][name_type];
                                break;
                            }
                        }
                    }
                    if (ret) {
                        break;
                    }
                }
            }
            return ret;
        }

        function _buildInfowindow(latlng) {
            var elevationPromise, timezonePromise, geocoderPromise, html,
                elevation = '',
                direction = '',
                timezone = '',
                timeStamp = Math.round((new Date().getTime())/1000),
                timezoneParameters = {
                    location: latlng.toUrlValue(),
                    timestamp: timeStamp,
                    sensor: 'false',
                    language: _options.context.languageCode
                },
                lat = Math.round(latlng.lat()*10000000)/10000000,
                lng = Math.round(latlng.lng()*10000000)/10000000;

            elevationPromise = _getElevationPromise({
                'locations': [latlng]
            }).done(function(elevationResult) {
                if (elevationResult) {
                    elevation = '<p style="float:right;"><img src="' + _options.system.dirWsImages + 'elevation_icon.png" alt="' + _t('elevation') + '" title="' + _t('elevation') + '" style="float:left;" width="38" height="30"> ' + elevationResult.elevation.toString().split('.')[0] + _t('unitMeter') + '<\/p>';
                }
            });

            timezonePromise = $.fn.getXDomain({
                dataType: 'json',
                url: 'https://maps.googleapis.com/maps/api/timezone/json',
                data: timezoneParameters,
                crossDomain: true
            }).done(function(TZdata) {
                if (TZdata.status == "OK") {
                    var offset = (TZdata.dstOffset + TZdata.rawOffset)/3600;
                    timezone = '<p style="float:left;">' + TZdata.timeZoneName + ', GMT';
                    if (offset > 0) {
                        timezone = timezone + '+';
                    }
                    if (offset !== 0) {
                        timezone = timezone + offset;
                    }
                    timezone = timezone + '<\/p>';
                }
            });

            geocoderPromise = _getGeocoderPromise({
                latLng: latlng,
                language: _options.context.languageCode
            }).done(function(geocoderResult) {
                if (geocoderResult) {
                    var iso;
                    direction = '<p>';
                    direction = direction + '<a id="zoom-btn" href="#" title="' + _t('zoom') + '" style="float:right;">' + _t('zoom') + '<\/a>';
                    direction = direction + '<img src="' + _options.system.dirWsImages + 'address_icon.png" alt="' + _t('address') + '" title="' + _t('address') + '" style="float:left;" width="38" height="30"> ' + geocoderResult.formatted_address + ' ';
                    iso = _getAddressComponent(geocoderResult, 'country', 'short_name');
                    if (iso && iso !== '') {
                        direction = direction + '<img src="' + _options.system.dirWsImages + 'flags/' + iso + '.png" alt="' + iso + '" style="vertical-align:middle;" width="22" height="15">';
                    }
                    direction = direction + '<\/p>';
                }
            });

            _infowindow.close();
            $.when(elevationPromise, timezonePromise, geocoderPromise).always(function() {
                html = '<div class="iw-content"><h3>' + _t('dragMe') + '<\/h3>';
                html = html + direction;
                html = html + '<div class="divp">';
                html = html + elevation;
                html = html + '<p style="float:left;"><img src="' + _options.system.dirWsImages + 'gps_icon.png" alt="GPS (WGS84)" title="GPS (WGS84)" style="float:left;" width="38" height="30"><\/p><p style="float:left;">' + lat + _t('unitDegreeNorth') +'<br>' + lng + _t('unitDegreeEast') + '<\/p>';
                html = html + timezone;
                html = html + '<\/div>';
                html = html + '<div><a href="#" id="directurl" style="text-decoration:none;" title="' + _t('directLink') + '"><img src="' + _options.system.dirWsImages + 'url.png" alt="' + _t('directLink') + '" style="border:0px none;vertical-align:middle;" width="16" height="16"> ' + _t('directLink') + '<\/a><\/div><\/div>';
                _infowindow.setContent(html);
                _infowindow.open(_olMap, _marker);
            });
        }

        function _doZoom() {
            var latlng = _marker.getPosition();
            $('#zoom-btn').button("option", "disabled", true);
            _getMaxZoomPromise(latlng)
                .done(function(response) {
                    $('#zoom-btn').button("option", "disabled", false);
                    _olMap.setCenter(latlng);
                    _olMap.setZoom(response.zoom);
                })
                .fail(function() {
                    alert("Error in MaxZoomService");
                });
        }

        _initMap();
        return {
            promise: _dfd.promise(),
            createControl: _createControl,
            getGeocoderService: _getGeocoderService,
            setGraticule: _setGraticule,
            model: {
                setAngleInRadians: _model.setAngleInRadians,
                setAngleInDegrees: _model.setAngleInDegrees,
                getMetrics: _model.getMetrics,
                setBoolean: _model.setBoolean
            },
            getMap: function() {return _olMap;}
        };
    };

    // exports
    window.TWCCMap = {
        getInstance: function (opts) {
            instance = instance || init(opts);
            return instance;
        }
    };
})(jQuery);