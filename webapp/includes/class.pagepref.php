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
    // Stores session variables unique to a given URL
    class PagePref
    {
        public $_id;
        public $_data;

        public function __construct()
        {
            $this->_id = 'pp' . md5($_SERVER['PHP_SELF']);

            if(isset($_SESSION[$this->_id]))
                $this->_data = unserialize($_SESSION[$this->_id]);
        }

        public function __get($key)
        {
            return $this->_data[$key];
        }

        public function __set($key, $val)
        {
            if(!is_array($this->_data)) $this->_data = array();
            $this->_data[$key] = $val;
            $_SESSION[$this->_id] = serialize($this->_data);
        }

        public function clear()
        {
            unset($_SESSION[$this->_id]);
            unset($this->_data);
        }
    }
?>