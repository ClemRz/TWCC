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
// Define the webserver and path parameters
// * DIR_FS_* = Filesystem directories (local/physical)
// * DIR_WS_* = Webserver directories (virtual/URL)
define('DIR_WS_IMAGES', 'images/');
define('DIR_WS_SCRIPT', 'js/');
define('DIR_WS_INCLUDES', 'includes/');
define('DIR_WS_FUNCTIONS', DIR_WS_INCLUDES . 'functions/');
define('DIR_WS_CLASSES', DIR_WS_INCLUDES . 'classes/');
define('DIR_WS_MODULES', DIR_WS_INCLUDES . 'modules/');
define('DIR_WS_LANGUAGES', DIR_WS_INCLUDES . 'languages/');
define('DIR_FS_SCRIPT', DIR_FS_ROOT . DIR_WS_SCRIPT);
define('DIR_FS_CACHE', DIR_FS_ROOT . DIR_WS_INCLUDES . 'cache/');
define('DIR_FS_TEMP', DIR_FS_ROOT . DIR_WS_INCLUDES . 'temp/');
define('DEFAULT_LANGUAGE', 'en');

define('DB_SERVER', 'localhost');
define('DB_SERVER_USERNAME', ''); // /!\ Your DB username here
define('DB_SERVER_PASSWORD', ''); // /!\ Your DB password here
define('DB_DATABASE', 'twcc');
define('USE_PCONNECT', 'false');

define('REST_API_USERNAME', ''); // /!\ Your API username here
define('REST_API_PASSWORD', ''); // /!\ Your API password here

define('FILE_PUT_CONTENTS_ATOMIC_MODE', 0777);
define('EXPIRATION_OFFSET', 40 * 60 * 60);
define('EXPIRATION_DATE', gmdate("D, d M Y H:i:s", time() + EXPIRATION_OFFSET)." GMT");
define('APPLICATION_EXPIRES', EXPIRATION_DATE);
define('APPLICATION_CONTACT', 'clemrz@gmail.com');
define('COPYRIGHT', '&copy; 2010 Clément Ronzon');
define('APPLICATION_NOREPLY', 'noreply@twcc.free.fr');
define('MAP_TIMEOUT_MS', 10000); //10s
define('BANNER_ADS_ENABLED', true && !IS_DEV_ENV);
define('W3W_KEY', ''); // /!\ w3w.com API key
define('ADUNIT_CHANNEL', ''); // /!\ 
define('INFO_WINDOW', 'IWINDOW_');
define('BANNER', 'BANNER_');
define('IWINDOW_SLOT', ''); // /!\ 
define('IWINDOW_CHANNEL', ''); // /!\ 
define('IWINDOW_AD_WIDTH', '234');
define('IWINDOW_AD_HEIGHT', '60');
define('IWINDOW_AD_FORMAT', IWINDOW_AD_WIDTH.'x'.IWINDOW_AD_HEIGHT.'_as');
define('BANNER_AD_SLOT', ''); // /!\
define('MAP_AD_FORMAT_1', 'auto');
define('MAP_AD_FORMAT_2', 'SMALL_SQUARE');
define('ADSENSE_ID', 'ca-pub-'); // /!\
define('ENC_KEY', ''); // /!\ 
define('TOKEN_NAME', ''); // /!\ 

if (isset($_GET['wgs84'])) {
	$_GET['wgs84'] = explode(',', urldecode($_GET['wgs84']));
}
define('DEFAULT_WGS84', ((isset($_GET['wgs84'])) ? '{"x":'.$_GET['wgs84'][0].',"y":'.$_GET['wgs84'][1].'}' : "\"\""));
define('DEFAULT_SOURCE_CRS', ((isset($_GET['sc'])) ? urldecode($_GET['sc']) : 'WGS84'));
define('DEFAULT_DEST_CRS', ((isset($_GET['dc'])) ? urldecode($_GET['dc']) : 'EPSG:23031'));
define('DEFAULT_ZOOM', ((isset($_GET['z'])) ? intval($_GET['z']) : 2));
define('TIMEZONEDB_KEY', ''); // /!\
define('FROM_URL', isset($_GET['dc']) && isset($_GET['sc']) && isset($_GET['wgs84']));
define('FROM_RSS', isset($_GET['dc']) && !(isset($_GET['sc']) || isset($_GET['wgs84'])) || isset($_GET['sc']) && !(isset($_GET['dc']) || isset($_GET['wgs84'])));
define('HISTORY_COOKIE', 'TWCC_history');
define('PREFERENCES_COOKIE', 'TWCC_prefs');
define('HISTORY_LIMIT', 4);

define('USE_FACEBOOK', true);
define('FACEBOOK_KEY', ''); //Facebook appId

define('RATER_MASTER_SW', false);
define('RATER_EOL', "\n");
define('RATER_RESTRINCTION', true);
define('RATER_IP_QTY', 1);

define('DONATION_MAX','1150');
?>