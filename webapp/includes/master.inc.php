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
    // Application flag
    define('SPF', true);

    // https://twitter.com/#!/marcoarment/status/59089853433921537
    date_default_timezone_set('America/Los_Angeles');

    // Determine our absolute document root
    define('DOC_ROOT', realpath(dirname(__FILE__) . '/../'));

    // Global include files
    require DOC_ROOT . '/includes/functions.inc.php';  // spl_autoload_register() is contained in this file
    require DOC_ROOT . '/includes/class.dbobject.php'; // DBOBject...
    require DOC_ROOT . '/includes/class.objects.php';  // and its subclasses

    // Fix magic quotes
    if(get_magic_quotes_gpc())
    {
        $_POST    = fix_slashes($_POST);
        $_GET     = fix_slashes($_GET);
        $_REQUEST = fix_slashes($_REQUEST);
        $_COOKIE  = fix_slashes($_COOKIE);
    }

    // Load our config settings
    $Config = Config::getConfig();

    // Store session info in the database?
    if(Config::get('useDBSessions') === true)
        DBSession::register();

    // Initialize our session
    session_name('spfs');
    session_start();

    // Initialize current user
    $Auth = Auth::getAuth();

    // Object for tracking and displaying error messages
    $Error = Error::getError();

    // If you need to bootstrap a first user into the database, you can run this line once
    // Auth::createNewUser('username', 'password');