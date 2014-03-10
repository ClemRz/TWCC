<?php
/* © 2010 Clément Ronzon */
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
