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
function tep_date_long($raw_date)
{
    if (($raw_date == '0000-00-00 00:00:00') || ($raw_date == '')) return false;

    $year = (int)substr($raw_date, 0, 4);
    $month = (int)substr($raw_date, 5, 2);
    $day = (int)substr($raw_date, 8, 2);
    $hour = (int)substr($raw_date, 11, 2);
    $minute = (int)substr($raw_date, 14, 2);
    $second = (int)substr($raw_date, 17, 2);

    return utf8_encode(strftime(DATE_FORMAT_LONG, mktime($hour, $minute, $second, $month, $day, $year)));
}

function tep_session_register($variable)
{
    global $session_started;
    if ($session_started == true) {
        if (PHP_VERSION < 4.3) {
            return session_register($variable);
        } else {
            $_SESSION[$variable] = (isset($GLOBALS[$variable])) ? $GLOBALS[$variable] : null;

            $GLOBALS[$variable] =& $_SESSION[$variable];
        }
    }
    return false;
}

function tep_session_is_registered($variable)
{
    if (PHP_VERSION < 4.3) {
        return session_is_registered($variable);
    } else {
        return isset($_SESSION[$variable]);
    }
}

function tep_session_unregister($variable)
{
    if (PHP_VERSION < 4.3) {
        return session_unregister($variable);
    } else {
        unset($_SESSION[$variable]);
    }
}

function tep_not_null($value)
{
    if (is_array($value)) {
        if (sizeof($value) > 0) {
            return true;
        } else {
            return false;
        }
    } else {
        if (($value != '') && (strtolower($value) != 'null') && (strlen(trim($value)) > 0)) {
            return true;
        } else {
            return false;
        }
    }
}

function checkEmail($address)
{
    $pattern = '#^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,6}$#';
    if (preg_match($pattern, $address)) {
        return true;
    } else {
        return false;
    }
}

function getIp()
{
    if (isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        $IP = $_SERVER['HTTP_X_FORWARDED_FOR'];
    } elseif (isset($_SERVER['HTTP_CLIENT_IP'])) {
        $IP = $_SERVER['HTTP_CLIENT_IP'];
    } else {
        $IP = $_SERVER['REMOTE_ADDR'];
    }
    return $IP;
}


/**#@+
 * Extra GLOB constant for safe_glob()
 */
define('GLOB_NODIR', 256);
define('GLOB_PATH', 512);
define('GLOB_NODOTS', 1024);
define('GLOB_RECURSE', 2048);
/**#@-*/

/**
 * A safe empowered glob().
 *
 * Function glob() is prohibited on some server (probably in safe mode)
 * (Message "Warning: glob() has been disabled for security reasons in
 * (script) on line (line)") for security reasons as stated on:
 * http://seclists.org/fulldisclosure/2005/Sep/0001.html
 *
 * safe_glob() intends to replace glob() using readdir() & fnmatch() instead.
 * Supported flags: GLOB_MARK, GLOB_NOSORT, GLOB_ONLYDIR
 * Additional flags: GLOB_NODIR, GLOB_PATH, GLOB_NODOTS, GLOB_RECURSE
 * (not original glob() flags)
 * @author BigueNique AT yahoo DOT ca
 * @updates
 * - 080324 Added support for additional flags: GLOB_NODIR, GLOB_PATH,
 *   GLOB_NODOTS, GLOB_RECURSE
 */
function safe_glob($pattern, $flags = 0)
{
    $split = explode('/', str_replace('\\', '/', $pattern));
    $mask = array_pop($split);
    $path = implode('/', $split);
    if (($dir = opendir($path)) !== false) {
        $glob = array();
        while (($file = readdir($dir)) !== false) {
            // Recurse subdirectories (GLOB_RECURSE)
            if (($flags & GLOB_RECURSE) && is_dir($file) && (!in_array($file, array('.', '..'))))
                $glob = array_merge($glob, array_prepend(safe_glob($path . '/' . $file . '/' . $mask, $flags),
                    ($flags & GLOB_PATH ? '' : $file . '/')));
            // Match file mask
            if (fnmatch($mask, $file)) {
                if (((!($flags & GLOB_ONLYDIR)) || is_dir("$path/$file"))
                    && ((!($flags & GLOB_NODIR)) || (!is_dir($path . '/' . $file)))
                    && ((!($flags & GLOB_NODOTS)) || (!in_array($file, array('.', '..'))))
                )
                    $glob[] = ($flags & GLOB_PATH ? $path . '/' : '') . $file . ($flags & GLOB_MARK ? '/' : '');
            }
        }
        closedir($dir);
        if (!($flags & GLOB_NOSORT)) sort($glob);
        return $glob;
    } else {
        return false;
    }
}

/**
 * A better "fnmatch" alternative for windows that converts a fnmatch
 * pattern into a preg one. It should work on PHP >= 4.0.0.
 * @author soywiz at php dot net
 * @since 17-Jul-2006 10:12
 */
if (!function_exists('fnmatch')) {
    function fnmatch($pattern, $string)
    {
        return @preg_match('/^' . strtr(addcslashes($pattern, '\\.+^$(){}=!<>|'), array('*' => '.*', '?' => '.?')) . '$/i', $string);
    }
}
function getWrappedRow($label, $value)
{
    return '
	<tr><td style="vertical-align:top; width:30%;">
		' . $label . '
	</td><td style="vertical-align:top;">
		' . $value . '
	</td></tr>';
}

function getWrappedList($array, $repalcement)
{
    if (count($array) < 1) return '';
    $html = '<ul>';
    foreach ($array as $key => $value) {
        if ($key != 'ellipse') {
            $html .= '<li>' . strtr($key, $repalcement) . ' ' . $value . '</li>';
        }
    }
    $html .= '</ul>';
    return $html;
}

function iterateLanguages($func)
{
    $html = '';
    $languages = new language();
    foreach ($languages->catalog_languages as $language) {
        $html .= call_user_func_array($func, array($language['iso']));
    }
    return $html;
}

function getLILanguage($iso)
{
    return '<li><a href="/' . $iso . '/">' . getHTMLLanguage($iso) . '</a></li>' . "\n";
}

function getAlternateReference($iso)
{
    return '		<link rel="alternate" hreflang="' . $iso . '" href="' . HTTP_SERVER . '/' . $iso . '/">' . "\n";
}

function getLILanguages()
{
    return iterateLanguages("getLILanguage");
}

function getAlternateReferences()
{
    return iterateLanguages("getAlternateReference");
}

function getHTMLLanguage($iso)
{
    $lng = new language($iso);
    $html = '<img class="flag" src="' . $lng->language['image'] . '" alt="" width="' . $lng->language['width'] . '" height="' . $lng->language['height'] . '">' . $lng->language['name'] . '<span class="value">' . $lng->language['iso'] . '</span>';
    return $html;
}

function getCapitalsLocations()
{
    return '{"name":"Abu Dhabi","lat":24.4666667,"lng":54.3666667},
					{"name":"Abuja","lat":9.058036,"lng":7.489061},
					{"name":"Accra","lat":5.555717,"lng":-0.196306},
					{"name":"Adamstown","lat":-25.066219,"lng":-130.102707},
					{"name":"Addis Ababa","lat":9.022736,"lng":38.746799},
					{"name":"Algiers","lat":36.7,"lng":3.2166667},
					{"name":"Alofi","lat":-19.0553711,"lng":-169.9178709},
					{"name":"Amman","lat":31.949381,"lng":35.932911},
					{"name":"Amsterdam","lat":52.3738007,"lng":4.8909347},
					{"name":"Andorra la Vella","lat":42.5075314,"lng":1.5218156},
					{"name":"Ankara","lat":39.92077,"lng":32.85411},
					{"name":"Antananarivo","lat":-18.914872,"lng":47.531612},
					{"name":"Apia","lat":-13.8333333,"lng":-171.7666667},
					{"name":"Ashgabat","lat":37.950197,"lng":58.380223},
					{"name":"Asmara","lat":15.33236,"lng":38.92617},
					{"name":"Astana","lat":51.179852,"lng":71.446682},
					{"name":"Asunción","lat":-25.2821972,"lng":-57.6351},
					{"name":"Athens","lat":37.97918,"lng":23.716647},
					{"name":"Avarua","lat":-21.2065611,"lng":-159.7756028},
					{"name":"Baghdad","lat":33.3157,"lng":44.3922},
					{"name":"Baku","lat":40.3456149,"lng":49.606736},
					{"name":"Bamako","lat":12.65,"lng":-8},
					{"name":"Bandar Seri Begawan","lat":4.940879,"lng":114.948601},
					{"name":"Bangkok","lat":13.7234186,"lng":100.4762319},
					{"name":"Bangui","lat":4.361698,"lng":18.555975},
					{"name":"Banjul","lat":13.4530556,"lng":-16.5775},
					{"name":"Basseterre","lat":17.295583,"lng":-62.726013},
					{"name":"Beijing","lat":39.904667,"lng":116.408198},
					{"name":"Beirut","lat":33.8886289,"lng":35.4954794},
					{"name":"Belfast","lat":54.5972686,"lng":-5.9301088},
					{"name":"Belgrade","lat":44.802416,"lng":20.465601},
					{"name":"Belmopan","lat":17.2513889,"lng":-88.7669444},
					{"name":"Berlin","lat":52.5234051,"lng":13.4113999},
					{"name":"Bern","lat":46.9479986,"lng":7.4481481},
					{"name":"Bishkek","lat":42.8747222,"lng":74.6122222},
					{"name":"Bissau","lat":11.8666667,"lng":-15.6},
					{"name":"Bogotá","lat":4.609866,"lng":-74.08205},
					{"name":"Brasília","lat":-15.7801482,"lng":-47.9291698},
					{"name":"Bratislava","lat":48.1483765,"lng":17.1073105},
					{"name":"Brazzaville","lat":-4.2666667,"lng":15.2833333},
					{"name":"Bridgetown","lat":13.0961111,"lng":-59.6083333},
					{"name":"Brussels","lat":50.8462807,"lng":4.3547273},
					{"name":"Bucharest","lat":44.437711,"lng":26.097367},
					{"name":"Budapest","lat":47.4984056,"lng":19.0407578},
					{"name":"Buenos Aires","lat":-34.6084175,"lng":-58.3731613},
					{"name":"Bujumbura","lat":-3.376217,"lng":29.359349},
					{"name":"Cairo","lat":30.064742,"lng":31.249509},
					{"name":"Canberra","lat":-35.28204,"lng":149.12858},
					{"name":"Caracas","lat":10.491016,"lng":-66.902061},
					{"name":"Cardiff","lat":51.4813069,"lng":-3.1804979},
					{"name":"Castries","lat":14.00005,"lng":-60.98325},
					{"name":"Charlotte Amalie","lat":35.2270869,"lng":-80.8431267},
					{"name":"Chisinau","lat":47.026859,"lng":28.841551},
					{"name":"Cockburn Town","lat":21.4602778,"lng":-71.1413889},
					{"name":"Conakry","lat":9.537029,"lng":-13.67847},
					{"name":"Copenhagen","lat":55.6762944,"lng":12.5681157},
					{"name":"Dakar","lat":14.75,"lng":-17.3333333},
					{"name":"Damascus","lat":33.513,"lng":36.292},
					{"name":"Dhaka","lat":23.709921,"lng":90.407143},
					{"name":"Dili","lat":-8.570694,"lng":125.580704},
					{"name":"Djibouti","lat":11.588599,"lng":43.14585},
					{"name":"Dodoma","lat":-6.1730556,"lng":35.7419444},
					{"name":"Doha","lat":25.280282,"lng":51.522476},
					{"name":"Douglas","lat":54.166997,"lng":-4.482106},
					{"name":"Dublin","lat":53.344104,"lng":-6.2674937},
					{"name":"Dushanbe","lat":38.5366667,"lng":68.78},
					{"name":"Edinburgh","lat":55.9501755,"lng":-3.1875359},
					{"name":"Flying Fish Cove","lat":-10.4216667,"lng":105.6780556},
					{"name":"Freetown","lat":8.484146,"lng":-13.22867},
					{"name":"Funafuti","lat":-8.6314877,"lng":179.0895666},
					{"name":"Gaborone","lat":-24.65411,"lng":25.908739},
					{"name":"George Town","lat":19.2833333,"lng":-81.3666667},
					{"name":"Georgetown","lat":6.804611,"lng":-58.154831},
					{"name":"Gibraltar","lat":42.0950426,"lng":-83.1896484},
					{"name":"Grytviken","lat":-54.281149,"lng":-36.5087385},
					{"name":"Guatemala City","lat":14.6133333,"lng":-90.5352778},
					{"name":"Gustavia","lat":17.893056,"lng":-62.84834},
					{"name":"Hagåtña","lat":13.4833333,"lng":144.75},
					{"name":"Hamilton","lat":32.2939533,"lng":-64.7829247},
					{"name":"Hanoi","lat":21.0333333,"lng":105.85},
					{"name":"Harare","lat":-17.82922,"lng":31.053961},
					{"name":"Hargeisa","lat":9.562389,"lng":44.0770134},
					{"name":"Havana","lat":23.1168,"lng":-82.388557},
					{"name":"Helsinki","lat":60.1698125,"lng":24.9382401},
					{"name":"Honiara","lat":-9.4333333,"lng":159.95},
					{"name":"Islamabad","lat":33.718151,"lng":73.060547},
					{"name":"Jakarta","lat":-6.211544,"lng":106.845172},
					{"name":"Jamestown","lat":-15.9384658,"lng":-5.71682},
					{"name":"Jerusalem","lat":31.7857,"lng":35.2007},
					{"name":"Jerusalem","lat":33.6132192,"lng":-87.8540306},
					{"name":"Kabul","lat":34.528455,"lng":69.171703},
					{"name":"Kampala","lat":0.3166667,"lng":32.5833333},
					{"name":"Kathmandu","lat":27.702871,"lng":85.318244},
					{"name":"Khartoum","lat":15.550101,"lng":32.532241},
					{"name":"Kiev","lat":50.45,"lng":30.5233333},
					{"name":"Kigali","lat":-1.950106,"lng":30.058769},
					{"name":"Kingston","lat":17.992731,"lng":-76.792009},
					{"name":"Kingston","lat":-29.054523,"lng":167.966618},
					{"name":"Kingstown","lat":13.208408,"lng":-61.262858},
					{"name":"Kinshasa","lat":-4.325,"lng":15.3222222},
					{"name":"Kuala Lumpur","lat":3.139003,"lng":101.686855},
					{"name":"Kuwait City","lat":29.329404,"lng":48.00393},
					{"name":"La Paz","lat":-16.49901,"lng":-68.146248},
					{"name":"Laâyoune (El Aaiún)","lat":27.16234,"lng":-13.20163},
					{"name":"Libreville","lat":0.390841,"lng":9.453644},
					{"name":"Lilongwe","lat":-13.9833333,"lng":33.7833333},
					{"name":"Lima","lat":-12.0433333,"lng":-77.0283333},
					{"name":"Lisbon","lat":38.7070538,"lng":-9.1354884},
					{"name":"Ljubljana","lat":46.0514263,"lng":14.5059655},
					{"name":"Lomé","lat":6.1377778,"lng":1.2125},
					{"name":"London","lat":51.5001524,"lng":-0.1262362},
					{"name":"Luanda","lat":-8.8383333,"lng":13.2344444},
					{"name":"Lusaka","lat":-15.408193,"lng":28.287167},
					{"name":"Luxembourg City","lat":49.6100036,"lng":6.129596},
					{"name":"Madrid","lat":40.4166909,"lng":-3.7003454},
					{"name":"Majuro","lat":7.1164214,"lng":171.1857736},
					{"name":"Malabo","lat":3.75,"lng":8.7833333},
					{"name":"Malé","lat":4.174199,"lng":73.510915},
					{"name":"Mamoudzou","lat":-12.7809488,"lng":45.227872},
					{"name":"Managua","lat":12.1363889,"lng":-86.2513889},
					{"name":"Manama","lat":26.2166667,"lng":50.5833333},
					{"name":"Manila","lat":14.5833333,"lng":120.9666667},
					{"name":"Maputo","lat":-25.968945,"lng":32.569551},
					{"name":"Marigot","lat":18.069605,"lng":-63.083676},
					{"name":"Maseru","lat":-29.3141863,"lng":27.4832633},
					{"name":"Mata-Utu","lat":-13.2833333,"lng":-176.1833333},
					{"name":"Mbabane","lat":-26.3166667,"lng":31.1333333},
					{"name":"Mexico","lat":43.4595138,"lng":-76.2288176},
					{"name":"Minsk","lat":53.9,"lng":27.5666667},
					{"name":"Mogadishu","lat":2.0333333,"lng":45.35},
					{"name":"Monaco","lat":43.7325291,"lng":7.418907},
					{"name":"Monrovia","lat":6.300774,"lng":-10.79716},
					{"name":"Montevideo","lat":-34.8833333,"lng":-56.1666667},
					{"name":"Moroni","lat":-11.701232,"lng":43.252927},
					{"name":"Moscow","lat":55.755786,"lng":37.617633},
					{"name":"Muscat","lat":23.6138199,"lng":58.5922413},
					{"name":"Nairobi","lat":-1.3106691,"lng":36.8250274},
					{"name":"Nassau","lat":25.06,"lng":-77.345},
					{"name":"Naypyidaw","lat":19.7855757,"lng":96.1208926},
					{"name":"N\'Djamena","lat":12.104797,"lng":15.044506},
					{"name":"New Delhi","lat":28.635308,"lng":77.22496},
					{"name":"Niamey","lat":13.512668,"lng":2.112516},
					{"name":"Nicosia","lat":35.1666667,"lng":33.3666667},
					{"name":"Nicosia","lat":35.1666667,"lng":33.3666667},
					{"name":"Nouakchott","lat":18.1,"lng":-15.95},
					{"name":"Nouméa","lat":-22.2758,"lng":166.458},
					{"name":"Nukuʻalofa","lat":-21.1333333,"lng":-175.2},
					{"name":"Nuuk","lat":64.18362,"lng":-51.721407},
					{"name":"Oranjestad","lat":12.52458,"lng":-70.026459},
					{"name":"Oslo","lat":59.9138204,"lng":10.7387413},
					{"name":"Ottawa","lat":45.411572,"lng":-75.698194},
					{"name":"Ouagadougou","lat":12.364637,"lng":-1.533864},
					{"name":"Pago Pago","lat":-14.27933,"lng":-170.700897},
					{"name":"Palikir","lat":6.9147118,"lng":158.1610274},
					{"name":"Panama City","lat":8.994269,"lng":-79.518792},
					{"name":"Papeete","lat":-17.535022,"lng":-149.569594},
					{"name":"Paramaribo","lat":5.8666667,"lng":-55.1666667},
					{"name":"Paris","lat":48.8566667,"lng":2.3509871},
					{"name":"Phnom Penh","lat":11.55,"lng":104.9166667},
					{"name":"Plymouth [f]","lat":16.706417,"lng":-62.215839},
					{"name":"Podgorica","lat":42.442575,"lng":19.268646},
					{"name":"Port Louis","lat":-20.165279,"lng":57.49638},
					{"name":"Port Moresby","lat":-9.481553,"lng":147.190242},
					{"name":"Port Vila","lat":-17.734818,"lng":168.322029},
					{"name":"Port-au-Prince","lat":18.539269,"lng":-72.336408},
					{"name":"Port of Spain","lat":10.659567,"lng":-61.478912},
					{"name":"Porto-Novo","lat":6.4973,"lng":2.6051},
					{"name":"Prague","lat":50.0878114,"lng":14.4204598},
					{"name":"Praia","lat":14.930464,"lng":-23.512669},
					{"name":"Pretoria","lat":-25.7460186,"lng":28.1871204},
					{"name":"Pristina","lat":42.672421,"lng":21.164539},
					{"name":"Putrajaya","lat":2.926361,"lng":101.696445},
					{"name":"Pyongyang","lat":39.031859,"lng":125.753765},
					{"name":"Quito","lat":-0.229498,"lng":-78.524277},
					{"name":"Rabat","lat":34.015049,"lng":-6.83272},
					{"name":"Reykjavík","lat":64.135338,"lng":-21.89521},
					{"name":"Riga","lat":56.9465363,"lng":24.1048503},
					{"name":"Riyadh","lat":24.6880015,"lng":46.7224333},
					{"name":"Road Town","lat":18.426997,"lng":-64.620762},
					{"name":"Rome","lat":41.8954656,"lng":12.4823243},
					{"name":"Roseau","lat":15.308586,"lng":-61.384436},
					{"name":"Saipan","lat":15.177801,"lng":145.750967},
					{"name":"San José","lat":9.9333333,"lng":-84.0833333},
					{"name":"San Juan","lat":18.4663338,"lng":-66.1057217},
					{"name":"San Marino","lat":43.9321564,"lng":12.4486256},
					{"name":"San Salvador","lat":13.69,"lng":-89.1900028},
					{"name":"Sanaá","lat":15.3483333,"lng":44.2063889},
					{"name":"Santiago","lat":-33.4253598,"lng":-70.5664659},
					{"name":"Santo Domingo","lat":18.5,"lng":-69.9833333},
					{"name":"São Tomé","lat":0.336767,"lng":6.727799},
					{"name":"Sarajevo","lat":43.8476,"lng":18.3564},
					{"name":"Seoul","lat":37.566535,"lng":126.9779692},
					{"name":"Singapore","lat":1.2894365,"lng":103.8499802},
					{"name":"Skopje","lat":42.003812,"lng":21.452246},
					{"name":"Sofia","lat":42.6976262,"lng":23.3222839},
					{"name":"South Tarawa","lat":1.3290526,"lng":172.9790528},
					{"name":"Sri Jayawardenepura [g]","lat":6.883201,"lng":79.906982},
					{"name":"St. George\'s","lat":12.0560975,"lng":-61.7487996},
					{"name":"St. Helier","lat":49.186237,"lng":-2.10384},
					{"name":"St. John\'s","lat":17.117528,"lng":-61.845557},
					{"name":"St. Peter Port","lat":49.460325,"lng":-2.545277},
					{"name":"St. Pierre","lat":46.7811,"lng":-56.17639},
					{"name":"Stanley","lat":-51.700981,"lng":-57.84919},
					{"name":"Stockholm","lat":59.3327881,"lng":18.0644881},
					{"name":"Sucre","lat":-19.0339,"lng":-65.2626},
					{"name":"Suva","lat":-18.1416,"lng":178.4419},
					{"name":"Taipei","lat":25.091075,"lng":121.5598345},
					{"name":"Tallinn","lat":59.4388619,"lng":24.7544715},
					{"name":"Tashkent","lat":41.2666667,"lng":69.2166667},
					{"name":"Tbilisi","lat":41.709981,"lng":44.792998},
					{"name":"Tegucigalpa","lat":14.0820537,"lng":-87.2062849},
					{"name":"Tehran","lat":35.6961111,"lng":51.4230556},
					{"name":"Thimphu","lat":27.4666667,"lng":89.6416667},
					{"name":"Tirana","lat":41.33,"lng":19.82},
					{"name":"Tiraspol","lat":46.845238,"lng":29.633101},
					{"name":"Tokyo","lat":35.6894875,"lng":139.6917064},
					{"name":"Tórshavn","lat":62.017707,"lng":-6.771879},
					{"name":"Tripoli","lat":32.876174,"lng":13.187507},
					{"name":"Tunis","lat":36.81881,"lng":10.16596},
					{"name":"Ulaanbaatar","lat":47.921378,"lng":106.90554},
					{"name":"Vaduz","lat":47.1410409,"lng":9.5214458},
					{"name":"Valletta","lat":35.8977778,"lng":14.5125},
					{"name":"The Valley","lat":18.217349,"lng":-63.05723},
					{"name":"Vatican City","lat":41.902916,"lng":12.453389},
					{"name":"Victoria","lat":-4.6167,"lng":55.45},
					{"name":"Vienna","lat":48.2092062,"lng":16.3727778},
					{"name":"Vientiane","lat":17.962769,"lng":102.614429},
					{"name":"Vilnius","lat":54.6893865,"lng":25.2800243},
					{"name":"Warsaw","lat":52.2296756,"lng":21.0122287},
					{"name":"Washington, D.C.","lat":38.8951118,"lng":-77.0363658},
					{"name":"Wellington","lat":-41.28648,"lng":174.776217},
					{"name":"West Island","lat":-12.140066,"lng":96.834726},
					{"name":"Willemstad","lat":12.1166667,"lng":-68.9333333},
					{"name":"Windhoek","lat":-22.558904,"lng":17.082481},
					{"name":"Yamoussoukro","lat":6.8166667,"lng":-5.2833333},
					{"name":"Yaoundé","lat":3.8666667,"lng":11.5166667},
					{"name":"Yaren","lat":-0.5466857,"lng":166.9210913},
					{"name":"Yerevan","lat":40.183333,"lng":44.516667},
					{"name":"Zagreb","lat":45.814912,"lng":15.9785145}';
}

function userHasRated($rater_filename, $rater_end_of_line_char, $rater_ip_voting_restriction, $rater_ip_vote_qty)
{
    //get ip address
    if (isset($_SERVER['HTTP_X_FORWARD_FOR'])) $rater_ip = $_SERVER['HTTP_X_FORWARD_FOR'];
    else $rater_ip = $_SERVER['REMOTE_ADDR'];
    //$rater_ip = getenv("REMOTE_ADDR");
    $rater_file = fopen($rater_filename, "a+");
    $rater_str = "";
    $rater_str = rtrim(fread($rater_file, 1024 * 8), $rater_end_of_line_char);
    if ($rater_str != "") {
        if ($rater_ip_voting_restriction) {
            $rater_data = explode($rater_end_of_line_char, $rater_str);
            $rater_ip_vote_count = 0;
            foreach ($rater_data as $d) {
                $rater_tmp = explode("|", $d);
                $rater_oldip = str_replace($rater_end_of_line_char, "", $rater_tmp[1]);
                if ($rater_ip == $rater_oldip) {
                    $rater_ip_vote_count++;
                }
            }
            if ($rater_ip_vote_count > ($rater_ip_vote_qty - 1)) {
                fclose($rater_file);
                return true;
            }
        }
    }
    fclose($rater_file);
    return false;
}

function userHasRatedOne()
{
    global $cfg_rater_ids;
    foreach ($cfg_rater_ids as $rater_id) {
        $rater_filename = DIR_WS_MODULES . 'rater/item_' . $rater_id . '.rating';
        if (userHasRated($rater_filename, RATER_EOL, RATER_RESTRINCTION, RATER_IP_QTY)) return true;
    }
    return false;
}

function ae_detect_ie()
{
    if (isset($_SERVER['HTTP_USER_AGENT']) &&
        (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE') !== false)
    )
        return true;
    else
        return false;
}

function getPhpDef($CRS_code)
{
    $sql = "SELECT crs.Definition AS def FROM coordinate_systems crs WHERE crs.Code = '" . $CRS_code . "'";
    $crs_query = tep_db_query($sql);
    while ($crs = tep_db_fetch_array($crs_query)) {
        return $crs['def'];
    }
    throw(new Exception("No definition found for this code. Please contact us."));
}

function getEnumValues($table, $field)
{
    $sql = "SHOW COLUMNS FROM {$table} WHERE Field = '{$field}'";
    $query = tep_db_query($sql);
    $type = tep_db_fetch_array($query)['Type'];
    preg_match("/^enum\\(\\'(.*)\\'\\)$/", $type, $matches);
    $enum = explode("','", $matches[1]);
    return $enum;
}

function getCountries($crs_language)
{
    $countries = array();
    $sql = "SELECT DISTINCT ";
    $sql .= "cn.Name AS name, co.Iso_countries AS iso ";
    $sql .= "FROM countries co ";
    $sql .= "LEFT OUTER JOIN country_names cn ON cn.Iso_countries = co.Iso_countries AND cn.Code_languages = '" . $crs_language . "' ";
    $sql .= "INNER JOIN country_coordinate_system cc ON cc.Iso_countries = co.Iso_countries ";
    $sql .= "ORDER BY 1";
    $crs_query = tep_db_query($sql);
    while ($crs = tep_db_fetch_array($crs_query)) {
        $countries[$crs['iso']] = $crs['name'];
    }
    return $countries;
}

function getLanguages() {
    $languages = array();
    $sql = "SELECT * FROM languages WHERE Enabled = 'YES'";
    $query = tep_db_query($sql);
    while ($language = tep_db_fetch_array($query)) {
        $languages[$language['Code_languages']] = array('id' => $language['Id_languages'], 'name' => $language['Name'], 'image' => DIR_WS_IMAGES . $language['Code_languages'] . '.png', 'width' => $language['Flag_width'], 'height' => $language['Flag_height'], 'iso' => $language['Code_languages']);
    }
    return $languages;
}

function getTotalDonation()
{
    $sql = "SELECT SUM(gift_received_value) AS sum FROM gifts";
    $gifts_query = tep_db_query($sql);
    $sum = 0;
    while ($gifts = tep_db_fetch_array($gifts_query)) {
        $sum = $sum + $gifts['sum'];
    }
    return $sum;
}

function getLastFiveDonors()
{
    $sql = "SELECT d.don_name AS name ";
    $sql .= "FROM gifts g INNER JOIN donors d ON g.don_code = d.don_code ";
    $sql .= "ORDER BY g.gift_emition_date DESC LIMIT 0, 5";
    $gifts_query = tep_db_query($sql);
    $str = "<ol>";
    while ($gifts = tep_db_fetch_array($gifts_query)) {
        $str .= "<li>" . $gifts['name'] . "</li>";
    }
    $str .= "</ol>";
    return $str;
}

/*NOT USED
function getCachedLastFiveDonors()
{
	$cached_file_path = DIR_FS_CACHE."last5donors.html";
	$refresh = !file_exists($cached_file_path) || !is_readable($cached_file_path);
	if ($refresh) {
		file_put_contents_atomic($cached_file_path, getLastFiveDonors());
	}
	return file_get_contents($cached_file_path);
}
*/

function file_put_contents_atomic($filename, $content)
{
    $temp = tempnam(DIR_FS_TEMP, 'temp');
    if (!($f = @fopen($temp, 'wb'))) {
        $temp = DIR_FS_TEMP . uniqid('temp');
        if (!($f = @fopen($temp, 'wb'))) {
            trigger_error("file_put_contents_atomic() : error writing temporary file '$temp'", E_USER_WARNING);
            return false;
        }
    }

    fwrite($f, $content);
    fclose($f);

    if (!@rename($temp, $filename)) {
        @unlink($filename);
        @rename($temp, $filename);
    }

    @chmod($filename, FILE_PUT_CONTENTS_ATOMIC_MODE);

    return true;
}

function clearCache()
{
    $log = "";
    $handle = opendir(DIR_FS_CACHE);
    while (false !== ($file = readdir($handle))) {
        $sorted_files[] = $file;
        if ($file != '../' && $file != '..' && $file != '.' && $file != '.htaccess') {
            if (@!is_dir(DIR_FS_CACHE . "$file")) {
                unlink(DIR_FS_CACHE . "$file");
                $log .= $file . " deleted<br>";
            }
        }
    }
    return $log;
}

function cleanString($string)
{
    $str = urldecode(stripslashes($string));
    $str = preg_replace("/['\"\\(\\);]+/", "", $str);
    return $str;
}

?>