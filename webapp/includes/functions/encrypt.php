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