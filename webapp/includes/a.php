<?php
/* © 2010 Clément Ronzon */
/**
WS that returns elevation
**/
require('application_top.php');
header('Cache-Control: no-cache, must-revalidate');
header('Expires: '.EXPIRATION_DATE);
header('Content-type: application/json; charset=utf-8');

$lat = isset($_POST['t']) ? strip_tags($_POST['t']) : '0';
$lng = isset($_POST['g']) ? strip_tags($_POST['g']) : '0';
$url = 'http://maps.google.com/maps/api/elevation/json?sensor=false&locations='.$lat.','.$lng;
if (!$return_code = @file_get_contents($url)) $return_code = '';
if ($return_code == '') {
	if (IS_DEV_ENV) {
		$return_code = '{"status":"OK",
			"results": [ {
				"location": {
					"lat": 0.0000000,
					"lng": 0.0000000
				},
				"elevation": 1234567890
			} ]}';
	} else {
		$return_code = '{"status":"KO"}';
	}
}
echo $return_code;
?>
