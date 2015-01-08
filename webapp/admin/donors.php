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
require($_SERVER['DOCUMENT_ROOT'] . '/includes/application_top.php');
$actionWhiteList = array('new_donor', 'new_gift');
$action = isset($_POST['action']) ? $_POST['action'] : false;
if ($action && in_array($action, $actionWhiteList)) {
    switch ($action) {
        case 'new_donor':
            $table = 'donors';
            $data = array(
                'don_name' => $_POST['don_name'],
                'don_creation_date' => 'now()',
                'don_updated_date' => 'now()'
            );
            break;
        case 'new_gift':
            $table = 'gifts';
            $data = array(
                'gift_emitted_value' => $_POST['gift_emitted_value'],
                'gift_received_value' => $_POST['gift_received_value'],
                'don_code' => $_POST['don_code'],
                'gift_creation_date' => 'now()',
                'gift_updated_date' => 'now()',
                'gift_emition_date' => $_POST['gift_emition_date']

            );
            break;
    }
    tep_db_perform($table, $data);
}

?>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <meta http-equiv="content-language" content="en">
        <meta name="language" content="en">
        <meta name="category" content="internet">
        <meta name="classification" content="08">
        <meta name="type" content="40">
        <meta name="author" content="Clément RONZON">
        <meta name="publisher" content="Clément RONZON">
        <meta name="copyright" content="Clément RONZON">
        <meta name="date-creation-yyyymmdd" content="20100809">
        <meta name="date-revision-yyyymmdd" content="20100809">
        <meta name="keywords" content="twcc, convertisseur de coordonnées universel, the world coordinate converter, Convertidor de coordenadas, conversion, conversión, convertisseur de coordonnées, coordinate converter, convertisseur géodésique, geodesic converter, convertidor geodésica, coordonnées géodésiques, geodetic coordinates, coordenadas geodésicas, coordonnées géographique, geographic coordinates, coordenadas geográficas, coordonnées spatiales, spatial coordinates, coordenadas espaciales, système de référence, datum, dato, système géodésique, geodésicos, géodésie, geodesia, geodesy, géodétique, geodetic, cartographie, mapping, cartografía, topographie, topography, outil géographique, geographical tool, herramienta geográfica, mondial, world, global, mundial, universel, universal, NTF, lambert, WGS84, GPS, UTM">
        <meta name="distribution" content="global">
        <meta name="generator" content="PSPad, Pain.NET">
        <meta name="identifier-url" content="http://twcc.free.fr">
        <meta name="revisit-after" content="15 days">
        <meta name="rating" content="general">
        <meta name="robots" content="index, follow">
        <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
        <link rel="copyright" href="http://creativecommons.org/licenses/by-nc/3.0/">
        <!-- version IE //-->
        <link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
        <!-- version standart //-->
        <link rel="shortcut icon" type="image/png" href="favicon.png">
        <title>Donors Administration</title>
        <script type="text/javascript" src="/js/vendor/jquery-1.11.1.min.js"></script>
        <script src="/js/vendor/select2.min.js"></script>
        <script type="text/javascript">
                //<![CDATA[
            (function($) {
                function _init() {
                    $('select').select2();
                }

                $(document).ready(_init);
            })(jQuery);
        //]]>
        </script>
        <link rel="stylesheet" type="text/css" href="/css/vendor/select2.css">
    </head>
    <body>
        <h1>New donor</h1>
        <form action="donors.php" method="post">
            <input type="text" name="don_name" value="" placeholder="Panchito Perez">
            <input type="hidden" name="action" value="new_donor">
            <input type="submit" value="Save">
        </form>
        <h1>New donation</h1>
        <form action="donors.php" method="post">
            <select name="don_code">
                <option value="0" selected>Select a donor...</option>
            <?php
            $sql = "SELECT don_code, don_name FROM donors ORDER BY 2 ASC";
            $donors_query = tep_db_query($sql);
            while ($donor = tep_db_fetch_array($donors_query)) {
                ?>
                <option value="<?php echo $donor['don_code']; ?>"><?php echo $donor['don_name']; ?></option>
                <?php
            }
            ?>
            </select>
            <input type="text" name="gift_emitted_value" value="" placeholder="10.50">
            <input type="text" name="gift_received_value" value="" placeholder="99.99">
            <input type="text" name="gift_emition_date" value="" placeholder="yyyy-mm-dd">
            <input type="hidden" name="action" value="new_gift">
            <input type="submit" value="Save">
        </form>
        <h1>Donors list</h1>
        <table>
            <tr>
                <th width="25%">Name</th>
                <th width="25%">Date</th>
                <th width="25%">Emitted value</th>
                <th width="25%">Received value</th>
            </tr>
            <?php
            $gifts_emitted = 0;
            $gifts_received = 0;
            $sql = "SELECT d.don_name AS name, g.gift_emition_date AS date, g.gift_emitted_value AS evalue, g.gift_received_value AS rvalue ";
            $sql .= "FROM gifts g INNER JOIN donors d ON g.don_code = d.don_code ";
            $sql .= "ORDER BY 2 DESC";
            $gifts_query = tep_db_query($sql);
            while ($gift = tep_db_fetch_array($gifts_query)) {
                ?>
                <tr>
                    <td><?php echo $gift['name']; ?></td>
                    <td><?php echo $gift['date']; ?></td>
                    <td><?php echo $gift['evalue']; ?>€</td>
                    <td><?php echo $gift['rvalue']; ?>€</td>
                </tr>
                <?php
                $gifts_emitted = $gifts_emitted + $gift['evalue'];
                $gifts_received = $gifts_received + $gift['rvalue'];
            }
            ?>
            <tr>
                <td colspan="2">TOTAL</td>
                <td><?php echo $gifts_emitted; ?>€</td>
                <td><?php echo $gifts_received; ?>€</td>
            </tr>
        </table>
    </body>
</html>
