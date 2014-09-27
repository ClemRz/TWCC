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
	Translated to German by Roland Aigner - roland.b.aigner[at]gmail.com
	

*/

define('LOCALE', 'de_DE');
define('PAYPAL_LOCALE', 'de_DE');
@setlocale(LC_TIME, LOCALE.'.UTF8', 'deu');
if (isset($_SERVER['SystemRoot']) && (preg_match('%windows%i', $_SERVER['SystemRoot']) || preg_match('%winnt%i', $_SERVER['SystemRoot']))) @setlocale(LC_TIME, 'german'); // Page de code pour serveur sous Windows (installation locale)
define('DATE_FORMAT_LONG', '%A %d %B, %Y');

define('APPLICATION_TITLE', 'The World Coordinate Converter');
define('APPLICATION_TITLE_BIS', '<sup>*</sup>');
define('APPLICATION_TITLE_TER', '*Der World Coordinate Converter');
define('TRANSLATE', 'Translate');
define('APPLICATION_DESCRIPTION', 'TWCC, Der World Coordinate Converter ist ein Werkzeug zum Konvertieren von  Koordinaten im Bezug auf die unterschiedlichsten geodätischen Referenzsysteme.');
define('LANGUAGE_CODE', 'de');
define('APPLICATION_LICENSE', '<a href="http://www.gnu.org/licenses/agpl-3.0.'.LANGUAGE_CODE.'.html" target="_blank" title="AGPL">AGPL</a>');

define('WORLD', 'World');
define('UNIT_DEGREE', '°');
define('UNIT_MINUTE', '\'');
define('UNIT_SECOND', '"');
define('UNIT_DEGREE_EAST', '°E');
define('UNIT_DEGREE_NORTH', '°N');
define('UNIT_METER', 'm');
define('UNIT_KILOMETER', 'km');
define('UNIT_FEET', 'f');
define('LABEL_LNG', 'Lng = ');
define('LABEL_LAT', 'Lat = ');
define('LABEL_X', 'X = ');
define('LABEL_Y', 'Y = ');
define('LABEL_ZONE', 'Zone = ');
define('LABEL_HEMI', 'Hemisphere = ');
define('LABEL_CONVERGENCE', 'Konvergenz = ');
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
define('OPTION_F', 'Fuß');

define('TAB_TITLE_1', 'Direction');
define('TAB_TITLE_2', 'Mehr Information.');
define('DRAG_ME', 'Drag me!');
define('NEW_SYSTEM_ADDED', 'Das neue System wurde hinzugefügt, Sie können es unter folgendem Namen finden: ');
define('CRS_ALREADY_EXISTS', 'Das System, das Sie hinzufügen wollen, ist bereits in TWCC vorhanden. Sie finden es in der Drop-Down-Liste unter: ');


define('ELEVATION', 'Höhe:');
define('ADDRESS', 'Adresse:');
define('ZOOM', 'Zoom');
define('NO_ADDR_FOUND', 'Keine Adresse gefunden.');
define('GEOCODER_FAILED', 'Geocode war aus folgendem Grund nicht erfolgreich: ');

define('CREDIT', 'Credit:');
define('HOSTING', 'Hosting:');
define('CONSTANTS', 'Constants:');
define('LIBRARIES', 'Libraries:');
define('MAPS', 'Maps:');
define('GO', 'Start!');
define('SEARCH_BY_ADDRESS', 'Suche nach Adresse:');
define('HOME', 'Home');
define('ABOUT', 'Über TWCC');
define('WE_NEED_YOU','Wir brauchen Ihre Hilfe!');
define('SUPPORT_TEXT', 'Wir setzen auf die großzügige Unterstützung der TWCC Benutzer weiterhin die Erhaltung und Verbesserung dieses kostenlose Website.<br>Shop Ihr ​​Geld kann einen Unterschied machen und unterstützen die Fonds heute.');
define('HOW_WE_PLAN','Wie wir planen, Mittel zu verwenden:<br><ul>
<li>Entwurf einer Schnittstelle für mobile Geräte, Smartphones und Tablets.</li>
<li><span style="color:#808080">Mieten von einem neuen Server, um einen besseren und schnelleren Service zu bieten.</span></li>
</ul>');
define('LAST_5_DONORS','Danke Spender!<br>Liste der in den letzten fünf Spender:');
define('DO_NOT_SHOW_AGAIN', 'Diese Meldung nicht mehr anzeigen.');
define('CONTACT_US', 'Kontakt');
define('DONATE', 'Spende');
define('GIT_COMMITS_LINK', '<a target="_blank" href="https://github.com/ClemRz/TWCC/commits/master" title="GitHub">%s</a>');
define('CHANGELOG', sprintf(GIT_COMMITS_LINK, '<img src="'.DIR_WS_IMAGES.'github_32.png" alt="Git">'));
define('SELECT_YOUR_LANGUAGE', 'Sprache: ');

define('HELP', 'Hilfe');
define('CLOSE', 'Schliessen');
define('HELP_1', 'Wähle das Referenzsystem deiner Quelldaten.');
define('HELP_2', 'Wähle das Referenzsystem deiner Zieldaten.');
define('HELP_3', 'Eingabe der Koordinaten.</p>
								<div><b>OR</b></div>
								<p>Click on the map.</p>
								<div><b>OR</b></div>
								<p>Drag and drop the marker.</p>
								<div><b>OR</b></div>
								<p>Enter an address in the top search bar.');
define('HELP_4', 'Klicke um die Daten zu konvertieren.');
define('PREVIOUS', 'Zurück');
define('NEXT', 'Vor');
define('FINISH', 'Fertig!');
define('LOADING', 'Bitte um etwas Geduld...');
define('YOU_CANT_FIND', 'Sie können Ihr Referenzsystem in der Liste nicht finden?');
define('UNDEFINED_TITLE', 'Undefined title');
define('CONVERT', 'Konvertieren');
define('SYSTEM_DEFINITION', 'System Definition');

define('OPTIONS', 'Optionen:');
define('MODE', 'Modus:');
define('CONVENTION_TITLE', 'Konvention');
define('CONVENTION', CONVENTION_TITLE.' <a href="" title="'.HELP.'" class="convention">[?]</a>:');
define('SURVEY', 'Survey');
define('GAUSS_BOMFORD', 'Gauss-Bomford');
define('AUTO_ZOOM', 'Auto-zoom:');
define('PRINT_CURRENT_MAP', 'Drucken Sie die Karte:');
define('FULL_SCREEN', 'Vollbild:');

define('CUSTOM_SYSTEM', 'Spezifische Referenzsysteme');
define('SEARCH_SYSTEM', 'Suche ein <span class="underlined"><a href="'.DIR_WS_IMAGES.'snippet_proj4js_format.png" class="snippet">Proj4js</a></span> Format auf <span class="underlined">Spatial Reference</span>:');
define('SEARCH_EXAMPLE', 'Bsp.: European Datum 1950');
define('SEARCH', 'Suche!');
define('COME_BACK', '<span class="underlined">Komm zurück</span> und füge das neue Referenzsystem in <span class="underlined">TWCC</span> ein:');
define('SYSTEM_EXAMPLE', '<a href="" class="toggle-next">Beispiele...</a>
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
define('ADD', 'Hinzufügen!');
define('FREQUENT_USE', 'Sie verwenden dieses Referenzsystem regelmäßig?<br>Kontaktieren Sie uns und wir werden es permanent zu TWCC hinzufügen!');

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

define('PLEASE_FILL_FORM', 'Bitte füllen Sie das unten angeführte Formular aus.');
define('EMAIL', 'E-mail:');
define('MESSAGE', 'Nachricht:');
define('SEND_MESSAGE', 'Senden');
define('MESSAGE_SENT', "Danke!\\n\\rIhre Nachricht wurde versendet.\\n\\rWir werden uns so schell wie möglich darum kümmern.");
define('MESSAGE_NOT_SENT', 'Leider wurde Ihre Nachricht noch nicht versendet.\\n\\rBitte versuchen Sie es noch einmal.\\n\\rErr. code ');
define('MESSAGE_WRONG_EMAIL', 'Die eingegebene E-mail Adresse scheint falsch zu sein.\\n\\rBitte versuchen Sie es noch einmal.');





define('W3C_HTML', '<a href="http://validator.w3.org/check?uri=referer" title="W3C HTML 5 compliant" target="_blank"><img src="http://www.w3.org/Icons/valid-xhtml10-blue.png" alt="W3C XHTML 1.0 compliant" style="border:0px none;height:15px;"></a>');
define('ABOUT_CONTENT', '<h2>Was ist TWCC?</h2>
					<p>TWCC, "The World Coordinate Converter", ist ein '.sprintf(GIT_COMMITS_LINK, '<img src="'.DIR_WS_IMAGES.'opensource_32.png" alt=""><i>Open Source</i>').' Werkzeug zum Konvertieren von Koordinaten im Bezug auf
					die unterschiedlichsten geodätischen Referenzsysteme.</p>
					
					<p>Es existieren bereits zahlreiche Konvertierungsinstrumente, jedoch liegen die Stärken von TWCC in folgenden Punkten:</p>
					<ul><li>Das Instrument ist <b>intuitiv und einfach</b> zu bedienen.</li>
					<li>Die Möglichkeit benutzerdefinierte Koordinatensysteme hinzuzufügen und die Verwendung einer interaktiven Karte machen TWCC zu einer <b>flexiblen Anwendung</b>.</li>
					<li><b>Kein Download</b> oder spezielle Installation ist nötig, Sie müssen nur über eine Internetverbindung verfügen.</li>
					<li>TWCC ist <b>kompatibel</b> mit den meisten Systemen (Mac, Linux, Windows...). '.W3C_HTML.'</li>
					<li>TWCC ist <b>KOSTENLOS</b> und lizensiert unter Affero GNU: '.APPLICATION_LICENSE.'</li></ul>
					<p>TWCC wurde durch <a href="" class="contact" title="'.CONTACT_US.'">Clément Ronzon</a> erstellt, nachfolgende Forschung und
					Entwicklung wurde für <a href="http://www.grottocenter.org/" target="_blank">GrottoCenter.org</a> durchgeführt.</p>
					<p>Besonderer Dank gilt: Roland Aigner, Alessandro Avaro, Leszek Pawlowicz, Lê Viết Thanh.</p>
					<p>Für etwaige Fragen oder Anregungen <b>kontaktieren Sie uns bitte</b>.</p>
					<p>Sie können diese <b>Initiative</b> mit einer <b>Spende unterstützen</b>.</p>');

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

define('ERROR_CONTACT_US', 'Error #%s. Bitte kontaktieren Sie uns.');

define('POLL', 'Umfrage zur Nutzerzufriedenheit');
define('S_POLL', 'Umfrage');
define('RATE', 'Beurteile');
define('PLEASE_TAKE_A_MOMENT', 'Umfrage, zweiter Teil.');
define('AVERAGE_RATING', 'Durchsch. Beurteilung: %s</span> von <span class="reviewcount"> %s Bewertungen.');
define('ITEM_NAME_1', 'Kommen Sie oft zurück auf TWCC?');
define('ITEM_LABELS_1', 'erstes mal|semesterweise|quartalsweise|monatlich|wöchentlich');
define('ITEM_NAME_2', 'Bitte bewerte TWCC');
define('ITEM_LABELS_2', 'Schlecht|Fair|Gut|Sehr gut|Excellent');
define('ITEM_NAME_3', 'Möchten Sie eine mobile Version von TWCC?');
define('ITEM_LABELS_3', 'kein Interesse|Warum nicht|Das wäre toll|Ja|Ja, definitiv');
define('ITEM_NAME_4', 'Wie viel wären Sie bereit zu zahlen, um TWCC auf Ihrem Handy nutzen zu können?');
define('ITEM_LABELS_4', '&lt;$1|von $1 bis $5|von $5 bis $10|von $10 bis $50|&gt;$50');
define('ITEM_NAME_5', 'Welche Art von Handy benutzen Sie?');
define('ITEM_LABELS_5', 'Andere|Windows Mobile|Blackberry|Android|iPhone');
define('RATER_ERROR_MAX', 'Sie haben bereits diesen Titel bewertet. Sie durften nur %s Bewertung(en) durchführen.');
define('RATER_ERROR_EMPTY', 'Sie haben noch keine Auswahl getroffen.');
define('RATER_THANKS', 'Vielen Dank für ihre Bewertung.');
define('THIS_ITEM', 'dieser Artikel');
define('LEAVE_A_COMMENT', 'Hinterlasse einen Kommentar...');
define('POLL_COMMENTS', 'Das Ergebnis der ersten Umfrage zeigt, dass die meisten TWCC Benutzer auch eine mobile Version auf ihrem Handy haben möchten. Bitte nehmen Sie sich 5 Sekunden, um diese neue Umfrage zu beantworten.');

define('LENGTH', 'length:');
define('AREA', 'Area:');
define('MAGNETIC_DECLINATION', 'Magnetische Deklination');

define('FACEBOOK', 'TWCC auf Facebook');
?>
