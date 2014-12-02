<?php
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
?>
		<script type="text/javascript">
    //<![CDATA[
		/** GOOGLE ANALYTICS **/
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-17790812-1', 'auto');
        ga('send', 'pageview');

        $(document).ready(function() {
            $('body').on('change', '#crsSource', trackSelect);
            $('body').on('change', '#crsDest', trackSelect);
            $('body').on('click', '#ui-container input[type="radio"]', trackDynamicRadio);
            $('body').on('click', '#o-container input[type="radio"]', trackStaticRadio);
            $('body').one('infowindow.dom_ready', trackLoadingTime);
            $('body').one('main.ready', function() {
                $('body').off('infowindow.dom_ready', trackLoadingTime);
            });

            function trackSelect(evt) {
                var $select = $(evt.target),
                    group = $select.find('option:selected').closest('optgroup').prop('label'),
                    crs = $select.find('option:selected').text();
                trackEvent('select', 'change', crs);
            }
            function trackDynamicRadio(evt) {
                var $radio = $(evt.target),
                    crs = $radio.closest('div.key').find('select[name^="crs"] option:selected').text(),
                    value = $radio.val();
                trackEvent('radio', 'click', value);
            }
            function trackStaticRadio(evt) {
                var $radio = $(evt.target),
                    name = $radio.prop('name'),
                    value = $radio.val();
                trackEvent('radio', 'click', name);
            }
            function trackLoadingTime() {
                var endTime = new Date().getTime(),
                    timeSpent = endTime - App.context.startTime;
                trackTiming('TWCC', 'Render infowindow', timeSpent);
            }
            function trackEvent(category, action, opt_label) {
                try {
                    ga('send', 'event', category, action, opt_label);
                } catch(err) {}
            }
            function trackTiming(category, variable, timeMs, opt_label) {
                try {
                    ga('send', 'timing', category, variable, timeMs, opt_label);
                } catch (err) {}
            }
        });
    //]]>
		</script>