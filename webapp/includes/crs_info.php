<?php
/* � 2010 Cl�ment Ronzon */

require('application_top.php');

$code = (isset($_POST['c'])) ? $_POST['c'] : '';
$altDef = (isset($_POST['d'])) ? $_POST['d'] : '';
$info_language = isset($_POST['l']) ? strip_tags($_POST['l']) : 'en';

$crs_query = tep_db_query("SELECT Definition, Url FROM T_crs WHERE Code = '".$code."'");
if ($crs = tep_db_fetch_array($crs_query)) {
	$properties = $crs['Definition'];
	$srurl = $crs['Url'];
}
$properties = ($properties == '') ? $altDef : $properties;
$defs = explode('+', $properties);
$html = '';
$ellps = true;
$defArray = array();
foreach ($defs as $def) {
	if ($def != '') {
		$tmpArray = explode('=', $def);
		$defArray[trim($tmpArray[0])] = trim($tmpArray[1]);
		$prop_label = strtr(trim($tmpArray[0]), $crsLabelMapping);
		$prop_value = trim($tmpArray[1]);
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
$title = ($defArray['title'] == '') ? $code : $defArray['title'];
?>
<h2><?php echo $title; ?></h2>
<table class="spaced_2 padded bordered_white whole_width">
<?php echo $html; ?>
</table>
<div style="bottom:8px;color:#808080;font-size:9px;">
<?php if ($srurl != '') { ?>
	<a href="<?php echo $srurl; ?>" title="SpatialReference.org" style="text-decoration:none;color:#808080;" target="_blank"><?php echo $srurl; ?></a><br>
<?php } ?>
	<?php echo $code; ?> : <?php echo $properties; ?>
</div>
