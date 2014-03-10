<?php
/**é
 **/
require('encrypt.php');

$passed = false;
if(!$_POST){
	//Invalid arguments
} else {
	$func = isset($_POST['ff']) ? $_POST['ff'] : '';
	$enc_key = ENC_KEY.$suffix;
	switch($func){
		case 'd':
			if(!isset($_COOKIE[TOKEN_NAME]) OR (int)sdecrypt($_COOKIE[TOKEN_NAME], $enc_key) < strtotime('-10 seconds')){
				//Invalid token
			} else {
				//continue
				$passed = true;
			}
			break;
		case 'g':
			die(sencrypt(time(), $enc_key));
			break;
		default:
			//Invalid action
			break;
	}
}
?>