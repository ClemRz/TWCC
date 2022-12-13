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
 * Events triggered by TWCCUi and attached to the body:
 *  - ui.clickconvert (selctor)
 *  - ui.modechanged (mode)
 */

(function ($, ClipboardJS) {
    "use strict";
    /*global window, document */

    if (window.TWCCUi !== undefined) {
        return;
    }

    var instance;

    function init(opts) {
        var _clipboardJsClient,
            _dfd = null,
            _convergenceConvention = true,
            _options = $.extend(true, {}, opts),
            _SHDelay = 250,
            _paletteTimer = {},
            _isLight = !!$('.light').length;

        function _trigger(eventName, data) {
            var $anchor = $('body');
            _options.utils.trigger($anchor, eventName, data);
        }

        function _t() {
            return _options.utils.t.apply(this, arguments);
        }

        function _newDeferred() {
            return _options.utils.newDeferred.apply(this, arguments);
        }

        function _initBeautyTipsUi() {
            var btOptions = {
                trigger: 'none',
                showTip: function (box) {
                    $(box).fadeIn(_SHDelay);
                },
                hideTip: function (box, callback) {
                    $(box).animate({opacity: 0}, _SHDelay, callback);
                },
                shrinkToFit: true,
                padding: '0px',
                windowMargin: '0px',
                fill: 'rgba(0, 0, 0, .9)',
                cornerRadius: 10,
                strokeWidth: 1,
                shadow: true,
                shadowOffsetX: 3,
                shadowOffsetY: 3,
                shadowBlur: 3,
                shadowColor: 'rgba(6,6,6,.5)',
                shadowOverlap: false,
                noShadowOpts: {strokeStyle: '#666', strokeWidth: 1},
                positions: ['left', 'top'],
                cssStyles: {color: '#FFF'},
                closeWhenOthersOpen: true,
                clickAnywhereToClose: false
            }, $crsList = $('.crs-list');
            $.extend($.bt.defaults, btOptions);
            $crsList.first().bt({contentSelector: "$('.help-1')"});
            $crsList.last().bt({contentSelector: "$('.help-2')"});
            $('.source .container').bt({contentSelector: "$('.help-3')"});
            $('.source .convert-button').bt({contentSelector: "$('.help-4')"});
            $('.next_button').button({icons: {secondary: 'ui-icon-seek-next'}});
        }

        function _initConverterUi() {
            $('.previous.history').button({icons: {primary: 'ui-icon-seek-first'}, text: false});
            $('#help').button({icons: {primary: 'ui-icon-help'}, text: false});
            $('.next.history').button({icons: {primary: 'ui-icon-seek-end'}, text: false});
            $('.source .convert-button').button({icons: {primary: 'ui-icon-arrowthick-1-s'}});
            $('.destination .convert-button').button({icons: {primary: 'ui-icon-arrowthick-1-n'}});
            $('#converter').draggable({handle: '.drag-handle'});
            $('input[type="text"]', '#p-research').addClass('ui-corner-all');
            $('#p-new').dialog({
                closeText: _t('close'),
                modal: true,
                title: _t('customSystem'),
                width: _isLight ? "95%" : 400,
                autoOpen: false
            });
            $('#p-crs').dialog({
                closeText: _t('close'),
                modal: true,
                title: _t('systemDefinition'),
                width: _isLight ? "95%" : 500,
                autoOpen: false
            });
            $('#p-research').dialog({
                closeText: _t('close'),
                modal: true,
                title: _t('research'),
                width: _isLight ? "95%" : 400,
                autoOpen: false
            });
            _setHistoryButtons(0, 0);
        }

        function _initOptionsUi() {
            $('.button-set').buttonset();
            $('#auto-zoom-toggle').button({icons: {primary: 'ui-icon-zoomin'}, text: false, disabled: true});
            /*$('#print-map').button({icons: {primary: 'ui-icon-print'}, text: false});*/
            if (!_isLight) {
                $('#full-screen')
                    .button({icons: {primary: 'ui-icon-arrow-4-diag'}, text: false})
                    .closest('p').toggle($(document).fullScreen() !== null);
            }
            $('#o-container').accordion({
                collapsible: true,
                active: false,
                heightStyle: 'content',
                icons: {header: 'ui-icon-gear'}
            });
            $('#p-convention_help').dialog({
                closeText: _t('close'),
                modal: true,
                title: _t('conventionTitle'),
                width: _isLight ? "95%" : 840,
                autoOpen: false
            });
        }

        function _initAdsenseUi() {
            var parameters = _options.system.adsense.parameters;
            window.adsbygoogle = window.adsbygoogle || [];
            $('ins.adsbygoogle').each(function () {
                window.adsbygoogle.push({params: $.extend({}, parameters)});
            });
        }

        function _initGeneralUi() {
            var hash = _getAddressBarAnchor(),
                $pDonate = $('#p-donate'),
                $pLoading = $('#p-loading'),
                progressbar = $pLoading.find('.progressbar'),
                progressLabel = $('.progress-label');
            $('.section, .searchbtn').addClass('ui-corner-all');
            $('.view').addClass('ui-corner-br ui-corner-tr');
            $('.search-field').addClass('ui-corner-bl ui-corner-tl');
            $('#p-poll').dialog({
                closeText: _t('close'),
                modal: true,
                title: _t('poll'),
                width: _isLight ? "95%" : 500,
                open: function () {
                    _addAnchorToAddressBar('poll');
                },
                close: function () {
                    _removeAnchorFromAddressBar('poll');
                },
                autoOpen: hash == 'poll'
            });
            if (_options.system.raterMasterSw && !_options.context.session.userHasRatedOne) {
                _showPoll(false);
            }
            $('#p-contact').dialog({
                closeText: _t('close'),
                modal: true,
                title: _t('contactUs'),
                width: _isLight ? "95%" : 500,
                open: function () {
                    _addAnchorToAddressBar('contact');
                },
                close: function () {
                    _removeAnchorFromAddressBar('contact');
                },
                autoOpen: hash == 'contact'
            });
            $('.contact-button').button({icons: {secondary: 'ui-icon-mail-closed'}});
            $pDonate.find('input.dont-show-again').prop('checked', _getPreferenceCookie('p-donate'));
            $('.help-1').find('input.dont-show-again').prop('checked', _getPreferenceCookie('help-1'));
            $pDonate.dialog({
                closeText: _t('close'),
                modal: true,
                title: _t('donate'),
                width: _isLight ? "95%" : 750,
                open: function () {
                    _addAnchorToAddressBar('donate');
                },
                close: function () {
                    _removeAnchorFromAddressBar('donate');
                },
                autoOpen: hash == 'donate'
            });
            $pDonate.find('.progressbar').progressbar({
                value: _options.donations.total,
                max: _options.donations.max
            });
            progressbar.progressbar({
                value: false,
                change: function () {
                    progressLabel.text(Math.round(progressbar.progressbar('value')) + '%');
                },
                complete: function () {
                    progressLabel.text('Complete!');
                }
            });
            $('#p-about').dialog({
                closeText: _t('close'),
                modal: true,
                title: _t('about'),
                width: _isLight ? "95%" : '70%',
                open: function () {
                    _addAnchorToAddressBar('about');
                },
                close: function () {
                    _removeAnchorFromAddressBar('about');
                },
                autoOpen: hash == 'about'
            });
            $('body').on('history.indexchanged', function (event, response) {
                var history = response.data;
                _setHistoryButtons(history.currentIndex, history.maxIndex);
            });
            $('#p-info').dialog({
                closeText: _t('close'),
                modal: true,
                title: 'Information',
                width: _isLight ? "95%" : 750,
                autoOpen: true
            });
            $('#csvFeatures').hide();
            $('#language')
                .find('>dt>a')
                .button({icons: {secondary: 'ui-icon-triangle-1-s'}});
            if (_options.system.facebookEnabled) {
                window.fbAsyncInit = function () {
                    FB.init({
                        appId: _options.system.facebookAppId,
                        xfbml: true,
                        version: 'v2.2'
                    });
                };
                $.fn.getXDomain({
                    url: 'http://connect.facebook.net/' + _options.context.locale + '/sdk.js'
                });
            }
            /*if (!_options.context.isDevEnv) {
                window.___gcfg = {
                    lang: _options.context.googlePlusLocale,
                    parsetags: 'onload'
                };
                $.fn.getXDomain({
                    url: 'https://apis.google.com/js/plusone.js'
                });
            }*/
            $pLoading.dialog({
                dialogClass: 'no-close',
                modal: true,
                title: _t('loading'),
                autoOpen: true
            });
            $('.ui-widget-overlay').css({
                backgroundImage: 'none',
                opacity: 0.7
            });
        }

        function _getTarget($elt) {
            return $elt.closest('.converter-container').hasClass('source') ? 'source' : 'destination';
        }

        function _bindConverterPanelEvents() {
            var $snipet = $('a.snippet'),
                offset = 16,
                $converter = $('#converter'),
                $body = $('body');
            $snipet.on('mouseenter', function () {
                $('body').append('<div id="Tip" style="z-index:9999;" class="ui-corner-all"><img src="' + this.href + '" alt="' + this.href + '"><\/div>');
            });
            $snipet.on('mousemove', function (event) {
                $('#Tip')
                    .css({'left': event.pageX + offset, 'top': event.pageY + offset})
                    .show();
            });
            $snipet.on('mouseout', function () {
                $('#Tip').remove();
            });
            $snipet.click(function (event) {
                event.preventDefault();
            });
            $('.search-crs').click(function (event) {
                var target = _getTarget($(this));
                event.preventDefault();
                $('#select').val(target);
                $('#p-research').dialog('open');
            });
            $converter.on('converter.info', _showCrsInfo);
            $converter.on('click', '.show-p-new', function (event) {
                var target = _getTarget($(this));
                event.preventDefault();
                $('#new-form input[name="target"]').val(target);
                $('#p-new').dialog('open');
            });
            $body.on('click', '#view-reference', function (event) {
                var url = 'http://spatialreference.org/ref/?search=' + encodeURIComponent($('#find-reference').val());
                event.preventDefault();
                window.open(url);
            });
            $body.on('submit', '#reference-form', function (event) {
                event.preventDefault();
                $('#view-reference').click();
            });
            $('#crsResult').on('change', function (event) {
                _updateConverterWithSelectedSrs($(event.target).val());
            });
            $('#research').click(function (event) {
                event.preventDefault();
                _goResearch();
            });
            _clipboardJsClient = new ClipboardJS('#converter .octicon-clippy', {
                text: function (trigger) {
                    var $target = $(trigger),
                        $container = $target.closest('.converter-container');
                    if ($container.length) {
                        return $container.converter('value').toString();
                    }
                }
            });
            _clipboardJsClient.on('success', function (event) {
                $(event.trigger).animate({opacity: 0.3}, 500, function () {
                    $(this).animate({opacity: 1}, 500);
                });
                _trigger('clipboard.aftercopy');
            });
        }

        function _startHelp() {
            if (!_isLight) {
                $('#help').animate({opacity: 'hide'}, _SHDelay);
                $('.crs-list').first().btOn();
            }
        }

        function _startHelpIfCookieAllowsIt() {
            if (!_getPreferenceCookie('help-1')) {
                _startHelp();
            }
        }

        function _bindBeautyTipsEvents() {
            $('.close_button, .help-4 .next_button').click(function (event) {
                event.preventDefault();
                $('#help').animate({opacity: 'show'}, _SHDelay);
            });
            $('.next_button').click(function (event) {
                event.preventDefault();
            });
            $('.close_button', '.help-1').click(function () {
                $('.crs-list').first().btOff();
            });
            $('.close_button', '.help-2').click(function () {
                $('.crs-list').last().btOff();
            });
            $('.close_button', '.help-3').click(function () {
                $('.source .container').btOff();
            });
            $('.close_button, .next_button', '.help-4').click(function () {
                $('.source .convert-button').btOff();
            });
            $('.next_button', '.help-1').click(function () {
                $('.crs-list').last().btOn();
            });
            $('.next_button', '.help-2').click(function () {
                $('.source .container').btOn();
            });
            $('.next_button', '.help-3').click(function () {
                $('.source .convert-button').btOn();
            });
            $('.help-1').find('input.dont-show-again').on('change', function () {
                _setPreferenceCookie('help-1', $(this)[0].checked);
            });
            $('#help').click(function () {
                event.preventDefault();
                _startHelp();
            });
        }

        function _bindLanguageEvents() {
            var $ul = $('.dropdown dd ul'),
                $a = $('.dropdown dt a');

            $a.click(function (event) {
                event.preventDefault();
                $ul.slideToggle(200);
            });
            $ul.find('li a').click(function (event) {
                var html, value;
                event.preventDefault();
                html = $(this).html();
                value = $(this).parent().find('span.value').text();
                $a.find('span').html(html);
                $ul.hide();
                document.location.href = $(this).prop('href');
            });
            $(document).click(function (event) {
                var $clicked = $(event.target);
                if (!$clicked.parents().hasClass('dropdown')) {
                    $ul.hide();
                }
            });
        }

        function _setCsvMode(isCsv) {
            _setMode(isCsv);
            _trigger('ui.csv_changed', isCsv);
        }

        function _togglePalette(target, palette) {
            if (!_isLight && $(document).fullScreen()) {
                if ($(palette).is(':hidden')) {
                    $(palette).fadeIn();
                } else if ($(target).closest(palette).length) {
                    clearInterval(_paletteTimer[palette]);
                } else {
                    clearInterval(_paletteTimer[palette]);
                    _paletteTimer[palette] = setTimeout(function () {
                        if ($(document).fullScreen()) {
                            $(palette).fadeOut();
                        }
                    }, 1000);
                }
            }
        }

        function _bindOptionsPanelEvents() {
            $('.convention').click(function (event) {
                event.preventDefault();
                $('#p-convention_help').dialog('open');
            });
            /*$('#print-map').click(function(event) {
                event.preventDefault();
                _options.utils.openStaticMap();
            });*/
            $('#full-screen').click(function (event) {
                event.preventDefault();
                _trigger('ui.full_screen');
            });
            $('#auto-zoom-toggle').click(function () {
                _options.utils.enableAutoZoom($(this).is(':checked'));
            });
            $('input[name="csv"]').click(function () {
                var isCsv = !!+$(this).val();
                _setCsvMode(isCsv);
            });
            $('input[name="convention"]').click(function () {
                _setConvergenceConvention(!!+$(this).val());
            });
            $('body').on('converterset.csv_changed main.ready', function (event, obj) {
                var isCsv = obj.data === undefined ? obj.csv : obj.data.csv;
                _setCsvButtonset(isCsv);
                _setMode(isCsv);
            });
        }

        function _bindOtherPanelsEvents() {
            var $body = $('body');
            $('.toggle-next').click(function (event) {
                event.preventDefault();
                $(this).parent().find('.toogle-me').toggle();
            });
            $(document).on('fullscreenchange', function () {
                _hideAll();
                _togglePalettes();
            });
            $(document).on('mousemove', function (event) {
                _togglePalette(event.target, '.trsp-panel, #converter');
            });
            $body.on('click', '.show-p-poll', function (event) {
                event.preventDefault();
                _showPoll();
            });
            $body.on('mousedown', '#view-map, .donate_btn, .about, converter.info, .convert-button, .contact, .search-crs, .show-p-new', function () {
                _hideAll();
            });
            $body.on('map.metrics_changed', function (event, response) {
                _setMetrics(response.data);
            });
            $body.on('map.tiles_loaded', function () {
                _initAdsenseUi();
            });
            $body.on('converter.changed', function (event, response) {
                _setMagneticDeclination(response.data.magneticDeclinationInDegrees);
            });
            $('#p-donate').find('input.dont-show-again').on('change', function () {
                _setPreferenceCookie('p-donate', $(this)[0].checked);
            });
            $('.donate_btn').click(function (event) {
                event.preventDefault();
                $('#p-donate').dialog('open');
            });
            $('.about').click(function (event) {
                event.preventDefault();
                $('#p-about').dialog('open');
            });
            $body.one('main.ready', function () {
                setTimeout(_closeLoading, 800);
                if (_isLight) {
                    _initAdsenseUi();
                }
            });
            $body.on('main.start', _displayLoading);
            $body.on('main.failed', {
                message: ': failure! ' + _t('contactUs'),
                className: 'failure'
            }, function () {
                _displayLoading.apply(this, arguments);
                _closeLoading();
            });
            $body.on('main.succeeded', {
                message: ': success.',
                className: 'success'
            }, function () {
                var $progressBar = $('#p-loading').find('.progressbar'),
                    value = $progressBar.progressbar('value') || 0;
                _displayLoading.apply(this, arguments);
                $progressBar.progressbar('value', value + 100 / 5);
            });
            $body.on('click', '.ui-widget-overlay', function () {
                _hideAll();
            });
        }

        function _bindContactUsEvents(openDialogOnly) {
            $('.contact').click(function (event) {
                event.preventDefault();
                $('#p-contact').dialog('open');
            });
            if (!openDialogOnly) {
                $('#contact-form').on('submit', function (event) {
                    event.preventDefault();
                    $('#send-message').click();
                });
                $('#send-message').click(function (event) {
                    event.preventDefault();
                    $('#p-contact').dialog('close');
                    if (!_validateContactForm()) {
                        return;
                    }
                    _sendEmail();
                });
            }
        }

        function _bindKeysEvents() {
            var ESCAPE_KEY = 27,
                F11_KEY = 122;
            $(document).keyup(function (event) {
                switch (event.keyCode) {
                    case ESCAPE_KEY:
                        event.preventDefault();
                        _hideAll();
                        break;
                    case F11_KEY:
                        event.preventDefault();
                        _trigger('ui.full_screen');
                        break;
                }
            });
        }

        function _setupUiAndListeners() {
            _initConverterUi();
            _initOptionsUi();
            _initBeautyTipsUi();
            _initGeneralUi();
            _bindConverterPanelEvents();
            _bindOptionsPanelEvents();
            _bindBeautyTipsEvents();
            _bindOtherPanelsEvents();
            _bindContactUsEvents();
            _bindLanguageEvents();
            _bindKeysEvents();
        }

        function _closeLoading() {
            var $pLoading = $('#p-loading');
            if ($pLoading.find('.failure').length) {
                $pLoading.closest('.no-close').find('.ui-dialog-titlebar-close').show();
            } else {
                $pLoading.dialog('close');
                if (!_getPreferenceCookie('p-donate') && !_options.context.GET.isSetNoDonate) {
                    $('#p-donate').dialog('open');
                }
            }
            $('.ui-widget-overlay').removeAttr('style');
        }

        function _displayLoading(event, response) {
            var $elt,
                responseData = response.data,
                name = responseData.name,
                $loading = $('#p-loading .logs'),
                className = 'loading-' + name.toLowerCase().replace(/\s/ig, '-'),
                data = event.data,
                message = responseData.message ? ': ' + responseData.message : (data ? data.message : undefined);
            if (!$loading.find('.' + className).length) {
                var html = $('<div>', {class: className}).text('Loading ' + name);
                $loading.append(html);
            }
            $elt = $loading.find('.' + className);
            if (data && message && data.className) {
                if ($elt.length && !$elt.hasClass(data.className)) {
                    $elt.addClass(data.className).append(message);
                }
            }
        }

        function _setMetrics(metrics) {
            if (metrics !== undefined) {
                _setLength(metrics.length);
                _setArea(metrics.area);
            }
        }

        function _setLength(length) {
            var unit = _t('unitMeter'),
                precision = 0;
            if (!length || length === undefined) {
                $('#lengthContainer').text('-' + unit);
            } else {
                if (length > 999) {
                    unit = _t('unitKilometer');
                    length /= 1000;
                    precision = 1;
                }
                $('#lengthContainer').text(_options.math.round(length, precision).toString() + unit);
            }
        }

        function _setArea(area) {
            var unit = _t('unitMeter') + '<sup>2</sup>',
                precision = 0;
            if (!area || area === undefined) {
                $('#areaContainer').html('-' + unit);
            } else {
                if (area > 999999) {
                    unit = _t('unitKilometer') + '<sup>2</sup>';
                    area /= 1000000;
                    precision = 1;
                }
                $('#areaContainer').html(_options.math.round(area, precision).toString() + unit);
            }
        }

        function _goResearch() {
            var $crsResult = $('#crsResult');
            $crsResult
                .html('<option value="#" class="disabledoption">' + _t('loading') + '<\/option>')
                .prop('disabled', true);
            $.post(_options.system.httpServer + '/' + _options.system.dirWsIncludes + 'c.php', {
                l: _options.context.languageCode,
                i: $('#crsCountry').val(),
                c: $('#crsCode').val(),
                n: $('#crsName').val(),
                f: ''
            }).done(function (response) {
                $crsResult.html('');
                if (!$(response).length) {
                    $crsResult.append($('<option>', {
                        val: '',
                        text: _t('resultEmpty'),
                        classname: 'disabledoption'
                    }));
                } else {
                    $crsResult.prop('disabled', false);
                    $.each(response, function (country, obj) {
                        $.each(obj, function (srsCode, crs) {
                            _options.utils.addOptionToSelect(country, srsCode, $('#crsResult'), crs.def);
                        });
                    });
                }
            }).fail(function () {
                $crsResult.html('');
                $crsResult.append($('<option>', {val: '', text: _t('resultEmpty'), classname: 'disabledoption'}));
            });
        }

        function _updateConverterWithSelectedSrs(srsCode) {
            var target = $('#select').val();
            if ($('#closeSearch').prop('checked')) {
                $('#p-research').dialog('close');
            }
            App.TWCCConverter.setSelection(target, srsCode);
        }

        function _getLoadingHtml() {
            return '<div class="loading"><img src="' + _options.system.dirWsImages + 'loading.gif" alt="" width="35" height="35">' + _t('loading') + '<\/div>';
        }

        function _showPoll(hideAll) {
            hideAll = hideAll === undefined ? true : hideAll;
            $('#poll-info').html(_getLoadingHtml());
            if (hideAll) _hideAll();
            $('#p-poll').dialog('open');
            _loadPoll();
        }

        function _loadPoll(serializedValues) {
            serializedValues = serializedValues || '';
            $('#poll-info').html(_getLoadingHtml());
            $.post(_options.system.dirWsModules + 'rater/forms.php', 'rater=true&' + serializedValues, _buildPoll);
        }

        function _buildPoll(response) {
            var $pollInfo = $('#poll-info');
            $pollInfo.html(response);
            $pollInfo.find('form').each(function () {
                $(this).on('submit', function (event) {
                    event.preventDefault();
                    _loadPoll($(this).serialize());
                });
                _bindContactUsEvents(true);
            });
        }

        function _showCrsInfo(event, response) {
            var $crsInfo = $('#crs-info');
            $crsInfo.html(_getLoadingHtml());
            $.post(_options.system.dirWsIncludes + 'crs_info.php', {
                c: response.srsCode,
                d: response.definitionString,
                l: _options.context.languageCode
            }, function (response) {
                $crsInfo.html(response);
            });
            $('#p-crs').dialog('open');
        }

        function _removeAnchorFromAddressBar() {
            window.location.hash = '';
        }

        function _addAnchorToAddressBar(anchor) {
            window.location.hash = '#' + anchor;
        }

        function _getAddressBarAnchor() {
            return window.location.hash.replace('#', '');
        }

        function _validateContactForm() {
            if ($('#message').val().length < 1) {
                alert(_t('messageNotSent') + 'empty msg.');
                $('#p-contact').dialog('open');
                return false;
            }
            if ($('#email').val().length < 1) {
                alert(_t('messageWrongEmail'));
                $('#p-contact').dialog('open');
                return false;
            }
            return true;
        }

        function _sendEmail() {
            _options.utils.sendMsg($('#message').val(), $('#email').val(), _manageResponse);
        }

        function _manageResponse(response) {
            switch (response) {
                case '1':
                    alert(_t('messageSent'));
                    break;
                case '-3':
                    alert(_t('messageWrongEmail'));
                    break;
                default: //-1 & -2
                    alert(_t('messageNotSent') + response);
                    break;
            }
            if (response == '1') {
                $('#email').val('');
                $('#message').val('');
            } else {
                $('#p-contact').dialog('open');
            }
        }

        function _hideAll() {
            $('.crs-list, .source .container, .source .convert-button').each(function () {
                $(this).btOff();
            });
            $('#help').animate({opacity: 'show'}, _SHDelay);
            $('#p-new').dialog('close');
            $('#p-contact').dialog('close');
            $('#p-about').dialog('close');
            $('#p-crs').dialog('close');
            $('#p-poll').dialog('close');
            $('#p-info').dialog('close');
            $('#p-donate').dialog('close');
            $('#p-research').dialog('close');
            $('#p-convention_help').dialog('close');
        }

        function _setPreferenceCookie(prefId, prefValue) {
            _options.utils.setPreferenceCookie(prefId, prefValue);
        }

        function _getPreferenceCookie(prefId) {
            return _options.utils.getPreferenceCookie(prefId);
        }

        function _setCsvButtonset(isCsv) {
            if (isCsv !== _getMode()) {
                $('input[name="csv"][value="' + (+isCsv) + '"]').prop('checked', true);
                $('.csv-radio').buttonset('refresh');
            }
        }

        function _setMode(isCsv) {
            isCsv = !!isCsv;
            $('#manualFeatures').toggle(!isCsv);
            $('#csvFeatures').toggle(isCsv);
            if (isCsv) {
                $('#auto-zoom-toggle').button('enable');
                $('.convention-radio').buttonset('disable');
                _setMetrics();
            } else {
                $('#auto-zoom-toggle').button('disable');
                $('.convention-radio').buttonset('enable');
            }
        }

        function _getMode() {
            return !!+$('input[name="csv"]:checked').val();
        }

        function _setMagneticDeclination(angle) {
            var roundedAngle = angle === undefined ? '' : _options.math.round(angle, 4).toString();
            $('#magneticDeclinationContainer').text(roundedAngle);
        }

        function _setConvergenceConvention(isSurvey) {
            _convergenceConvention = isSurvey;
            _trigger('ui.convergence_changed');
        }

        function _setHistoryButtons(idx, max) {
            var min = 0,
                enableNextButton = idx < max,
                enablePreviousButton = idx > min;
            $('.previous.history').button('option', 'disabled', !enablePreviousButton);
            $('.next.history').button('option', 'disabled', !enableNextButton);
        }

        function _togglePalettes() {
            if (!_isLight && $(document).fullScreen()) {
                $('.trsp-panel, .spare, #converter, #h-container').fadeOut();
            } else {
                $('.trsp-panel, .spare, #converter, #h-container').fadeIn();
            }
        }

        function _adBlockDetected() {
            _dfd.reject(_t('pleaseDisableYourAdblock')); //please disable your AdBlock.
        }

        function _adBlockNotDetected() {
            _dfd.resolve();
        }

        function _checkAdBlocker() {
            if (!App.system.adsense.bannerAdsEnabled) {
                _adBlockNotDetected();
            } else {
                var a = window.adsbygoogle;
                if (a && a.loaded) {
                    _adBlockNotDetected();
                } else {
                    _adBlockDetected();
                }
            }
        }


        function _initUI() {
            _dfd = _newDeferred('UI');
            _setupUiAndListeners();
            if (_isLight) {
                _dfd.resolve();
            } else {
                $(window).load(_checkAdBlocker);
            }
        }

        _initUI();
        return {
            promise: _dfd.promise(),
            getConvergenceConvention: function () {
                return _convergenceConvention;
            },
            startHelp: _startHelpIfCookieAllowsIt,
            setCsvMode: _setCsvMode
        };
    }

    // exports
    window.TWCCUi = {
        getInstance: function (opts) {
            instance = instance || init(opts);
            return instance;
        }
    };
})(jQuery, ClipboardJS); // jshint ignore:line
