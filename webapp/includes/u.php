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
