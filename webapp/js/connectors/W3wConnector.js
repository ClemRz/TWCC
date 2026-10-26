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
var W3wConnector = (function ($, connectorOptions) { // jshint ignore:line
    "use strict";
    /*global jQuery */

    var instance,
        W3wSingleton = function (opts) {
            var _options = $.extend({}, connectorOptions, opts),
                _connectorFromW3WURL = "https://api.what3words.com/v3/convert-to-coordinates",
                _connectorFromWGS84URL = "https://api.what3words.com/v3/convert-to-3wa",
                defaultParameters = {
                    key: _options.key
                };

            function _buildWGS84Data(point) {
                var wgs84 = point.y + ',' + point.x;
                return $.extend({}, defaultParameters, {
                    coordinates: wgs84, //wgs84 must be a string 'lat,lng' decimal degrees
                    language: _options.languageCode
                });
            }

            function _buildW3WData(w3w) {
                return $.extend({}, defaultParameters, {
                    words: w3w //w3w must be a string 'word.word.word'
                });
            }

            function _returnedError(data) {
                return !data || !!data.error || !data.words || !data.coordinates;
            }

            /* CONVERT POSITION TO 3 WORDS */
            this.forward = function (wgs84) { // wgs84 = {x: lng in decimal degrees, y:lat in decimal degrees}
                var w3w = {},
                    fromWGS84Data = _buildWGS84Data(wgs84);
                $.ajax({
                    type: "GET",
                    url: _connectorFromWGS84URL,
                    data: fromWGS84Data,
                    success: function (data) {
                        if (_returnedError(data)) {
                            w3w.x = 0;
                            w3w.y = 0;
                        } else {
                            w3w.x = data.words;
                            w3w.y = data.words;
                        }
                    },
                    error: function () {
                        w3w.x = 0;
                        w3w.y = 0;
                    },
                    dataType: "json",
                    async: false
                });
                return w3w;
            };

            /* CONVERT 3 WORDS/1 WORD TO POSITION */
            this.inverse = function (w3w) { //w3w = {x: w3w string, y: 0.0, z:0}
                var wgs84 = {},
                    W3WData = _buildW3WData(w3w.x);
                $.ajax({
                    type: "GET",
                    url: _connectorFromW3WURL,
                    data: W3WData,
                    success: function (data) {
                        if (_returnedError(data)) {
                            wgs84.x = 0;
                            wgs84.y = 0;
                        } else {
                            wgs84.x = data.coordinates.lng;
                            wgs84.y = data.coordinates.lat;
                        }
                    },
                    error: function () {
                        wgs84.x = 0;
                        wgs84.y = 0;
                    },
                    dataType: "json",
                    async: false
                });
                return wgs84;
            };
        };

    return {
        getInstance: function (opts) {
            instance = !instance ? new W3wSingleton(opts) : instance;
            return instance;
        }
    };
//App.connectorsOptions.w3w must contain the key for w3w API.
})(jQuery, App.connectorsOptions.w3w); // jshint ignore:line