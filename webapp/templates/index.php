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
define('IS_LIGHT', false);
require($_SERVER['DOCUMENT_ROOT'].'/includes/application_top.php'); ?>
<!DOCTYPE html>
<html lang="<?php echo LANGUAGE_CODE; ?>" dir="<?php echo DIR; ?>">
	<head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
		<meta name="application-name" content="The World Coordinate Converter">
		<meta name="author" content="Clément RONZON">
		<meta name="description" content="<?php echo APPLICATION_DESCRIPTION; ?>">
		<meta name="keywords" content="twcc, convertisseur, coordinate, converter, Convertidor, coordenadas, conversion, conversión, convertisseur, coordonnées, géodésique, geodesic, geodésica, geodetic, geodésicas, géographique, geographic, geográficas, spatiales, spatial, espaciales, système, référence, datum, dato, geodésicos, géodésie, geodesia, geodesy, géodétique, cartographie, mapping, cartografía, topographie, topography, outil, tool, herramienta, mondial, world, global, mundial, universel, universal, NTF, lambert, WGS84, GPS, UTM, géomètre, surveyor, survey, topógrafo">
		<meta name="revisit-after" content="15 days">
		<meta name="rating" content="general">
		<meta name="robots" content="index, follow">
		<meta name="viewport" content="initial-scale=1.0, user-scalable=no">
		<meta name="google-site-verification" content="MQctbvZ1qn9SZgDKFwhprHVTUjciTzlwQ0yN9Jn9vGM">
		<meta name="y_key" content="76e16a0a9355f347">
		<meta name="msvalidate.01" content="4C7A05BCB9E3FBDE1479482D706426DC">
<?php
echo(getAlternateReferences());
?>
		
		<link rel="alternate" type="application/rss+xml" title="<?php echo APPLICATION_TITLE.' - '.COORDINATE_REFERENCE_SYSTEMS; ?>" href="<?php echo HTTP_SERVER; ?>/rss.php?l=<?php echo LANGUAGE_CODE; ?>">
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
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/ol@v7.1.0/ol.css">
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/ol-geocoder@latest/dist/ol-geocoder.min.css">
<?php if (isset($_GET['debug'])) { ?>
        <link rel="stylesheet" type="text/css" href="/node_modules/ol-layerswitcher/src/ol-layerswitcher.css">
		<link rel="stylesheet" type="text/css" href="/css/all.css">
<?php } else { ?>
		<link rel="stylesheet" type="text/css" href="/css/dist/all-<%= pkg.version %>.min.css">
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
<?php if (IS_DEV_ENV) { ?>
		<script type="text/javascript" src="/js/vendor/jquery-migrate-1.2.1.min.js"></script>
<?php } ?>

<?php if (isset($_GET['debug'])) { ?>
        <script type="text/javascript" src="/js/vendor/clipboard.min.js"></script>
        <script type="text/javascript" src="/js/history.js"></script>
        <script type="text/javascript" src="/js/main.js"></script>
        <script type="text/javascript" src="/js/math.js"></script>
        <script type="text/javascript" src="/js/vendor/jquery.bgiframe.js"></script>
        <script type="text/javascript" src="/js/vendor/jquery.bt.min.custom.js"></script>
        <script type="text/javascript" src="/js/vendor/jquery-ui.min.js"></script>
        <script type="text/javascript" src="/js/vendor/jquery.cookie.js"></script>
        <script type="text/javascript" src="/js/vendor/jquery.fullscreen-min.js"></script>
        <script type="text/javascript" src="/js/vendor/proj4.js"></script>
        <script type="text/javascript" src="/js/converter.class.js"></script>
        <script type="text/javascript" src="/js/vendor/cof2Obj.js"></script>
        <script type="text/javascript" src="/js/vendor/geomag.js"></script>
        <script type="text/javascript" src="/js/map.bundle.js"></script>
        <script type="text/javascript" src="/js/ui.js"></script>
        <script type="text/javascript" src="/js/converter.js"></script>
        <script type="text/javascript" src="/js/analytics.js"></script>
<?php } else { ?>
        <script type="text/javascript" src="/js/dist/<%= pkg.name %>-<%= pkg.version %>.min.js"></script>
<?php } ?>

<?php 	if (BANNER_ADS_ENABLED) { ?>
        <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<?php } ?>
	</head>
	<body>
<?php if (USE_FACEBOOK) { ?>
		<div id="fb-root"></div>
<?php } ?>
<?php include('templates/pieces/header.php'); ?>
        <main>
            <div id="map-container">
                <div id="map" class=".map" dir="ltr"></div>

                <div id="c-container" class="trsp-panel ui-corner-all">
                    <div id="c-title"><?php echo CREDIT; ?></div>
                    <div id="credits">
                        <ul>
                            <li><?php echo HOSTING; ?> <a href="http://www.ovh.com" target="_blank">OVH</a></li>
                            <li><?php echo CONSTANTS; ?> <a href="http://spatialreference.org" target="_blank">Spatial Reference</a></li>
                            <li><?php echo LIBRARIES; ?> <a href="http://proj4js.org" target="_blank">Proj4js</a>, <a href="http://jquery.com/" target="_blank">JQuery</a>,
                                <a href="http://jqueryui.com/" target="_blank">JQuery UI</a>, <a href="https://github.com/cmweiss/geomagJS" target="_blank">GeomagJS</a>, <a href="http://www.grottocenter.org/" target="_blank">GrottoCenter.org</a></li>
                            <li><?php echo MAPS; ?> <a href="https://openlayers.org" target="_blank">OpenLayers</a>, <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a>, <a href="http://www.esri.com/" target="_blank">ESRI</a></li>
                        </ul>
                    </div><!-- #credits -->
                </div><!-- #c-container -->

                <div id="license" class="trsp-panel ui-corner-all">
                    <div id="l-title"><?php echo COPYRIGHT; ?></div>
                    <?php echo APPLICATION_LICENSE; ?>
                    <span class="crs-icons">
                        <a class="show-p-poll" href="#" title="<?php echo POLL; ?>"><img src="<?php echo DIR_WS_IMAGES; ?>star.png" alt="<?php echo POLL; ?>" width="16" height="16"></a>
        <?php if (USE_FACEBOOK) { ?>
                        <a href="https://www.facebook.com/TWCC.free" target="_blank" title="<?php echo FACEBOOK; ?>"><img src="<?php echo DIR_WS_IMAGES; ?>icon-facebook.png" alt="<?php echo FACEBOOK; ?>" width="16" height="16"></a>
        <?php } ?>
                        <a href="/<?php echo LANGUAGE_CODE; ?>/rss/" title="RSS Feed" target="_blank" style="white-space:nowrap;"><img src="<?php echo DIR_WS_IMAGES; ?>rss.png" alt="RSS Feed" width="16" height="16"></a>
                    </span>
                </div><!-- #license -->

                <div id="o-container" class="trsp-panel ui-corner-all" style="width:325px;">
                    <h3><?php echo OPTIONS; ?></h3>
                    <div>
                        <p>
                            <span class="csv-radio button-set">
                                <?php echo MODE; ?>
                                <input name="csv" id="csv_false" type="radio" checked="checked" value="0" style="border:0px none;"><label for="csv_false"><?php echo OPTION_MANUAL; ?></label>
                                <input name="csv" id="csv_true" type="radio" value="1" style="border:0px none;"><label for="csv_true"><?php echo OPTION_CSV; ?></label>
                            </span>
                        </p>
                        <p>
                            <?php echo CONVENTION; ?>
                            <span class="convention-radio button-set">
                                <input name="convention" id="survey_true" type="radio" checked="checked" value="1" style="border:0px none;"><label for="survey_true"><?php echo SURVEY; ?></label>
                                <input name="convention" id="survey_false" type="radio" value="0" style="border:0px none;"><label for="survey_false"><?php echo GAUSS_BOMFORD; ?></label>
                            </span>
                        </p>
                        <p>
                            <?php echo AUTO_ZOOM; ?>
                            <input type="checkbox" id="auto-zoom-toggle" checked="checked"><label for="auto-zoom-toggle"><?php echo AUTO_ZOOM; ?></label>
                        </p>
                        <!--<p>
                            <?php /*echo PRINT_CURRENT_MAP; */?>
                            <a href="#" id="print-map"><?php /*echo PRINT_CURRENT_MAP; */?></a>
                        </p>-->
                        <p>
                            <?php echo FULL_SCREEN; ?>
                            <a href="#" id="full-screen"><?php echo FULL_SCREEN; ?></a>
                        </p>
                    </div>
                </div><!-- #o-container -->

                <div id="d-container" class="trsp-panel ui-corner-all">
                    <div id="csvFeatures">
                        <?php echo LENGTH; ?> <span id="lengthContainer">-</span><br>
                        <?php echo AREA; ?> <span id="areaContainer">-</span>
                    </div>
                    <div id="manualFeatures">
                        <img src="<?php echo DIR_WS_IMAGES; ?>MN.png" alt="" width="15" height="15"><?php echo MAGNETIC_DECLINATION; ?> = <span id="magneticDeclinationContainer"></span><?php echo UNIT_DEGREE; ?>
                    </div>
                </div><!-- #d-container -->
<?php if (false) { ?>
                <div id="c-ads-1" class="trsp-panel ui-corner-all">
                    <ins class="adsbygoogle" data-ad-client="<?php /*echo ADSENSE_ID;*/?>" data-ad-slot="<?php /*echo MAP_AD_SLOT; */?>" data-ad-format="<?php /*echo MAP_AD_FORMAT_1; */?>" style="display:inline-block;width:200px;max-height:600px;"></ins>
                </div><!-- #c-ads-1 -->
<?php } ?>
                <?php include('templates/pieces/converter.php') ?>
            </div>
        </main>
		
		<div style="display:none;">
<?php for ($i=1; $i<=4; $i++) { ?>
			<div class="help-<?php echo $i; ?> help-contents">
				<!--a href="#" class="close_button" title="<?php echo CLOSE; ?>"><?php echo CLOSE; ?></a-->
				<a href="#" title="<?php echo CLOSE; ?>" class="close_button ui-white-icon ui-icon ui-icon-circle-close"><?php echo CLOSE; ?></a>
				<p><span class="step"><?php echo $i; ?>.</span> <?php echo constant('HELP_'.$i); ?></p>
				<a href="#" class="next_button" title="<?php if ($i!=4) {echo NEXT;} else {echo FINISH;} ?>"><?php if ($i!=4) {echo NEXT;} else {echo FINISH;} ?></a>
<?php if ($i == 1) { ?>
                <div class="bottom-right">
                    <input type="checkbox" class="dont-show-again" style="vertical-align: middle;"> <?php echo DO_NOT_SHOW_AGAIN; ?>
                </div>
<?php } ?>
			</div><!-- .help-<?php echo $i; ?> -->
<?php } ?>
		</div>

		<?php include('templates/pieces/new-crs.php'); ?>

		<div id="p-loading">
            <div class="logs"></div>
            <div class="progressbar-container"><div class="progressbar"><div class="progress-label">Loading...</div></div></div>
		</div><!-- #p-loading -->

        <?php include('templates/pieces/search-crs.php'); ?>
        <?php include('templates/pieces/contact-us.php'); ?>
        <?php include('templates/pieces/about.php'); ?>
        <?php include('templates/pieces/info-crs.php'); ?>

		<div id="p-poll">
			<div id="poll-info" class="section" style="font-size:1.2em;">
				
			</div>
		</div><!-- #p-poll -->

<?php if (false) { ?>
		<div id="p-info">
			<br>
			<h2><?php echo LOOKING_FOR_TRANSLATOR; ?></h2>
<?php if (BANNER_ADS_ENABLED) { ?>
			<ins class="adsbygoogle" data-ad-client="<?php echo ADSENSE_ID;?>" data-ad-slot="<?php echo INFO_AD_SLOT; ?>" style="display:inline-block;width:728px;height:90px;"></ins>
<?php } ?>
		</div>
<?php } ?>

        <?php include('templates/pieces/donate.php'); ?>
		
		<div id="p-convention_help">
			<p>
				<img src="<?php echo DIR_WS_IMAGES; ?>survey_396x320.jpg" alt="" width="396" height="320">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<img src="<?php echo DIR_WS_IMAGES; ?>gauss-bomford_381x320.jpg" alt="" width="381" height="320">
			</p>
			<p>
				<?php echo CREDIT; ?> <a href="http://www.ogp.org.uk/pubs/373-21.pdf" target="_blank">International Association of Oil &amp; Gas Producers (OGP)</a>
			</p>
		</div>
	
<?php if (isset($_GET['tmp'])) { // To Remove Before Prod ?>
<?php if($Auth->loggedIn()) { ?>
<?php } else { ?>
		<div id="dialog-registration-form" title="<?php echo SIGN_UP; ?>" class="account-form">
			<p class="validateTips"><?php echo ALL_FIELDS_REQUIRED; ?></p>
			<form action="register.php" method="post" id="register-form">
				<fieldset>
					<label for="regName"><?php echo REG_NAME; ?></label>
					<input type="text" name="regName" id="regName" class="text ui-widget-content ui-corner-all">
					<label for="regEmail"><?php echo REG_EMAIL; ?></label>
					<input type="text" name="regEmail" id="regEmail" value="" class="text ui-widget-content ui-corner-all">
					<label for="regPassword"><?php echo REG_PASSWORD; ?></label>
					<input type="password" name="regPassword" id="regPassword" value="" class="text ui-widget-content ui-corner-all">
				</fieldset>
			</form>
		</div>
		<div id="dialog-login-form" title="<?php echo LOG_IN; ?>" class="account-form">
			<form action="login.php" method="post" id="login-form">
				<fieldset>
					<label for="logEmail"><?php echo LOG_EMAIL; ?></label>
					<input type="text" name="logEmail" id="logEmail" value="" class="text ui-widget-content ui-corner-all">
					<label for="logPassword"><?php echo LOG_PASSWORD; ?></label>
					<input type="password" name="logPassword" id="logPassword" value="" class="text ui-widget-content ui-corner-all">
					<input type="hidden" name="r" value="<?PHP echo htmlspecialchars(@$_REQUEST['r']); ?>" id="r">
				</fieldset>
			</form>
		</div>
<?php } ?>
<?php } ?>
	</body>
</html>
