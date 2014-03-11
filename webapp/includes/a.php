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
