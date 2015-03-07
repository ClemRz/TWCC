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
    Translated to Vietnamese by Lê Viet Thanh - lethanhx2k[at]gmail.com


*/

define('LOCALE', 'vi_VN');
define('PAYPAL_LOCALE', 'en_US');
define('GOOGLE_PLUS_LOCALE', 'vi');
@setlocale(LC_TIME, LOCALE.'.UTF8', 'vie');
if (isset($_SERVER['SystemRoot']) && (preg_match('%windows%i', $_SERVER['SystemRoot']) || preg_match('%winnt%i', $_SERVER['SystemRoot']))) @setlocale(LC_TIME, 'vietnamese'); // Page de code pour serveur sous Windows (installation locale)
define('DATE_FORMAT_LONG', '%A %d %B %Y');

define('APPLICATION_TITLE', 'The World Coordinate Converter');
define('APPLICATION_TITLE_BIS', '<sup>*</sup>');
define('TRANSLATE', 'Dịch');
define('APPLICATION_TITLE_TER', '*Chương trình chuyển đổi hệ tọa độ trực tuyến');
define('APPLICATION_DESCRIPTION', 'TWCC, Công cụ chuyển đổi trực tuyến giữa nhiều hệ tọa độ.');
define('LANGUAGE_CODE', 'vi');
define('APPLICATION_LICENSE', '<a href="http://www.gnu.org/licenses/agpl-3.0.en.html" target="_blank" title="AGPL">AGPL</a>'); //language overriden

define('WORLD', 'Thế giới');
define('UNIT_DEGREE', '°');
define('UNIT_MINUTE', '\'');
define('UNIT_SECOND', '"');
define('UNIT_METER', 'm');
define('UNIT_KILOMETER', 'km');
define('UNIT_FEET', 'f');
define('LABEL_LNG', 'Kinh = ');
define('LABEL_LAT', 'Vĩ = ');
define('LABEL_X', 'X = ');
define('LABEL_Y', 'Y = ');
define('LABEL_ZONE', 'Múi = ');
define('LABEL_HEMI', 'Bán cầu = ');
define('LABEL_CONVERGENCE', 'Hội tụ = ');
define('LABEL_CSV', 'CSV:');
define('LABEL_FORMAT', 'Định dạng:');
define('OPTION_E', 'Đ');
define('OPTION_W', 'T');
define('OPTION_N', 'B');
define('OPTION_S', 'N');
define('UNIT_DEGREE_EAST', UNIT_DEGREE.OPTION_E);
define('UNIT_DEGREE_NORTH', UNIT_DEGREE.OPTION_N);
define('OPTION_DMS', 'Độ. phút. giây.');
define('OPTION_DM', 'Độ. phút.');
define('OPTION_DD', 'Độ thập phân');
define('OPTION_NORTH', 'Bắc');
define('OPTION_SOUTH', 'Nam');
define('OPTION_CSV', 'CSV');
define('OPTION_MANUAL', 'Thủ công');
define('OPTION_M', 'Mét');
define('OPTION_KM', 'Ki-lô-mét');
define('OPTION_F', 'Chân');

define('TAB_TITLE_1', 'Hướng');
define('TAB_TITLE_2', 'Chi tiết.');
define('DRAG_ME', 'Kéo-Thả!');
define('NEW_SYSTEM_ADDED', 'Hệ tọa độ mới đã được thêm vào hệ thống. Bạn có thể tìm theo tên  ');
define('CRS_ALREADY_EXISTS', 'Hệ tọa độ bạn đang thêm vào đã có trong TWCC. Bạn có thể tìm nó trong danh sách sau: ');
define('ELEVATION', 'Độ cao:');
define('ADDRESS', 'Địa chỉ:');
define('ZOOM', 'Phóng');
define('NO_ADDR_FOUND', 'Không tìm thấy địa chỉ.');
define('GEOCODER_FAILED', 'Geocode không thành công vì: ');

define('CREDIT', 'Bản quyền:');
define('HOSTING', 'Hosting:');
define('CONSTANTS', 'Tham số:');
define('LIBRARIES', 'Thư viện:');
define('MAPS', 'Bản đồ:');
define('GO', 'Đi!');
define('SEARCH_BY_ADDRESS', 'Tìm theo địa chỉ:');
define('HOME', 'Trang chủ');
define('ABOUT', 'Thông tin về TWCC');
define('CONTACT_US', 'Liên hệ');
define('DONATE', 'Quyên góp');
define('WE_NEED_YOU','Chúng tôi cần trợ giúp!');
define('SUPPORT_TEXT','Chúng tôi dựa vào sự hỗ trợ hào phóng của người dùng TWCC để tiếp tục duy trì và cải thiện website miễn phí này');
define('HOW_WE_PLAN','Chúng tôi sử dụng nguồn tiền hỗ trợ như thế nào:<br><ul>
<li>Thiết kế giao REST API cho thiết bị di động, smartphone và máy tính bảng.</li>
<li class="wip">Thiết kế giao diện cho thiết bị di động, smartphone và máy tính bảng.</li>
<li class="done">Thuê một máy chủ để cung cấp dịch vụ được nhanh hơn và tốt hơn.</li>
</ul>');
define('LAST_5_DONORS','Cảm ơn các nhà tài trợ!<br>Danh sách 5 nhà tài trợ mới nhất:');
define('DO_NOT_SHOW_AGAIN', 'Không hiển thị thông báo này một lần nữa.');
define('GIT_COMMITS_LINK', '<a target="_blank" href="https://github.com/ClemRz/TWCC/commits/master" title="GitHub">%s</a>');
define('CHANGELOG', sprintf(GIT_COMMITS_LINK, '<img src="'.DIR_WS_IMAGES.'github_32.png" alt="Git" width="32" height="32">'));
define('SELECT_YOUR_LANGUAGE', 'Ngôn ngữ: ');

define('HELP', 'Trợ giúp');
define('CLOSE', 'Đóng');
define('HELP_1', 'Chọn hệ tọa độ cho dữ liệu của bạn.');
define('HELP_2', 'Chọn hệ tọa độ bạn muốn chuyển.');
define('HELP_3', 'Nhập tọa độ của bạn.</p>
								<div><b>hoặc</b></div>
								<p>nhấp chuột lên bản đồ.</p>
								<div><b>hoặc</b></div>
								<p>kéo và thả marker.</p>
								<div><b>hoặc</b></div>
								<p>nhập địa chỉ trên thanh tìm kiếm.');
define('HELP_4', 'Bấm để tiến hành chuyển đổi.');
define('PREVIOUS', 'Trước');
define('NEXT', 'Tiếp');
define('FINISH', 'Hoàn thành!');
define('LOADING', 'Đang tải, vui lòng đợi...');
define('YOU_CANT_FIND', 'Bạn không tìm thấy hệ tọa độ cần tìm trong danh mục?');
define('UNDEFINED_TITLE', 'Tiêu đề chưa được đặt');
define('CONVERT', 'Chuyển đổi');
define('SYSTEM_DEFINITION', 'Định nghĩa hệ thống');

define('OPTIONS', 'Tùy chọn:');
define('MODE', 'Chế độ:');
define('CONVENTION_TITLE', 'ước');
define('CONVENTION', CONVENTION_TITLE.' <a href="" title="'.HELP.'" class="convention">[?]</a>:');
define('SURVEY', 'Survey');
define('GAUSS_BOMFORD', 'Gauss-Bomford');
define('AUTO_ZOOM', 'Tự động zoom:');
define('PRINT_CURRENT_MAP', 'In bản đồ:');
define('FULL_SCREEN', 'Toàn màn hình:');

define('CUSTOM_SYSTEM', 'Hệ tọa độ tùy biến');
define('SEARCH_SYSTEM', 'Tìm kiếm <span class="underlined"><a href="'.DIR_WS_IMAGES.'snippet_proj4js_format.png" class="snippet">Proj4js</a></span> format on <span class="underlined">Spatial Reference</span>:');
define('SEARCH_EXAMPLE', 'Ví dụ: European Datum 1950');
define('SEARCH', 'Tìm kiếm!');
define('COME_BACK', '<span class="underlined">Quay lại</span> và khai báo một hệ tọa độ mới <span class="underlined">TWCC</span>:');
define('SYSTEM_EXAMPLE', '<a href="" class="toggle-next">Ví dụ...</a>
													<ul style="display:none;" class="toogle-me"><li>+title=ED 1950 (Deg) +proj=longlat +ellps=intl +no_defs</li>
													<li>EPSG:4326</li>
													<li>ESRI:37231</li>
													<li>IAU2000:29901</li>
													<li>SR-ORG:38</li>
													<li>IGNF:RRAF91</li></ul>');
define('ADD', 'Add!');
define('FREQUENT_USE', 'Bạn có sử dụng hệ này thường xuyên không?<br>Hãy liên lạc với chúng tôi để bổ sung nó vào cơ sở dữ liệu của TWCC!');

define('DO_RESEARCH', 'Tìm kiếm');
define('CLOSE_ON_SELECT', 'Đóng lựa chọn');
define('RESEARCH', 'Tìm kiếm nâng cao');
define('RESEARCH_FORM', 'Tìm kiếm');
define('CRS_CODE', 'Mã');
define('CRS_NAME', 'Tên (dùng kí tự % để đánh dấu tất cả)');
define('CRS_COUNTRY', 'Quốc gia');
define('OPTN_ALL', 'Tất cả');
define('RESULT', 'Kết quả tìm kiếm');
define('RESULT_EMPTY', 'Không tìm thấy hệ tọa độ nào theo yêu cầu của bạn');
define('RESULT_FIRST', 'Xin hãy chọn ít nhất một yêu cầu, sau đó nhấp chuột vào đó ');

define('PLEASE_FILL_FORM', 'Vui lòng điền vào các ô phía dưới.');
define('EMAIL', 'E-mail:');
define('MESSAGE', 'Nội dung:');
define('SEND_MESSAGE', 'Gửi');
define('MESSAGE_SENT', "Cảm ơn!\\n\\rThư của bạn đã được gửi.\\n\\rChúng tôi sẽ xem xét ngay khi có thể.");
define('MESSAGE_NOT_SENT', 'Xin lỗi, Thư của bạn chưa gửi được.\\n\\rXin hãy thử lại lần nữa.\\n\\rErr. code ');
define('MESSAGE_WRONG_EMAIL', 'Bạn nhập sai địa chỉ email.\\n\\rXin vui lòng thử lại.');

define('W3C_HTML', '<a href="http://validator.w3.org/check?uri=referer" title="W3C HTML 5 compliant" target="_blank"><img src="http://www.w3.org/Icons/valid-xhtml10-blue.png" alt="W3C XHTML 1.0 compliant" style="border:0px none;height:15px;"></a>');
define('ABOUT_CONTENT', '<h2>TWCC là gì?</h2>
					<p>TWCC, "The World Coordinate Converter", là '.sprintf(GIT_COMMITS_LINK, '<img src="'.DIR_WS_IMAGES.'opensource_32.png" alt="" width="32" height="32"><i>Open Source</i>').' công cụ chuyển đổi trực tuyến giữa nhiều hệ tọa độ với nhau.</p>
					<p>Đã có một số công cụ có cùng chức năng này, nhưng TWCC có một số đặc điểm riêng:</p>
					<ul><li>Đây là công cụ <b>trực quan và dễ dàng</b> trong việc sử dụng</li>
					<li>The possibility to add user-defined systems and the use of an interactive map make it <b>flexible</b>.</li>
					<li><b>Không cần cài đặt</b>, điều kiện duy nhất là bạn phải có Internet.</li>
					<li>TWCC <b>tương thích</b> với tất cả các môi trường (Mac, Linux, Windows...). '.W3C_HTML.'</li>
					<li>TWCC<b>hoàn toàn MIỄN PHÍ</b> và sử dụng giấy phép Affero GNU: '.APPLICATION_LICENSE.'</li></ul>
					<p>TWCC được xây dựng bởi <a href="" class="contact" title="'.CONTACT_US.'">Clément Ronzon</a> theo nghiên cứu và phát triền được tiến hành cho <a href="http://www.grottocenter.org/" target="_blank">GrottoCenter.org</a>.</p>
					<p>Đặc biệt cảm ơn tới: Roland Aigner, Alessandro Avaro, Leszek Pawlowicz, Lê Viết Thanh.</p>
					<p>Nếu bạn có thắc mắc hay đề nghị, vui lòng <b>liên hệ</b> chúng tôi.</p>
					<p>Bạn có thể quyên góp để<b>hỗ trợ cho chương trình này</b>.</p>');

define('PROJECTION', 'Phép chiếu:');
define('UNITS', 'Đơn vị:');
define('DATUM', 'Datum:');
define('NAME', 'Tên:');
define('NAD_GRIDS', 'NAD Grids:');
define('ELLIPSOID', 'Ê-líp-sô-ít:');
define('SEMIMAJOR_RADIUS', 'Bán trục lớn:');
define('SEMIMINOR_RADIUS', 'Bán trục nhỏ:');
define('INVERSE_FLATTENING', 'Độ dẹt (nghịch đảo):');
define('CENTRAL_LATITUDE', 'Kinh tuyến trục:');
define('STANDARD_PARALLEL_1', 'Vĩ tuyến chuẩn 1:');
define('STANDARD_PARALLEL_2', 'Vĩ tuyến chuẩn 2:');
define('USED_IN_MERC_AND_EQC', 'Used in merc and eqc:');
define('CENTRAL_LONGITUDE', 'Kinh tuyến trục:');
define('FOR_SOMERC_PROJECTION', 'For somerc projection:');
define('FALSE_EASTING', 'False easting:');
define('FALSE_NORTHING', 'False northing:');
define('PROJECTION_SCALE_FACTOR', 'Hệ số tỉ lệ phép chiếu:');
define('SPHERE_AREA_OF_ELLIPSOID', 'Sphere - area of ellipsoid:');
define('TOWARD_WGS84_SCALING', 'Toward WGS84 scaling:');
define('CARTESIAN_SCALING', 'Cartesian scaling:');
define('FROM_GREENWICH_SCALING', 'From Greenwich scaling:');

define('COORDINATE_REFERENCE_SYSTEMS', 'Hệ tọa độ');

define('DIRECT_LINK', 'Liên kết trực tiếp');
define('COPY_TO_CLIPBOARD', 'Sao chép vào clipboard');

define('ERROR_CONTACT_US', 'Lỗi #%s. Xin vui lòng liên hệ với chúng tôi.');

define('POLL', 'Thăm dò ý kiến người dùng');
define('S_POLL', 'Thăm dò ý kiến');
define('RATE', 'Đánh giá');
define('PLEASE_TAKE_A_MOMENT', 'Thăm dò, phần thứ hai.'); //Xin vui lòng đợi 30 giây!');
define('AVERAGE_RATING', 'Tỉ lệ đánh giá: %s</span> từ %s <span class="reviewcount"> phiếu');
define('ITEM_NAME_1', 'Bạn có hay ghé thăm TWCC không ?');
define('ITEM_LABELS_1', 'Lần đầu tiên|6 tháng|3 tháng|hàng tháng|hàng tuần');
define('ITEM_NAME_2', 'Vui lòng đánh giá TWCC');
define('ITEM_LABELS_2', 'Kém|Kha khá|Tốt|Rất tốt|Xuất Sắc');
define('ITEM_NAME_3', 'Bạn có muốn một phiên bản TWCC dành cho di động?');
define('ITEM_LABELS_3', 'Không quan tâm|Tại sao không nhỉ?|Có cũng được|Có|Thực sự nên có');
define('ITEM_NAME_4', 'Bạn sẵn lòng bỏ bao nhiêu tiền để có TWCC cho chiếc điện thoại của mình?');
define('ITEM_LABELS_4', '&lt;$1|từ $1 đến $5|từ $5 đến $10|từ $10 đến $50|&gt;$50');
define('ITEM_NAME_5', 'Bạn đang sử dụng loại điện thoại nào?');
define('ITEM_LABELS_5', 'Khác|Windows Mobile|Blackberry|Android|iPhone');
define('RATER_ERROR_MAX', 'Bạn đã đánh giá xong. Bạn đã được phép % đánh giá.');
define('RATER_ERROR_EMPTY', 'Bạn chưa chọn mức độ đánh giá.');
define('RATER_THANKS', 'Cảm ơn bạn đã hoàn thành cuộc thăm dò.');
define('THIS_ITEM', 'đối tượng này');
define('LEAVE_A_COMMENT', 'Để lại một bình luận...');
define('POLL_COMMENTS', 'Kết quả lần thăm dò trước cho thấy hầu hết người dùng TWCC đều muốn có một phiên bản chạy trên điện thoại di động. Xin vui lòng dành ra 5 giây để trả lời thăm dò lần này.');

define('LENGTH', 'Chiều dài:');
define('AREA', 'Diện tích:');
define('MAGNETIC_DECLINATION', 'Chênh lệch từ');

define('FACEBOOK', 'TWCC trên Facebook');

define('LOGOUT', 'Déconnexion');
define('LOG_IN', 'Connexion');
define('SIGN_UP', 'M\'inscrire');
define('MY_ACCOUNT', 'Mon compte');

define('ALL_FIELDS_REQUIRED', 'All form fields are required.');
define('REG_NAME', 'Name');
define('REG_EMAIL', 'Email');
define('REG_PASSWORD', 'Password');
define('CHECK_NAME', 'Username may consist of a-z, 0-9, underscores, whitespaces, begin with a letter.');
define('CHECK_EMAIL', 'eg. my.name@gmail.com');
define('CHECK_PASSWORD', 'Password field only allow : a-z 0-9');
define('CHECK_LENGTH', 'Length of %n must be between %min and %max.');
define('CHECK_UNICITY', 'A user with this email already exists.');

define('LOG_EMAIL', 'Email');
define('LOG_PASSWORD', 'Password');

define('LOOKING_FOR_TRANSLATOR', 'Chúng tôi cần sự giúp đỡ của bạn để dịch TWCC trong các ngôn ngữ sau:
<ul><li><img src="'.DIR_WS_IMAGES.'flags/PH.png" alt=""> Philippin</li></ul>
Nếu bạn quan tâm, xin vui lòng liên <a href="#" title="contact" class="contact">hệ với chúng tôi</a>.');
?>
