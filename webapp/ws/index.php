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
define('INCLUDES_PATH', substr(dirname(__FILE__), 0, -2).'includes/');
define('VENDOR_PATH', INCLUDES_PATH.'vendor/');

require(INCLUDES_PATH.'application_top.php');

define('NO_ERROR_CODE', -2);
define('MISSING_PARAMETER_ERROR_CODE', 2);
define('WRONG_FORMAT_ERROR_CODE', 3);
define('UNEXPECTED_ERROR_CODE', 4);
define('PROJ4PHP_ERROR_CODE', 5);

$error_msgs = Array(
  2=> "Some parameters are missing. Please read this WS documentation.",
  3=> "Wrong value for format parameter. Possible values are: xml, json.",
  4=> "Unexpected error. Please contact us.",
  5=> "Core error. Please contact us. Message: "
);

define('LATITUDE_PARAM_LABEL', 'y');
define('LONGITUDE_PARAM_LABEL', 'x');
define('INPUT_CRS_PARAM_LABEL', 'in');
define('OUTPUT_CRS_PARAM_LABEL', 'out');
define('FORMAT_PARAM_LABEL', 'fmt');

define('DEFAUlT_LATITUDE', 0);
define('DEFAULT_LONGITUDE', 0);
define('DEFAULT_INPUT_CRS', 'WGS84');
define('DEFAULT_OUTPUT_CRS', 'WGS84');
define('DEFAULT_FORMAT', 'xml');

function printErrorResponse($format, $error, $message) {
  if ($format=='json') {
    echo "{\"status\":\"error\", \"error\":{\"code\":" . $error . ", \"message\":\"" . $message . "\"}}";
    exit;
  } else {
    echo "<reponse>";
      echo "<error>";
        echo "<code>" . $error . "</code>";
        echo "<message>" . $message . "</message>";
      echo "</error>";
    echo "</reponse>";
    exit;
  }
}

$error = NO_ERROR_CODE;

$x = isset($_GET[LONGITUDE_PARAM_LABEL]) ? $_GET[LONGITUDE_PARAM_LABEL] : DEFAULT_LONGITUDE;
$y = isset($_GET[LATITUDE_PARAM_LABEL]) ? $_GET[LATITUDE_PARAM_LABEL] : DEFAUlT_LATITUDE;
$projectionxy = isset($_GET[INPUT_CRS_PARAM_LABEL]) ? cleanString(str_replace('::',':',$_GET[INPUT_CRS_PARAM_LABEL])) : DEFAULT_INPUT_CRS;
$projection = isset($_GET[OUTPUT_CRS_PARAM_LABEL]) ? cleanString(str_replace('::',':',$_GET[OUTPUT_CRS_PARAM_LABEL])) : DEFAULT_OUTPUT_CRS;
$format = isset($_GET[FORMAT_PARAM_LABEL]) ? $_GET[FORMAT_PARAM_LABEL] : DEFAULT_FORMAT;

// check the parameters
$error = !isset($_GET[LONGITUDE_PARAM_LABEL]) ? MISSING_PARAMETER_ERROR_CODE : $error;
$error = !isset($_GET[LATITUDE_PARAM_LABEL]) ? MISSING_PARAMETER_ERROR_CODE : $error;
$error = !($format=='xml' || $format=='json') ? WRONG_FORMAT_ERROR_CODE : $error;

if ($format=='json') {
  header('Content-type: application/json; charset=utf-8');
} else {
  header('Content-type: text/xml');
}

include(VENDOR_PATH."autoload.php");

use proj4php\Proj4php;
use proj4php\Proj;
use proj4php\Point;

try {
  $proj4 = new Proj4php();

  $sql = "SELECT Code, Definition FROM coordinate_systems WHERE Code IN ('$projectionxy', '$projection')";
  $crs_query = tep_db_query($sql);
  while ($crs = tep_db_fetch_array($crs_query)) {
    $proj4->addDef($crs['Code'],$crs['Definition']);
  }

  $projsource = new Proj($projectionxy,$proj4);
  $projdest = new Proj($projection,$proj4);

  $pointSrc = new Point($x, $y);

  $pointDest = $proj4->transform($projsource, $projdest, $pointSrc);
} catch (Exception $e) {
  $error = PROJ4PHP_ERROR_CODE;
  printErrorResponse($format, $error, $error_msgs[$error].$e->getMessage());
}

$projection = str_replace(':','::',$projection);

$error = (is_infinite($pointDest->x) || is_nan($pointDest->x)) ? UNEXPECTED_ERROR_CODE : $error;
$error = (is_infinite($pointDest->y) || is_nan($pointDest->y)) ? UNEXPECTED_ERROR_CODE : $error;

if ($error != NO_ERROR_CODE) {
  printErrorResponse($format, $error, $error_msgs[$error]);
}

if ($format=='json') {
	echo "{\"status\":\"success\", \"point\":{\"x\":".$pointDest->x.", \"y\":".$pointDest->y.",\"projection\":\"".$projection."\"}}";
	exit;
} else {
	echo "<reponse>";
    echo "<point>";
      echo "<x>".$pointDest->x."</x>";
      echo "<y>".$pointDest->y."</y>";
      echo "<projection>".$projection."</projection>";
    echo "</point>";
	echo "</reponse>";
}
?>
