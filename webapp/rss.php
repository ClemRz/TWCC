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
require('includes/application_top.php');
$last_modified = '';
$sql = "SELECT MAX(Date_inscription) as mdi, MAX(Date_reviewed) as mdr FROM coordinate_systems WHERE Enabled = 'YES' ORDER BY Id DESC LIMIT 1";
$sql_result = tep_db_query($sql);
$row = tep_db_fetch_array($sql_result);
if ($row['mdr'] != '') {
	$last_modified = $row['mdr'];
} else {
	$last_modified = $row['mdi'];
}
if(!function_exists('getallheaders')){
	function getallheaders(){
		settype($headers,'array');
		foreach($_SERVER as $h => $v){
			if(preg_match('/HTTP_(.+)/',$h,$hp)){
				$headers[$hp[1]] = $v;
			}
		}
		return $headers;
	}
}
$headers = getAllHeaders(); 
$refresh = 1;
$etag = md5($last_modified);
if(isset($headers["If-Modified-Since"])) {
	$since = strtotime($headers["If-Modified-Since"]); 
	if($since >= strtotime($last_modified)) { $refresh = 0; }
}
if(isset($headers["If-None-Match"])) {
	if(strcmp($headers["If-None-Match"], $etag) == 0) {
		$refresh = 0;
	} else {
		$refresh = 1;
	}
}
if($refresh == 0) {
	header("HTTP/1.1 304 Not changed");
	ob_end_clean();
}
header('Content-Type: application/rss+xml; charset=UTF-8');
header('Last-Modified: ' .gmdate("D, d M Y G:i:s", strtotime($last_modified)). ' GMT');
header("ETag: " . md5($etag));
echo '<!-- RSS for '.APPLICATION_TITLE.', generated on '.gmdate("D, d M Y G:i:s", strtotime($last_modified)).' GMT'.' -->'."\n";
?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/" xml:lang="<?php echo LANGUAGE_CODE; ?>">
	<channel>
		<title><?php echo APPLICATION_TITLE.' - '.COORDINATE_REFERENCE_SYSTEMS; ?></title>
		<link><?php echo HTTP_SERVER;?></link>
		<description><?php echo APPLICATION_DESCRIPTION; ?></description>
		<atom:link href="<?php echo HTTP_SERVER; ?>/rss.php?<?php echo str_replace('&','&amp;',$_SERVER['QUERY_STRING']); ?>" rel="self" type="application/rss+xml" />
		<webMaster>clem.rz@gmail.com (Clément Ronzon)</webMaster>
		<language><?php echo LANGUAGE_CODE; ?></language>
		<lastBuildDate><?php echo gmdate("D, d M Y H:i:s", strtotime($last_modified)); ?> GMT</lastBuildDate>
		<image>
			<url><?php echo HTTP_SERVER.'/'.DIR_WS_IMAGES.'logo_twcc_144x144.jpg';?></url>
			<title><?php echo APPLICATION_TITLE.' - '.COORDINATE_REFERENCE_SYSTEMS; ?></title>
			<link><?php echo HTTP_SERVER;?></link>
			<description><?php echo APPLICATION_DESCRIPTION; ?></description>
			<width>144</width>
			<height>144</height>
		</image>
		<copyright>Copyright 2010 Clément Ronzon, twcc.free.fr, under CC BY-NC license</copyright>
		<docs>http://blogs.law.harvard.edu/tech/rss</docs>
<?php
$crs_language = ucfirst(LANGUAGE_CODE);
$supported_languages = array('Fr', 'En', 'Es', 'De', 'It', 'Pl', 'Vi');
$crs_language = in_array($crs_language, $supported_languages) ? $crs_language : 'En';
$sql = "SELECT DISTINCT IFNULL(co.".$crs_language."_name, '*".WORLD."') AS Country, crs.Code, crs.Definition, crs.Date_inscription, crs.Date_reviewed FROM coordinate_systems crs ";
$sql .= "LEFT OUTER JOIN country_coordinate_system cc ON cc.Id_crs = crs.Id ";
$sql .= "LEFT OUTER JOIN countries co ON co.Iso = cc.Iso ";
$sql .= "WHERE crs.Code = 'WGS84' OR crs.Enabled = 'YES' ";
$sql .= "ORDER BY IF(Date_reviewed>Date_inscription, Date_reviewed, Date_inscription) DESC, co.".$crs_language."_name ";
$crs_query = tep_db_query($sql);
while ($crs = tep_db_fetch_array($crs_query)) {
	$defs = explode('+', $crs['Definition']);
	$code = $crs['Code'];
	foreach ($defs as $def) {
		if ($def != '') {
			$tmpArray = explode('=', $def);
			if (trim($tmpArray[0]) == 'title') {
				$title = trim($tmpArray[1]);
				break;
			}
		}
	}
?>
		<item>
			<title><?php echo $title; ?> [<?php echo $crs['Country']; ?>]</title>
			<category><?php echo $crs['Country']; ?></category>
			<link><?php echo HTTP_SERVER.'/?l='.LANGUAGE_CODE.'&amp;dc='.$crs['Code']; ?></link>
			<description><?php echo $crs['Definition']; ?></description>
			<guid><?php echo HTTP_SERVER.'/?l='.LANGUAGE_CODE.'&amp;dc='.$crs['Code']; ?></guid>
			<pubDate><?php echo gmdate("D, d M Y H:i:s", strtotime(max($crs['Date_inscription'], $crs['Date_reviewed']))); ?> GMT</pubDate>
		</item>
<?php
}
?>
	</channel>
</rss>