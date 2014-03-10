<?php
/**é
 * encrypt a string, based on a key value
 *
 * @param str	    string or array to be encrypted
 * @param key		key used to encrypt string
 * @return result	encrypted string or false on error
 **/
function sencrypt($str='', $key='') {
	if(!isset($key) || $key == '') {
		$key = ENC_KEY;
	}
	if(is_array($str)) {
		$str = serialize($str);
	}
	$result = '';
	for($i=1; $i<=strlen($str); $i++){
		$char = substr($str, $i-1, 1);
		$keychar = substr($key, ($i % strlen($key))-1, 1);
		$char = chr(ord($char)+ord($keychar));
		$result.=$char;
	}
	return base64_encode($result);
}
     
/**
 * decrypt a string, based on a key value
 *
 * @param str   	string or array to be decrypted
 * @param key		key used to encrypt original string
 * @return result	decrypted string or false on error
 **/
function sdecrypt($str='', $key='') {
	if(!isset($key) || $key==''){
		$key = ENC_KEY;
	}
	$str = base64_decode(str_replace(' ','+',$str));
	$result = '';
	for($i=1; $i<=strlen($str); $i++){
		$char = substr($str, $i-1, 1);
		$keychar = substr($key, ($i % strlen($key))-1, 1);
		$char = chr(ord($char)-ord($keychar));
		$result.=$char;
	}
  return $result;
}
?>