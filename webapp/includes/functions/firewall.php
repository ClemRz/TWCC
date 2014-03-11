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