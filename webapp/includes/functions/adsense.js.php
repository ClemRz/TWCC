<?php
/*

	Copyright Clément Ronzon

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
