<?php
// Define the webserver and path parameters
// * DIR_FS_* = Filesystem directories (local/physical)
// * DIR_WS_* = Webserver directories (virtual/URL)
	define('IS_DEV_ENV', ($_SERVER['HTTP_HOST'] == 'localhost' || $_SERVER['HTTP_HOST'] == '127.0.0.1'));
	if (IS_DEV_ENV) {
		define('HTTP_SERVER', 'http://'.$_SERVER['HTTP_HOST'].'/twcc');
	} else {
		define('HTTP_SERVER', 'http://twcc.free.fr');
	}
  define('DIR_WS_IMAGES', 'images/');
  define('DIR_WS_INCLUDES', 'includes/');
  define('DIR_WS_FUNCTIONS', DIR_WS_INCLUDES . 'functions/');
  define('DIR_WS_CLASSES', DIR_WS_INCLUDES . 'classes/');
  define('DIR_WS_MODULES', DIR_WS_INCLUDES . 'modules/');
  define('DIR_WS_LANGUAGES', DIR_WS_INCLUDES . 'languages/');
	define('DEFAULT_LANGUAGE', 'en');

	define('DB_SERVER', 'localhost');
	define('DB_SERVER_USERNAME', ''); // /!\ Your DB username here
	define('DB_SERVER_PASSWORD', ''); // /!\ Your DB password here
	define('DB_DATABASE', 'twcc');
	define('USE_PCONNECT', 'false');

	define('EXPIRATION_OFFSET', 40 * 60 * 60);
	define('EXPIRATION_DATE', gmdate("D, d M Y H:i:s", time() + EXPIRATION_OFFSET)." GMT");
	define('APPLICATION_EXPIRES', EXPIRATION_DATE);
	define('APPLICATION_CONTACT', 'clemrz@gmail.com');
	define('COPYRIGHT', '&copy; 2010 Clément Ronzon');
	define('APPLICATION_NOREPLY', 'noreply@twcc.free.fr');
	define('MAPS_API_VERSION', '3');
	define('MAP_TIMEOUT_MS', 10000); //10s
	define('IW_ADS_ENABLED', false);
	define('BANNER_ADS_ENABLED', true && !IS_DEV_ENV);
	if (IS_DEV_ENV) {
		define('KEY', ''); // /!\ your .localhost GMaps API Key
	} else {
		define('KEY', ''); // /!\ .free.fr GMaps API key
	}
	define('ADUNIT_CHANNEL', ''); // /!\ 
	define('INFO_WINDOW', 'IWINDOW_');
	define('BANNER', 'BANNER_');
	define('IWINDOW_SLOT', ''); // /!\ 
	define('IWINDOW_CHANNEL', ''); // /!\ 
	define('IWINDOW_AD_WIDTH', '234');
	define('IWINDOW_AD_HEIGHT', '60');
	define('IWINDOW_AD_FORMAT', IWINDOW_AD_WIDTH.'x'.IWINDOW_AD_HEIGHT.'_as');
	define('BANNER_SLOT', ''); // /!\ 
	define('BANNER_CHANNEL', ''); // /!\ 
	define('BANNER_AD_WIDTH', '728');
	define('BANNER_AD_HEIGHT', '15');
	define('BANNER_AD_FORMAT', BANNER_AD_WIDTH.'x'.BANNER_AD_HEIGHT.'_0ads_al_s');
	define('MAP_AD_FORMAT_1', 'X_LARGE_VERTICAL_LINK_UNIT');
	define('MAP_AD_FORMAT_2', 'SMALL_SQUARE');
	$common_parameters = '
		google_color_border = [\'E5E5F0\'];
		google_color_bg = [\'E5E5F0\'];
		google_color_link = [\'000000\'];
		google_color_text = [\'000000\'];
		google_color_url = [\'808080\'];
		google_ui_features = "rc:6";';
	$common_parameters = '
		google_color_border = [\'FFFFFF\'];
		google_color_bg = [\'FFFFFF\'];
		google_color_link = [\'000000\'];
		google_color_text = [\'000000\'];
		google_color_url = [\'808080\'];
		google_ui_features = "rc:6";';
	if (IS_DEV_ENV) {
		define('ADSENSE_ID', 'ca-google-asfe');
		define('ADSENSE_PARAMETERS', 'google_adtest=\'on\';
		google_ad_type = "text";
		google_alternate_color = "000000";
		google_alternate_ad_url = "";'.$common_parameters);
	} else {
		define('ADSENSE_ID', 'ca-pub-'); // /!\ 
		define('ADSENSE_PARAMETERS', 'google_font_size = "account_default";'.$common_parameters);
	}
	define('ENC_KEY', ''); // /!\ 
	define('TOKEN_NAME', ''); // /!\ 
	
	if (isset($_GET['wgs84'])) {
		$_GET['wgs84'] = explode(',', urldecode($_GET['wgs84']));
	}
	define('DEFAULT_WGS84', ((isset($_GET['wgs84'])) ? '{"x":'.$_GET['wgs84'][0].',"y":'.$_GET['wgs84'][1].'}' : "''"));
	define('DEFAULT_SOURCE_CRS', ((isset($_GET['sc'])) ? urldecode($_GET['sc']) : 'WGS84'));
	define('DEFAULT_DEST_CRS', ((isset($_GET['dc'])) ? urldecode($_GET['dc']) : 'EPSG:23031'));
	define('DEFAULT_ZOOM', ((isset($_GET['z'])) ? intval($_GET['z']) : 2));
	define('DEFAULT_MAP_TYPE', ((isset($_GET['mt'])) ? '"'.$_GET['mt'].'"' : 'google.maps.MapTypeId.TERRAIN'));
	define('FROM_URL', (isset($_GET['dc']) || isset($_GET['sc']) || isset($_GET['wgs84'])) ? 'true' : 'false');
	define('HISTORY_COOKIE', 'TWCC_history');
	define('HISTORY_LIMIT', 4);
	
	define('USE_ADDTHIS', false);
	define('USE_FACEBOOK', true);
	
	define('RATER_MASTER_SW', false);
  define('RATER_EOL', "\n");
	define('RATER_RESTRINCTION', true);
	define('RATER_IP_QTY', 1);

  define('DONATION_MAX','1150');
?>