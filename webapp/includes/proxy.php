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

function _throwError($message)
{
    $sapi_type = php_sapi_name();
    if (substr($sapi_type, 0, 3) == "cgi") {
        header("Status: 400 Bad Request");
    } else {
        header("HTTP/1.1 400 Bad Request");
    }
    die($message);
}

if (isset($_GET["u"])) {
    try {
        $url = $_GET["u"];
        $f = fopen($url, "r");
        if (!$f) {
            throw new Exception("invalid url");
        }
        $html = "";
        while (!feof($f)) {
            $html .= fread($f, 24000);
        }
        fclose($f);
        echo $html;
    } catch (Exception $e) {
        _throwError("Invalid Url");
    }
}