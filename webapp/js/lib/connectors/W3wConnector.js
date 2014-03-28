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
 var W3wConnector = (function() {
 	function W3wSingleton(opts) {
 		opts = opts || {};

 		/* CONVERT POSITION TO 3 WORDS */
 		this.forward = function(p) { // p = {x: lng in radians, y:lat in radians}
 			fromWGS84Data = buildWGS84Data(p);
 			$.ajax({
 				type: "POST",
 				url: connectorFromWGS84URL,
 				data: fromWGS84Data,
 				success: function(data) {
 					if (data.words) {
						p.x = data.words.join('.');
						p.y = data.words.join('.');
					} else {
						p.x = NaN;
						p.y = NaN;
 					}
					return p;
 				},
 				dataType: "json",
 				async: false
 			});
 		};

 		/* CONVERT 3 WORDS/1 WORD TO POSITION */
 		this.inverse = function(p) { //p = {x: 0.0, y: w3w string, z:0}
 			W3WData = buildW3WData(p.y);
 			$.ajax({
 				type: "POST",
 				url: connectorFromW3WURL,
 				data: W3WData,
 				success: function(data) {
 					if (data.error) {
 						p.x = NaN;
 						p.y = NaN;
 					} else {
						p.x = degToRad(data.position[1]);
						p.y = degToRad(data.position[0]);
					}
					return p;
 				},
 				dataType: "json",
 				async: false
 			});
 		};

 		this.init = function() {
 		}

 		var connectorFromW3WURL = "http://api.what3words.com/w3w";
 		var connectorFromWGS84URL = "http://api.what3words.com/position";

 		var buildWGS84Data = function(point) {
 			var wgs84 = radToDeg(point.y).toString() + ',' + radToDeg(point.x).toString();
 			return {
 				key: w3w_key,
 				position: wgs84, //wgs84 must be a string 'lat,lng' radians
 				lang: language
 			};
 		};

 		var buildW3WData = function(w3w) {
 			return {
 				key: w3w_key,
 				string: w3w, //w3w must be a string 'word.word.word' or '*OneWord'
 				lang: language
 			};
 		};
 	}

 	var instance;

 	var _static = {
 		getInstance: function(opts) {
 			if (instance === undefined) instance = new W3wSingleton(opts);
 			return instance;
 		}
 	};

 	return _static;
 }());