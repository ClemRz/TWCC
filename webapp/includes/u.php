<?php
/* © 2010 Clément Ronzon */
/**
WS that performs a unicity check of CRS (need cookies validation)
**/
require('application_top.php');
$suffix = __FILE__;
require('functions/firewall.php');

define('PASSED', '1');
define('FIREWALL_ERROR', '-1');
define('ARGUMENTS_ERROR', '-2');
define('DUPLICATE_ENTRY_ERROR', '-3');

if (!$passed) die(FIREWALL_ERROR);

$table = isset($_POST['b']) ? strip_tags($_POST['b']) : '';
$column = isset($_POST['c']) ? strip_tags($_POST['c']) : '';
$value = isset($_POST['v']) ? strip_tags($_POST['v']) : '';

if ($table == '' || $column == '' || $value == '') die(ARGUMENTS_ERROR);

$db = Database::getDatabase();
$row = $db->getRow("SELECT DISTINCT ".$column." FROM ".$table." WHERE ".$column."=".$db->quote($value));
$return_code = DUPLICATE_ENTRY_ERROR;
if($row === false) $return_code = PASSED;

echo $return_code;
?>
