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
		/** GOOGLE ADSENSE **/
		google_ad_client = "<?php echo ADSENSE_ID; ?>";
		google_language = "<?php echo LANGUAGE_CODE; ?>";
		google_ad_width = <?php echo constant($ad_location.'AD_WIDTH'); ?>;
		google_ad_height = <?php echo constant($ad_location.'AD_HEIGHT'); ?>;
		<?php if (IS_DEV_ENV) { ?>
		google_ad_format = "<?php echo constant($ad_location.'AD_FORMAT'); ?>";
		<?php } else { ?>
		google_ad_slot = "<?php echo constant($ad_location.'SLOT'); ?>";
		google_ad_channel = "<?php echo constant($ad_location.'CHANNEL'); ?>";
		<?php } ?>
		<?php echo ADSENSE_PARAMETERS; ?>
        (function() {
            $('body').on('change', '#crsSource', trackSelect);
            $('body').on('change', '#crsDest', trackSelect);
            $('body').on('click', '#ui-container input[type="radio"]', trackDynamicRadio);
            $('body').on('click', '#o-container input[type="radio"]', trackStaticRadio);
            function trackSelect(evt) {
                var $select = $(evt.target),
                    group = $select.find('option:selected').closest('optgroup').prop('label'),
                    crs = $select.find('option:selected').text();
                trackEvent('Select', group, crs);
            }
            function trackDynamicRadio(evt) {
                var $radio = $(evt.target),
                    crs = $radio.closest('div.key').find('select[name^="crs"] option:selected').text(),
                    value = $radio.val();
                trackEvent('Radio', crs, value);
            }
            function trackStaticRadio(evt) {
                var $radio = $(evt.target),
                    name = $radio.prop('name'),
                    value = $radio.val();
                trackEvent('Radio', name, value);
            }
            function trackEvent(category, action, opt_label) {
                try {
                    _gaq.push(['_trackEvent', category, action, opt_label]);
                } catch(err) {}
            }
        })();
    //]]>
		</script>
		<script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script>
