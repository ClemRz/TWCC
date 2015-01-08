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
 * @copyright Copyright (c) 2010-2014 Cl�ment Ronzon
 * @license http://www.gnu.org/licenses/agpl.txt
 */
/**
WS that returns a CRS list depending on the search restrictions (optional)
If the cached file does not exist the it must be regenerated. This happens when the cache is cleared.
**/

require('application_top.php');
header("Access-Control-Allow-Origin: *");
header('Cache-Control: no-cache, must-revalidate');
header('Expires: '.EXPIRATION_DATE);
header('Content-type: application/json; charset=utf-8');


$name = (isset($_GET['n'])) ? urldecode(stripslashes($_GET['n'])) : '';
$name = (isset($_POST['n'])) ? urldecode(stripslashes($_POST['n'])) : $name;

$code = (isset($_GET['c'])) ? urldecode(stripslashes($_GET['c'])) : '';
$code = (isset($_POST['c'])) ? urldecode(stripslashes($_POST['c'])) : $code;

$iso = (isset($_GET['i'])) ? urldecode(stripslashes($_GET['i'])) : '';
$iso = (isset($_POST['i'])) ? urldecode(stripslashes($_POST['i'])) : $iso;

$crs_language = (isset($_GET['l'])) ? ucfirst(urldecode(stripslashes($_GET['l']))) : ucfirst(LANGUAGE_CODE);
$crs_language = (isset($_POST['l'])) ? ucfirst(urldecode(stripslashes($_POST['l']))) : $crs_language;

$refresh = isset($_GET['refresh']) || isset($_POST['refresh']);
$f = isset($_GET['f']) || isset($_POST['f']);

$supported_languages = array('Fr', 'En', 'Es', 'De', 'It', 'Pl', 'Vi');
$crs_language = in_array($crs_language, $supported_languages) ? $crs_language : 'En';

$cached_file_path = DIR_FS_CACHE."c.".$crs_language.".json";
$refresh = $refresh || !file_exists($cached_file_path) || !is_readable($cached_file_path);

if ($refresh || $f) {
	$sql = "SELECT DISTINCT ";
	$sql .= "GROUP_CONCAT(DISTINCT IFNULL(co.".$crs_language."_name, '*".WORLD."') ORDER BY IFNULL(co.".$crs_language."_name, '*".WORLD."') SEPARATOR ', ') AS country, ";
	$sql .= "crs.Code AS code, ";
	$sql .= "crs.Definition AS def, ";
	$sql .= "crs.Is_connector AS isconnector ";
	$sql .= "FROM coordinate_systems crs ";
	$sql .= "LEFT OUTER JOIN country_coordinate_system cc ON cc.Id_coordinate_systems = crs.Id_coordinate_systems ";
	$sql .= "LEFT OUTER JOIN countries co ON co.Iso_countries = cc.Iso_countries ";
	$sql .= "WHERE ";
	if (!$f) {
	  $sql .= "crs.Code = 'WGS84' OR ";
	}
	$sql .= "(crs.Enabled = 'YES' ";
	if ($iso != '') {
		$sql .= "AND ((cc.Iso_countries IS NULL) OR cc.Iso_countries LIKE '".$iso."') ";
	}
	if ($name != '') {
		$sql .= "AND (crs.Definition LIKE '+title=%".$name."%') ";
	}
	if ($code != '') {
		$sql .= "AND (crs.Code LIKE '%".$code."%') ";
	}
	$sql .= ") ";
	$sql .= "GROUP BY crs.Code ORDER BY 1";
	$flag = false;

	try {
		$crs_query = tep_db_query($sql);
		$js_var = "{"."\n";
		$country = '';
		$started = false;
		$cstart = false;
		while ($crs = tep_db_fetch_array($crs_query)) {
		  $flag = true;
			if ($country != $crs['country']) {
				$country = $crs['country'];
				if ($started) $js_var .= "},"."\n";
				$js_var .= "  \"".$crs['country']."\": {";
				$cstart = true;
			} else {
				$cstart = false;
			}
			$started = true;
			if (!$cstart) $js_var .= ",";
			$js_var .= "\n"."    \"".$crs['code']."\":{";
			$js_var .= "\n"."        \"def\":\"".$crs['def']."\",";
			$js_var .= "\n"."        \"isConnector\":".($crs['isconnector'] == "YES" ? "true" : "false");
			$js_var .= "\n"."    }";
		}
		$js_var .= "\n"."  }"."\n"."}";
	} catch (Exception $e) {
		$flag = true;
		$js_var = "{\"error\":".$e->getMessage()."}";
	}

	if (!$flag) {
		$js_var = '';
	}

	if ($f) {
		echo $js_var;
	} else {
		file_put_contents_atomic($cached_file_path, $js_var);
	}
}

if (!$f) {
	echo file_get_contents($cached_file_path);
}
?>
