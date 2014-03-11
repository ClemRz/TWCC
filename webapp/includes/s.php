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
WS that sends emails (need cookies validation)
**/
require('application_top.php');
$suffix = __FILE__;
require('functions/firewall.php');

define('PASSED', '1');
define('FIREWALL_ERROR', '-1');
define('MAIL_FUNCTION_ERROR', '-2');
define('EMAIL_SYNTAX_ERROR', '-3');

if (!$passed) die(FIREWALL_ERROR);

$from = isset($_POST['f']) ? strip_tags($_POST['f']) : '';
$body = isset($_POST['b']) ? strip_tags($_POST['b']) : '';
$language = isset($_POST['l']) ? strip_tags($_POST['l']) : '-UNK-';

if (checkEmail($from)) {
	$to = APPLICATION_CONTACT;
	$ip = getIp();
	$subject = "[TWCC]";
	if ($from == APPLICATION_NOREPLY) {
		$subject .= " [CRS] ".$ip;
	} else {
		$subject .= " [MSG] ".$ip;
	}
	$headers = 'From: '.$from."\r\n".
							'Reply-To: '.$from."\r\n".
							'X-Mailer: PHP/'.phpversion();
	$body = $body."\r\n\r\n".'FROM: '.$from."\r\n".'IP: '.$ip."\r\n".'LANGUAGE: '.$language;
	if (mail($to, $subject, $body, $headers)) {
		$return_code = PASSED;
	} else {
		$return_code = MAIL_FUNCTION_ERROR;
	}
} else {
	$return_code = EMAIL_SYNTAX_ERROR;
}

echo $return_code;
?>
