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
	Translated to Arabic by Ahmed Qatar - eleceng4ever[at]hotmail.com
	

*/

define('DIR', 'rtl');
define('LOCALE', 'fr_FR');
define('PAYPAL_LOCALE', 'fr_FR');
define('GOOGLE_PLUS_LOCALE', 'fr');
@setlocale(LC_TIME, LOCALE.'.UTF8');
if (isset($_SERVER['SystemRoot']) && (preg_match('%windows%i', $_SERVER['SystemRoot']) || preg_match('%winnt%i', $_SERVER['SystemRoot']))) @setlocale(LC_TIME, 'العربية'); // Page de code pour serveur sous Windows (installation locale)
define('DATE_FORMAT_LONG', '%A %d %B, %Y');

define('APPLICATION_TITLE', 'The World Coordinate Converter');
define('APPLICATION_TITLE_BIS', '');
define('APPLICATION_TITLE_TER', '');
define('TRANSLATE', 'ترجمة');
define('APPLICATION_DESCRIPTION', 'TWCC, The World Coordinate Converter هي أداة لتحويل الاحداثيات الجغرافية بين عدة أنظمة مرجعية.');
define('LANGUAGE_CODE', 'ar');
define('APPLICATION_LICENSE', '<a href="https://www.gnu.org/licenses/agpl-3.0.'.LANGUAGE_CODE.'.html" target="_blank" title="AGPL">AGPL</a>');

define('WORLD', 'العالم');
define('UNIT_DEGREE', '°');
define('UNIT_MINUTE', '\'');
define('UNIT_SECOND', '"');
define('UNIT_METER', 'م');
define('UNIT_KILOMETER', 'كم');
define('UNIT_FEET', 'ق');
define('LABEL_LNG', 'Lng = ');
define('LABEL_LAT', 'Lat = ');
define('LABEL_X', 'س = ');
define('LABEL_Y', 'ص = ');
define('LABEL_ZONE', 'نطاق = ');
define('LABEL_HEMI', 'هيميسفير = ');
define('LABEL_CONVERGENCE', 'إلتقاء = ');
define('LABEL_CSV', 'CSV:');
define('LABEL_FORMAT', 'تهيئة:');
define('OPTION_E', 'شرق');
define('OPTION_W', 'غرب');
define('OPTION_N', 'شمال');
define('OPTION_S', 'جنوب');
define('UNIT_DEGREE_EAST', UNIT_DEGREE.OPTION_E);
define('UNIT_DEGREE_NORTH', UNIT_DEGREE.OPTION_N);
define('OPTION_DMS', 'درج. دقي. ثان.');
define('OPTION_DM', 'درج. دقي.');
define('OPTION_DD', 'درج. درجات');
define('OPTION_NORTH', 'شمال');
define('OPTION_SOUTH', 'جنوب');
define('OPTION_CSV', 'CSV');
define('OPTION_MANUAL', 'يدوي');
define('OPTION_M', 'أمتار');
define('OPTION_KM', 'كيلو مترات');
define('OPTION_F', 'أقدام');

define('TAB_TITLE_1', 'اتجاه');
define('TAB_TITLE_2', 'معلومات اضافية.');
define('DRAG_ME', 'اسحبني!');
define('NEW_SYSTEM_ADDED', 'تم اضافة النظام الجديد, يمكنك العثور عليه بإسم ');
define('CRS_ALREADY_EXISTS', 'النظام الذي تود اضافته موجود في TWCC. يمكنك البحث عنه في القوائم المنسدلة تحت:');
define('ELEVATION', 'ارتفاع:');
define('ADDRESS', 'عنوان:');
define('ZOOM', 'تكبير');
define('NO_ADDR_FOUND', 'لم يتم العثور على العنوان.');
define('GEOCODER_FAILED', 'لم ينجح ال Geocode للسبب التالي: ');

define('CREDIT', 'إئتمان:');
define('HOSTING', 'استضافة:');
define('CONSTANTS', 'ثوابت:');
define('LIBRARIES', 'مكتبات:');
define('MAPS', 'خرائط:');
define('GO', 'نفّذ!');
define('SEARCH_BY_ADDRESS', 'بحث عن...');
define('HOME', 'منزل');
define('ABOUT', 'TWCC حول');
define('CONTACT_US', 'اتصل بنا');
define('DONATE', 'تبرع');
define('WE_NEED_YOU','نحن بحاجة لمساعدتك!');
define('SUPPORT_TEXT','نعتمد على الدعم السّخي من مستخدمي TWCC للاستمرار في تطوير و ادارة هذا الموقع المجاني.<br>أموالك تخلق فرقا و دعما اليوم.');
define('HOW_WE_PLAN','كيف نخطط الاستخدام التمويل:<br><ul>
<li class="wip">تصميم واجهة للهواتف النقالة, الهواتف الذكية و اللوحية.
<br>Feel free to send us your feedback on the <a href="/m/ar">beta version</a>!</li>
<li class="done">تصميم REST API للهواتف النقالة, الهواتف الذكية و اللوحية.</li>
<li class="done">استئجار خادم جديد لتقديم خدمة أفضل و أسرع.</li>
</ul>');
define('LAST_5_DONORS','شكرا للمتبرعين!<br>لائحة بآخر خمسة متبرعين:');
define('DO_NOT_SHOW_AGAIN', 'لا تُظهر هذه الرسالة ثانية.');
define('GIT_COMMITS_LINK', '<a target="_blank" href="https://github.com/ClemRz/TWCC/commits/master" title="GitHub">%s</a>');
define('CHANGELOG', sprintf(GIT_COMMITS_LINK, '<img src="'.DIR_WS_IMAGES.'github_32.png" alt="Git" width="32" height="32">'));
define('SELECT_YOUR_LANGUAGE', 'اللغات: ');

define('PLEASE_DISABLE_YOUR_ADBLOCK', 'رجاءا قم بتعطيل AdBlock');

define('HELP', 'مساعدة');
define('CLOSE', 'إغلاق');
define('HELP_1', 'اختر نظام مرجعي لبياناتك.');
define('HELP_2', 'اختر وجهة النظام المرجعي.');
define('HELP_3', 'أدخل احداثيات موقعك.</p>
								<div><b>أو</b></div>
								<p>Cاضغط على الخريطة.</p>
								<div><b>أو</b></div>
								<p>اسحب المؤشر ثم اسقطه.</p>
								<div><b>أو</b></div>
								<p>ادخل عنوانا في خانة البحث أعلاه.');
define('HELP_4', 'اضغط لتحويل احداثيات موقعك.');
define('PREVIOUS', 'السابق');
define('NEXT', 'التالي');
define('FINISH', 'انتهى!');
define('LOADING', 'جاري تحميل, يرجى التريث و الإنتظار...');
define('YOU_CANT_FIND', 'هل عثرت / لم تعثر على نظامك المرجعي ضمن اللائحة?');
define('UNDEFINED_TITLE', 'عنوان غير معرّف');
define('CONVERT', 'حوّل');
define('SYSTEM_DEFINITION', 'تعريف النظام');

define('OPTIONS', 'خيارات:');
define('MODE', 'نمط:');
define('CONVENTION_TITLE', 'طريقة العرض');
define('CONVENTION', CONVENTION_TITLE.' <a href="" title="'.HELP.'" class="convention">[?]</a>:');
define('SURVEY', 'مسح');
define('GAUSS_BOMFORD', 'جاوس بومفورد');
define('AUTO_ZOOM', 'تقريب تلقائي:');
define('PRINT_CURRENT_MAP', 'اطبع الخريطة:');
define('FULL_SCREEN', 'ملئ الشاشة:');

define('CUSTOM_SYSTEM', 'نظام مرجع مخصص');
define('SEARCH_SYSTEM', 'البحث عن <span class="underlined"><a href="'.DIR_WS_IMAGES.'snippet_proj4js_format.png" class="snippet">Proj4js</a></span> تهيئة على <span class="underlined">مصدر حيزي</span>:');
define('SEARCH_EXAMPLE', 'مثال: European Datum 1950');
define('SEARCH', 'بحـث!');
define('COME_BACK', '<span class="underlined">Come-back</span> و اضافة معرف النظام المرجعي إلى <span class="underlined">TWCC</span>:');
define('SYSTEM_EXAMPLE', '<a href="" class="toggle-next">امثلة...</a>
													<ul style="display:none;" class="toogle-me"><li>+title=ED 1950 (Deg) +proj=longlat +ellps=intl +no_defs</li>
													<li>EPSG:4326</li>
													<li>ESRI:37231</li>
													<li>IAU2000:29901</li>
													<li>SR-ORG:38</li>
													<li>IGNF:RRAF91</li></ul>');
define('ADD', 'أضِف!');
define('FREQUENT_USE', 'هل تستخدم النظام بشكل متكرر؟<br>تواصل معنا و سنضيف النظام إلى TWCC بشكل دائم!');

define('DO_RESEARCH', 'البحث');
define('CLOSE_ON_SELECT', 'تركيز على إختيار');
define('RESEARCH', 'بحث متقدم');
define('RESEARCH_FORM', 'ابحث من');
define('CRS_CODE', 'رمز');
define('CRS_NAME', 'اسم (استخدم الرمز %  كبديل)');
define('CRS_COUNTRY', 'بلاد');
define('OPTN_ALL', 'الكل');
define('RESULT', 'نتائج البحث');
define('RESULT_EMPTY', 'لم يطابق بحثك أي من الانظمة');
define('RESULT_FIRST', 'يرجى ادخال محور بحث واحد على الأقل, ثم اضغط على ');

define('PLEASE_FILL_FORM', 'يرجى ملئ كاقة الخانات أدناه.');
define('EMAIL', 'البريد:');
define('MESSAGE', 'الرسالة:');
define('SEND_MESSAGE', 'إرسال');
define('MESSAGE_SENT', "شكرا لك!\\n\\rYتم ارسال رسالتك.\\n\\rسنضع رسالتك في الحسبان في اقرب فرصة.");
define('MESSAGE_NOT_SENT', 'نعتذر, لم يتم ارسال رسالتك.\\n\\rرجاءا حاول مرة اهرى.\\n\\rErr. رمز ');
define('MESSAGE_WRONG_EMAIL', 'يبدو أن البريد الذي كتبته خاطئ.\\n\\rPيرجى إعادة المحاولة.');

define('W3C_HTML', '<a href="https://validator.w3.org/check?uri=referer" title="W3C HTML 5 compliant" target="_blank"><img src="https://www.w3.org/Icons/valid-xhtml10-blue.png" alt="W3C XHTML 1.0 compliant" style="border:0px none;height:15px;"></a>');
define('ABOUT_CONTENT', '<h2>ما هو TWCC?</h2>
					<p>TWCC, "The World Coordinate Converter", هو '.sprintf(GIT_COMMITS_LINK, '<img src="'.DIR_WS_IMAGES.'opensource_32.png" alt="" width="32" height="32"><i>Open Source</i>').' أداة لتحويل شريحة واسعة من أنظمة موارد الأحداثيات من نظام لآخر.</p>
					<p>هناك عدة أدوات لتحويل الاحداثيات , لكن هنا تكمن قوة TWCC:</p>
					<ul><li>هذه الأداة <b>بديهية و سهلة</b> الاستخدام.</li>
					<li>امكانية إضافة أنظمة مخصصة و استخدام خريطة تفاعلية يجعلها <b>مرنة</b>.</li>
					<li><b>لا تحميل</b> أو تنصيب مخصص مطلوب, كل ما تحتاجه هو اتصال بالانترنت.</li>
					<li>TWCC <b>متوافق</b> مع أغلب المنصات (ماك, لينوكس, ويندوز...). '.W3C_HTML.'</li>
					<li>TWCC <b>مجاني تماما</b> و مرخص برخصة Affero GNU: '.APPLICATION_LICENSE.'</li></ul>
					<p>TWCC مصمم بواسطة <a href="" class="contact" title="'.CONTACT_US.'">Clément Ronzon</a> متبوعا بالبحث و التطوير بواسطة<a href="https://www.grottocenter.org/" target="_blank">GrottoCenter.org</a>.</p>
					<p>شكر خاص لكل من: Roland Aigner, Alessandro Avaro, Leszek Pawlowicz, Lê Viết Thanh, Ahmed Qatar.</p>
					<p>لأي اسئلة أو قتراحات يرجى <b>التواصل معنا</b>.</p>
					<p>يمكنك التبرع لـ <b>دعم هذه المبادرة</b>.</p>');

define('PROJECTION', 'إسقاط:');
define('UNITS', 'وحدات:');
define('DATUM', 'Datum:');
define('NAME', 'إسم:');
define('NAD_GRIDS', 'شبكات NAD :');
define('ELLIPSOID', 'بيضاوي:');
define('SEMIMAJOR_RADIUS', 'نصف قطر رئيسي:');
define('SEMIMINOR_RADIUS', 'نصف قطر شبه رئيسي:');
define('INVERSE_FLATTENING', 'التسطيح العكسي:');
define('CENTRAL_LATITUDE', 'خط العرض المركزي:');
define('STANDARD_PARALLEL_1', 'موازاة قياسية 1:');
define('STANDARD_PARALLEL_2', 'موازاة قياسية 2:');
define('USED_IN_MERC_AND_EQC', 'يستخدم في merc و eqc:');
define('CENTRAL_LONGITUDE', 'خط الطول المركزي:');
define('FOR_SOMERC_PROJECTION', 'لإسقاط somerc :');
define('FALSE_EASTING', 'تصحيح الشرق:');
define('FALSE_NORTHING', 'تصحيح الشمال:');
define('PROJECTION_SCALE_FACTOR', 'معامل مقياس الإسقاط:');
define('SPHERE_AREA_OF_ELLIPSOID', 'كروي - مساحة المساحة البيضاوية:');
define('TOWARD_WGS84_SCALING', 'إلى تدريج WGS84:');
define('CARTESIAN_SCALING', 'تدريج ديكارتي:');
define('FROM_GREENWICH_SCALING', 'من تدريج غرينتش:');

define('COORDINATE_REFERENCE_SYSTEMS', 'انظمة مرجع الاحداثيات');

define('DIRECT_LINK', 'رايط مباشر');
define('COPY_TO_CLIPBOARD', 'نسخ إلى الحافظة');

define('ERROR_CONTACT_US', 'خطأ #%s. يرجى التواصل معنا.');

define('POLL', 'استطلاع رضا المستخدم');
define('S_POLL', 'استطلاع');
define('RATE', 'تقييم');
define('PLEASE_TAKE_A_MOMENT', 'الإستطلاع, القسم الثاني.');
define('AVERAGE_RATING', 'متوسط التقييم : %s</span> بـ <span class="reviewcount"> %s تصويت');
define('ITEM_NAME_1', 'هل تعاود زيارة TWCC قريبا?');
define('ITEM_LABELS_1', 'أول زيارة|حوْلي|ربعي|شهري|اسبوعي');
define('ITEM_NAME_2', 'رجاءا قيّم TWCC');
define('ITEM_LABELS_2', 'ضعيف|لا بأس|جيد|جيد جدا|ممتاز');
define('ITEM_NAME_3', 'أترغب بنسخة من TWCC للهاتف النقال؟');
define('ITEM_LABELS_3', 'غير مهتم|لم لا|سيكون أمرا لطيفا|نعم|موافق بقوة');
define('ITEM_NAME_4', 'ما المبلغ الذي تنوي دفعه للحصول على تطبيق TWCC للهاتف النقال ؟');
define('ITEM_LABELS_4', '&lt;$1|من $1 إلى $5|من $5 إلى $10|من $10 إلى $50|&gt;$50');
define('ITEM_NAME_5', 'ما نوع الهاتف النقال الذي تستخدمه?');
define('ITEM_LABELS_5', 'غير ذلك|ويندوز موبايل|بلاكبيري|أندرويد|آيفون');
define('RATER_ERROR_MAX', 'قمت سابقا بتقييم هذا العنصر. نسمح نحن بـ %s تصويت.');
define('RATER_ERROR_EMPTY', 'لم تختر قيمة التقييم.');
define('RATER_THANKS', 'شكرا على التصويت.');
define('THIS_ITEM', 'هذا العنصر');
define('LEAVE_A_COMMENT', 'اكتب تعليقا...');
define('POLL_COMMENTS', 'نتيجة الإستطلاع الاول تظهر أن أغلب مستخدمي TWCC يودون الحصول على تطبيق لهةاتفهم النقالة. نرجو منكم اعطاء 5 ثوان للاجابة على الإستطلاع الجديد.');

define('LENGTH', 'طـول:');
define('AREA', 'مساحة:');
define('MAGNETIC_DECLINATION', 'الإتجاه المغناطيسي');

define('FACEBOOK', 'TWCC على Facebook');

define('LOGOUT', 'تسجيل خروج');
define('LOG_IN', 'تسجيل دخول');
define('SIGN_UP', 'M\'تسجيل');
define('MY_ACCOUNT', 'حسابي');

define('ALL_FIELDS_REQUIRED', 'كل الخانات مطلوبة.');
define('REG_NAME', 'الإسم');
define('REG_EMAIL', 'البريد');
define('REG_PASSWORD', 'كلمة السر');
define('CHECK_NAME', 'إسم المستخدم ممكن ان يتكون من حروف و أرقام , الشُرط السفلية, مسافات, يبدأ بحرف ما.');
define('CHECK_EMAIL', 'مثلا. my.name@gmail.com');
define('CHECK_PASSWORD', 'كلمة السر تحوي فقط حروف و أرقام : a-z 0-9');
define('CHECK_LENGTH', 'طول %n يجب أن يكون بينn %min و %max.');
define('CHECK_UNICITY', 'مستخدم ما بهذا البريد سجّل سابقا.');

define('LOG_EMAIL', 'البريد');
define('LOG_PASSWORD', 'كلمة السر');

define('WE_USE_COOKIES', 'هذا الموقع يستخدم الكوكيز');
define('WE_USE_COOKIES_DESCRIPTION', 'هذا الموقع يستخدم الكوكيز لإثراء خبرة المستخدم. بإستخدام موقعنا انت تقبل بكافة الكوكيز حسب سياسة الخصوصية.');
define('READ_MORE', 'اقرأ المزيد');

define('LOOKING_FOR_TRANSLATOR', 'نحتاج لترجمة TWCC إلى اللغات التالية:
<ul><li><img src="'.DIR_WS_IMAGES.'flags/PH.png" alt=""> الفلبينية</li></ul>
اذا كنت مهتما, يرجى <a href="#" title="contact" class="contact">التواصل معنا</a>.');
?>
