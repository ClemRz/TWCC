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
// include server parameters
define('IS_DEV_ENV', (in_array($_SERVER['HTTP_HOST'], array('localhost', 'localhost:8081', '127.0.0.1', 'twcc.local'))));
if (IS_DEV_ENV) {
	define('HTTP_SERVER', 'http://'.$_SERVER['HTTP_HOST']);
	error_reporting(E_ALL | E_STRICT);
} else {
	define('HTTP_SERVER', 'https://twcc.fr');
	error_reporting(0);
}
define('DIR_FS_ROOT', $_SERVER['DOCUMENT_ROOT'].'/');

if (isset($_GET['tmp'])) { // To Remove Before Prod
	// include SPF master
	require(DIR_FS_ROOT . 'includes/master.inc.php');
}

if (!ini_get('session.save_path')) {
	ini_set("session.save_path",DIR_FS_ROOT."sessions");
}
if (isset($_GET['tmp'])) { // To Remove Before Prod
//  session_start(); //CRO 2013-02-12
//  error_reporting(E_ALL & ~E_NOTICE); //CRO 2013-02-12 Included in master.inc.php
} else {
  session_start();
}

require(DIR_FS_ROOT . 'includes/pkg.php');
if (IS_DEV_ENV) {
	require(DIR_FS_ROOT . 'includes/configure.local.php');
} else {
	require(DIR_FS_ROOT . 'includes/configure.php');
}
require(DIR_FS_ROOT . DIR_WS_INCLUDES . 'filenames.php');
require(DIR_FS_ROOT . DIR_WS_FUNCTIONS . 'general.php');
require(DIR_FS_ROOT . DIR_WS_CLASSES . 'language.php');
if (USE_MYSQLI) {
	require(DIR_FS_ROOT . DIR_WS_FUNCTIONS . 'database.mysqli.php');
} else {
	require(DIR_FS_ROOT . DIR_WS_FUNCTIONS . 'database.php');
}
tep_db_connect() or die('Connexion impossible à la Base de Données!');

define('SESSION_COUNT', count(safe_glob(ini_get('session.save_path').'/*'))-2);

// set the language
if (!tep_session_is_registered('language') || isset($_GET['l'])) {
	if (!tep_session_is_registered('language')) {
		tep_session_register('language');
		tep_session_register('languages_id');
	}
	$lng = new language();
	if (isset($_GET['l']) && tep_not_null($_GET['l'])) {
		$lng->set_language($_GET['l']);
	} else {
		$lng->get_browser_language();
	}
	$language = $lng->language['iso'];
	$languages_id = $lng->language['id'];
	$_SESSION['language'] = $language;
	$_SESSION['languages_id'] = $languages_id;
}

// include the language translations
if (!isset($_SESSION['language'])) {
	$_SESSION['language'] = 'en';
}
require(DIR_FS_ROOT . DIR_WS_LANGUAGES . $_SESSION['language'].'.php');
require(DIR_FS_ROOT . DIR_WS_FUNCTIONS . 'constants.php');

// set the survey parameters
$cfg_rater_ids = array(4, 5);
$rater_items = array();
foreach ($cfg_rater_ids as $cfg_rater_id) {
	$rater_items[] = array('id' => $cfg_rater_id,
												 'item_name' => constant('ITEM_NAME_'.$cfg_rater_id),
												 'item_labels' => explode('|', constant('ITEM_LABELS_'.$cfg_rater_id)));
}

define('PAYPAL_TINY_FORM','
		<input type="image" src="https://www.paypalobjects.com/'.PAYPAL_LOCALE.'/i/btn/btn_donate_SM.gif" name="submit" title="'.DONATE.'" alt="'.DONATE.'" style="border:0px none;" class="donate_btn">
');

define('PAYPAL_FORM','
	<div style="text-align:center;">
		<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
			<img alt="" src="'.DIR_WS_IMAGES.'paypal-credit-card-images-3.png" width="161" height="145"><br>
			<input type="hidden" name="cmd" value="_s-xclick">
			<input type="hidden" name="hosted_button_id" value="X96WCPE5E2VAC">

			<input type="hidden" name="return" value="'.HTTP_SERVER.'">
			<input type="hidden" name="cancel_return" value="'.HTTP_SERVER.'">
			<input type="hidden" name="cbt" value="TWCC">

			<input type="image" src="https://www.paypalobjects.com/'.PAYPAL_LOCALE.'/i/btn/btn_donateCC_LG.gif" name="submit" title="'.DONATE.'" alt="'.DONATE.'" style="border:0px none;">
			<img alt="" src="https://www.paypalobjects.com/'.PAYPAL_LOCALE.'/i/scr/pixel.gif" width="1" height="1" style="border:0px none;">
		</form>
	</div>
');
?>
