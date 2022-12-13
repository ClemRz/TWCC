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
define('IS_LIGHT', true);
require($_SERVER['DOCUMENT_ROOT'] . '/includes/application_top.php'); ?>
<!DOCTYPE html>
<html lang="<?php echo LANGUAGE_CODE; ?>" dir="<?php echo DIR; ?>" class="light">
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="application-name" content="The World Coordinate Converter">
    <meta name="author" content="Clément RONZON">
    <meta name="description" content="<?php echo APPLICATION_DESCRIPTION; ?>">
    <meta name="keywords"
          content="twcc, convertisseur, coordinate, converter, Convertidor, coordenadas, conversion, conversión, convertisseur, coordonnées, géodésique, geodesic, geodésica, geodetic, geodésicas, géographique, geographic, geográficas, spatiales, spatial, espaciales, système, référence, datum, dato, geodésicos, géodésie, geodesia, geodesy, géodétique, cartographie, mapping, cartografía, topographie, topography, outil, tool, herramienta, mondial, world, global, mundial, universel, universal, NTF, lambert, WGS84, GPS, UTM, géomètre, surveyor, survey, topógrafo">
    <meta name="revisit-after" content="15 days">
    <meta name="rating" content="general">
    <meta name="robots" content="index, follow">
    <meta name="viewport" content="initial-scale=1.0, width=device-width">
    <meta name="google-site-verification" content="MQctbvZ1qn9SZgDKFwhprHVTUjciTzlwQ0yN9Jn9vGM">
    <meta name="y_key" content="76e16a0a9355f347">
    <meta name="msvalidate.01" content="4C7A05BCB9E3FBDE1479482D706426DC">
    <?php
    echo(getAlternateReferences());
    ?>

    <link rel="alternate" type="application/rss+xml"
          title="<?php echo APPLICATION_TITLE . ' - ' . COORDINATE_REFERENCE_SYSTEMS; ?>"
          href="<?php echo HTTP_SERVER; ?>/rss.php?l=<?php echo LANGUAGE_CODE; ?>">
    <link rel="copyright" href="http://creativecommons.org/licenses/by-nc/3.0/">
    <!-- version IE //-->
    <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
    <!-- version standart //-->
    <link rel="shortcut icon" type="image/png" href="/favicon.png">
    <title><?php echo APPLICATION_TITLE; ?></title>
    <script type="text/javascript">
        //<![CDATA[
        var App = <?php require(DIR_WS_INCLUDES . 'app.json.php'); ?>;
        App.context.startTime = new Date().getTime();
        //]]>
    </script>
    <link rel="stylesheet" type="text/css" href="/css/vendor/jquery-ui.min.css">
    <link rel="stylesheet" type="text/css" href="/css/vendor/octicons.css">
    <?php if (isset($_GET['debug'])) { ?>
        <link rel="stylesheet" type="text/css" href="/css/all.css">
    <?php } else { ?>
        <link rel="stylesheet" type="text/css" href="/css/dist/all-2.4.1.min.css">
    <?php } ?>
    <!--[if IE 8]>
    <link rel="stylesheet" type="text/css" href="/css/ie8.css">
    <![endif]-->
    <!--[if IE 7]>
    <link rel="stylesheet" type="text/css" href="/css/ie7.css">
    <![endif]-->
    <!--[if IE 6]>
    <link rel="stylesheet" type="text/css" href="/css/ie6.css">
    <![endif]-->
    <script type="text/javascript" src="/js/vendor/jquery-1.11.1.min.js"></script>

    <?php if (isset($_GET['debug'])) { ?>
        <script type="text/javascript" src="/js/vendor/clipboard.min.js"></script>
        <script type="text/javascript" src="/js/history.js"></script>
        <script type="text/javascript" src="/js/main.js"></script>
        <script type="text/javascript" src="/js/math.js"></script>
        <script type="text/javascript" src="/js/vendor/jquery.bgiframe.js"></script>
        <script type="text/javascript" src="/js/vendor/jquery.bt.min.custom.js"></script>
        <script type="text/javascript" src="/js/vendor/jquery-ui.min.js"></script>
        <script type="text/javascript" src="/js/vendor/jquery.cookie.js"></script>
        <script type="text/javascript" src="/js/vendor/proj4.js"></script>
        <script type="text/javascript" src="/js/converter.class.js"></script>
        <script type="text/javascript" src="/js/vendor/cof2Obj.js"></script>
        <script type="text/javascript" src="/js/vendor/geomag.js"></script>
        <script type="text/javascript" src="/js/ui.js"></script>
        <script type="text/javascript" src="/js/converter.js"></script>
        <script type="text/javascript" src="/js/analytics.js"></script>
    <?php } else { ?>
        <script type="text/javascript" src="/js/dist/TWCC-2.4.1.min.js"></script>
    <?php } ?>

    <?php if (BANNER_ADS_ENABLED) { ?>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <?php } ?>
</head>
<body>
<?php if (USE_FACEBOOK) { ?>
    <div id="fb-root"></div>
<?php } ?>
<?php include('templates/pieces/header.php'); ?>
<main>
    <?php include('templates/pieces/converter.php') ?>
    <?php if (BANNER_ADS_ENABLED) { ?>
        <ins class="adsbygoogle" data-ad-client="<?php echo ADSENSE_ID;?>" data-ad-slot="<?php echo MOBILE_BOTTOM_AD_SLOT; ?>" style="display:block;" data-ad-format="auto" data-full-width-responsive="true"></ins>
    <?php } ?>
</main>
<?php include('templates/pieces/new-crs.php'); ?>
<?php include('templates/pieces/search-crs.php'); ?>
<?php include('templates/pieces/contact-us.php'); ?>
<?php include('templates/pieces/about.php'); ?>
<?php include('templates/pieces/info-crs.php'); ?>
<?php include('templates/pieces/donate.php'); ?>
</body>
</html>
