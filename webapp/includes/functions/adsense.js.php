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
    //]]>
		</script>
		<script type="text/javascript" src="http://pagead2.googlesyndication.com/pagead/show_ads.js"></script>
