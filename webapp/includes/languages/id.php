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
	Translated to Indonesian by Imron Fauzi - imronfauzi[at]gmail.com


*/

define('DIR', 'ltr');
define('LOCALE', 'id_ID');
define('PAYPAL_LOCALE', 'id_ID');
define('GOOGLE_PLUS_LOCALE', 'id_ID');
@setlocale(LC_TIME, LOCALE.'.UTF8');
if (isset($_SERVER['SystemRoot']) && (preg_match('%windows%i', $_SERVER['SystemRoot']) || preg_match('%winnt%i', $_SERVER['SystemRoot']))) @setlocale(LC_TIME, 'english'); // Page de code pour serveur sous Windows (installation locale)
define('DATE_FORMAT_LONG', '%A %d %B, %Y');

define('APPLICATION_TITLE', 'Konversi Koordinat Dunia');
define('APPLICATION_TITLE_BIS', '');
define('APPLICATION_TITLE_TER', '');
define('TRANSLATE', 'Terjemahan');
define('APPLICATION_DESCRIPTION', 'TWCC, The World Coordinate Converter is a tool to convert geodetic coordinates in a wide rangeof reference systems.');
define('LANGUAGE_CODE', 'id');
define('APPLICATION_LICENSE', '<a href="https://www.gnu.org/licenses/agpl-3.0.'.LANGUAGE_CODE.'.html" target="_blank" title="AGPL">AGPL</a>');

define('WORLD', 'Dunia');
define('UNIT_DEGREE', '°');
define('UNIT_MINUTE', '\'');
define('UNIT_SECOND', '"');
define('UNIT_METER', 'm');
define('UNIT_KILOMETER', 'km');
define('UNIT_FEET', 'f');
define('LABEL_LNG', 'Lng = ');
define('LABEL_LAT', 'Lat = ');
define('LABEL_X', 'X = ');
define('LABEL_Y', 'Y = ');
define('LABEL_ZONE', 'Zona = ');
define('LABEL_HEMI', 'Belahan Bumi = ');
define('LABEL_CONVERGENCE', 'Konvergensi = ');
define('LABEL_CSV', 'CSV:');
define('LABEL_FORMAT', 'Format:');
define('OPTION_E', 'T');
define('OPTION_W', 'B');
define('OPTION_N', 'U');
define('OPTION_S', 'S');
define('UNIT_DEGREE_EAST', UNIT_DEGREE.OPTION_E);
define('UNIT_DEGREE_NORTH', UNIT_DEGREE.OPTION_N);
define('OPTION_DMS', 'Deg. men. det.');
define('OPTION_DM', 'Deg. men.');
define('OPTION_DD', 'Dec. Derajat');
define('OPTION_NORTH', 'Utara');
define('OPTION_SOUTH', 'Selatan');
define('OPTION_CSV', 'CSV');
define('OPTION_MANUAL', 'Manual');
define('OPTION_M', 'Meter');
define('OPTION_KM', 'Kilometer');
define('OPTION_F', 'Feet');

define('TAB_TITLE_1', 'Arah');
define('TAB_TITLE_2', 'Selengkapnya.');
define('DRAG_ME', 'Pindahkan!');
define('NEW_SYSTEM_ADDED', 'Sistem baru telah ditambahkan, Anda dapat menemukannya pada nama ');
define('CRS_ALREADY_EXISTS', 'Sistem yang coba Anda tambahkan sudah ada di TWCC. Anda dapat menemukannya di daftar di bawah ini: ');
define('ELEVATION', 'Elevasi:');
define('ADDRESS', 'Alamat:');
define('ZOOM', 'Perbesar');
define('NO_ADDR_FOUND', 'Tidak ditemukan alamat.');
define('GEOCODER_FAILED', 'Geokode tidak berhasil karena alasan berikut: ');

define('CREDIT', 'Kredit:');
define('HOSTING', 'Hosting:');
define('CONSTANTS', 'Konstan:');
define('LIBRARIES', 'Pustaka:');
define('MAPS', 'Peta:');
define('GO', 'Mulai!');
define('SEARCH_BY_ADDRESS', 'Cari alamat...');
define('HOME', 'Beranda');
define('ABOUT', 'Tentang TWCC');
define('CONTACT_US', 'Kontak Kami');
define('DONATE', 'Donasi');
define('WE_NEED_YOU','Kami membutuhkan bantuan Anda!');
define('SUPPORT_TEXT','Kami mengandalkan dukungan dari pengguna TWCC untuk terus mempertahankan dan meningkatkan situs web gratis ini.<br>Uang Anda dapat membuat perbedaan dan mendukung dana hari ini.');
define('HOW_WE_PLAN','Rencana kami dalam menggunakan dana:<br><ul>
<li class="wip">Desain antarmuka untuk perangkat bergerak, telepon cerdas dan tablet.
<br>Feel free to send us your feedback on the <a href="/m/id">beta version</a>!</li>
<li class="done">Desain API REST untuk perangkat bergerak, telepon cerdas dan tablet.</li>
<li class="done">Sewa server baru untuk memberikan layanan yang lebih baik dan lebih cepat.</li>
</ul>');
define('LAST_5_DONORS','Terimakasih Donatur!<br>Daftar lima donor terakhir:');
define('DO_NOT_SHOW_AGAIN', 'Jangan tampilkan pesan ini lagi.');
define('GIT_COMMITS_LINK', '<a target="_blank" href="https://github.com/ClemRz/TWCC/commits/master" title="GitHub">%s</a>');
define('CHANGELOG', sprintf(GIT_COMMITS_LINK, '<img src="'.DIR_WS_IMAGES.'github_32.png" alt="Git" width="32" height="32">'));
define('SELECT_YOUR_LANGUAGE', 'Bahasa: ');

define('PLEASE_DISABLE_YOUR_ADBLOCK', 'nonaktifkan AdBlock Anda');

define('HELP', 'Bantuan');
define('CLOSE', 'Tutup');
define('HELP_1', 'Pilih sistem referensi data Anda.');
define('HELP_2', 'Pilih sistem referensi tujuan.');
define('HELP_3', 'Masukkan koordinat Anda.</p>
								<div><b>ATAU</b></div>
								<p>Klik pada peta.</p>
								<div><b>ATAU</b></div>
								<p>Seret penanda.</p>
								<div><b>ATAU</b></div>
								<p>Masukkan alamat di bar pencarian di atas.');
define('HELP_4', 'Tekan untuk mengkonversi koordinat Anda.');
define('PREVIOUS', 'Sebelum');
define('NEXT', 'Setelah');
define('FINISH', 'Selesai!');
define('LOADING', 'Memuat, mohon, sabar...');
define('YOU_CANT_FIND', 'Anda tidak dapat menemukan sistem referensi Anda dalam daftar?');
define('UNDEFINED_TITLE', 'Judul tidak terdefinisi');
define('CONVERT', 'Mengubah');
define('SYSTEM_DEFINITION', 'Definisi sistem');

define('OPTIONS', 'Pilihan:');
define('MODE', 'Mode:');
define('CONVENTION_TITLE', 'Konvensi');
define('CONVENTION', CONVENTION_TITLE.' <a href="" title="'.HELP.'" class="convention">[?]</a>:');
define('SURVEY', 'Survei');
define('GAUSS_BOMFORD', 'Gauss-Bomford');
define('AUTO_ZOOM', 'Perbesar Otomatis:');
define('PRINT_CURRENT_MAP', 'Cetak Peta:');
define('FULL_SCREEN', 'Tampilan Penuh:');

define('CUSTOM_SYSTEM', 'Ubah sistem referensi');
define('SEARCH_SYSTEM', 'Cari <span class="underlined"><a href="'.DIR_WS_IMAGES.'snippet_proj4js_format.png" class="snippet">Proj4js</a></span> format pada <span class="underlined">Referensi Spasial</span>:');
define('SEARCH_EXAMPLE', 'Mis: European Datum 1950');
define('SEARCH', 'Cari!');
define('COME_BACK', '<span class="underlined">Kembali</span> dan tambahkan definisi sistem referensi baru di <span class="underlined">TWCC</span>:');
define('SYSTEM_EXAMPLE', '<a href="" class="toggle-next">Contoh...</a>
													<ul style="display:none;" class="toogle-me"><li>+title=ED 1950 (Deg) +proj=longlat +ellps=intl +no_defs</li>
													<li>EPSG:4326</li>
													<li>ESRI:37231</li>
													<li>IAU2000:29901</li>
													<li>SR-ORG:38</li>
													<li>IGNF:RRAF91</li></ul>');
define('ADD', 'Tambahkan!');
define('FREQUENT_USE', 'Anda sering menggunakan sistem ini?<br>Kontak kami dan kami akan menambahkannya ke TWCC secara permanen!');

define('DO_RESEARCH', 'Cari');
define('CLOSE_ON_SELECT', 'Tutup dan pilih');
define('RESEARCH', 'Pencarian lanjutan');
define('RESEARCH_FORM', 'Format pencarian');
define('CRS_CODE', 'Kode');
define('CRS_NAME', 'Nama (Gunakan karakter % sebagai wildcard)');
define('CRS_COUNTRY', 'Negara');
define('OPTN_ALL', 'Semua');
define('RESULT', 'Hasil pencarian');
define('RESULT_EMPTY', 'Pencarian Anda tidak cocok dengan sistem apapun');
define('RESULT_FIRST', 'Silakan masukkan sedikitnya satu kriteria pencarian, lalu klik ');

define('PLEASE_FILL_FORM', 'Silahkan isi formulir di bawah ini.');
define('EMAIL', 'Surel:');
define('MESSAGE', 'Pesan:');
define('SEND_MESSAGE', 'Kirim');
define('MESSAGE_SENT', "Terimakasih!\\n\\rPesan Anda terkirim.\\n\\rKami akan mempertimbangkannya sesegera mungkin.");
define('MESSAGE_NOT_SENT', 'Maaf, pesan Anda tidak terkirim.\\n\\rSilakan, coba lagi.\\n\\rErr. kode ');
define('MESSAGE_WRONG_EMAIL', 'Surel yang Anda masukkan tampaknya salah.\\n\\rSilakan, coba lagi.');

define('W3C_HTML', '<a href="https://validator.w3.org/check?uri=referer" title="W3C HTML 5 compliant" target="_blank"><img src="https://www.w3.org/Icons/valid-xhtml10-blue.png" alt="W3C XHTML 1.0 compliant" style="border:0px none;height:15px;"></a>');
define('ABOUT_CONTENT', '<h2>Apa TWCC itu?</h2>
					<p>TWCC, "Konversi Koordinat Dunia", adalah '.sprintf(GIT_COMMITS_LINK, '<img src="'.DIR_WS_IMAGES.'opensource_32.png" alt="" width="32" height="32"><i>Sumber Terbuka</i>').' alat untuk mengkonversi koordinat geodetik dalam berbagai
					sitem referensi.</p>
					<p>Beberapa alat konversi koordinat sudah ada, namun, di sini adalah kekuatan TWCC:</p>
					<ul><li>Alat <b>intuitif dan mudah</b> digunakan.</li>
					<li>Kemungkinan menambahkan sistem yang ditentukan pengguna dan penggunaan peta interaktif membuatnya <b>fleksibel</b>.</li>
					<li><b>Tidak perlu diunduh</b> atau instalasi khusus, Anda hanya perlu memiliki koneksi internet.</li>
					<li>TWCC <b>kompatibel</b> dengan berbagai lingkungan (Mac, Linux, Windows...). '.W3C_HTML.'</li>
					<li>TWCC <b>GRATIS</b> dan berlisensi di bawah GNU: '.APPLICATION_LICENSE.'</li></ul>
					<p>TWCC dibuat oleh <a href="" class="contact" title="'.CONTACT_US.'">Clément Ronzon</a> peneliti dan
					pengembangan dilakukan untuk <a href="https://www.grottocenter.org/" target="_blank">GrottoCenter.org</a>.</p>
					<p>Terimakasih kepada: Roland Aigner, Alessandro Avaro, Leszek Pawlowicz, Lê Viết Thanh, Ahmed Qatar.</p>
					<p>Untuk pertanyaan atau saran silahkan <b>kontak kami</b>.</p>
					<p>Anda dapat menyumbang untuk <b>mendukung inisiatif ini</b>.</p>');

define('PROJECTION', 'Proyeksi:');
define('UNITS', 'Unit:');
define('DATUM', 'Datum:');
define('NAME', 'Nama:');
define('NAD_GRIDS', 'NAD Grids:');
define('ELLIPSOID', 'Ellipsoid:');
define('SEMIMAJOR_RADIUS', 'Radius Semi-major:');
define('SEMIMINOR_RADIUS', 'Radius Semi-minor:');
define('INVERSE_FLATTENING', 'Inverse flattening:');
define('CENTRAL_LATITUDE', 'Pusat latitude:');
define('STANDARD_PARALLEL_1', 'Standar paralel 1:');
define('STANDARD_PARALLEL_2', 'Standar paralel 2:');
define('USED_IN_MERC_AND_EQC', 'Digunakan di merc dan eqc:');
define('CENTRAL_LONGITUDE', 'Pusat longitude:');
define('FOR_SOMERC_PROJECTION', 'Untuk proyeksi somerc:');
define('FALSE_EASTING', 'False easting:');
define('FALSE_NORTHING', 'False northing:');
define('PROJECTION_SCALE_FACTOR', 'Faktor skala proyeksi:');
define('SPHERE_AREA_OF_ELLIPSOID', 'Sphere - bidang ellipsoid:');
define('TOWARD_WGS84_SCALING', 'Skala Toward WGS84:');
define('CARTESIAN_SCALING', 'Skala Cartesian:');
define('FROM_GREENWICH_SCALING', 'Skala Greenwich:');

define('COORDINATE_REFERENCE_SYSTEMS', 'Sistem Referensi Koordinate');

define('DIRECT_LINK', 'Menuju Tautan');
define('COPY_TO_CLIPBOARD', 'Salin ke clipboard');

define('ERROR_CONTACT_US', 'Error #%s. Silakan hubungi kami.');

define('POLL', 'Survei kepuasan pengguna');
define('S_POLL', 'Survei');
define('RATE', 'Nilai');
define('PLEASE_TAKE_A_MOMENT', 'Survei, bagian kedua.');
define('AVERAGE_RATING', 'Ave. peringkat: %s</span> dari <span class="reviewcount"> %s pemilih');
define('ITEM_NAME_1', 'Apakah Anda sering datang kembali di TWCC?');
define('ITEM_LABELS_1', 'Pertama kali|Setahun dua kali|Setahun empat kali|Tiap bulan|Tiap minggu');
define('ITEM_NAME_2', 'Silakan nilai TWCC');
define('ITEM_LABELS_2', 'Buruk|Cukup|Baik|Baik sekali|Sempurna');
define('ITEM_NAME_3', 'Apakah Anda ingin versi bergerak TWCC?');
define('ITEM_LABELS_3', 'Tidak tertarik|Kenapa tidak|Ini akan keren|Ya|Ya benar');
define('ITEM_NAME_4', 'Berapa banyak Anda bersedia membayar untuk memiliki TWCC di ponsel Anda?');
define('ITEM_LABELS_4', '&lt;$1|dari $1 ke $5|dari $5 ke $10|dari $10 ke $50|&gt;$50');
define('ITEM_NAME_5', 'Apa jenis ponsel yang Anda gunakan?');
define('ITEM_LABELS_5', 'Lainnya|Windows Mobile|Blackberry|Android|iPhone');
define('RATER_ERROR_MAX', 'Anda telah menilai item ini. Anda diizinkan %s memilih.');
define('RATER_ERROR_EMPTY', 'Anda tidak memilih nilai peringkat.');
define('RATER_THANKS', 'Terimakasih atas penilaiannya.');
define('THIS_ITEM', 'item ini');
define('LEAVE_A_COMMENT', 'Tinggalkan komentar...');
define('POLL_COMMENTS', 'Hasil survei pertama menunjukkan bahwa sebagian besar pengguna TWCC ingin memiliki versi bergerak pada ponsel mereka. Silakan mengambil 5 detik untuk menjawab survei baru ini.');

define('LENGTH', 'panjang:');
define('AREA', 'Area:');
define('MAGNETIC_DECLINATION', 'Deklinasi Magnetik');
define('SOURCE_GRID_DECLINATION', 'Konvergensi sumber');
define('DEST_GRID_DECLINATION', 'Konvergensi tujuan');

define('FACEBOOK', 'TWCC pada Facebook');

define('LOGOUT', 'Keluar');
define('LOG_IN', 'Masuk');
define('SIGN_UP', 'Daftar');
define('MY_ACCOUNT', 'Akun Saya');

define('ALL_FIELDS_REQUIRED', 'Semua kolom formulir harus diisi.');
define('REG_NAME', 'Nama');
define('REG_EMAIL', 'Surel');
define('REG_PASSWORD', 'Katasandi');
define('CHECK_NAME', 'Nama pengguna dapat terdiri dari a-z, 0-9, garisbawah, spasi, diawali dengan huruf.');
define('CHECK_EMAIL', 'misal. my.name@gmail.com');
define('CHECK_PASSWORD', 'Kata sandi hanya bisa : a-z 0-9');
define('CHECK_LENGTH', 'Panjang dari %n diantara %min dan %max.');
define('CHECK_UNICITY', 'Pengguna dengan surel ini sudah ada.');

define('LOG_EMAIL', 'Surel');
define('LOG_PASSWORD', 'Katasandi');

define('WE_USE_COOKIES', 'Website ini menggunakan cookies');
define('WE_USE_COOKIES_DESCRIPTION', 'Website ini menggunakan cookies untuk meningkatkan pengalaman pengguna. Dengan menggunakan website kami Anda setuju untuk semua cookies sesuai dengan Kebijakan Cookie kami.');
define('READ_MORE', 'Baca selengkapnya');

define('LOOKING_FOR_TRANSLATOR', 'Kami membutuhkan bantuan Anda untuk menerjemahkan TWCC dalam bahasa berikut:
<ul><li><img src="'.DIR_WS_IMAGES.'flags/PH.png" alt=""> Filipino</li></ul>
Jika Anda tertarik, silakan <a href="#" title="contact" class="contact">kontak kami</a>.');

define('REDIRECT_TO_MOBILE_VERSION', 'There is a new mobile version (beta)! click OK to continue.');
?>
