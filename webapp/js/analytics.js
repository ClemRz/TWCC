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
(function(window, document, $, App) {
    "use strict";
    /*global document, window, jQuery */

    (function(i, s, o, g, r, a, m) {
        i['GoogleAnalyticsObject'] = r;
        i[r] = i[r] || function() {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
        a = s.createElement(o),
            m = s.getElementsByTagName(o)[0];
        a.async = 1;
        a.src = g;
        m.parentNode.insertBefore(a, m)
    })(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

    ga('create', 'UA-17790812-2', 'auto');
    ga('send', 'pageview');

    $(document).ready(function() {
        var $body = $('body');
        $body.on('change', '.crs-list', trackSelect);
        $body.on('click', '#converter input[type="radio"]', trackDynamicRadio);
        $body.on('click', '#o-container input[type="radio"]', trackStaticRadio);
        $body.on('click', '.octicon-clippy', trackClipboardClick);
        $body.bind('clipboard.aftercopy', trackClipboardSuccess);
        $body.one('infowindow.dom_ready', trackLoadingTime);
        $body.one('main.ready', function(event, obj) {
            var isCsv = obj.data === undefined ? obj.csv : obj.data.csv;
            if (isCsv) {
                $body.off('infowindow.dom_ready', trackLoadingTime);
            }
        });

        function trackSelect(evt) {
            var $select = $(evt.target),
                crs = $select.find('option:selected').text();
            trackEvent('select', 'change', crs);
        }

        function trackDynamicRadio(evt) {
            var $radio = $(evt.target),
                crs = $radio.closest('div.section').find('select[name^="crs"] option:selected').text(),
                value = $radio.val();
            trackEvent('radio', 'click', value);
        }

        function trackStaticRadio(evt) {
            var $radio = $(evt.target),
                name = $radio.prop('name');
            trackEvent('radio', 'click', name);
        }

        function trackClipboardClick() {
            trackEvent('clipboard', 'click');
        }

        function trackClipboardSuccess() {
            trackEvent('clipboard', 'success');
        }

        function trackLoadingTime() {
            var endTime = new Date().getTime(),
                timeSpent = endTime - App.context.startTime;
            trackTiming('TWCC', 'Render infowindow', timeSpent);
        }

        function trackEvent(category, action, opt_label, opt_quantity) {
            try {
                ga('send', 'event', category, action, opt_label, opt_quantity);
            } catch (err) {}
        }

        function trackTiming(category, variable, timeMs, opt_label) {
            try {
                ga('send', 'timing', category, variable, timeMs, opt_label);
            } catch (err) {}
        }
    });
})(window, document, jQuery, App);