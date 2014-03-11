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

$primeMeridians = array(
    "greenwich"=> "0dE",
    "lisbon"=> "9d07'54.862\"W",
    "paris"=> "2d20'14.025\"E",
    "bogota"=> "74d04'51.3\"W",
    "madrid"=> "3d41'16.58\"W",
    "rome"=> "12d27'8.4\"E",
    "bern"=> "7d26'22.5\"E",
    "jakarta"=> "106d48'27.79\"E",
    "ferro"=> "17d40'W",
    "brussels"=> "4d22'4.71\"E",
    "stockholm"=> "18d3'29.8\"E",
    "athens"=> "23d42'58.815\"E",
    "oslo"=> "10d43'22.5\"E"
);

$ellipsoids = array(
  "MERIT"=> array("a"=>6378137.0, "rf"=>298.257, "ellipseName"=>"MERIT 1983"),
  "SGS85"=> array("a"=>6378136.0, "rf"=>298.257, "ellipseName"=>"Soviet Geodetic System 85"),
  "GRS80"=> array("a"=>6378137.0, "rf"=>298.257222101, "ellipseName"=>"GRS 1980(IUGG, 1980)"),
  "IAU76"=> array("a"=>6378140.0, "rf"=>298.257, "ellipseName"=>"IAU 1976"),
  "airy"=> array("a"=>6377563.396, "b"=>6356256.910, "ellipseName"=>"Airy 1830"),
  "APL4."=> array("a"=>6378137, "rf"=>298.25, "ellipseName"=>"Appl. Physics. 1965"),
  "NWL9D"=> array("a"=>6378145.0, "rf"=>298.25, "ellipseName"=>"Naval Weapons Lab., 1965"),
  "mod_airy"=> array("a"=>6377340.189, "b"=>6356034.446, "ellipseName"=>"Modified Airy"),
  "andrae"=> array("a"=>6377104.43, "rf"=>300.0, "ellipseName"=>"Andrae 1876 (Den., Iclnd.)"),
  "aust_SA"=> array("a"=>6378160.0, "rf"=>298.25, "ellipseName"=>"Australian Natl & S. Amer. 1969"),
  "GRS67"=> array("a"=>6378160.0, "rf"=>298.2471674270, "ellipseName"=>"GRS 67(IUGG 1967)"),
  "bessel"=> array("a"=>6377397.155, "rf"=>299.1528128, "ellipseName"=>"Bessel 1841"),
  "bess_nam"=> array("a"=>6377483.865, "rf"=>299.1528128, "ellipseName"=>"Bessel 1841 (Namibia)"),
  "clrk66"=> array("a"=>6378206.4, "b"=>6356583.8, "ellipseName"=>"Clarke 1866"),
  "clrk80"=> array("a"=>6378249.145, "rf"=>293.4663, "ellipseName"=>"Clarke 1880 mod."),
  "CPM"=> array("a"=>6375738.7, "rf"=>334.29, "ellipseName"=>"Comm. des Poids et Mesures 1799"),
  "delmbr"=> array("a"=>6376428.0, "rf"=>311.5, "ellipseName"=>"Delambre 1810 (Belgium)"),
  "engelis"=> array("a"=>6378136.05, "rf"=>298.2566, "ellipseName"=>"Engelis 1985"),
  "evrst30"=> array("a"=>6377276.345, "rf"=>300.8017, "ellipseName"=>"Everest 1830"),
  "evrst48"=> array("a"=>6377304.063, "rf"=>300.8017, "ellipseName"=>"Everest 1948"),
  "evrst56"=> array("a"=>6377301.243, "rf"=>300.8017, "ellipseName"=>"Everest 1956"),
  "evrst69"=> array("a"=>6377295.664, "rf"=>300.8017, "ellipseName"=>"Everest 1969"),
  "evrstSS"=> array("a"=>6377298.556, "rf"=>300.8017, "ellipseName"=>"Everest (Sabah & Sarawak)"),
  "fschr60"=> array("a"=>6378166.0, "rf"=>298.3, "ellipseName"=>"Fischer (Mercury Datum) 1960"),
  "fschr60m"=> array("a"=>6378155.0, "rf"=>298.3, "ellipseName"=>"Fischer 1960"),
  "fschr68"=> array("a"=>6378150.0, "rf"=>298.3, "ellipseName"=>"Fischer 1968"),
  "helmert"=> array("a"=>6378200.0, "rf"=>298.3, "ellipseName"=>"Helmert 1906"),
  "hough"=> array("a"=>6378270.0, "rf"=>297.0, "ellipseName"=>"Hough"),
  "intl"=> array("a"=>6378388.0, "rf"=>297.0, "ellipseName"=>"International 1909 (Hayford)"),
  "kaula"=> array("a"=>6378163.0, "rf"=>298.24, "ellipseName"=>"Kaula 1961"),
  "lerch"=> array("a"=>6378139.0, "rf"=>298.257, "ellipseName"=>"Lerch 1979"),
  "mprts"=> array("a"=>6397300.0, "rf"=>191.0, "ellipseName"=>"Maupertius 1738"),
  "new_intl"=> array("a"=>6378157.5, "b"=>6356772.2, "ellipseName"=>"New International 1967"),
  "plessis"=> array("a"=>6376523.0, "rf"=>6355863.0, "ellipseName"=>"Plessis 1817 (France)"),
  "krass"=> array("a"=>6378245.0, "rf"=>298.3, "ellipseName"=>"Krassovsky, 1942"),
  "SEasia"=> array("a"=>6378155.0, "b"=>6356773.3205, "ellipseName"=>"Southeast Asia"),
  "walbeck"=> array("a"=>6376896.0, "b"=>6355834.8467, "ellipseName"=>"Walbeck"),
  "WGS60"=> array("a"=>6378165.0, "rf"=>298.3, "ellipseName"=>"WGS 60"),
  "WGS66"=> array("a"=>6378145.0, "rf"=>298.25, "ellipseName"=>"WGS 66"),
  "WGS72"=> array("a"=>6378135.0, "rf"=>298.26, "ellipseName"=>"WGS 72"),
  "WGS84"=> array("a"=>6378137.0, "rf"=>298.257223563, "ellipseName"=>"WGS 84"),
  "sphere"=> array("a"=>6370997.0, "b"=>6370997.0, "ellipseName"=>"Normal Sphere (r=6370997)")
);

$datums = array(
  "WGS84"=> array("towgs84"=> "0,0,0", "ellipse"=> "WGS84", "datumName"=> "WGS84"),
  "GGRS87"=> array("towgs84"=> "-199.87,74.79,246.62", "ellipse"=> "GRS80", "datumName"=> "Greek_Geodetic_Reference_System_1987"),
  "NAD83"=> array("towgs84"=> "0,0,0", "ellipse"=> "GRS80", "datumName"=> "North_American_Datum_1983"),
  "NAD27"=> array("nadgrids"=> "@conus,@alaska,@ntv2_0.gsb,@ntv1_can.dat", "ellipse"=> "clrk66", "datumName"=> "North_American_Datum_1927"),
  "potsdam"=> array("towgs84"=> "606.0,23.0,413.0", "ellipse"=> "bessel", "datumName"=> "Potsdam Rauenberg 1950 DHDN"),
  "carthage"=> array("towgs84"=> "-263.0,6.0,431.0", "ellipse"=> "clark80", "datumName"=> "Carthage 1934 Tunisia"),
  "hermannskogel"=> array("towgs84"=> "653.0,-212.0,449.0", "ellipse"=> "bessel", "datumName"=> "Hermannskogel"),
  "ire65"=> array("towgs84"=> "482.530,-130.596,564.557,-1.042,-0.214,-0.631,8.15", "ellipse"=> "mod_airy", "datumName"=> "Ireland 1965"),
  "nzgd49"=> array("towgs84"=> "59.47,-5.04,187.44,0.47,-0.1,1.024,-4.5993", "ellipse"=> "intl", "datumName"=> "New Zealand Geodetic Datum 1949"),
  "OSGB36"=> array("towgs84"=> "446.448,-125.157,542.060,0.1502,0.2470,0.8421,-20.4894", "ellipse"=> "airy", "datumName"=> "Airy 1830")
);

$crsLabelMapping = array('title'=>'',
													'proj'=>PROJECTION,
													'units'=>UNITS,
													'datum'=>DATUM,
													'datumName'=>NAME,
													'nadgrids'=>NAD_GRIDS,
													'ellps'=>ELLIPSOID,
													'ellipse'=>ELLIPSOID,
													'ellipseName'=>NAME,
													'a'=>SEMIMAJOR_RADIUS,
													'b'=>SEMIMINOR_RADIUS,
													'rf'=>INVERSE_FLATTENING,
													'lat_0'=>CENTRAL_LATITUDE,
													'lat_1'=>STANDARD_PARALLEL_1,
													'lat_2'=>STANDARD_PARALLEL_2,
													'lat_ts'=>USED_IN_MERC_AND_EQC,
													'lon_0'=>CENTRAL_LONGITUDE,
													'alpha'=>FOR_SOMERC_PROJECTION,
													'lonc'=>FOR_SOMERC_PROJECTION,
													'x_0'=>FALSE_EASTING,
													'y_0'=>FALSE_NORTHING,
													'k_0'=>PROJECTION_SCALE_FACTOR,
													'k'=>SPHERE_AREA_OF_ELLIPSOID,
													'r_a'=>SPHERE_AREA_OF_ELLIPSOID,
													'zone'=>'',
													'south'=>'',
													'north'=>'',
													'towgs84'=>TOWARD_WGS84_SCALING,
													'to_meter'=>CARTESIAN_SCALING,
													'from_greenwich'=>FROM_GREENWICH_SCALING,
													'pm'=>'Prime meridian:');
?>