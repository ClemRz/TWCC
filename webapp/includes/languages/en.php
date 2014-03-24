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
/*

	Credit:
	Translated to English by Clément Ronzon - clem.rz[at]gmail.com
	

*/

define('LOCALE', 'en_US');
define('PAYPAL_LOCALE', 'en_US');
@setlocale(LC_TIME, LOCALE.'.UTF8');
if (preg_match('%windows%i', $_SERVER['SystemRoot']) || preg_match('%winnt%i', $_SERVER['SystemRoot'])) @setlocale(LC_TIME, 'english'); // Page de code pour serveur sous Windows (installation locale)
define('DATE_FORMAT_LONG', '%A %d %B, %Y');

define('APPLICATION_TITLE', 'The World Coordinate Converter');
define('APPLICATION_TITLE_BIS', '');
define('APPLICATION_TITLE_TER', '');
define('TRANSLATE', 'Translate');
define('APPLICATION_DESCRIPTION', 'TWCC, The World Coordinate Converter is a tool to convert geodetic coordinates in a wide rangeof reference systems.');
define('LANGUAGE_CODE', 'en');
define('APPLICATION_LICENSE', '<a href="http://www.gnu.org/licenses/agpl-3.0.'.LANGUAGE_CODE.'.html" target="_blank" title="AGPL">AGPL</a>');

define('WORLD', 'World');
define('UNIT_DEGREE', '°');
define('UNIT_MINUTE', '\'');
define('UNIT_SECOND', '"');
define('UNIT_DEGREE_EAST', '°E');
define('UNIT_DEGREE_NORTH', '°N');
define('UNIT_METER', 'm');
define('UNIT_KILOMETER', 'km');
define('LABEL_LNG', 'Lng = ');
define('LABEL_LAT', 'Lat = ');
define('LABEL_X', 'X = ');
define('LABEL_Y', 'Y = ');
define('LABEL_ZONE', 'Zone = ');
define('LABEL_HEMI', 'Hemisphere = ');
define('LABEL_CONVERGENCE', 'Convergence = ');
define('LABEL_CSV', 'CSV:');
define('LABEL_FORMAT', 'Format:');
define('OPTION_E', 'E');
define('OPTION_W', 'W');
define('OPTION_N', 'N');
define('OPTION_S', 'S');
define('OPTION_DMS', 'Deg. min. sec. ');
define('OPTION_DD', 'Dec. Degrees');
define('OPTION_NORTH', 'North');
define('OPTION_SOUTH', 'South');
define('OPTION_CSV', 'CSV');
define('OPTION_MANUAL', 'Manual');
define('OPTION_M', 'Meters ');
define('OPTION_KM', 'Kilometers');

define('TAB_TITLE_1', 'Direction');
define('TAB_TITLE_2', 'More info.');
define('DRAG_ME', 'Drag me!');
define('NEW_SYSTEM_ADDED', 'The new system has been added, you can find it under the name of ');
define('CRS_ALREADY_EXISTS', 'The system you are trying to add is already present in TWCC. You can find it in the drop down lists under: ');
define('ELEVATION', 'Elevation:');
define('ADDRESS', 'Address:');
define('ZOOM', 'Zoom');
define('NO_ADDR_FOUND', 'No address found.');
define('GEOCODER_FAILED', 'Geocode was not successful for the following reason: ');

define('CREDIT', 'Credit:');
define('HOSTING', 'Hosting:');
define('CONSTANTS', 'Constants:');
define('LIBRARIES', 'Libraries:');
define('MAPS', 'Maps:');
define('GO', 'Go!');
define('SEARCH_BY_ADDRESS', 'Search by address:');
define('HOME', 'Home');
define('ABOUT', 'About TWCC');
define('CONTACT_US', 'Contact us');
define('DONATE', 'Donate');
define('WE_NEED_YOU','We need your help!');
define('SUPPORT_TEXT','We rely on the generous support of TWCC users to continue maintaining and improving this free web site.<br>Your money can make a difference and support the fund today.');
define('HOW_WE_PLAN','How we plan to use funds:<br><ul>
<li>Design of an interface for mobile devices, smartphones and tablets.</li>
<li><span style="color:#808080">Rent of a new server in order to provide a better and faster service.</span></li>
</ul>');
define('LAST_5_DONORS','Thank you donors!<br>List of the last five donors:');
define('GIT_COMMITS_LINK', '<a target="_blank" href="https://github.com/ClemRz/TWCC/commits/master" title="GitHub">%s</a>');
define('CHANGELOG', sprintf(GIT_COMMITS_LINK, '<img src="'.DIR_WS_IMAGES.'github_32.png" alt="Git">'));
define('SELECT_YOUR_LANGUAGE', 'Language: ');

define('HELP', 'Help');
define('CLOSE', 'Close');
define('HELP_1', 'Select the reference system of your data.');
define('HELP_2', 'Select the destination reference system.');
define('HELP_3', 'Enter your coordinates.</p>
								<div><b>OR</b></div>
								<p>Click on the map.</p>
								<div><b>OR</b></div>
								<p>Drag and drop the marker.</p>
								<div><b>OR</b></div>
								<p>Enter an address in the top search bar.');
define('HELP_4', 'Push to convert your coordinates.');
define('PREVIOUS', 'Previous');
define('NEXT', 'Next');
define('FINISH', 'Finish!');
define('LOADING', 'Loading, please, be patient...');
define('YOU_CANT_FIND', 'You can\'t find your reference system in the list?');
define('UNDEFINED_TITLE', 'Undefined title');
define('CONVERT', 'Convert');
define('SYSTEM_DEFINITION', 'System definition');

define('OPTIONS', 'Options:');
define('MODE', 'Mode:');
define('CONVENTION_TITLE', 'Convention');
define('CONVENTION', CONVENTION_TITLE.' <a href="" title="'.HELP.'" class="convention">[?]</a>:');
define('SURVEY', 'Survey');
define('GAUSS_BOMFORD', 'Gauss-Bomford');
define('AUTO_ZOOM', 'Auto zoom:');
define('PRINT_CURRENT_MAP', 'Print the map:');

define('CUSTOM_SYSTEM', 'Custom reference system');
define('SEARCH_SYSTEM', 'Search the <span class="underlined"><a href="'.DIR_WS_IMAGES.'snippet_proj4js_format.png" class="snippet">Proj4js</a></span> format on <span class="underlined">Spatial Reference</span>:');
define('SEARCH_EXAMPLE', 'Ex: European Datum 1950');
define('SEARCH', 'Search!');
define('COME_BACK', '<span class="underlined">Come-back</span> and add the new reference system definition in <span class="underlined">TWCC</span>:');
define('SYSTEM_EXAMPLE', '<a href="" class="toggle-next">Examples...</a>
													<ul style="display:none;" class="toogle-me"><li>+title=ED 1950 (Deg) +proj=longlat +ellps=intl +no_defs</li>
													<li>EPSG:4326</li>
													<li>ESRI:37231</li>
													<li>IAU2000:29901</li>
													<li>SR-ORG:38</li>
													<li>IGNF:RRAF91</li>
													<li>urn:ogc:def:crs:epsg:1:4326</li>
													<li>http://www.epsg.org/#4326</li>
													<li>http://librairies.ign.fr/geoportail/resources/RIG.xml#RRAF91</li>
													<li>http://interop.ign.fr/registers/ign/RIG.xml#RRAF91</li></ul>');
define('ADD', 'Add!');
define('FREQUENT_USE', 'You use this system frequently?<br>Contact us and we will add it to TWCC permanently!');

define('DO_RESEARCH', 'Search');
define('CLOSE_ON_SELECT', 'Close on select');
define('RESEARCH', 'Advanced search');
define('RESEARCH_FORM', 'Search form');
define('CRS_CODE', 'Code');
define('CRS_NAME', 'Name (use the % character as a wildcard)');
define('CRS_COUNTRY', 'Country');
define('OPTN_ALL', 'All');
define('RESULT', 'Search result');
define('RESULT_EMPTY', 'Your search did not match any system');
define('RESULT_FIRST', 'Please enter at least one search criteria, then click on ');

define('PLEASE_FILL_FORM', 'Please fill out the form below.');
define('EMAIL', 'E-mail:');
define('MESSAGE', 'Message:');
define('SEND_MESSAGE', 'Send');
define('MESSAGE_SENT', "Thank you!\\n\\rYour message has been sent.\\n\\rWe will take it into account as soon as possible.");
define('MESSAGE_NOT_SENT', 'Sorry, your message has not been sent.\\n\\rPlease, try again.\\n\\rErr. code ');
define('MESSAGE_WRONG_EMAIL', 'The email you entered seems to be wrong.\\n\\rPlease, try again.');

define('W3C_HTML', '<a href="http://validator.w3.org/check?uri=referer" title="W3C HTML 5 compliant" target="_blank"><img src="http://www.w3.org/Icons/valid-xhtml10-blue.png" alt="W3C XHTML 1.0 compliant" style="border:0px none;height:15px;"></a>');
define('ABOUT_CONTENT', '<h2>What is TWCC?</h2>
					<p>TWCC, "The World Coordinate Converter", is an '.sprintf(GIT_COMMITS_LINK, '<i>Open Source</i>').' tool to convert geodetic coordinates in a wide range
					of reference systems.</p>
					<p>Several coordinate conversion tools already exist, however, here is what makes the strength of TWCC:</p>
					<ul><li>This tool is <b>intuitive and easy</b> to use.</li>
					<li>The possibility to add user-defined systems and the use of an interactive map make it <b>flexible</b>.</li>
					<li><b>No download</b> or special installation is required, you just need to have an Internet connection.</li>
					<li>TWCC is <b>compatible</b> with most environments (Mac, Linux, Windows...). '.W3C_HTML.'</li>
					<li>TWCC is <b>completely FREE</b> and licensed under Affero GNU: '.APPLICATION_LICENSE.'</li></ul>
					<p>TWCC was created by <a href="" class="contact" title="'.CONTACT_US.'">Clément Ronzon</a> following research and
					development carried out for <a href="http://www.grottocenter.org/" target="_blank">GrottoCenter.org</a>.</p>
					<p>Special thanks to: Roland Aigner, Alessandro Avaro, Leszek Pawlowicz, Lê Viết Thanh.</p>
					<p>For any questions or suggestions please <b>contact us</b>.</p>
					<p>You can donate to <b>support this initiative</b>.</p>');

define('PROJECTION', 'Projection:');
define('UNITS', 'Units:');
define('DATUM', 'Datum:');
define('NAME', 'Name:');
define('NAD_GRIDS', 'NAD Grids:');
define('ELLIPSOID', 'Ellipsoid:');
define('SEMIMAJOR_RADIUS', 'Semi-major radius:');
define('SEMIMINOR_RADIUS', 'Semi-minor radius:');
define('INVERSE_FLATTENING', 'Inverse flattening:');
define('CENTRAL_LATITUDE', 'Central latitude:');
define('STANDARD_PARALLEL_1', 'Standard parallel 1:');
define('STANDARD_PARALLEL_2', 'Standard parallel 2:');
define('USED_IN_MERC_AND_EQC', 'Used in merc and eqc:');
define('CENTRAL_LONGITUDE', 'Central longitude:');
define('FOR_SOMERC_PROJECTION', 'For somerc projection:');
define('FALSE_EASTING', 'False easting:');
define('FALSE_NORTHING', 'False northing:');
define('PROJECTION_SCALE_FACTOR', 'Projection scale factor:');
define('SPHERE_AREA_OF_ELLIPSOID', 'Sphere - area of ellipsoid:');
define('TOWARD_WGS84_SCALING', 'Toward WGS84 scaling:');
define('CARTESIAN_SCALING', 'Cartesian scaling:');
define('FROM_GREENWICH_SCALING', 'From Greenwich scaling:');

define('COORDINATE_REFERENCE_SYSTEMS', 'Coordinate reference systems');

define('DIRECT_LINK', 'Direct link');

define('ERROR_CONTACT_US', 'Error #%s. Please contact us.');

define('POLL', 'User satisfaction survey');
define('S_POLL', 'Survey');
define('RATE', 'Rate');
define('PLEASE_TAKE_A_MOMENT', 'Survey, second part.');
define('AVERAGE_RATING', 'Ave. rating: %s</span> from <span class="reviewcount"> %s votes');
define('ITEM_NAME_1', 'Do you come back often on TWCC?');
define('ITEM_LABELS_1', 'First time|Semesterly|Quarterly|Monthly|Weekly');
define('ITEM_NAME_2', 'Please rate TWCC');
define('ITEM_LABELS_2', 'Poor|Fair|Good|Very Good|Excellent');
define('ITEM_NAME_3', 'Would you like a mobile version of TWCC?');
define('ITEM_LABELS_3', 'No interest|Why not|It would be cool|Yes|Yes really');
define('ITEM_NAME_4', 'How much would you be willing to pay to have TWCC on your mobile phone?');
define('ITEM_LABELS_4', '&lt;$1|form $1 to $5|from $5 to $10|from $10 to $50|&gt;$50');
define('ITEM_NAME_5', 'What kind of mobile phone do you use?');
define('ITEM_LABELS_5', 'Other|Windows Mobile|Blackberry|Android|iPhone');
define('RATER_ERROR_MAX', 'You have already rated this item. You were allowed %s vote(s).');
define('RATER_ERROR_EMPTY', 'You have not selected a rating value.');
define('RATER_THANKS', 'Thankyou for voting.');
define('THIS_ITEM', 'this item');
define('LEAVE_A_COMMENT', 'Leave a comment...');
define('POLL_COMMENTS', 'The result of the first survey shows that most of TWCC users would like to have a mobile version of it on their phone. Please take 5 seconds to answer this new survey.');

define('LENGTH', 'length:');
define('AREA', 'Area:');
define('MAGNETIC_DECLINATION', 'Magnetic Declination');

define('FACEBOOK', 'TWCC on Facebook');
?>
