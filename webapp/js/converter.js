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
 * Events triggered by TWCCConverter and attached to the body:
 *  - converter.success (obj)
 */


(function ($) {
    "use strict";
    /*global document, window, jQuery, console */

    if (window.TWCCConverter !== undefined) {
        return;
    }

    var instance,
        init = function (opts) {
            var _dfd = null,
                _converterWidget = null,
                _defIdx = 0,
                _options = $.extend(true, {}, opts);

            function _t() {
                return _options.utils.t.apply(this, arguments);
            }

            function _newDeferred() {
                return _options.utils.newDeferred.apply(this, arguments);
            }

            function _getErrorMessage(XMLHttpRequest) {
                return _t('errorContactUs').replace('%s', XMLHttpRequest.status.toString());
            }

            function _checkCRS(value, target) {
                var msg = '',
                    reg = new RegExp("\\+title=[^\\+]+", "i");
                if (value === '') return '';
                value = value.toString().replace(reg, "");
                $.each(_converterWidget.options.definitions, function (country, crs) {
                    $.each(crs, function (srsCode, definition) {
                        var definitionString = definition.def || "";
                        if (srsCode.toUpperCase() == value.toUpperCase() || definitionString.toUpperCase().replace(reg, "") == value.toUpperCase()) {
                            msg = _t('crsAlreadyExists') + country + " > " + (definitionString ? _options.utils.getTitleFromDefinitionString(definitionString, srsCode) : srsCode);
                            _selection(target, srsCode);
                            return false;
                        }
                    });
                    if (msg !== '') return false;
                });
                return msg;
            }

            function _addSystem(definitionString, srsCode) {
                var promise,
                    definition = {'*[UD]': {}};
                definition['*[UD]'][srsCode] = {
                    def: definitionString,
                    isConnector: false
                };
                promise = _converterWidget.mergeDefinitions(definition);
                return promise;
            }

            function _alertPNew(checkMsg, failed) {
                alert(checkMsg);
                $('#loadingxtra').hide();
                $('#new-form').show();
                if (!failed) {
                    $('#p-new').dialog("close");
                    $('#find-reference').val('');
                    $('#add-reference').val('');
                } else {
                    _defIdx--;
                }
            }

            function _getThirdPartyUrl(srsCode, baseUrl, toUpperCase) {
                var params = srsCode.split(':');
                toUpperCase = toUpperCase || false;
                return baseUrl.replace(/\$\{\d\}/ig, function (index) {
                    index = index.match(/\d+/)[0];
                    var value = params[index] || index;
                    return toUpperCase ? value.toUpperCase() : value.toLowerCase();
                });
            }

            function _loadProj4jsFormat(srsCode, method, options) {
                method(options).done(function (def) {
                    _addNewReference(def);
                }).fail(function (jqXHR) {
                    _alertPNew(_getErrorMessage(jqXHR), true);
                });
            }

            function _addSpatialReferenceDefinition(srsCode) {
                var url = _getThirdPartyUrl(srsCode, 'https://spatialreference.org/ref/${0}/${1}/proj4.txt');
                window.Proj4js = {defs: {}};
                _loadProj4jsFormat(srsCode, $.fn.getXDomain, {
                    url: url,
                    dataType: 'text'
                });
            }

            function _addLocalDefinition(srsCode) {
                var url = _getThirdPartyUrl(srsCode, '/js/data/defs/${0}${1}.js', true);
                _loadProj4jsFormat(srsCode, $.ajax, {
                    url: url,
                    cache: true,
                    dataType: 'script'
                });
            }

            function _addNewReference(defData) {
                var title, srsCode, defMatch, checkMsg, newTitle,
                    target = $("#new-form input[name='target']").val(),
                    DEFDATA = defData.toUpperCase(),
                    isEpsg = DEFDATA.indexOf("EPSG:") === 0,
                    isEsri = DEFDATA.indexOf("ESRI:") === 0,
                    isIau = DEFDATA.indexOf("IAU2000:") === 0,
                    isSrOrg = DEFDATA.indexOf("SR-ORG:") === 0,
                    isIgnf = DEFDATA.indexOf("IGNF:") === 0;
                $('#new-form').hide();
                $('#loadingxtra').show();
                checkMsg = _checkCRS(defData, target);
                if (checkMsg) {
                    _alertPNew(checkMsg);
                    return;
                }
                if (isEpsg || isEsri || isIau || isSrOrg) {
                    srsCode = DEFDATA;
                    _addSpatialReferenceDefinition(srsCode);
                } else if (isIgnf) {
                    srsCode = DEFDATA;
                    _addLocalDefinition(srsCode);
                } else {
                    defMatch = defData.match(new RegExp("^[^\\[]+\\[\"([^\\]]+)\"\\][\\s=]+\"([^\"]+)\";$", "i"));
                    if (defMatch !== null) {
                        defData = defMatch[2];
                    }
                    title = _options.utils.getTitleFromDefinitionString(defData, '');
                    _defIdx++;
                    srsCode = 'UD' + _defIdx;
                    if (title === undefined) {
                        title = _t('undefinedTitle');
                        defData = '+title=' + title + ' ' + defData;
                    }
                    newTitle = srsCode + ' ' + title;
                    defData = defData.replace('+title=' + title, '+title=' + newTitle);
                    checkMsg = _checkCRS(srsCode, target);
                    if (!checkMsg) {
                        checkMsg = _checkCRS(defData, target);
                    }
                    if (checkMsg) {
                        _alertPNew(checkMsg);
                        return;
                    }
                    _addSystem(defData, srsCode).done(function () {
                        $('#loadingxtra').hide();
                        $('#new-form').show();
                        var currentSelection = _selection(target);
                        try {
                            _selection(target, srsCode);
                            alert(_t('newSystemAdded') + '"' + newTitle + '".');
                            $('#p-new').dialog("close");
                            $('#find-reference').val('');
                            $('#add-reference').val('');
                            _options.utils.sendMsg('New user-defined system:\n\r' + srsCode + ' = "' + defData + '"');
                        } catch (e) {
                            _defIdx--;
                            _selection(target, currentSelection);
                            _unload(srsCode);
                            if (defData === '') {
                                alert((_t('errorContactUs')).replace('%s', '-2 (NotFound)'));
                            } else {
                                alert((_t('errorContactUs')).replace('%s', '-1 (WrongFormat:' + defData + ')'));
                            }
                        }
                    });
                }
            }

            function _unload(srsCode) {
                _converterWidget.unloadCRS(srsCode);
            }

            function _selection(target, srsCode) {
                target = target.toLowerCase();
                var pushPull = 'pushPull' + target.charAt(0).toUpperCase() + target.slice(1);
                return _converterWidget[pushPull]('selection', srsCode);
            }

            function _initConverter() {
                var converterContext = _options.context.converter,
                    sourceSrsCode = converterContext.defaultSourceSrs,
                    destinationSrsCode = converterContext.defaultDestSrs,
                    wgs84 = converterContext.defaultWgs84,
                    wgs84IsValid = !(wgs84 === '' || wgs84.x === '' || wgs84.y === ''),
                    $converter = $('#converter'),
                    $body = $('body'),
                    converterOptions = {
                        units: {
                            dms: {D: _t('unitDegree'), M: _t('unitMinute'), S: _t('unitSecond')},
                            dd: {x: {DD: _t('unitDegreeEast')}, y: {DD: _t('unitDegreeNorth')}},
                            cartesian: {
                                XY: {m: _t('unitMeter'), km: _t('unitKilometer'), 'us-ft': _t('unitFeet')},
                                CONVERGENCE: _t('unitDegree')
                            }
                        },
                        labels: {
                            spherical: {x: _t('labelLng'), y: _t('labelLat'), convergence: _t('labelConvergence')},
                            cartesian: {
                                x: _t('labelX'),
                                y: _t('labelY'),
                                z: _t('labelZone'),
                                h: _t('labelHemi'),
                                convergence: _t('labelConvergence')
                            },
                            csv: {csv: _t('labelCsv'), l: _t('labelFormat')}
                        },
                        options: {
                            x: {E: _t('optionE'), W: _t('optionW')},
                            y: {N: _t('optionN'), S: _t('optionS')},
                            o: {_DMS: _t('optionDMS'), _DM: _t('optionDM'), _DD: _t('optionDD')},
                            h: {n: _t('optionNorth'), s: _t('optionSouth')},
                            u: {_M: _t('optionM'), _KM: _t('optionKM'), _F: _t('optionF')}
                        }
                    };

                if (converterContext.fromUrl && !wgs84IsValid) {
                    alert('Invalid URL');
                }
                wgs84 = (converterContext.fromUrl && wgs84IsValid) ? [wgs84] : converterContext.fromRss ? [{
                    x: 10,
                    y: 10
                }] : null;
                _options.context.converter.fromUrl = false;
                _options.context.converter.fromRss = false;
                _dfd = _newDeferred('Converter');
                _converterWidget = $converter.converterSet({
                    units: converterOptions.units,
                    labels: converterOptions.labels,
                    options: converterOptions.options,
                    wgs84: wgs84,
                    defaultWgs84: [_options.utils.getRandomCityLocation()],
                    value: {x: 0, y: 0},
                    selections: {
                        source: sourceSrsCode,
                        destination: destinationSrsCode
                    },
                    url: _options.system.httpServer + '/' + _options.system.dirWsIncludes + 'c.php'
                }).data('twccConverterSet');
                $converter.one('converterset.done', function (event, data) {
                    _dfd.resolve(data);
                });
                $converter.on('converterset.fail', function (event, data) {
                    var errorMessage = _getErrorMessage.call(null, data);
                    alert(errorMessage);
                });
                $body.on('click', '#new-reference', function (event) {
                    event.preventDefault();
                    var defData = $('#add-reference').val();
                    _addNewReference(defData);
                });
                $body.on('submit', '#new-form', function (event) {
                    event.preventDefault();
                    $('#new-reference').click();
                });
                $body.on('ui.convergence_changed', function (evt, response) {
                    _converterWidget.setConvergence(response.data);
                });
                $body.on('ui.csv_changed', function (evt, response) {
                    _converterWidget.csv(response.data);
                });
                $('.to-remove').remove();
            }

            _initConverter();
            return {
                promise: _dfd.promise(),
                converterWidget: _converterWidget,
                setSelection: _selection
            };
        };

    // exports
    window.TWCCConverter = {
        getInstance: function (opts) {
            instance = instance || init(opts);
            return instance;
        }
    };
})(jQuery);