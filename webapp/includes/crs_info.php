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

require('application_top.php');

$code = (isset($_POST['c'])) ? $_POST['c'] : '';
$altDef = (isset($_POST['d'])) ? $_POST['d'] : '';
$info_language = isset($_POST['l']) ? strip_tags($_POST['l']) : 'en';

$crs_query = tep_db_query("SELECT Definition, Url FROM coordinate_systems WHERE Code = '".$code."'");
if ($crs = tep_db_fetch_array($crs_query)) {
	$properties = $crs['Definition'];
	$srurl = $crs['Url'];
} else {
    $properties = '';
}
$properties = ($properties == '') ? $altDef : $properties;
$defs = explode('+', $properties);
$html = '';
$ellps = true;
$defArray = array();
foreach ($defs as $def) {
	if ($def != '') {
		$tmpArray = explode('=', $def);
        if (count($tmpArray) == 2) {
            $defArray[trim($tmpArray[0])] = trim($tmpArray[1]);
            $prop_value = trim($tmpArray[1]);
            $prop_label = strtr(trim($tmpArray[0]), $crsLabelMapping);
            if ($prop_label != '' && $prop_value != '') {
                switch (trim($tmpArray[0])) {
                    case 'pm':
                        $html .= getWrappedRow($prop_label, $primeMeridians[$prop_value]);
                        break;
                    case 'datum':
                        $html .= getWrappedRow($prop_label, getWrappedList($datums[$prop_value], $crsLabelMapping));
                        $prop_label = strtr("ellipse", $crsLabelMapping);
                        $prop_value = $datums[$prop_value]["ellipse"];
                    case 'ellps':
                        if ($ellps) {
                            $ellps = false;
                            $html .= getWrappedRow($prop_label, getWrappedList($ellipsoids[$prop_value], $crsLabelMapping));
                        }
                        break;
                    default:
                        $html .= getWrappedRow($prop_label, $prop_value);
                        break;
                }
            }
        }
	}
}
if (!array_key_exists('title', $defArray)) {
    $defArray['title'] = '';
}
$title = ($defArray['title'] == '') ? $code : $defArray['title'];
?>
<h2><?php echo $title; ?></h2>
<table class="spaced_2 padded bordered_white whole_width">
<?php echo $html; ?>
</table>
<div style="bottom:8px;color:#808080;font-size:9px;">
<?php if (isset($srurl) && $srurl != '') { ?>
	<a href="<?php echo $srurl; ?>" title="SpatialReference.org" style="text-decoration:none;color:#808080;" target="_blank"><?php echo $srurl; ?></a><br>
<?php } ?>
	<?php echo $code; ?> : <?php echo $properties; ?>
</div>
