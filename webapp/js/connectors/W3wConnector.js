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
var W3wConnector = (function($, connectorOptions) {
    "use strict";
    /*global document, window, jQuery */

    var instance,
    W3wSingleton = function(opts) {
        var _options = $.extend({}, connectorOptions, opts),
            _connectorFromW3WURL = "http://api.what3words.com/w3w",
            _connectorFromWGS84URL = "http://api.what3words.com/position";

        function _buildWGS84Data(point) {
            var wgs84 = point.y + ',' + point.x;
            return {
                key: _options.key,
                position: wgs84, //wgs84 must be a string 'lat,lng' decimal degrees
                lang: _options.languageCode
            };
        }

        function _buildW3WData(w3w) {
            return {
                key: _options.key,
                string: w3w, //w3w must be a string 'word.word.word' or '*OneWord'
                lang: _options.languageCode
            };
        }

        /* CONVERT POSITION TO 3 WORDS */
        this.forward = function(wgs84) { // wgs84 = {x: lng in decimal degrees, y:lat in decimal degrees}
            var w3w = {},
                fromWGS84Data = _buildWGS84Data(wgs84);
            $.ajax({
                type: "POST",
                url: _connectorFromWGS84URL,
                data: fromWGS84Data,
                success: function(data) {
                    if (data.words) {
                        w3w.x = data.words.join('.');
                        w3w.y = data.words.join('.');
                    } else {
                        w3w.x = 0;
                        w3w.y = 0;
                    }
                },
                dataType: "json",
                async: false
            });
            return w3w;
        };

        /* CONVERT 3 WORDS/1 WORD TO POSITION */
        this.inverse = function(w3w) { //w3w = {x: w3w string, y: 0.0, z:0}
            var wgs84 = {},
                W3WData = _buildW3WData(w3w.x);
            $.ajax({
                type: "POST",
                url: _connectorFromW3WURL,
                data: W3WData,
                success: function(data) {
                    if (data.error) {
                        wgs84.x = 0;
                        wgs84.y = 0;
                    } else {
                        wgs84.x = data.position[1];
                        wgs84.y = data.position[0];
                    }
                },
                dataType: "json",
                async: false
            });
            return wgs84;
        };
    };

    return {
        getInstance: function(opts) {
            return instance = !instance ? new W3wSingleton(opts) : instance;
        }
    };
})(jQuery, App.connectorsOptions.w3w); //App.connectorsOptions.w3w must contain the key for w3w API.