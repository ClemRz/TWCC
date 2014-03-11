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
    class DBSession
    {
        public static function register()
        {
            ini_set('session.save_handler', 'user');
            session_set_save_handler(array('DBSession', 'open'), array('DBSession', 'close'), array('DBSession', 'read'), array('DBSession', 'write'), array('DBSession', 'destroy'), array('DBSession', 'gc'));
        }

        public static function open()
        {
            $db = Database::getDatabase();
            return $db->isWriteConnected();
        }

        public static function close()
        {
            return true;
        }

        public static function read($id)
        {
            $db = Database::getDatabase();
            $db->query('SELECT `data` FROM `sessions` WHERE `id` = :id:', array('id' => $id));
            return $db->hasRows() ? $db->getValue() : '';
        }

        public static function write($id, $data)
        {
            $db = Database::getDatabase();
            $db->query('DELETE FROM `sessions` WHERE `id` = :id:', array('id' => $id));
            $db->query('INSERT INTO `sessions` (`id`, `data`, `updated_on`) VALUES (:id:, :data:, :updated_on:)', array('id' => $id, 'data' => $data, 'updated_on' => time()));
            return ($db->affectedRows() == 1);
        }

        public static function destroy($id)
        {
            $db = Database::getDatabase();
            $db->query('DELETE FROM `sessions` WHERE `id` = :id:', array('id' => $id));
            return ($db->affectedRows() == 1);
        }

        public static function gc($max)
        {
            $db = Database::getDatabase();
            $db->query('DELETE FROM `sessions` WHERE `updated_on` < :updated_on:', array('updated_on' => time() - $max));
            return true;
        }
    }
?>