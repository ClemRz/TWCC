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
    class DBPager extends Pager
    {
        private $itemClass;
        private $countSql;
        private $pageSql;

        public function __construct($itemClass, $countSql, $pageSql, $page, $per_page)
        {
            $this->itemClass = $itemClass;
            $this->countSql  = $countSql;
            $this->pageSql   = $pageSql;

            $db = Database::getDatabase();
            $num_records = intval($db->getValue($countSql));

            parent::__construct($page, $per_page, $num_records);
        }

        public function calculate()
        {
            parent::calculate();
            // load records .. see $this->firstRecord, $this->perPage
            $limitSql = sprintf(' LIMIT %s,%s', $this->firstRecord, $this->perPage);
            $this->records = array_values(DBObject::glob($this->itemClass, $this->pageSql . $limitSql));
        }
    }
?>