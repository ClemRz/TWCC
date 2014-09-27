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
require('includes/application_top.php'); ?>
<!DOCTYPE html>
<html lang="<?php echo LANGUAGE_CODE; ?>">
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
		
		<link rel="alternate" type="application/rss+xml" title="<?php echo APPLICATION_TITLE.' - '.COORDINATE_REFERENCE_SYSTEMS; ?>" href="<?php echo HTTP_SERVER; ?>/rss.php?l=<?php echo LANGUAGE_CODE; ?>">
		<link rel="copyright" href="http://creativecommons.org/licenses/by-nc/3.0/">
		<!-- version IE //-->
		<link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
		<!-- version standart //-->
		<link rel="shortcut icon" type="image/png" href="favicon.png">
		<title><?php echo APPLICATION_TITLE; ?></title>
		
		<script type="text/javascript">
		//<![CDATA[
			var dir_ws_images = '<?php echo DIR_WS_IMAGES; ?>';
		//]]>
		</script>
		<script type="text/javascript" src="js/jquery-1.11.1.js"></script>
<?php if (IS_DEV_ENV) { ?>
		<script type="text/javascript" src="js/jquery-migrate-1.2.1.js"></script>
<?php } ?>
	
		<script type="text/javascript" src="js/jquery.bgiframe.3.0.0.js" charset="utf-8"></script>
		<!--[if IE]><script type="text/javascript" src="js/excanvas.compiled.js" charset="utf-8"></script><![endif]-->
		<script type="text/javascript" src="js/jquery.bt.min.custom.js" charset="utf-8"></script>
		<script type="text/javascript" src="js/jquery-ui-1.10.3.custom.min.js"></script>
		<script type="text/javascript" src="js/jquery.cookie.1.3.1.js"></script>
		<script type="text/javascript" src="js/jquery.fullscreen-min.js"></script>
		<script type="text/javascript" src="js/lib/proj4js-combined.CRO.1.0.3.js"></script>
		<script type="text/javascript" src="js/connectors.js"></script>
		<script type="text/javascript" src="js/utils.js"></script>
		<script type="text/javascript" src="js/converter.class<?php if (!isset($_GET['debug'])) echo ".".CONVERTER_CLASS_VERSION; ?>.js"></script>
<?php if(!IS_DEV_ENV) { ?>
		<script type="text/javascript" src="https://apis.google.com/js/plusone.js">
			{lang: '<?php echo LANGUAGE_CODE; ?>'}
		</script>
<?php } ?>
		<script type="text/javascript" src="js/WorldMagneticModel.2.0.js"></script>
<?php
if (USE_ADDTHIS) {
	require(DIR_WS_FUNCTIONS . 'addthis.js.php');
}
require(DIR_WS_FUNCTIONS . 'v' . MAPS_API_VERSION . '.js.php');
require(DIR_WS_FUNCTIONS . 'global.js.php');
require(DIR_WS_FUNCTIONS . 'analytics.js.php');
?>
		<link rel="stylesheet" type="text/css" href="css/custom-theme/jquery-ui-1.10.3.custom.min.css">	
		<link rel="stylesheet" type="text/css" href="css/base_v<?php echo MAPS_API_VERSION; ?><?php if (!isset($_GET['debug'])) echo ".".BASE_CSS_SUB_VERSION; ?>.css">
		<!--[if IE 8]>
			<link rel="stylesheet" type="text/css" href="css/ie8.css">
		<![endif]-->
		<!--[if IE 7]>
			<link rel="stylesheet" type="text/css" href="css/ie7.css">
		<![endif]-->
		<!--[if IE 6]>
			<link rel="stylesheet" type="text/css" href="css/ie6.css">
		<![endif]-->
	</head>
	<body>
<?php if (USE_FACEBOOK) { ?>
		<div id="fb-root"></div>
		<script type="text/javascript">
		//<![CDATA[
			(function(d, s, id) {
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/<?php echo LOCALE; ?>/all.js#xfbml=1";
			fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
		//]]>
		</script>
<?php } ?>
	
		<div id="m-container">
			<div id="map"></div>
		</div><!-- #m-container -->
		
		<div id="c-container" class="trsp-panel">
			<div id="c-title"><?php echo CREDIT; ?></div>
			<div id="credits">
				<ul>
					<li><?php echo HOSTING; ?> <a href="http://www.free.fr" target="_blank">Free</a></li>
					<li><?php echo CONSTANTS; ?> <a href="http://spatialreference.org" target="_blank">Spatial Reference</a></li>
					<li><?php echo LIBRARIES; ?> <a href="http://proj4js.org" target="_blank">Proj4js</a>, <a href="http://jquery.com/" target="_blank">JQuery</a>,
						<a href="http://jqueryui.com/" target="_blank">JQuery UI</a>, <a href="http://www.grottocenter.org/" target="_blank">GrottoCenter.org</a></li>
					<li><?php echo MAPS; ?> <a href="http://code.google.com/intl/fr/apis/maps/documentation/javascript/" target="_blank">Google</a>, <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a>, <a href="http://www.esri.com/" target="_blank">esri</a></li>
				</ul>
			</div><!-- #credits -->
		</div><!-- #c-container -->
		
		<div id="license" class="trsp-panel">
			<div id="l-title"><?php echo COPYRIGHT; ?></div>
			<?php echo APPLICATION_LICENSE; ?>
			<span class="crs-icons">
				<a class="show-p-poll" href="" title="<?php echo POLL; ?>"><img src="<?php echo DIR_WS_IMAGES; ?>star.png" alt="<?php echo POLL; ?>"></a>
<?php if (USE_FACEBOOK) { ?>
				<a href="http://www.facebook.com/TWCC.free" target="_blank" title="<?php echo FACEBOOK; ?>"><img src="<?php echo DIR_WS_IMAGES; ?>icon-facebook.png" alt="<?php echo FACEBOOK; ?>"></a>
<?php } ?>
				<a href="rss.php?l=<?php echo LANGUAGE_CODE; ?>" title="RSS Feed" target="_blank" style="white-space:nowrap;"><img src="images/rss.png" alt="RSS Feed"></a>
			</span>
		</div><!-- #license -->
		
		<div id="o-container" class="trsp-panel" style="width:325px;">
			<h3><?php echo OPTIONS; ?></h3>
			<div>
				<p>
					<span id="manual-radio">
						<?php echo MODE; ?>
						<input name="manual" id="manual_true" type="radio" checked="checked" value="true" style="border:0px none;" onclick="javascript:setManualMode(true);"><label for="manual_true"><?php echo OPTION_MANUAL; ?></label>
						<input name="manual" id="manual_false" type="radio" value="false" style="border:0px none;" onclick="javascript:setManualMode(false);"><label for="manual_false"><?php echo OPTION_CSV; ?></label>
					</span>
				</p>
				<p>
					<?php echo CONVENTION; ?>
					<span id="convention-radio">
						<input name="convergence" id="survey_true" type="radio" checked="checked" value="true" style="border:0px none;" onclick="javascript:setConvergenceConvention(true);"><label for="survey_true"><?php echo SURVEY; ?></label>
						<input name="convergence" id="survey_false" type="radio" value="false" style="border:0px none;" onclick="javascript:setConvergenceConvention(false);"><label for="survey_false"><?php echo GAUSS_BOMFORD; ?></label>
					</span>
				</p>
				<p>
					<?php echo AUTO_ZOOM; ?>
					<input type="checkbox" id="auto-zoom-toggle" checked="checked"><label for="auto-zoom-toggle"><?php echo AUTO_ZOOM; ?></label>
				</p>
				<p>
					<?php echo PRINT_CURRENT_MAP; ?>
					<a href="#" id="print-map"><?php echo PRINT_CURRENT_MAP; ?></a>
				</p>
				<p>
					<?php echo FULL_SCREEN; ?>
					<a href="#" id="full-screen"><?php echo FULL_SCREEN; ?></a>
				</p>
			</div>
		</div><!-- #o-container -->
		
		<div id="d-container" class="trsp-panel">
			<div id="csvFeatures">
				<?php echo LENGTH; ?> <span id="lengthContainer">-</span><?php echo UNIT_METER; ?><br>
				<?php echo AREA; ?> <span id="areaContainer">-</span><?php echo UNIT_METER; ?><sup>2</sup>
			</div>
			<div id="manualFeatures">
				<img src="<?php echo DIR_WS_IMAGES; ?>MN.png" alt=""><?php echo MAGNETIC_DECLINATION; ?> = <span id="magneticDeclinationContainer"></span><?php echo UNIT_DEGREE; ?>
			</div>
		</div><!-- #d-container -->
		
		<div id="h-container">
			<table class="whole_width" id="header">
				<tr>
					<td style="text-align:left;">
						<div id="h-top-left">
							<h3><a href="/" title="TWCC">TWCC</a></h3>
							<ul class="nav">
								<li class="nav_li first"><a href="" class="about link" title="<?php echo ABOUT; ?>"><?php echo ABOUT; ?></a></li>
								<li class="nav_li"><a href="" class="contact link" title="<?php echo CONTACT_US; ?>"><?php echo CONTACT_US; ?></a></li>
								<li class="nav_li">&nbsp;<?php echo PAYPAL_TINY_FORM; ?></li>
								<li class="nav_li">
									<div style="margin:0 5px;float:left;">
										<dl id="language" class="dropdown">
											<dt><a href="#"><span><?php echo getHTMLLanguage(LANGUAGE_CODE); ?></span></a></dt>
											<dd><ul><?php echo getLILanguages(); ?></ul></dd>
										</dl>
									</div>
								</li>
								<li class="nav_li">
<?php if (USE_FACEBOOK && false) { ?>
									&nbsp;<iframe src="http://www.facebook.com/plugins/like.php?locale=<?php echo LOCALE; ?>&amp;href=http%3A%2F%2Fwww.facebook.com%2FTWCC.free&amp;layout=standard&amp;show_faces=false&amp;action=like&amp;font=arial&amp;colorscheme=light&amp;width=250&amp;height=66" style="border:none; overflow:hidden; width:250px; height:66px;position:absolute;"></iframe>
<?php } ?>
<?php if (USE_ADDTHIS) { ?>
									<a class="addthis_button link" href="http://www.addthis.com/bookmark.php?v=250&amp;username=clemrz" target="_blank">
										<img src="http://s7.addthis.com/static/btn/v2/lg-share-<?php echo LANGUAGE_CODE; ?>.gif" width="125" height="16" alt="Bookmark and Share" style="border:0">
									</a>
<?php } ?>
								</li>
							</ul>
						</div><!-- #h-top-left -->
					</td>
					<td style="text-align:center;">
<?php if (!IS_DEV_ENV) { ?>
						<div class="g-plusone" data-size="small" data-count="true"></div>
<?php } ?>
						<div class="fb-like" data-href="http://www.facebook.com/TWCC.free" data-send="false" data-layout="button_count" data-width="" data-show-faces="false" data-font="arial"></div>
					</td>
					<td style="text-align:right;">
						<div id="h-top-right">
							<div id="search">
								<form id="location-form" class="search-form">
									<table><tr><td style="text-align:right;">
										<h3 style="line-height:20px;"><label for="find-location"><?php echo SEARCH_BY_ADDRESS; ?></label></h3>
									</td><td style="text-align:right;">
										<input type="text" id="find-location" class="search-field" value="">
									</td><td style="text-align:left;">
										<a id="view-map" title="<?php echo GO; ?>" class="view"><?php echo GO; ?></a>
									</td></tr></table>
								</form>
							</div><!-- #search -->
						</div><!-- #h-top-right -->
					</td>
				</tr>
				<tr style="height:41px;">
					<td style="text-align:left;" colspan="3">
						<div id="h-bottom-left">
							<table class="whole_width">
								<tr>
									<td style="text-align:left;">
										<div id="title">
											<h2><?php echo APPLICATION_TITLE.APPLICATION_TITLE_BIS; ?></h2>
											<div style="margin-top:-8px;"><?php echo APPLICATION_TITLE_TER; ?></div>
										</div><!-- #title -->
									</td>
									<td style="text-align:center;">
<?php if (isset($_GET['tmp'])) { // To Remove Before Prod ?>
<?php 	if($Auth->loggedIn()) { ?>
										(<?php echo $Auth->username; ?>) <a href="logout.php"><?php echo LOGOUT; ?></a> 
<?php 	} else { ?>
										<button id="sign-up"><?php echo SIGN_UP; ?></button> <a href="#" id="log-in"><?php echo LOG_IN; ?></a>
<?php 	} ?>
<?php } else { ?>
<?php 	if (BANNER_ADS_ENABLED) { ?>
										<?php $ad_location = BANNER; require(DIR_WS_FUNCTIONS . 'adsense.js.php'); ?>
<?php 	} else if (IS_DEV_ENV) { ?>
										<div style="width:728px;height:15px;background-color:red;">GOOGLE ADS</div>
<?php 	} ?>
<?php } ?>
									</td>
								</tr>
							</table>
						</div><!-- #h-bottom-left -->
					</td>
				</tr>
			</table><!-- #header -->
		</div><!-- #h-container -->
		
		<div style="display:none;">
<?php for ($i=1; $i<=4; $i++) { ?>
			<div id="help-<?php echo $i; ?>" class="help-contents">
				<!--a href="#" class="close_button" title="<?php echo CLOSE; ?>"><?php echo CLOSE; ?></a-->
				<a href="#" title="<?php echo CLOSE; ?>" class="close_button ui-white-icon ui-icon ui-icon-circle-close"><?php echo CLOSE; ?></a>
				<p><span class="step"><?php echo $i; ?>.</span> <?php echo constant('HELP_'.$i); ?></p>
				<a href="#" class="next_button" title="<?php if ($i!=4) {echo NEXT;} else {echo FINISH;} ?>"><?php if ($i!=4) {echo NEXT;} else {echo FINISH;} ?></a>
			</div><!-- #help-<?php echo $i; ?> -->
<?php } ?>
		</div>
		
		<div id="ui-container" class="opt-panel">
			<div class="key drag_handler" style="overflow:auto;text-align:center;cursor:move;">
				<a id="help" title="<?php echo HELP; ?>" href="JavaScript:void($('#crsSource').btOn());"><?php echo HELP; ?></a>
				<a id="hstNext" title="<?php echo NEXT; ?>" href="JavaScript:nexHistory(this);" style="float:right;"><?php echo NEXT; ?></a>
				<a id="hstPrev" title="<?php echo PREVIOUS; ?>" href="JavaScript:previousHistory(this);" style="float:left;"><?php echo PREVIOUS; ?></a>
			</div>
			<div class="key inputs-container">
				<div style="white-space:nowrap" class="crs-icons">
					<a class="show-p-new" href="" title="<?php echo YOU_CANT_FIND; ?>"><img src="<?php echo DIR_WS_IMAGES; ?>plus.png" alt=""></a>
					<select name="crsSource" id="crsSource" onchange="javascript:converterHash.updateCrs(this, true);"><option value="#" class="to-remove"><?php echo LOADING; ?></option></select>
					<a id="searchSource" title="<?php echo DO_RESEARCH; ?>" href=""><img src="<?php echo DIR_WS_IMAGES; ?>search.png" alt="<?php echo DO_RESEARCH; ?>" class="search"></a>
				</div>
				<div id="loadingSource" class="loading"><img src="<?php echo DIR_WS_IMAGES; ?>loading.gif" alt=""><?php echo LOADING; ?></div>
				<div id="xySource"></div>
				<a href="#" id="convSource" title="<?php echo CONVERT; ?>" class="convert_button"><?php echo CONVERT; ?></a>
			</div>
			<div class="key inputs-container">
				<div style="white-space:nowrap" class="crs-icons">
					<a class="show-p-new" href="" title="<?php echo YOU_CANT_FIND; ?>"><img src="<?php echo DIR_WS_IMAGES; ?>plus.png" alt=""></a>
					<select name="crsDest" id="crsDest" onchange="javascript:converterHash.updateCrs(this, true);"><option value="#" class="to-remove"><?php echo LOADING; ?></option></select>
					<a id="searchDest" title="<?php echo DO_RESEARCH; ?>" href=""><img src="<?php echo DIR_WS_IMAGES; ?>search.png" alt="<?php echo DO_RESEARCH; ?>" class="search"></a>
				</div>
				<div id="loadingDest" class="loading"><img src="<?php echo DIR_WS_IMAGES; ?>loading.gif" alt=""><?php echo LOADING; ?></div>
				<div id="xyDest"></div>
				<a href="#" id="convDest" title="<?php echo CONVERT; ?>" class="convert_button"><?php echo CONVERT; ?></a>
			</div>
		</div><!-- #ui-container -->

		<div id="p-new"> <!-- class="p-content container" style="display:none;"-->
			<div class="key">
				<p><span class="step">1.</span> <?php echo SEARCH_SYSTEM; ?><br>
				<span class="example"><?php echo SEARCH_EXAMPLE; ?></span></p>
				<div style="text-align:right;">
					<form id="reference-form" class="search-form">
						<table><tr><td style="text-align:right;">
							<input type="text" id="find-reference" class="search-field" value="" style="width:200px;height:16px;">
						</td><td style="text-align:left;">
							<a id="view-reference" target="_blank" title="<?php echo SEARCH; ?>" class="view" style="color:#FFFFFF;"><?php echo SEARCH; ?></a>
						</td></tr></table>
					</form>
				</div>
			</div>
			<div class="key">
				<p><span class="step">2.</span> <?php echo COME_BACK; ?></p>
				<div class="example"><?php echo SYSTEM_EXAMPLE; ?></div>
				<div style="text-align:right;">
					<form id="new-form" class="search-form">
						<table><tr><td style="text-align:right;">
							<input type="text" id="add-reference" class="search-field" value="" style="width:200px;height:16px;">
							<input type="hidden" name="target" value="">
						</td><td style="text-align:left;">
							<a id="new-reference" target="_blank" title="<?php echo ADD; ?>" class="view" style="color:#FFFFFF;"><?php echo ADD; ?></a>
						</td></tr></table>
					</form>
					<div id="loadingxtra" style="display:none;background-color:#FFFFFF;text-align:center;">
						<img src="<?php echo DIR_WS_IMAGES; ?>loading.gif" alt="<?php echo LOADING; ?>">
					</div>
				</div>
			</div>
			<div class="key">
				<p><span class="step">3.</span> <?php echo FREQUENT_USE; ?></p>
				<a id="send-to-us" href="" title="<?php echo CONTACT_US; ?>" class="contact"><?php echo CONTACT_US; ?></a>
			</div>
		</div><!-- #p-new -->

		<div id="p-research">
			<div class="key">
				<p><b><?php echo RESEARCH_FORM; ?></b></p>
				<form id="research-form">
					<div>
						<label for="crsCode"><?php echo CRS_CODE; ?></label>
						<input type="text" name="crsCode" id="crsCode" value="" style="width:100%;"><br>
						<label for="crsName"><?php echo CRS_NAME; ?></label>
						<input type="text" name="crsName" id="crsName" value="" style="width:100%;"><br>
						<input type="hidden" name="select" id="select" value="crsDest">
						<label for="crsCountry"><?php echo CRS_COUNTRY; ?></label>
						<select name="crsCountry" id="crsCountry" onchange="javascript:return;"><option value="%"><?php echo OPTN_ALL; ?></option>
<?php
$opt_countries = getCountries(LANGUAGE_CODE);
$html = '';
foreach($opt_countries as $iso => $name) {
	$html .= '							<option value="'.$iso.'">'.$name.'</option>'."\n";
}
echo($html);
?>
						</select>
					</div>
					<!--a href="" id="research" title="<?php echo GO; ?>" class="searchbtn" style="color:#FFFFFF;"><?php echo GO; ?></a-->
					<div style="text-align:center;">
						<p><input type="submit" name="research" id="research" value="<?php echo GO; ?>" class="searchbtn" style="color:#FFFFFF;display:inline;"></p>
					</div>
				</form>
			</div>
			<div class="key">
				<p><b><?php echo RESULT; ?></b></p>
				<select disabled="disabled" size="5" name="crsResult" id="crsResult" onchange="javascript:selectResultResearch($(this).val());" style="width:100%;"><option value="#" class="disabledoption"><?php echo RESULT_FIRST.GO; ?></option></select>
				<input type="checkbox" name="closeSearch" id="closeSearch" value="close"><label for="closeSearch"><?php echo CLOSE_ON_SELECT; ?></label>
			</div>
		</div><!-- #p-research -->
		
		<div id="p-contact">
			<div class="key">
				<p><?php echo PLEASE_FILL_FORM; ?></p>
				<form id="contact-form">
					<div>
						<label for="email"><?php echo EMAIL; ?></label>
						<input type="text" name="email" id="email" value="" style="width:100%;"><br>
						<label for="message"><?php echo MESSAGE; ?></label>
						<textarea rows="5" cols="33" name="message" id="message" style="width:100%;"></textarea>
						<a href="" id="send-message" title="<?php echo SEND_MESSAGE; ?>"><?php echo SEND_MESSAGE; ?></a>
					</div>
				</form>
			</div>
		</div><!-- #p-contact -->
		
		<div id="p-about">
			<div class="key" style="font-size:1.2em;">
				<div style="float:right;font-size:10px;"><?php echo CHANGELOG; ?></div>
				<div style="float:right;"><?php echo PAYPAL_FORM; ?></div>
		<?php echo ABOUT_CONTENT; ?>
				<div><p><img src="<?php echo DIR_WS_IMAGES; ?>star.png" alt=""> <a class="link show-p-poll" href=""><?php echo POLL; ?></a></p></div>
<?php if (USE_FACEBOOK) { ?>
				<div><iframe src="http://www.facebook.com/plugins/likebox.php?locale=<?php echo LOCALE; ?>&amp;href=http%3A%2F%2Fwww.facebook.com%2FTWCC.free&amp;width=292&amp;colorscheme=light&amp;font=arial&amp;show_faces=false&amp;stream=false&amp;header=false&amp;height=66" style="border:none; overflow:hidden; width:100%; height:66px;"></iframe></div>
<?php } ?>
				<a id="contact-us" href="" title="<?php echo CONTACT_US; ?>" class="contact"><?php echo CONTACT_US; ?></a>
				<div id="app-versions"></div>
			</div>
		</div><!-- #p-about -->
		
		<div id="p-crs">
			<div id="crs-info" class="key" style="font-size:1.2em;">
				
			</div>
		</div><!-- #p-crs -->
		
		<div id="p-poll">
			<div id="poll-info" class="key" style="font-size:1.2em;">
				
			</div>
		</div><!-- #p-poll -->
	
		<!--div id="p-info">
			<br>
			<img src="<?php echo DIR_WS_IMAGES; ?>/flags/IT.png" alt=""> Cerchiamo una persona di tradurre il sito in italiano!<br>
			<a id="contact-us" href="" title="Contattarci" class="contact">Contattarci</a><br>
			<br>
			<hr>
			<br>
			<img src="<?php echo DIR_WS_IMAGES; ?>/flags/DE.png" alt=""> Wir suchen jemanden, der die Webseite auf deutsch übersetzen kann!<br>
			<a id="contact-us" href="" title="Kontakt" class="contact">Kontakt</a><br>
			<br>
		</div-->
	
		<div id="p-donate">
			<h3><?php echo WE_NEED_YOU; ?></h3>
			<p><?php echo SUPPORT_TEXT; ?></p>
			<div id="donate_progressbar"></div>
			<div class="donate_inner_text"><?php echo getTotalDonation(); ?>€ / <?php echo DONATION_MAX; ?>€</div>
			<div><?php echo HOW_WE_PLAN; ?></div>
			<div style="float:left;margin-right:15px;">
				<?php echo PAYPAL_FORM; ?>
			</div>
			<div style="position:relative;">
				<?php echo LAST_5_DONORS.getLastFiveDonors(); ?>
			</div>
			<br>
			<div style="position:absolute;bottom:0;right:0;">
				<input type="checkbox" class="dont-show-again" style="vertical-align: middle;"> <?php echo DO_NOT_SHOW_AGAIN; ?>
			</div>
		</div>
		
		<div id="p-convention_help">
			<p>
				<img src="<?php echo DIR_WS_IMAGES; ?>survey.jpg" alt="" height="320">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
				<img src="<?php echo DIR_WS_IMAGES; ?>gauss-bomford.jpg" alt="" height="320">
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

<?php if (IW_ADS_ENABLED) { ?>		
		<div id="twcc-ads" style="display:none;visibility:hidden;">
			<?php $ad_location = INFO_WINDOW; require(DIR_WS_FUNCTIONS . 'adsense.js.php'); ?>
		</div><!-- #twcc-ads -->
<?php } ?>
	</body>
</html>
