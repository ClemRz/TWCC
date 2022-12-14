<meta http-equiv="content-type" content="text/html; charset=utf-8">
<meta name="application-name" content="The World Coordinate Converter">
<meta name="author" content="Clément RONZON">
<meta name="description" content="<?php echo APPLICATION_DESCRIPTION; ?>">
<meta name="keywords"
      content="twcc, convertisseur, coordinate, converter, Convertidor, coordenadas, conversion, conversión, convertisseur, coordonnées, géodésique, geodesic, geodésica, geodetic, geodésicas, géographique, geographic, geográficas, spatiales, spatial, espaciales, système, référence, datum, dato, geodésicos, géodésie, geodesia, geodesy, géodétique, cartographie, mapping, cartografía, topographie, topography, outil, tool, herramienta, mondial, world, global, mundial, universel, universal, NTF, lambert, WGS84, GPS, UTM, géomètre, surveyor, survey, topógrafo">
<meta name="revisit-after" content="15 days">
<meta name="rating" content="general">
<meta name="robots" content="index, follow">
<meta name="viewport" content="initial-scale=1.0, <?php echo(IS_LIGHT ? "width=device-width" : "user-scalable=no"); ?>">
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
<?php if (!IS_LIGHT) { ?>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/ol@v7.1.0/ol.css">
    <link rel="stylesheet" type="text/css"
          href="https://cdn.jsdelivr.net/npm/ol-geocoder@latest/dist/ol-geocoder.min.css">
<?php } ?>
<?php if (isset($_GET['debug'])) { ?>
    <?php if (!IS_LIGHT) { ?>
        <link rel="stylesheet" type="text/css" href="/node_modules/ol-layerswitcher/src/ol-layerswitcher.css">
    <?php } ?>
    <link rel="stylesheet" type="text/css" href="/css/all.css">
<?php } else { ?>
    <link rel="stylesheet" type="text/css" href="/css/dist/all-<?php echo PKG_VERSION; ?>.min.css">
<?php } ?>
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
    <?php if (!IS_LIGHT) { ?>
        <script type="text/javascript" src="/js/vendor/jquery.fullscreen-min.js"></script>
    <?php } ?>
    <script type="text/javascript" src="/js/vendor/proj4.js"></script>
    <script type="text/javascript" src="/js/converter.class.js"></script>
    <script type="text/javascript" src="/js/vendor/cof2Obj.js"></script>
    <script type="text/javascript" src="/js/vendor/geomag.js"></script>
    <?php if (!IS_LIGHT) { ?>
        <script type="text/javascript" src="/js/map.bundle.js"></script>
    <?php } ?>
    <script type="text/javascript" src="/js/ui.js"></script>
    <script type="text/javascript" src="/js/converter.js"></script>
    <script type="text/javascript" src="/js/analytics.js"></script>
<?php } else { ?>
    <script type="text/javascript" src="/js/dist/<?php echo PKG_NAME; ?>-<?php echo PKG_VERSION; ?>.min.js"></script>
<?php } ?>

<?php if (BANNER_ADS_ENABLED) { ?>
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<?php } ?>