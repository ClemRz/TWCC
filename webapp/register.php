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
    require 'includes/master.inc.php';

    if($Auth->loggedIn()) redirect(WEB_ROOT);

    if(!empty($_POST['regEmail']))
    {
        if($Auth->createNewUser($_POST['regEmail'], $_POST['regPassword']))
        {
          if($Auth->login($_POST['regEmail'], $_POST['regPassword']))
          {
              if(isset($_REQUEST['r']) && strlen($_REQUEST['r']) > 0)
                  redirect($_REQUEST['r']);
              else
                  redirect(WEB_ROOT);
          }
          else
              redirect(WEB_ROOT."#login");
        }
        else
            redirect(WEB_ROOT."#register");
    }
    else
        redirect(WEB_ROOT."#register");
?>