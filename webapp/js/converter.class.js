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
/* ======================================================================
    converter.class.js
   ====================================================================== */
/*

  File: converter.class.js
  Description: User Interface for Proj4.js library
    ---------------------------------------------------------------------
    |  /!\ Warning: needs JQuery 1.4.2 or later and Proj4.js libraries!  |
    ---------------------------------------------------------------------

  Version |    Date     |         Author          |  Modifications
  ----------------------------------------------------------------------
  1.0     |  2010-01-01 | clem.rz -at- gmail.com  | Creation of converter.class.js
  1.1     |  2010-08-01 | clem.rz -at- gmail.com  | Adding of m <-> km option for XY and ZXY projections
  1.2     |  2010-08-23 | clem.rz -at- gmail.com  | Rewriting the document for JQuery 1.4.2
  1.2.1   |  2010-08-24 | clem.rz -at- gmail.com  | Convert on enter key, sort CRS by country and by text
  1.2.2   |  2010-08-30 | clem.rz -at- gmail.com  | Correction for callback function in continueDefSource
  1.2.3   |  2010-09-01 | clem.rz -at- gmail.com  | check existing functions and remove empty optgroups
  1.2.4   |  2010-09-01 | clem.rz -at- gmail.com  | modification of showLoadingSign
  1.2.5   |  2010-09-01 | clem.rz -at- gmail.com  | callback function if defs ajax loading fails
  1.2.6   |  2010-09-02 | clem.rz -at- gmail.com  | toggleLoadingSing has been replaced with showLoadingSign
  1.2.7   |  2010-09-03 | clem.rz -at- gmail.com  | bug in the removing loop of continueDefSource, adding possibility
                                                  | of specifying new codes like: ESRI, IAU2000, SR-ORG, and urls and urns
                                                  | adding callback function for reload
  2.0     |  2010-09-07 | clem.rz -at- gmail.com  | Creation of Proj4js.Proj object on selection only, this reduce memory usage
  2.0.1   |  2010-09-15 | clem.rz -at- gmail.com  | Show Hide loading sign issue
  2.0.2   |  2010-11-19 | clem.rz -at- gmail.com  | The CRS info link is optional
                                                  | pass WGS84 array in case of CSV
  2.0.3   |  2011-04-04 | clem.rz -at- gmail.com  | Correction of dmsToDd function
  2.0.4   |  2011-04-15 | clem.rz -at- gmail.com  | Correction of App.math.parseFloat when value isNaN returns 0
  2.0.5   |  2013-02-08 | clem.rz -at- gmail.com  | Modification of loadCRS
                                                  | its content and the function getDefTitle have been moved to global.js.php
  2.0.6   |  2013-09-13 | clem.rz -at- gmail.com  | Update to new JQuery specs
  2.1.0   |  2013-10-06 | clem.rz -at- gmail.com  | Addition of the convergence information
  2.1.1   |  2013-10-13 | clem.rz -at- gmail.com  | Addition of getConvergence function
  2.1.2   |  2013-12-19 | clem.rz -at- gmail.com  | Addition of conventions for convergence angle
  2.1.3   |  2014-01-06 | clem.rz -at- gmail.com  | Compatibility changes for html5
  2.1.4   |  2014-03-17 | clem.rz -at- gmail.com  | Add connector specific changes
                                                  | Remove the nfo parameter
  2.1.5   |  2014-04-13 | clem.rz -at- gmail.com  | Fix some connectors bugs
  2.2.0   |  2014-05-12 | clem.rz -at- gmail.com  | Use an object as parameter of constructors instead of plenty o arguments!
                                                  | Utils functions moved to utils.js file
  3.0.0   |  2014-11-18 | clem.rz -at- gmail.com  | Refactor everything into jQuery UI Widgets
*/
/**
 * Usage:
 * $container.converterSet(options);
 */

(function($, proj4, TWCCHistory, App) {
    "use strict";
    /*global window, jQuery, App, Proj4js, TWCCHistory */

    //region Utils
    var _INPUT_ERROR_MESSAGE = 'INPUT ERROR ON LINE ';

    function _parseFloat(value) {
        value = +value.toString().replace(/\,/gi, '.');
        return isNaN(value) ? 0 : value;
    }

    function _newDeferred() {
        return App.utils.newDeferred.apply(this, arguments);
    }

    function _capitalize(string) {
        return string.charAt(0).toUpperCase() + string.substring(1);
    }

    function _getMagneticDeclinationForToday(wgs84) {
        var wmm = App.utils.getWMM();
        return wmm(wgs84[0].y, wgs84[0].x).dec;
    }

    function _getUTMZone(wgs84lng) {
        return (wgs84lng >= 0) ? Math.floor((wgs84lng + 180) / 6) + 1 : Math.floor(wgs84lng / 6) + 31;
    }

    function getHemisphere(wgs84Lat) {
        return (wgs84Lat >= 0) ? 'n' : 's';
    }

    function _getKeyCode(event) {
        if (event.keyCode) {
            return event.keyCode;
        } else {
            return event.which;
        }
    }

    function _dmsToDd(dmsValue) {
        var value, cardinal, ddValue;
        if (dmsValue !== undefined) {
            value = Math.abs(_parseFloat(dmsValue.D));
            value += Math.abs(_parseFloat(dmsValue.M)) / 60;
            value += Math.abs(_parseFloat(dmsValue.S)) / 3600;
            cardinal = (_parseFloat(dmsValue.D) >= 0) ? 1 : -1;
            cardinal *= ((dmsValue.C == 'N' || dmsValue.C == 'E') ? 1 : -1);
            ddValue = cardinal * value;
        }
        return ddValue;
    }

    function _dmToDd(dmsValue) {
        var value, cardinal, ddValue;
        if (dmsValue !== undefined) {
            value = Math.abs(_parseFloat(dmsValue.D));
            value += Math.abs(_parseFloat(dmsValue.M)) / 60;
            cardinal = (_parseFloat(dmsValue.D) >= 0) ? 1 : -1;
            cardinal *= ((dmsValue.C == 'N' || dmsValue.C == 'E') ? 1 : -1);
            ddValue = cardinal * value;
        }
        return ddValue;
    }

    function _ddToDms(ddValue, ddOpts) {
        var degrees, minutes_temp, minutes, seconds, cardinal;
        if ($.type(+ddValue) !== 'number' || isNaN(ddValue)) {
            degrees = 0;
            minutes = 0;
            seconds = 0;
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
        return {
            'C': cardinal,
            'D': degrees.toString(),
            'M': minutes.toString(),
            'S': seconds.toString()
        };
    }

    function _ddToDm(ddValue, ddOpts) {
        var degrees, minutes, cardinal;
        if ($.type(+ddValue) !== 'number' || isNaN(ddValue)) {
            degrees = 0;
            minutes = 0;
            if (ddOpts) {
                cardinal = ddOpts.N ? 'N' : 'E';
            }
        } else {
            if (ddOpts) {
                cardinal = (ddValue >= 0) ? (ddOpts.N ? 'N' : 'E') : (ddOpts.S ? 'S' : 'W');
            }
            ddValue = Math.abs(ddValue);
            degrees = Math.floor(ddValue);
            minutes = (ddValue - degrees) * 60;
        }
        return {
            'C': cardinal,
            'D': degrees.toString(),
            'M': minutes.toString()
        };
    }

    function _getDefinitionString(srsCode, definitions) {
        var definitionString = '';
        $.each(definitions, function(country, definition) {
            if (definition.hasOwnProperty(srsCode)) {
                definitionString = definition[srsCode].def;
                return false;
            } else {
                return true;
            }
        });
        return definitionString;
    }

    /**
     * Return the convergence angle
     * Source:
     * http://www.threelittlemaids.co.uk/magdec/transverse_mercator_projection.pdf
     * http://www.ga.gov.au/geodesy/datums/redfearn_geo_to_grid.jsp
     * http://www.threelittlemaids.co.uk/magdec/explain.html
     */
    function _computeConvergence(a, b, lng0, wgs84) {
        var sc = App.utils.getConvergenceConvention(),
            lng_0 = lng0 || App.utils.degToRad(_getUTMZone(wgs84.x) * 6 - 183),
            lat = App.utils.degToRad(wgs84.y),
            lng = App.utils.degToRad(wgs84.x),
            e2 = (a - b) / a,
            eta2 = e2 * Math.pow(Math.cos(lat), 2) / (1 - e2),
            P = lng - lng_0,
            J13 = Math.sin(lat),
            J14 = (1 + 3 * eta2 + 2 * Math.pow(eta2, 2)) * Math.sin(lat) * Math.pow(Math.cos(lat), 2) / 3,
            J15 = (2 - Math.pow(Math.tan(lat), 2)) * Math.sin(lat) * Math.pow(Math.cos(lat), 4) / 15,
            C = P * J13 + Math.pow(P, 3) * J14 + Math.pow(P, 5) * J15;
        C *= (sc) ? -1 : 1;
        return App.utils.radToDeg(C);
    }

    function getCoef(lenghtUnit) {
        var coef;
        switch (lenghtUnit) {
            case 'm':
                coef = 1;
                break;
            case 'km':
                coef = 1000;
                break;
            case 'us-ft':
                coef = 0.304800609601219;
                break;
            default:
                coef = 1000;
        }
        return coef;
    }

    function _toMeter(value, lenghtUnit) {
        return _parseFloat(value) * getCoef(lenghtUnit);
    }

    function _fromMeter(value, lenghtUnit) {
        return _parseFloat(value) / getCoef(lenghtUnit);
    }
    //endregion

    //region Converter widgets
    $.widget('twcc.converterSet', {
        options: {
            units: {
                dms:{D:'°', M:'\'', S:'\'\''},
                dd:{x:{DD:'°E'}, y:{DD:'°N'}},
                cartesian:{XY:{m:'m', km:'km', 'us-ft':'ft'},CONVERGENCE:'°'}
            },
            labels:{
                spherical:{x:'Lng = ', y:'Lat = ', convergence:'Conv. = '},
                cartesian:{x:'X = ', y:'Y = ', z:'Zone = ', h:'Hemisphere = ', convergence:'Conv. = '},
                csv:{csv:'CSV : ', l:'Format : '}
            },
            options:{
                x:{E:'East',W:'West'},
                y:{N:'North',S:'South'},
                o:{_DMS:'Deg. min. sec.', _DM:'Deg. min.', _DD:'Decimal deg.'},
                h:{n:'North', s:'South'},
                u:{_M:'Meters', _KM:'Kilometers', _F:'Feet'}
            },
            value: {x:0,y:0},
            wgs84: [],
            defaultWgs84: [{x:0,y:0}],
            selections: {},
            definitions: {},
            url: '',
            $containers: [],
            masterLoadingToggleSwitch: false,
            csv: false
        },
        _create: function() {
            var history,
                self = this;
            this._bindEvents();
            this._historyManager = TWCCHistory.getInstance(App);
            history = this._historyManager.getCurrentValue();
            if (!this.options.wgs84) {
                if (history) {
                    var reg = /UD\d+/gi;
                    if (history.wgs84.length > 1) {
                        this.options.wgs84 = history.wgs84;
                        self.options.csv = true;
                    } else {
                        if ($.type(history.wgs84) !== 'array') {
                            throw 'Wrong data type';
                        }
                        this.options.wgs84 = history.wgs84;
                    }
                    this.options.selections.source = reg.test(history.sc) ? 'WGS84' : history.sc;
                    this.options.selections.destination = reg.test(history.dc) ? 'WGS84' : history.dc;
                } else {
                    this.options.wgs84 = this.options.defaultWgs84;
                }
            }
            this.options.$containers = this.element.find('.converter-container');
            this.options.$containers.each(function(index) {
                $(this).converter({
                    units: self.options.units,
                    labels: self.options.labels,
                    options: self.options.options,
                    csv: self.options.csv,
                    target: index ? 'dest' : 'source',
                    selection: self.options.selections[index ? 'destination' : 'source'],
                    value: self.options.value,
                    wgs84: self.options.wgs84
                });
            });
            this.options.masterLoadingToggleSwitch = true;
            this._toggleLoading();
            this._reload()
                .progress(function(message) {
                    self._trigger('.notify', null, message);
                })
                .done(function() {
                    self._reloadSucceeded.apply(self, arguments);
                    self._trigger('.done', null, {wgs84:self.wgs84(), csv:self.csv()});
                    self.setConvergence();
                })
                .fail(function() {
                    self._reloadFailed.apply(self, arguments);
                });
        },
        _bindEvents: function() {
            var self = this;
            this.element.bind('converter.transform', function(event, obj) {
                self.transform(obj);
            });
            this.element.bind('converter.source.wgs84_changed ' +
                'converterset.done ', function(event, response) {
                var data = {
                    wgs84: response.wgs84,
                    convergenceInDegrees: self._convergence(),
                    srsCode: self._selection(),
                    magneticDeclinationInDegrees: _getMagneticDeclinationForToday(response.wgs84)
                };
                self._addToHistory(data);
                self._triggerWgs84Changed(event, data);
            });
            this.element.bind('converter.source.selection_changed ' +
                'converter.dest.selection_changed ', function(event, response) {
                var data = {
                    wgs84: response.wgs84,
                    srsCode: self._selection()
                };
                self._addToHistory(data);
                self._triggerConvergenceChange();
            });
            this.element.bind('converter.source.convergence_changed ' +
                'converter.dest.convergence_changed ', function() {
                self._triggerConvergenceChange();
            });
            this.element.find('.history').click(function() {
                if ($(this).hasClass('next')) {
                    self._historyManager.moveToNext();
                } else {
                    self._historyManager.moveToPrevious();
                }
                self._restoreFromHistory();
            });
        },
        _triggerWgs84Changed: function(event, data) {
            this._trigger('.wgs84_changed', event, data);
        },
        _triggerConvergenceChange: function() {
            this._trigger('.convergence_changed', null, {
                convergenceInDegrees: this._convergence()
            });
        },
        _reloadSucceeded: function() {
            this._loadDefinitionsObject();
            this.options.masterLoadingToggleSwitch = false;
            this._toggleLoading();
        },
        _reloadFailed: function(XMLHttpRequest) {
            this._trigger('.fail', null, XMLHttpRequest);
        },
        _reload: function() {
            var self = this,
                dfd = _newDeferred('Reload');
            this._toggleLoading(true);
            this._loadDefinitions().always(function() {
                self._toggleLoading(false);
            }).done(function() {
                var plainDefinitions = {};
                if (self.options.definitions.WGS84) {
                    self.options.definitions = {'*World': self.options.definitions};
                }
                $.each(self.options.definitions, function(country, newDef) {
                    $.extend(plainDefinitions, newDef);
                });
                dfd.resolve();
            }).fail(function(message, args) {
                dfd.reject(args);
            });
            return dfd.promise();
        },
        _loadDefinitions: function() {
            var self = this,
                dfd = _newDeferred('Load definitions');
            if ($.type(this.options.definitions) !== 'object') {
                dfd.reject('Wrong definitions type');
            } else {
                if ($.isEmptyObject(this.options.definitions)) {
                    $.ajax({
                        url: this.options.url,
                        data: {u: 'u'},
                        type: "POST",
                        cache: false,
                        dataType: 'json'
                    }).done(function(data, textStatus, jqXHR) {
                        if (data.error !== undefined) {
                            dfd.reject('Server Error', [jqXHR, textStatus, data]);
                        } else {
                            self.options.definitions = data;
                            dfd.resolve();
                        }
                    }).fail(function(jqXHR, textStatus, errorThrown) {
                        dfd.reject('Server Error', arguments);
                    });
                } else {
                    dfd.resolve();
                }
            }
            return dfd.promise();
        },
        _loadDefinitionsObject: function() {
            this._pushPullAll('loadDefinitionsObject', this.options.definitions);
        },
        _toggleLoading: function(show) {
            show = this.options.masterLoadingToggleSwitch || !!show;
            this._pushPullAll('toggleLoading', show);
        },
        _addToHistory: function(response) {
            if (this._historyManager.isEnabled()) {
                this._historyManager.add({
                    wgs84: response.wgs84,
                    sc: response.srsCode.source,
                    dc: response.srsCode.destination
                });
            }
        },
        _restoreFromHistory: function() {
            var self = this,
                obj = this._historyManager.getCurrentValue();
            this._underTheRadar(function() {
                var isCsv = obj.wgs84.length > 1,
                    csv = self.csv();
                if (csv !== isCsv) {
                    self.csv(isCsv);
                }
                self.transform(obj);
                self.pushPullSource('selection', obj.sc);
                self.pushPullDestination('selection', obj.dc);
            });
        },
        _underTheRadar: function(func) {
            if ($.type(func) !== 'function') {
                throw 'Invalid function';
            }
            this._historyManager.toggle(false);
            func();
            this._historyManager.toggle(true);
        },
        _pushPullWithCriterion: function(key, value, criteria, criterion) {
            var returnedValue = null,
                self = this;
            this.options.$containers.each(function() {
                if ($(this).converter('option', criteria) === criterion) {
                    returnedValue = self._pushPullOne(key, value, $(this));
                }
            });
            return returnedValue;
        },
        _pushPullOne: function(key, value, $container) {
            var returnedValue = value === undefined ? $container.converter(key) : $container.converter(key, value);
            if (this.options.hasOwnProperty(key)) {
                this.options[key] = returnedValue;
            }
            return returnedValue;
        },
        pushPullSource: function(key, value) {
            return this._pushPullWithCriterion(key, value, 'target', 'source');
        },
        pushPullDestination: function(key, value) {
            return this._pushPullWithCriterion(key, value, 'target', 'dest');
        },
        _pushPullAll: function(key, value) {
            var self = this;
            this.options.$containers.each(function() {
                self._pushPullOne(key, value, $(this));
            });
            return this.options[key];
        },
        _pullAll: function(key) {
            return {
                source: this.pushPullSource(key),
                destination: this.pushPullDestination(key)
            };
        },
        wgs84: function(value) {
            return this._pushPullAll('wgs84', value);
        },
        toggle: function(enable) {
            return this._pushPullAll('toggle', enable);
        },
        _getFirstWgs84: function() {
            var wgs84 = null,
                wgs84Array = this.wgs84();
            $.each(wgs84Array, function() {
                if (!this.error) {
                    wgs84 = this;
                    return false;
                }
                return true;
            });
            return wgs84 || {x:0,y:0};
        },
        _convergence: function() {
            return this._pullAll('convergence');
        },
        _selection: function() {
            this.options.selections = this._pullAll('selection');
            return this.options.selections;
        },
        setConvergence: function() {
            this._pushPullAll('setConvergence');
        },
        readOnly: function() {
            return this.options.readOnly;
        },
        csv: function(enable) {
            if (enable != this.options.csv && enable !== undefined) {
                if (!enable) {
                    var wgs84 = [this._getFirstWgs84()];
                    if (JSON.stringify(wgs84[0]) === JSON.stringify(this.wgs84()[0])) {
                        this.wgs84(wgs84);
                    } else {
                        this.transform({wgs84:wgs84});
                    }
                }
                this._trigger('.csv_changed', null, {csv:enable});
            }
            return this._pushPullAll('csv', enable);
        },
        unloadCRS: function(srsCode) {
            this._pushPullAll('unloadCRS', srsCode);
        },
        removeEmptyOptgroups: function() {
            this._pushPullAll('removeEmptyOptgroups');
        },
        mergeDefinitions: function(definitionsObject) {
            var self = this,
                dfd = new $.Deferred();
            this.options.masterLoadingToggleSwitch = true;
            this._toggleLoading();
            this.options.definitions = $.type(this.options.definitions) !== 'object' ? {} : this.options.definitions;
            $.extend(true, this.options.definitions, definitionsObject);
            this._reload()
                .progress(function() {
                    dfd.notify('Reloading');
                })
                .done(function() {
                    self._reloadSucceeded.apply(self, arguments);
                    dfd.resolve();
                })
                .fail(function() {
                    self._reloadFailed.apply(self, arguments);
                    dfd.reject.apply(null, arguments);
                });
            return dfd.promise();
        },
        transform: function(data) {
            var fromPivot = data.hasOwnProperty('wgs84');
            if (!(fromPivot && $.type(data.wgs84) === 'array' || data.hasOwnProperty('target'))) {
                throw 'Wrong data format';
            }
            if (fromPivot) {
                this._pushPullAll('transform', data);
            } else {
                var wgs84;
                if (data.target === 'source') {
                    wgs84 = this.pushPullSource('transform', {input:null});
                    this.pushPullDestination('transform', {wgs84:wgs84});
                } else {
                    wgs84 = this.pushPullDestination('transform', {input:null});
                    this.pushPullSource('transform', {wgs84:wgs84});
                }
            }
        },
        _setOption: function(key, value) {
            return this._superApply(arguments);
        },
        _destroy: function() {
            this._toggleLoading(true);
            this._pushPullAll('destroy');
            return this._super();
        }
    });

    $.widget('twcc.converter', {
        options: {
            readOnly: false,
            wrapper: {
                fieldSet: ['<div>'],
                title: ['<h3>'],
                info: ['<a>', {name: 'info', href: '#'}]
            },
            projections: {},
            units: {},
            labels: {},
            options: {},
            angleUnit: 'dd',
            lengthUnit: 'm',
            convergence: null,
            hint: '',
            wgs84: [{x:0, y:0}],
            value: {x:0, y:0},
            selection: null,
            mapping: {
                aea: 'cartesian',
                aeqd: 'cartesian',
                cass: 'cartesian',
                cea: 'cartesian',
                csv: 'csv',
                eqc: 'cartesian',
                eqdc: 'cartesian',
                equi: 'cartesian',
                gauss: 'cartesian',
                geocent: 'cartesian',
                gnom: 'cartesian',
                gstmerc: 'cartesian',
                laea: 'cartesian',
                lcc: 'cartesian',
                longlat: 'spherical',
                merc: 'cartesian',
                mill: 'cartesian',
                moll: 'cartesian',
                nzmg: 'cartesian',
                omerc: 'cartesian',
                ortho: 'cartesian',
                poly: 'cartesian',
                sinu: 'cartesian',
                somerc: 'cartesian',
                stere: 'cartesian',
                sterea: 'cartesian',
                tmerc: 'cartesian',
                utm: 'utm',
                vandg: 'spherical',
                connector: 'connector'
            },
            $select: null,
            $container: null,
            csv: false
        },
        _widget: undefined,
        _create: function() {
            $.extend(this.options, {
                $select: this.element.find('select.crs-list'),
                $container: this.element.find('.container')
            });
            this._bindEvents();
            this._unload();
        },
        _triggerTransform: function(event) {
            event.preventDefault();
            this._trigger('.transform', event, {
                target: this.options.target
            });
        },
        _bindEvents: function() {
            var self = this;
            this.options.$select.bind('change', function() {
                self.selection();
            });
            this.element.bind('angleswitchgeofield.update_display', function(event, response) {
                self.options.angleUnit = response.value;
                self.value();
                self.updateContainer();
            });
            this.element.find('.convert-button').click(function(event) {
                self._triggerTransform(event);
            });
            this.element.on('keyup', 'input, select', function(event) {
                if (_getKeyCode(event) == App.constants.keyboard.RETURN) {
                    self._triggerTransform(event);
                }
            });
        },
        _getFieldSetUnit: function(projName) {
            var widgetPrefix = this._getWidgetPrefix(projName),
                unitName = this._getFieldSetUnitName(widgetPrefix);
            if (unitName) {
                return this.options.units[unitName];
            } else {
                var camelArray = widgetPrefix.match(/([A-Z]?[a-z]*)/g);
                unitName = this._getFieldSetUnitName(camelArray[1]);
                if (unitName) {
                    return this.options.units[unitName];
                }
            }
        },
        _getFieldSetUnitName: function(widgetPrefix) {
            var unitName;
            switch (widgetPrefix) {
                case 'utm':
                    unitName = 'cartesian';
                    break;
                case 'Dm':
                    unitName = 'dms';
                    break;
                case 'csv':
                case 'connector':
                    break;
                default:
                    unitName = widgetPrefix.toLowerCase();
            }
            if (unitName && this.options.units.hasOwnProperty(unitName)) {
                return unitName;
            }
        },
        _getFieldSetLabel: function(projName) {
            var widgetPrefix = this._getWidgetPrefix(projName),
                labelName = this._getFieldSetLabelName(widgetPrefix);
            if (labelName) {
                return this.options.labels[labelName];
            } else {
                var camelArray = widgetPrefix.match(/([A-Z]?[a-z]*)/g);
                labelName = this._getFieldSetLabelName(camelArray[0]);
                if (labelName) {
                    return this.options.labels[labelName];
                }
            }
        },
        _getFieldSetLabelName: function(widgetPrefix) {
            var labelName;
            switch (widgetPrefix) {
                case 'utm':
                    labelName = 'cartesian';
                    break;
                case 'connector':
                    break;
                default:
                    labelName = widgetPrefix.toLowerCase();
            }
            if (labelName && this.options.labels.hasOwnProperty(labelName)) {
                return labelName;
            }
        },
        _getWidgetMidfix: function(prefix) {
            var midfix = '';
            if (prefix === 'spherical') {
                midfix = this.options.angleUnit;
                midfix = midfix.charAt(0).toUpperCase() + midfix.substr(1).toLowerCase();
            }
            return midfix;
        },
        _getWidgetPrefix: function(projName) {
            var prefix,
                projection = this.options.projections[this.options.selection];
            projName = projection.isConnector && projName !== 'csv' ? 'connector' : projName;
            if (this.options.mapping.hasOwnProperty(projName)) {
                prefix = this.options.mapping[projName];
            } else {
                console.error('Projection not found: ' + projName);
                prefix = 'cartesian';
            }
            return prefix + this._getWidgetMidfix(prefix);
        },
        _getWidgetName: function(projName) {
            return this._getWidgetPrefix(projName) + 'FieldSet';
        },
        _unload: function() {
            this.element.find('select.crs-list, .container').empty();
            this.projections = {};
        },
        toggleLoading: function(show) {
            this.element.find('.container').toggle(!show);
            this.element.find('.loading').toggle(!!show);
        },
        removeEmptyOptgroups: function() {
            this.options.$select.find('optgroup:empty').remove();
        },
        loadDefinitionsObject: function(definitions) {
            var flag,
                self = this,
                $select = this.options.$select;
            this.options.definitions = definitions;
            this.removeEmptyOptgroups();
            flag = false;
            $.each(this.options.definitions, function(country, newDef) {
                $.each(newDef, function(srsCode, obj) {
                    if (!self.options.$select.has('optgroup[label="'+country+'"] option[value="'+srsCode+'"]').length) {
                        App.utils.addOptionToSelect(country, srsCode, self.options.$select, obj.def);
                        flag = true;
                    }
                });
            });
            if (flag) {
                $select.sortGrpsNOptionsByText();
                try {
                    this.selection(this.options.selection || $select.find('option:first').val());
                } catch(e) {
                    this.selection($select.find('option:first').val());
                }
            }
        },
        unloadCRS: function(srsCode) {
            var self = this;
            if (this.selection() === srsCode) {
                var originalSrsCode = this._widget.options.srsCode;
                this.selection(originalSrsCode);
            }
            this.options.$select.find('option[value="'+srsCode.toString()+'"]').remove();
            proj4.defs(srsCode, undefined);
            delete this.options.projections[srsCode];
            $.each(this.options.definitions, function(country, definition) {
                if (definition.hasOwnProperty(srsCode)) {
                    delete self.options.definitions[country][srsCode];
                    return false;
                }
                return true;
            });
            this.removeEmptyOptgroups();
        },
        updateContainer: function() {
            var self = this,
                srsCode = this.selection();
            this.options.value = (!this.options.csv && $.type(this.options.value) === 'array') ? this.options.value[0] : this.options.value;
            this.options.value = (this.options.csv && $.type(this.options.value) !== 'array') ? [this.options.value] : this.options.value;
            if (srsCode) {
                if (!this.options.projections.hasOwnProperty(srsCode)) {
                    this._registerProjection(srsCode);
                }
                var $title, $temp,
                    projection = this._getProjection(srsCode),
                    projectionName = projection.projName,
                    unit = this._getFieldSetUnit(projectionName) || '',
                    label = this._getFieldSetLabel(projectionName) || '',
                    options = {
                        srsCode: srsCode,
                        target: this.options.target,
                        convergence: this.options.convergence,
                        wgs84: this.options.wgs84,
                        value: this.options.value,
                        units: unit,
                        labels: label,
                        lengthUnit: this.options.lengthUnit,
                        options: this.options.options,
                        readOnly: this.options.readOnly
                    },
                    crsTitle = projection.title || srsCode,
                    widgetName = this._getWidgetName(this.options.csv ? 'csv' : projection.projName),
                    $fieldSetContainer = $.apply(null, this.options.wrapper.fieldSet);
                this.options.$container.empty();
                $title = $.apply(null, this.options.wrapper.title);
                $title.append(crsTitle);
                $temp = $.apply(null, this.options.wrapper.info);
                $temp.click(function(event) {
                    self._trigger('.info', event, {
                        srsCode: srsCode,
                        definitionString: projection.defData
                    });
                });
                $temp.text(' [?]');
                $title.append($temp);
                $fieldSetContainer.append($title);
                if (widgetName == 'csvFieldSet') {
                    unit = unit.D ? this.options.units.dd : unit;
                    var hint = (
                        (projectionName === 'utm' ? label.h + ',' + label.z + ',' : '') + (label.x ? label.x + (unit.x ? '(' + unit.x.DD + ')' : '(' + unit.XY.m + ')') : '') + (label.y ? ',' + label.y + (unit.y ? '(' + unit.y.DD + ')' : '(' + unit.XY.m + ')') : '')
                        ).replace(/[\s]*=[\s]*/ig, '');
                    $.extend(options, {
                        originalProjection: projection.isConnector ? 'connector' : projectionName,
                        hint: hint,
                        units: null,
                        labels: this.options.labels.csv
                    });
                }
                this._widget = $fieldSetContainer[widgetName](options).data('twcc'+_capitalize(widgetName));
                this.options.$container.append($fieldSetContainer);
            }
        },
        _registerProjection: function(srsCode) {
            var projection;
            if (!proj4.defs(srsCode)) {
                var isConnector = srsCode.indexOf('Connector') >= 0,
                    definitionString = _getDefinitionString(srsCode, this.options.definitions),
                    definition  = {
                        defData: definitionString,
                        isConnector: isConnector
                    };
                proj4.defs(srsCode, definitionString);
                $.extend(proj4.defs(srsCode), definition);
            }
            projection = $.extend({}, proj4.defs(srsCode));
            this._setProjection(srsCode, projection);
        },
        _getProjection: function(srsCode) {
            if (!this.options.projections.hasOwnProperty(srsCode)) {
                throw 'Unknown srsCode';
            }
            return this.options.projections[srsCode];
        },
        _setProjection: function(srsCode, projection) {
            this.options.projections[srsCode] = projection;
        },
        selection: function(value) {
            var $select = this.options.$select,
                flag = false,
                self = this,
                originalSelection = this.options.selection;
            if (value !== undefined) {
                this.options.selection = value;
                try {
                    $select.val(this.options.selection);
                } catch (e) {} //IE6 BUG
                flag = true;
            } else if ($select.val() && $select.val() != this.options.selection) {
                this.options.selection = $select.val();
                flag = true;
            }
            if (flag) {
                this.updateContainer();
                var srsCode = self.options.selection,
                    wgs84 = self.wgs84();
                self.transform({wgs84: wgs84});
                self.setConvergence();
                if (originalSelection !== srsCode) {
                    self._trigger('.'+self.options.target+'.selection_changed', null, {wgs84:wgs84});
                }
            }
            return this.options.selection;
        },
        projection: function() {
            return this._getProjection(this.selection());
        },
        _pushPull: function(key, value) {
            var returnedValue;
            if (!this._widget) {
                return null;
            }
            returnedValue = this._widget[key](value);
            if (this.options.hasOwnProperty(key)) {
                this.options[key] = returnedValue;
            }
            return returnedValue;
        },
        value: function(value) {
            if (value !== undefined) {
                if (!this.options.csv && $.type(value) !== 'object' || this.options.csv && $.type(value) !== 'array') {
                    throw 'Invalid type';
                }
            }
            return this._pushPull('value', value);
        },
        wgs84: function(value) {
            if (value !== undefined && JSON.stringify(this.options.wgs84) !== JSON.stringify(value)) {
                this._pushPull('wgs84', value);
                this._trigger('.'+this.options.target+'.wgs84_changed', null, {wgs84:value});
                this.setConvergence();
            }
            return this.options.wgs84;
        },
        convergence: function(value) {
            var originalConvergence = this.options.convergence;
            this._pushPull('convergence', value);
            if (value !== undefined && originalConvergence !== this.options.convergence) {
                var wgs84 = this.wgs84();
                this._trigger('.'+this.options.target+'.convergence_changed', null, {wgs84:wgs84});
            }
            return this.options.convergence;
        },
        setConvergence: function() {
            if (this._widget && $.type(this._widget.convergence()) !== 'null') {
                var convergence,
                    wgs84 = this.wgs84()[0],
                    projection = new proj4.Proj(this.projection().defData),
                    long0 = this._widget.zone ? null : projection.long0 || null;
                convergence = _computeConvergence(projection.a, projection.b, long0, wgs84);
                this.convergence(convergence);
            }
        },
        csv: function(enable) {
            if (enable !== undefined) {
                this.value();
                this.options.csv = !!enable;
                this.updateContainer();
            }
            return this.options.csv;
        },
        hint: function(value) {
            return this._pushPull('hint', value);
        },
        toggle: function(enable) {
            return this._pushPull('toggle', enable);
        },
        readOnly: function() {
            return this.options.readOnly;
        },
        _formatCoordinates: function(coordinates) {
            var coordinatesArray,
                whiteList = ['array', 'object'];
            if ($.inArray($.type(coordinates), whiteList) < 0) {
                throw 'Wrong data type';
            }
            coordinatesArray = $.type(coordinates) === 'array' ? coordinates : [coordinates];
            return coordinatesArray;
        },
        _setupInputProjection: function(projection, wgs84, fromPivot, value) {
            var parameters = fromPivot ? {z:_getUTMZone(wgs84.x),h:getHemisphere(wgs84.y)} : value,
                defData = projection.defData;
            defData = defData.replace(/\+zone=[^\s]+/ig, "+zone=" + parameters.z);
            defData = defData.replace("+south", "");
            defData += parameters.h === "s" ? " +south" : "";
            return new proj4.Proj(defData);
        },
        _isValidPoint: function(point, isConnector) {
            var isValid = 1;
            isValid &= $.type(point) === 'object';
            isValid &= point.hasOwnProperty('x');
            if (isConnector) {
                isValid &= point.x.indexOf(_INPUT_ERROR_MESSAGE) < 0;
            } else {
                isValid &= point.hasOwnProperty('y');
                isValid &= $.type(point.x) === 'number' && !isNaN(point.x);
                isValid &= $.type(point.y) === 'number' && !isNaN(point.y);
            }
            return !!isValid;
        },
        _getConnector: function() {
            var connectorName = this.selection();
            if (!window.hasOwnProperty(connectorName)) {
                $.ajax({
                    url: '/js/connectors/' + connectorName + '.js',
                    async: false,
                    cache: true,
                    dataType: 'script'
                });
            }
            return window[connectorName].getInstance(App.context);
        },
        transform: function(data) {
            var coordinates, pointsA, originalProjection, projections,
                self = this,
                pointsB = [],
                wgs84Array = [],
                fromPivot = data.hasOwnProperty('wgs84'),
                value = this.value(),
                pivotProjection = proj4.WGS84,
                inputProjection = this.projection(),
                inputIsUtm = inputProjection.defData.indexOf('+proj=utm') > -1,
                getPivotProjection = function() {return $.extend({isConnector: pivotProjection.isConnector}, new proj4.Proj(pivotProjection.defData));},
                getInputProjection = function() {return inputIsUtm ? self._setupInputProjection.apply(self, arguments) : $.extend({isConnector: inputProjection.isConnector}, new proj4.Proj(inputProjection.defData));},
                pivotProjectionObject = {type: 'pivot', getProjection: getPivotProjection},
                inputProjectionObject = {type: 'input', getProjection: getInputProjection};
            if (!(fromPivot || data.hasOwnProperty('input'))) {
                throw 'Wrong data format';
            }
            this.toggleLoading(true);
            var dataValue = fromPivot ? data.wgs84 : data.input;
            if (fromPivot && dataValue) {
                this.wgs84(dataValue);
            }
            if (fromPivot) {
                coordinates = dataValue || this.wgs84();
                projections = {A: pivotProjectionObject, B: inputProjectionObject};
            } else {
                coordinates = dataValue || value;
                projections = {A: inputProjectionObject, B: pivotProjectionObject};
                originalProjection = this._widget.options.originalProjection;
            }
            pointsA = this._formatCoordinates(coordinates);
            $.each(pointsA, function(index, pointA) {
                var pointB = {},
                    wgs84 = self.wgs84()[index],
                    thisValue = $.type(value) === 'array' ? value[index] : value,
                    projectionA = projections.A.getProjection(inputProjection, wgs84, fromPivot, thisValue),
                    projectionB = projections.B.getProjection(inputProjection, wgs84, fromPivot, thisValue),
                    AIsConnector = originalProjection === 'connector' || !fromPivot && projectionA.isConnector,
                    BIsConnector = fromPivot && projectionB.isConnector,
                    areConnectors = AIsConnector || BIsConnector;
                if (!self._isValidPoint(pointA, AIsConnector) || fromPivot && wgs84.error) {
                    wgs84Array.push({x:0,y:0,error:true});
                    pointsB.push(_INPUT_ERROR_MESSAGE + (index+1));
                } else {
                    var connector;
                    if (areConnectors) {
                        connector = self._getConnector();
                    }
                    if (areConnectors && fromPivot) {
                        pointB[projections.B.type] = connector.forward(pointA);
                    } else {
                        if (areConnectors) {
                            pointA = connector.inverse(pointA);
                        }
                        pointB[projections.B.type] = proj4(projectionA, projectionB, $.extend({}, pointA));
                    }
                    pointB[projections.A.type] = $.extend({}, pointA);
                    wgs84Array.push({x:pointB.pivot.x, y:pointB.pivot.y});
                    pointsB.push({x:pointB.input.x, y:pointB.input.y});
                }
            });
            if (!this.csv()) {
                pointsB = pointsB[0];
            }
            if (fromPivot) {
                this.value(pointsB);
            } else {
                this.wgs84(wgs84Array);
            }
            this.toggleLoading(false);
            return this.wgs84();
        },
        _setOption: function(key, value) {
            return this._superApply(arguments);
        },
        _destroy: function() {
            this._unload();
            return this._super();
        }
    });
    //endregion

    //region FieldSet widgets
    $.widget('twcc.fieldSet', {
        options: {
            srsCode: null,
            value: {},
            units: {},
            target: null,
            wrapper: {
                set: ['<div>', {class:'table'}],
                geoField: ['<div>', {class: 'row'}],
                geoCaption: ['<div>', {class: 'caption'}]
            },
            readOnly: false,
            geoFields: {},
            geoFieldsIndex: 0,
            wgs84: null
        },
        _create: function() {
            var geoFieldsOptions,
                $set = $.apply(null, this.options.wrapper.set);
            geoFieldsOptions = this._getGeoFieldsOptions();
            this._setDefaultsGeoFieldsOptions(geoFieldsOptions);
            this._buildGeoFields($set, geoFieldsOptions);
            this._setFieldsHandlers();
            this.element.append($set);
        },
        _setFieldsHandlers: function() {
            //Do not remove
        },
        _setDefaultsGeoFieldsOptions: function(obj) {
            var self = this;
            $.each(obj, function(key, geoFieldOption) {
                var params = {
                    name: self.options.srsCode+'_'+self.options.target,
                    readOnly: self.options.readOnly,
                    unit: self.options.units,
                    target: self.options.target,
                    value: self.options.value[geoFieldOption.options.axis]
                };
                obj[key].options = $.extend(params, obj[key].options);
            });
        },
        _buildGeoField: function($container, key, type, options) {
            var $geoField,
                index = this.options.geoFieldsIndex++;
            if (type.indexOf('Switch') >= 0 || type.indexOf('connector') >= 0) {
                $geoField = $.apply(null, this.options.wrapper.geoCaption);
            } else {
                $geoField = $.apply(null, this.options.wrapper.geoField);
            }
            this.options.geoFields[index] = $geoField[type](options);
            $container.append($geoField);
        },
        _buildGeoFields: function($container, geoFieldsOptions) {
            var self = this;
            $.each(geoFieldsOptions, function(key, obj) {
                self._buildGeoField($container, key, obj.type, obj.options);
            });
        },
        _getGeoFieldsOptions: function() {
            return {};
        },
        _getConvergenceIcon: function() {
            return '<img src="'+App.system.dirWsImages+'GN_'+this.options.target+'.png" alt="">';
        },
        convergence: function() {
            return null;
        },
        hint: function() {
            return null;
        },
        wgs84: function(value) {
            if (value === undefined) {
                return this._getWgs84();
            } else {
                return this._setWgs84(value);
            }
        },
        _getWgs84: function() {
            return this.options.wgs84;
        },
        _setWgs84: function(value) {
            this.options.wgs84 = value;
            return this.options.wgs84;
        },
        value: function(value) {
            if (value === undefined) {
                this.options.value = this._getValue();
            } else {
                this.options.value = this._setValue(value);
            }
            this._setToStringMethod();
            return this.options.value;
        },
        _getValue: function() {
            return this.options.value;
        },
        _setValue: function(value) {
            this.options.value = value;
        },
        _setToStringMethod: function() {
            var self = this;
            this.options.value.toString = function() {
                return self._getStringValue();
            };
        },
        _getStringValue: function() {
            return "";
        },
        toggle: function(enable) {
            enable = enable === undefined ? this.options.readOnly : !!enable;
            this.options.readOnly = this._toggle(enable);
            return this.options.readOnly;
        },
        readOnly: function() {
            return this.options.readOnly;
        },
        _toggle: function(enable) {
            return !enable;
        },
        _setOption: function(key, value) {
            return this._superApply(arguments);
        },
        _destroy: function() {
            this.element.empty();
            return this._super();
        }
    });

    $.widget('twcc.connectorFieldSet', $.twcc.fieldSet, {
        options: {
            options: {},
            geoFields: {},
            value: {}
        },
        _getGeoFieldsOptions: function() {
            return [{
                type: 'connectorGeoField',
                options: {
                    axis: 'x'
                }
            }];
        },
        _getValue: function() {
            return {
                x: this.options.geoFields[0].connectorGeoField('value')
            };
        },
        _setValue: function(value) {
            return {
                x: this.options.geoFields[0].connectorGeoField('value', value.x)
            };
        },
        _toggle: function(enable) {
            return this.options.geoFields[0].connectorGeoField('toggle', enable);
        },
        _getStringValue: function() {
            return this.options.geoFields[0].connectorGeoField('value');
        }
    });

    $.widget('twcc.csvFieldSet', $.twcc.fieldSet, {
        options: {
            labels: {},
            units: {},
            options: {},
            geoFields: {},
            value: [],
            hint: '',
            wgs84: [],
            originalProjection: null
        },
        _getGeoFieldsOptions: function() {
            return [
                {
                    type: 'csvGeoField',
                    options: {
                        value: this._toString(this.options.value),
                        label: this.options.labels.csv
                    }
                },
                {
                    type: 'labelGeoField',
                    options: {
                        value: this.options.hint,
                        label: this.options.labels.l

                    }
                }
            ];
        },
        _getValue: function() {
            return this._fromString(this.options.geoFields[0].csvGeoField('value'));
        },
        _setValue: function(value) {
            return this._fromString(this.options.geoFields[0].csvGeoField('value', this._toString(value)));
        },
        _fromString: function(value) {
            var array = value.split("\n"),
                self = this;
            $.each(array, function(index, coordinatesString) {
                var subArray = coordinatesString.split(',');
                switch (self.options.originalProjection) {
                    case 'utm':
                        array[index] = {
                            h: subArray[0],
                            z: +subArray[1],
                            x: +subArray[2],
                            y: +subArray[3]
                        };
                        break;
                    case 'connector':
                        array[index] = {
                            x: subArray[0],
                            y: subArray[1]
                        };
                        break;
                    default:
                        array[index] = {
                            x: +subArray[0],
                            y: +subArray[1]
                        };
                }
            });
            return array;
        },
        _toString: function(value) {
            var array = [],
                self = this;
            if ($.type(value) !== 'array') {
                throw 'Invalid type';
            }
            $.each(value, function(index, obj) {
                var wgs84 = self.wgs84()[index];
                if (wgs84.error) {
                    array.push(obj.toString());
                } else {
                    if (self.options.originalProjection == 'utm') {
                        var hemisphere = obj.h || getHemisphere(wgs84.y),
                            zone = obj.z || _getUTMZone(wgs84.x);
                        array.push(hemisphere+','+zone+','+obj.x+','+obj.y);
                    } else {
                        array.push(obj.x+','+obj.y);
                    }
                }
            });
            return array.join("\n");
        },
        originalProjection: function(proj) {
            if (proj === undefined) {
                return this.options.originalProjection;
            } else {
                this.options.originalProjection = proj;
            }
        },
        hint: function(hint) {
            if (hint === undefined) {
                this.options.hint = this.options.geoFields[1].labelGeoField('value');
                return this.options.hint;
            } else {
                this.options.hint = hint;
                this.options.geoFields[1].labelGeoField('value', this.options.hint);
            }
        },
        _toggle: function(enable) {
            this.options.geoFields[0].csvGeoField('toggle', enable);
            return this.options.geoFields[1].labelGeoField('toggle', enable);
        },
        _getStringValue: function() {
            return this.options.hint + '\n' + this.options.geoFields[0].csvGeoField('value');
        }
    });

    $.widget('twcc.utmFieldSet', $.twcc.fieldSet, {
        options: {
            labels: {},
            options: {},
            geoFields: {},
            lengthUnit: 'm',
            value: {},
            convergence: 0,
            wgs84: []
        },
        _getGeoFieldsOptions: function() {
            return [
                {
                    type: 'hemisphereGeoField',
                    options: {
                        label: this.options.labels.h,
                        options: this.options.options.h,
                        axis: 'h'
                    }
                },
                {
                    type: 'zoneGeoField',
                    options: {
                        label: this.options.labels.z,
                        options: this.options.options.z,
                        axis: 'z'
                    }
                },
                {
                    type: 'xyGeoField',
                    options: {
                        label: this.options.labels.x,
                        lengthUnit: this.options.lengthUnit,
                        axis: 'x'
                    }
                },
                {
                    type: 'xyGeoField',
                    options: {
                        label: this.options.labels.y,
                        lengthUnit: this.options.lengthUnit,
                        axis: 'y'
                    }
                },
                {
                    type: 'convergenceGeoField',
                    options: {
                        value: this.options.convergence,
                        label: this.options.labels.convergence,
                        icon: this._getConvergenceIcon()
                    }
                },
                {
                    type: 'lengthSwitchGeoField',
                    options: {
                        value: this.options.lengthUnit,
                        unit: this.options.options.u
                    }
                }
            ];
        },
        _setFieldsHandlers: function() {
            var self = this;
            this._super();
            this.element.bind('lengthswitchgeofield.update_display', function(event, response) {
                self.options.lengthUnit = self.unit(response.value);
            });
        },
        _getValue: function() {
            return {
                h: this.hemisphere(),
                z: this.zone(),
                x: this.options.geoFields[2].xyGeoField('value'),
                y: this.options.geoFields[3].xyGeoField('value')
            };
        },
        _setValue: function(value) {
            var wgs84 = this._getWgs84()[0];
            if (!value.h || !value.z) {
                $.extend(value, {
                    y: Math.abs(value.y),
                    h: getHemisphere(wgs84.y),
                    z: _getUTMZone(wgs84.x)
                });
            }
            return {
                h: this.hemisphere(value.h),
                z: this.zone(value.z),
                x: this.options.geoFields[2].xyGeoField('value', value.x),
                y: this.options.geoFields[3].xyGeoField('value', value.y)
            };
        },
        unit: function(lengthUnit) {
            if (lengthUnit === undefined) {
                this.options.lengthUnit = this.options.geoFields[2].xyGeoField('unit');
            } else {
                this.options.geoFields[2].xyGeoField('unit', lengthUnit);
                this.options.geoFields[3].xyGeoField('unit', lengthUnit);
                this.options.lengthUnit = this.options.geoFields[5].lengthSwitchGeoField('value', lengthUnit);
            }
            return this.options.lengthUnit;
        },
        convergence: function(value) {
            if (value === undefined) {
                this.options.convergence = this.options.geoFields[4].convergenceGeoField('value');
            } else {
                this.options.convergence = this.options.geoFields[4].convergenceGeoField('value', value);
            }
            return this.options.convergence;
        },
        zone: function(value) {
            if (value === undefined) {
                this.options.value.z = this.options.geoFields[1].zoneGeoField('value');
            } else {
                this.options.value.z = this.options.geoFields[1].zoneGeoField('value', value);
            }
            return this.options.value.z;
        },
        hemisphere: function(value) {
            if (value === undefined) {
                this.options.value.h = this.options.geoFields[0].hemisphereGeoField('value');
            } else {
                this.options.value.h = this.options.geoFields[0].hemisphereGeoField('value', value);
            }
            return this.options.value.h;
        },
        _toggle: function(enable) {
            this.options.geoFields[0].hemisphereGeoField('toggle', enable);
            this.options.geoFields[1].zoneGeoField('toggle', enable);
            this.options.geoFields[2].xyGeoField('toggle', enable);
            this.options.geoFields[3].xyGeoField('toggle', enable);
            return this.options.geoFields[5].lengthSwitchGeoField('toggle', enable);
        },
        _getStringValue: function() {
            var geoFields = this.options.geoFields;
            return geoFields[2].xyGeoField('getStringValue')+', '+geoFields[3].xyGeoField('getStringValue')+' '+geoFields[1].zoneGeoField('value')+geoFields[0].hemisphereGeoField('value');
        }
    });

    $.widget('twcc.cartesianFieldSet', $.twcc.fieldSet, {
        options: {
            labels: {},
            options: {},
            geoFields: {},
            lengthUnit: 'm',
            value: {},
            convergence: 0
        },
        _getGeoFieldsOptions: function() {
            return [
                {
                    type: 'xyGeoField',
                    options: {
                        label: this.options.labels.x,
                        lengthUnit: this.options.lengthUnit,
                        axis: 'x'
                    }
                },
                {
                    type: 'xyGeoField',
                    options: {
                        label: this.options.labels.y,
                        lengthUnit: this.options.lengthUnit,
                        axis: 'y'
                    }
                },
                {
                    type: 'convergenceGeoField',
                    options: {
                        value: this.options.convergence,
                        label: this.options.labels.convergence,
                        icon: this._getConvergenceIcon()
                    }
                },
                {
                    type: 'lengthSwitchGeoField',
                    options: {
                        value: this.options.lengthUnit,
                        unit: this.options.options.u
                    }
                }
            ];
        },
        _setFieldsHandlers: function() {
            var self = this;
            this._super();
            this.element.bind('lengthswitchgeofield.update_display', function(event, response) {
                self.options.lengthUnit = self.unit(response.value);
            });
        },
        _getValue: function() {
            return {
                x: this.options.geoFields[0].xyGeoField('value'),
                y: this.options.geoFields[1].xyGeoField('value')
            };
        },
        _setValue: function(value) {
            return {
                x: this.options.geoFields[0].xyGeoField('value', value.x),
                y: this.options.geoFields[1].xyGeoField('value', value.y)
            };
        },
        unit: function(lengthUnit) {
            if (lengthUnit === undefined) {
                this.options.lengthUnit = this.options.geoFields[0].xyGeoField('unit');
            } else {
                this.options.geoFields[0].xyGeoField('unit', lengthUnit);
                this.options.geoFields[1].xyGeoField('unit', lengthUnit);
                this.options.lengthUnit = this.options.geoFields[3].lengthSwitchGeoField('value', lengthUnit);
            }
            return this.options.lengthUnit;
        },
        convergence: function(value) {
            if (value === undefined) {
                this.options.convergence = this.options.geoFields[2].convergenceGeoField('value');
            } else {
                this.options.convergence = this.options.geoFields[2].convergenceGeoField('value', value);
            }
            return this.options.convergence;
        },
        _toggle: function(enable) {
            this.options.geoFields[0].xyGeoField('toggle', enable);
            this.options.geoFields[1].xyGeoField('toggle', enable);
            return this.options.geoFields[3].lengthSwitchGeoField('toggle', enable);
        },
        _getStringValue: function() {
            var geoFields = this.options.geoFields;
            return geoFields[0].xyGeoField('getStringValue')+', '+geoFields[1].xyGeoField('getStringValue');
        }
    });

    $.widget('twcc.sphericalDdFieldSet', $.twcc.fieldSet, {
        options: {
            labels: {},
            options: {},
            geoFields: {},
            value: {}
        },
        _getGeoFieldsOptions: function() {
            return [
                {
                    type: 'ddGeoField',
                    options: {
                        unit: this.options.units.y,
                        label: this.options.labels.y,
                        axis: 'y'
                    }
                },
                {
                    type: 'ddGeoField',
                    options: {
                        unit: this.options.units.x,
                        label: this.options.labels.x,
                        axis: 'x'
                    }
                },
                {
                    type: 'angleSwitchGeoField',
                    options: {
                        value: 'dd',
                        unit: this.options.options.o
                    }
                }
            ];
        },
        _getValue: function() {
            return {
                x: this.options.geoFields[1].ddGeoField('value'),
                y: this.options.geoFields[0].ddGeoField('value')
            };
        },
        _setValue: function(value) {
            return {
                x: this.options.geoFields[1].ddGeoField('value', value.x),
                y: this.options.geoFields[0].ddGeoField('value', value.y)
            };
        },
        _toggle: function(enable) {
            this.options.geoFields[0].ddGeoField('toggle', enable);
            this.options.geoFields[1].ddGeoField('toggle', enable);
            return this.options.geoFields[2].angleSwitchGeoField('toggle', enable);
        },
        _getStringValue: function() {
            var geoFields = this.options.geoFields;
            return geoFields[0].ddGeoField('getStringValue')+', '+geoFields[1].ddGeoField('getStringValue');
        }
    });

    $.widget('twcc.sphericalDmFieldSet', $.twcc.fieldSet, {
        options: {
            labels: {},
            options: {},
            geoFields: {},
            value: {}
        },
        _getGeoFieldsOptions: function() {
            return [
                {
                    type: 'dmGeoField',
                    options: {
                        label: this.options.labels.y,
                        options: this.options.options.y,
                        axis: 'y'
                    }
                },
                {
                    type: 'dmGeoField',
                    options: {
                        label: this.options.labels.x,
                        options: this.options.options.x,
                        axis: 'x'
                    }
                },
                {
                    type: 'angleSwitchGeoField',
                    options: {
                        value: 'dm',
                        unit: this.options.options.o
                    }
                }
            ];
        },
        _getValue: function() {
            return {
                x: this.options.geoFields[1].dmGeoField('value'),
                y: this.options.geoFields[0].dmGeoField('value')
            };
        },
        _setValue: function(value) {
            return {
                x: this.options.geoFields[1].dmGeoField('value', value.x),
                y: this.options.geoFields[0].dmGeoField('value', value.y)
            };
        },
        _toggle: function(enable) {
            this.options.geoFields[0].dmGeoField('toggle', enable);
            this.options.geoFields[1].dmGeoField('toggle', enable);
            return this.options.geoFields[2].angleSwitchGeoField('toggle', enable);
        },
        _getStringValue: function() {
            var geoFields = this.options.geoFields;
            return geoFields[0].dmGeoField('getStringValue')+', '+geoFields[1].dmGeoField('getStringValue');
        }
    });

    $.widget('twcc.sphericalDmsFieldSet', $.twcc.fieldSet, {
        options: {
            labels: {},
            options: {},
            geoFields: {},
            value: {}
        },
        _getGeoFieldsOptions: function() {
            return [
                {
                    type: 'dmsGeoField',
                    options: {
                        label: this.options.labels.y,
                        options: this.options.options.y,
                        axis: 'y'
                    }
                },
                {
                    type: 'dmsGeoField',
                    options: {
                        label: this.options.labels.x,
                        options: this.options.options.x,
                        axis: 'x'
                    }
                },
                {
                    type: 'angleSwitchGeoField',
                    options: {
                        value: 'dms',
                        unit: this.options.options.o
                    }
                }
            ];
        },
        _getValue: function() {
            return {
                x: this.options.geoFields[1].dmsGeoField('value'),
                y: this.options.geoFields[0].dmsGeoField('value')
            };
        },
        _setValue: function(value) {
            return {
                x: this.options.geoFields[1].dmsGeoField('value', value.x),
                y: this.options.geoFields[0].dmsGeoField('value', value.y)
            };
        },
        _toggle: function(enable) {
            this.options.geoFields[0].dmsGeoField('toggle', enable);
            this.options.geoFields[1].dmsGeoField('toggle', enable);
            return this.options.geoFields[2].angleSwitchGeoField('toggle', enable);
        },
        _getStringValue: function() {
            var geoFields = this.options.geoFields;
            return geoFields[0].dmsGeoField('getStringValue')+', '+geoFields[1].dmsGeoField('getStringValue');
        }
    });
    //endregion

    //region Geo Field widgets
    $.widget('twcc.geoField', {
        options: {
            name: null,
            unit: null,
            label: null,
            readOnly: false,
            lengthUnit: 'm',
            glue: '_',
            wrapper: {
                field: ['<span>'],
                fields: ['<div>', {class: 'cell fields'}],
                label: ['<div>', {class: 'cell label'}],
                options: ['<div>', {class: 'fields'}]
            },
            attributes: {},
            fields: {},
            icon: ''
        },
        _create: function() {
            var $cell, fieldsOptions,
                self = this;
            $.each(this.options.attributes, function(key) {
                var params = {
                    disabled: self.options.readOnly,
                    readonly: self.options.readOnly
                };
                self.options.attributes[key] = $.extend(params, self.options.attributes[key]);
            });
            $cell = this._getEmptyFieldCell();
            fieldsOptions = this._getFieldsOptions();
            this._setDefaultsFieldsOptions(fieldsOptions);
            $.each(fieldsOptions, function(name, fieldOptions) {
                var $field = self._buildField(name, fieldOptions);
                self._setFieldHandlers($field);
                $field.append(self._getFieldSetUnit(name));
                $field.append('&nbsp;');
                $cell.append($field);
            });
            this._appendLabelCell();
            this.element.append($cell);
        },
        _getFieldSetUnit: function(name) {
            return this.options.unit[name];
        },
        _setFieldHandlers: function() {
            //Do not remove
        },
        _clean: function(value, precision) {
            return this._superClean(value, precision);
        },
        _superClean: function(value, precision) {
            return isNaN(value) || value === null ? '' : App.math.round(value, precision || 0);
        },
        _buildField: function(name, fieldOptions) {
            this.options.fields[name] = $.apply(null, this.options.wrapper.field).field(fieldOptions);
            return this.options.fields[name];
        },
        _appendLabelCell: function() {
            var $label, $cell,
                id = this._getForId();
            if (id) {
                $label = $('<label>', {for: id}).html(this.options.icon + this.options.label);
            } else {
                $label = this.options.icon + this.options.label;
            }
            $cell = $.apply(null, this.options.wrapper.label).append($label);
            this.element.append($cell);
        },
        _getForId: function() {
            //Do not remove
        },
        _getEmptyFieldCell: function() {
            return $.apply(null, this.options.wrapper.fields);
        },
        _getFieldsOptions: function() {
            return {};
        },
        _setDefaultsFieldsOptions: function(obj) {
            var self = this;
            $.each(obj, function(key) {
                var params = {
                    name: self.options.name + self.options.glue + key,
                    attributes: self.options.attributes[key],
                    value: self._clean(self.options.value)
                };
                obj[key] = $.extend(params, obj[key]);
            });
        },
        value: function(value) {
            if (value === undefined) {
                this.options.value = this._constraint(this._getRawValue());
            } else {
                this.options.value = this._setValue(this._clean(value));
            }
            return this.options.value;
        },
        toggle: function(enable) {
            enable = enable === undefined ? this.options.readOnly : !!enable;
            this.options.readOnly = this._toggle(enable);
            return this.options.readOnly;
        },
        readOnly: function() {
            return this.options.readOnly;
        },
        _toggle: function(enable) {
            var self = this;
            $.each(this.options.fields, function(name, $field) {
                var fieldOptions = self._getFieldsOptions()[name];
                self._toggleField($field, enable, fieldOptions);
            });
            return !enable;
        },
        _toggleField: function($field, enable) {
            $field.field('toggle', enable);
        },
        _getRawValue: function() {
            return this.options.value;
        },
        getStringValue: function() {
            return this.options.value;
        },
        _constraint: function(value) {
            return value;
        },
        _setValue: function(value) {
            this.options.value = value;
        },
        _setOption: function(key, value) {
            this.options[key] = value;
            this._update();
        },
        _update: function() {
            this._destroy();
            this._create();
        },
        _destroy: function() {
            this.element.empty();
            return this._super();
        }
    });

    $.widget('twcc.ddGeoField', $.twcc.geoField, {
        options: {
            value: 0,
            attributes: {
                DD: {size: '20', class: 'width_5'}
            }
        },
        _getFieldsOptions: function() {
            return {
                DD: {
                    type: 'text'
                }
            };
        },
        _getForId: function() {
            return this.options.fields.DD.field('id');
        },
        _getRawValue: function() {
            return App.math.parseFloat(this.options.fields.DD.field('value'));
        },
        getStringValue: function() {
            return this.options.value + this._getFieldSetUnit('DD');
        },
        _setValue: function(value) {
            return this.options.fields.DD.field('value', value);
        },
        _constraint: function(value) {
            var max = this.options.axis === 'y' ? Math.atan(Math.sinh(Math.PI))*180/Math.PI : 180,
                min = -max;
            value = Math.max(value, min);
            value = Math.min(value, max);
            return value;
        },
        _clean: function(value) {
            return this._constraint(this._super(value, 15));
        }
    });

    $.widget('twcc.dmGeoField', $.twcc.ddGeoField, {
        options: {
            value: 0,
            options: {},
            attributes: {
                C: {size: '1'},
                D: {size: '4', class: 'width_1'},
                M: {size: '6', class: 'width_3'}
            }
        },
        _buildField: function(name, fieldOptions) {
            if (fieldOptions.type === 'option') {
                this.options.fields[name] = $.apply(null, this.options.wrapper.field).optionField(fieldOptions);
                return this.options.fields[name];
            } else {
                return this._superApply(arguments);
            }
        },
        _getFieldsOptions: function() {
            var value = this._clean(this.options.value);
            return {
                C: {
                    type: 'option',
                    value: value.C || '',
                    options: this.options.options
                },
                D: {
                    type: 'text',
                    value: this._superClean(value.D)
                },
                M: {
                    type: 'text',
                    value: this._superClean(value.M, 12)
                }
            };
        },
        _getForId: function() {
            return this.options.fields.D.field('id');
        },
        _getFieldSetUnit: function(name) {
            if (name != 'C') {
                return this._superApply(arguments);
            } else {
                return '';
            }
        },
        _getObjectValue: function() {
            return {
                C: this.options.fields.C.optionField('value'),
                D: App.math.parseFloat(this.options.fields.D.field('value')),
                M: App.math.parseFloat(this.options.fields.M.field('value'))
            };
        },
        value: function(value) {
            if (value === undefined) {
                this._clean(_dmToDd(this._getObjectValue()));
            } else {
                value = this._clean(value);
                this.options.fields.C.optionField('value', value.C || '');
                this.options.fields.D.field('value', this._superClean(value.D));
                this.options.fields.M.field('value', this._superClean(value.M, 12));
            }
            return this.options.value;
        },
        getStringValue: function() {
            var objectValue = this._getObjectValue();
            return objectValue.D + this._getFieldSetUnit('D') +
                objectValue.M + this._getFieldSetUnit('M') +
                objectValue.C;
        },
        _clean: function(ddValue) {
            this.options.value = this._constraint(ddValue);
            return _ddToDm(this.options.value, this.options.options);
        },
        _toggleField: function($field, enable, fieldOptions) {
            if (fieldOptions.type === 'option') {
                return $field.optionField('toggle', enable);
            } else {
                return this._superApply(arguments);
            }
        }
    });

    $.widget('twcc.dmsGeoField', $.twcc.dmGeoField, {
        options: {
            value: 0,
            options: {},
            attributes: {
                C: {size: '1'},
                D: {size: '4', class: 'width_1'},
                M: {size: '4', class: 'width_1'},
                S: {size: '6', class: 'width_3'}
            }
        },
        _getFieldsOptions: function() {
            var value = this._clean(this.options.value);
            return {
                C: {
                    type: 'option',
                    value: value.C || '',
                    options: this.options.options
                },
                D: {
                    type: 'text',
                    value: this._superClean(value.D)
                },
                M: {
                    type: 'text',
                    value: this._superClean(value.M)
                },
                S: {
                    type: 'text',
                    value: this._superClean(value.S, 12)
                }
            };
        },
        _getObjectValue: function() {
            return {
                C: this.options.fields.C.optionField('value'),
                D: App.math.parseFloat(this.options.fields.D.field('value')),
                M: App.math.parseFloat(this.options.fields.M.field('value')),
                S: App.math.parseFloat(this.options.fields.S.field('value'))
            };
        },
        value: function(value) {
            if (value === undefined) {
                this._clean(_dmsToDd(this._getObjectValue()));
            } else {
                value = this._clean(value);
                this.options.fields.C.optionField('value', value.C || '');
                this.options.fields.D.field('value', this._superClean(value.D));
                this.options.fields.M.field('value', this._superClean(value.M));
                this.options.fields.S.field('value', this._superClean(value.S, 12));
            }
            return this.options.value;
        },
        getStringValue: function() {
            var objectValue = this._getObjectValue();
            return objectValue.D + this._getFieldSetUnit('D') +
                objectValue.M + this._getFieldSetUnit('M') +
                objectValue.S + this._getFieldSetUnit('S') +
                objectValue.C;
        },
        _clean: function(ddValue) {
            this.options.value = this._constraint(ddValue);
            return _ddToDms(this.options.value, this.options.options);
        }
    });

    $.widget('twcc.switchGeoField', $.twcc.geoField, {
        _clean: function(value) {
            return this._constraint(value);
        },
        _setFieldHandlers: function($field) {
            var self = this;
            $field.find(':first-child').click(function(event) {
                self._trigger('.update_display', event, {value:self.value()});
            });
        },
        _appendLabelCell: function() {
            //Do not remove
        },
        _getEmptyFieldCell: function() {
            return $.apply(null, this.options.wrapper.options);
        },
        _setDefaultsFieldsOptions: function() {
            //Do not remove
        },
        _getRawValue: function() {
            return $('input:radio:checked', this.element).val();
        },
        _setValue: function(value) {
            this.element.find('input:radio[value="'+value+'"]').prop('checked', true);
            return value;
        },
        _getForId: function(name) {
            return this.options.fields[name].field('id');
        },
        _getFieldSetUnit: function(name) {
            var unit = this._superApply(arguments),
                id = this._getForId(name);
            return $('<label>', {for: id}).append(unit);
        }
    });

    $.widget('twcc.angleSwitchGeoField', $.twcc.switchGeoField, {
        options: {
            value: 'dd'
        },
        _getFieldsOptions: function() {
            this.options.value = this._clean(this.options.value);
            var name = this.options.name + '_DMS_DM_DD',
                value = this.options.value,
                isDD = value === 'dd',
                isDm = value === 'dm',
                isDms = !isDD && !isDm;
            return {
                _DMS: {
                    name: name,
                    type: 'radio',
                    value: 'dms',
                    attributes: {
                        checked: isDms
                    }
                },
                _DM: {
                    name: name,
                    type: 'radio',
                    value: 'dm',
                    attributes: {
                        checked: isDm
                    }
                },
                _DD: {
                    name: name,
                    type: 'radio',
                    value: 'dd',
                    attributes: {
                        checked: isDD
                    }
                }
            };
        },
        _constraint: function(value) {
            return $.inArray(value, ['dms', 'dm', 'dd']) < 0 ? 'dms' : value;
        }
    });

    $.widget('twcc.lengthSwitchGeoField', $.twcc.switchGeoField, {
        options: {
            value: 'm'
        },
        _getFieldsOptions: function() {
            this.options.value = this._clean(this.options.value);
            var name = this.options.name + '_M_KM_F',
                value = this.options.value,
                isKm = value === 'km',
                isFt = value === 'us-ft',
                isM = !isKm && !isFt;
            return {
                _M: {
                    name: name,
                    type: 'radio',
                    value: 'm',
                    attributes: {
                        checked: isM
                    }
                },
                _KM: {
                    name: name,
                    type: 'radio',
                    value: 'km',
                    attributes: {
                        checked: isKm
                    }
                },
                _F: {
                    name: name,
                    type: 'radio',
                    value: 'us-ft',
                    attributes: {
                        checked: isFt
                    }
                }
            };
        },
        _constraint: function(value) {
            return $.inArray(value, ['m', 'km', 'us-ft']) < 0 ? 'm' : value;
        }
    });

    $.widget('twcc.xyGeoField', $.twcc.geoField, {
        options: {
            value: 0,
            attributes: {
                XY: {size: '20', class: 'width_4'}
            }
        },
        _setFieldHandlers: function() {
            //Do not remove
        },
        _getFieldsOptions: function() {
            return {
                XY: {
                    type: 'text'
                }
            };
        },
        _getForId: function() {
            return this.options.fields.XY.field('id');
        },
        _getFieldSetUnit: function() {
            return this.options.unit.XY[this.options.lengthUnit];
        },
        _getRawValue: function() {
            return _toMeter(this.options.fields.XY.field('value'), this.options.lengthUnit);
        },
        getStringValue: function() {
            return this.options.fields.XY.field('value') + this.options.lengthUnit;
        },
        _setValue: function(value) {
            return _toMeter(this.options.fields.XY.field('value', value), this.options.lengthUnit);
        },
        _clean: function(value) {
            return this._super(_fromMeter(value, this.options.lengthUnit), this.options.lengthUnit == 'm' ? 2 : 5);
        },
        unit: function(lengthUnit) {
            if (lengthUnit !== undefined) {
                this.value();
                this.options.lengthUnit = this._cleanUnit(lengthUnit);
                this._update();
            }
            return this.options.lengthUnit;
        },
        _cleanUnit: function(value) {
            return $.inArray(value, ['m', 'km', 'us-ft']) < 0 ? 'm' : value;
        }
    });

    $.widget('twcc.zoneGeoField', $.twcc.geoField, {
        options: {
            value: 31,
            attributes: {
                Z: {size: '5', class: 'width_2'}
            }
        },
        _setFieldHandlers: function() {
            //Do not remove
        },
        _getFieldsOptions: function() {
            return {
                Z: {
                    type: 'text'
                }
            };
        },
        _getForId: function() {
            return this.options.fields.Z.field('id');
        },
        _getRawValue: function() {
            return parseInt(this.options.fields.Z.field('value'));
        },
        _setValue: function(value) {
            return this.options.fields.Z.field('value', value);
        },
        _constraint: function(value) {
            var min = 0;
            value = Math.max(value, min);
            return value;
        },
        _clean: function(value) {
            return this._constraint(this._super(value));
        }
    });

    $.widget('twcc.hemisphereGeoField', $.twcc.geoField, {
        options: {
            value: 'n',
            attributes: {
                E: {size: '1'}
            }
        },
        _setFieldHandlers: function() {
            //Do not remove
        },
        _getFieldsOptions: function() {
            return {
                E: {
                    type: 'option',
                    options: this.options.options
                }
            };
        },
        _getForId: function() {
            return this.options.fields.E.optionField('id');
        },
        _getFieldSetUnit: function() {
            //Do not remove
        },
        _buildField: function(name, fieldOptions) {
            this.options.fields[name] = $.apply(null, this.options.wrapper.field).optionField(fieldOptions);
            return this.options.fields[name];
        },
        _clean: function(value) {
            return this._constraint(value || 'n');
        },
        _getRawValue: function() {
            return this.options.fields.E.optionField('value');
        },
        _constraint: function(value) {
            return $.inArray(value, ['n', 's']) < 0 ? 'n' : value;
        },
        _setValue: function(value) {
            return this.options.fields.E.optionField('value', value);
        },
        _toggleField: function($field, enable) {
            return $field.optionField('toggle', enable);
        }
    });

    $.widget('twcc.csvGeoField', $.twcc.geoField, {
        options: {
            value: '',
            attributes: {
                CSV: {rows: '5', wrap: 'off'}
            }
        },
        _setFieldHandlers: function() {
            //Do not remove
        },
        _getFieldsOptions: function() {
            return {
                CSV: {
                    type: 'textarea'
                }
            };
        },
        _getFieldSetUnit: function() {
            return '';
        },
        _getForId: function() {
            return this.options.fields.CSV.textareaField('id');
        },
        _buildField: function(name, fieldOptions) {
            this.options.fields[name] = $.apply(null, this.options.wrapper.field).textareaField(fieldOptions);
            return this.options.fields[name];
        },
        _clean: function(value) {
            return this._constraint(value || '');
        },
        _getRawValue: function() {
            return this.options.fields.CSV.textareaField('value');
        },
        _setValue: function(value) {
            return this.options.fields.CSV.textareaField('value', value);
        },
        _toggleField: function($field, enable) {
            return $field.textareaField('toggle', enable);
        }
    });

    $.widget('twcc.convergenceGeoField', $.twcc.geoField, {
        options: {
            value: 0,
            attributes: {
                CONVERGENCE: {size: '10', class: 'width_4', readonly: true}
            }
        },
        _setFieldHandlers: function() {
            //Do not remove
        },
        _getFieldsOptions: function() {
            return {
                CONVERGENCE: {
                    type: 'text'
                }
            };
        },
        _getForId: function() {
            return this.options.fields.CONVERGENCE.field('id');
        },
        _getRawValue: function() {
            return this.options.fields.CONVERGENCE.field('value');
        },
        _constraint: function(value) {
            var max = 360,
                min = -max;
            value = Math.max(value, min);
            value = Math.min(value, max);
            return value;
        },
        _setValue: function(value) {
            return this.options.fields.CONVERGENCE.field('value', value);
        },
        _clean: function(value) {
            return this._constraint(this._super(value, 4));
        }
    });

    $.widget('twcc.connectorGeoField', $.twcc.geoField, {
        options: {
            value: ''
        },
        _setFieldHandlers: function() {
            //Do not remove
        },
        _getFieldsOptions: function() {
            return {
                XX: {type: 'text'}
            };
        },
        _appendLabelCell: function() {
            //Do not remove
        },
        _getRawValue: function() {
            return this.options.fields.XX.field('value');
        },
        _setValue: function(value) {
            return this.options.fields.XX.field('value', value);
        },
        _constraint: function(value) {
            return value;
        },
        _clean: function(value) {
            return this._constraint(value);
        }
    });

    $.widget('twcc.labelGeoField', $.twcc.geoField, {
        options: {
            value: ''
        },
        _create: function() {
            this._super();
            this.options.fields.L.text(this.options.value);
        },
        _buildField: function(name, fieldOptions) {
            this.options.fields[name] = fieldOptions;
            return this.options.fields[name];
        },
        _setFieldHandlers: function() {
            //Do not remove
        },
        _getFieldsOptions: function() {
            return {
                L: $('<span>')
            };
        },
        _getFieldSetUnit: function() {
            return '';
        },
        _getRawValue: function() {
            return this.options.fields.L.text();
        },
        _constraint: function(value) {
            return value;
        },
        _setValue: function(value) {
            this.options.fields.L.text(value);
            return value;
        },
        _clean: function(value) {
            return this._constraint(value);
        },
        _toggleField: function() {
            return this.options.readonly;
        }
    });
    //endregion

    //region Field widgets
    $.widget('twcc.field', {
        options: {
            type: null,
            value: null,
            name: null,
            glue: '_id_',
            attributes: {},
            readOnly: false
        },
        _create: function() {
            this.options.attributes = $.extend({
                val: this.options.value,
                id: this.options.name + this.options.glue + Math.floor(Math.random()*10001),
                name: this.options.name,
                disabled: this.options.readOnly,
                readonly: this.options.readOnly
            }, this.options.attributes);
            this._setTag();
        },
        _setTag: function() {
            $.extend(this.options.attributes, {type: this.options.type});
            this.element.tag({
                name: 'input',
                attributes: this.options.attributes
            });
        },
        value: function(value) {
            if (value === undefined) {
                this.options.value = this.element.tag('value');
            } else {
                this.options.value = this.element.tag('value', value);
            }
            return this.options.value;
        },
        toggle: function(enable) {
            enable = enable === undefined ? this.options.readOnly : !!enable;
            this.options.readOnly = this._toggle(enable);
            return this.options.readOnly;
        },
        _toggle: function(enable) {
            return this.element.tag('toggle', enable);
        },
        readOnly: function() {
            return this.options.readOnly;
        },
        id: function() {
            return this.options.attributes.id;
        },
        _setOption: function(key, value) {
            this.options[key] = value;
            this._update();
        },
        _update: function() {
            this._destroy();
            this._create();
        },
        _destroy: function() {
            this.element.empty();
            return this._super();
        }
    });

    $.widget('twcc.textareaField', $.twcc.field, {
        options: {
            type: 'textarea'
        },
        _setTag: function() {
            this.element.tag({
                name: 'textarea',
                attributes: this.options.attributes
            });
        }
    });

    $.widget('twcc.optionField', $.twcc.field, {
        options: {
            type: 'option',
            options: {}
        },
        _setTag: function() {
            this.element.selectTag({
                attributes: this.options.attributes,
                options: this.options.options
            });
        },
        value: function(value) {
            if (value === undefined) {
                this.options.value = this.element.selectTag('value');
            } else {
                this.options.value = this.element.selectTag('value', value);
            }
            return this.options.value;
        },
        _toggle: function(enable) {
            return this.element.selectTag('toggle', enable);
        }
    });
    //endregion

    //region Tag widgets
    $.widget('twcc.tag', {
        options: {
            name: null,
            attributes : {},
            readOnly: false
        },
        _$elt: null,
        _create: function() {
            var checked;
            if (this.options.attributes.val) {
                this.options.attributes.val = this._clean(this.options.attributes.val);
            }
            if (this.options.attributes.hasOwnProperty('checked')) {
                checked = this.options.attributes.checked;
                delete this.options.attributes.checked;
            }
            this._$elt = $('<'+this.options.name+'>', this.options.attributes);
            if (checked !== undefined) {
                this._$elt.prop('checked', checked);
            }
            this._appendChildren();
            this.value(this.options.attributes.val);
            this.element.append(this._$elt);
        },
        value: function(value) {
            if (value === undefined) {
                this.options.attributes.val = this._$elt.val();
            } else {
                this.options.attributes.val = this._clean(value);
                this._$elt.val(this.options.attributes.val);
            }
            return this.options.attributes.val;
        },
        toggle: function(enable) {
            var disable = enable === undefined ? this.options.readOnly : !enable;
            this.options.readOnly = this._toggle(disable);
            return this.options.readOnly;
        },
        _toggle: function(disable) {
            this._$elt
                .prop('disabled', disable)
                .prop('readonly', disable);
            return disable;
        },
        readOnly: function() {
            return this.options.readOnly;
        },
        _clean: function(value) {
            // Prevent scientific notation due to the Number.toString() method
            if (typeof(value) === 'number' && value.toString().split('e').length > 1) {
                value =  App.math.round(value);
            }
            return value;
        },
        _appendChildren: function() {
            //do not remove
        },
        _setOption: function(key, value) {
            this.options[key] = value;
            this._update();
        },
        _update: function() {
            this._destroy();
            this._create();
        },
        _destroy: function() {
            this._$elt.remove();
            return this._super();
        }
    });

    $.widget('twcc.selectTag', $.twcc.tag, {
        options: {
            name: 'select',
            options: {}
        },
        _$elt: null,
        _appendChildren: function() {
            var self = this;
            $.each(this.options.options, function(optVal, optText) {
                self._$elt.append($('<option>', {
                    value: optVal,
                    text: optText
                }));
            });
        }
    });
    //endregion
})(jQuery, proj4, TWCCHistory, App);
