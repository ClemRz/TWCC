<?php
/*

	Copyright Clément Ronzon

*/
require('../includes/application_top.php');
?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN""http://www.w3.org/TR/html4/strict.dtd">
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
  </head>
  <body>
    <h1>Donors list</h1>
    <table>
      <tr><th width="25%">Name</th><th width="25%">Date</th><th width="25%">Emitted value</th><th width="25%">Received value</th></tr>
<?php
  $gifts_emitted = 0;
  $gifts_received = 0;
  $sql = "SELECT d.don_name AS name, g.gift_emition_date AS date, g.gift_emitted_value AS evalue, g.gift_received_value AS rvalue ";
  $sql .= "FROM gifts g INNER JOIN donors d ON g.don_code = d.don_code ";
  $sql .= "ORDER BY 2 DESC";
  $gifts_query = tep_db_query($sql);
  while ($gifts = tep_db_fetch_array($gifts_query)) {
?>
      <tr>
        <td><?php echo $gifts['name']; ?></td>
        <td><?php echo $gifts['date']; ?></td>
        <td><?php echo $gifts['evalue']; ?>€</td>
        <td><?php echo $gifts['rvalue']; ?>€</td>
      </tr>
<?php
    $gifts_emitted = $gifts_emitted + $gifts['evalue'];
    $gifts_received = $gifts_received + $gifts['rvalue'];
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
