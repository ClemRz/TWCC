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
	Translated to Spanish by Clément Ronzon - clem.rz[at]gmail.com
	

*/

define('LOCALE', 'es_ES');
define('PAYPAL_LOCALE', 'es_ES');
define('GOOGLE_PLUS_LOCALE', 'es');
@setlocale(LC_TIME, LOCALE.'.UTF8');
if (isset($_SERVER['SystemRoot']) && (preg_match('%windows%i', $_SERVER['SystemRoot']) || preg_match('%winnt%i', $_SERVER['SystemRoot']))) @setlocale(LC_TIME, 'spanish'); // Page de code pour serveur sous Windows (installation locale)
define('DATE_FORMAT_LONG', '%A %d %B, %Y');

define('APPLICATION_TITLE', 'The World Coordinate Converter');
define('APPLICATION_TITLE_BIS', '<sup>*</sup>');
define('APPLICATION_TITLE_TER', '*El convertidor de coordenadas universal');
define('TRANSLATE', 'Traducir');
define('APPLICATION_DESCRIPTION', 'TWCC, El convertidor de coordenadas universal es una herramienta para convertir coordenadas geodésicas que cubre una amplia gama de sistemas de referencia.');
define('LANGUAGE_CODE', 'es');
define('APPLICATION_LICENSE', '<a href="http://www.gnu.org/licenses/agpl-3.0.'.LANGUAGE_CODE.'.html" target="_blank" title="AGPL">AGPL</a>');

define('WORLD', 'Mundo');
define('UNIT_DEGREE', '°');
define('UNIT_MINUTE', '\'');
define('UNIT_SECOND', '"');
define('UNIT_METER', 'm');
define('UNIT_KILOMETER', 'km');
define('UNIT_FEET', 'p');
define('LABEL_LNG', 'Lng = ');
define('LABEL_LAT', 'Lat = ');
define('LABEL_X', 'X = ');
define('LABEL_Y', 'Y = ');
define('LABEL_ZONE', 'Zona = ');
define('LABEL_HEMI', 'Hemisferio = ');
define('LABEL_CONVERGENCE', 'Convergencia = ');
define('LABEL_CSV', 'CSV:');
define('LABEL_FORMAT', 'Formato:');
define('OPTION_E', 'E');
define('OPTION_W', 'O');
define('OPTION_N', 'N');
define('OPTION_S', 'S');
define('UNIT_DEGREE_EAST', UNIT_DEGREE.OPTION_E);
define('UNIT_DEGREE_NORTH', UNIT_DEGREE.OPTION_N);
define('OPTION_DMS', 'Grad. min. seg.');
define('OPTION_DM', 'Grad. min.');
define('OPTION_DD', 'Grad. decimales');
define('OPTION_NORTH', 'Norte');
define('OPTION_SOUTH', 'Sur');
define('OPTION_CSV', 'CSV');
define('OPTION_MANUAL', 'Manual');
define('OPTION_M', 'Metros');
define('OPTION_KM', 'Kilómetros');
define('OPTION_F', 'Pies');

define('TAB_TITLE_1', 'Dirección');
define('TAB_TITLE_2', 'Más info.');
define('DRAG_ME', 'Mueve me!');
define('NEW_SYSTEM_ADDED', 'El nuevo sistema se ha añadido, usted lo podrá encontrar bajo el nombre de ');
define('CRS_ALREADY_EXISTS', 'El sistema que está tratando de añadir ya está presente en TWCC. Se puede encontrar en las listas bajo: ');
define('ELEVATION', 'Elevación:');
define('ADDRESS', 'Dirección:');
define('ZOOM', 'Zoom');
define('NO_ADDR_FOUND', 'No dirección encontrada.');
define('GEOCODER_FAILED', 'Geocode no tuvo éxito por la siguiente razón: ');

define('CREDIT', 'Crédito:');
define('HOSTING', 'Alojamiento:');
define('CONSTANTS', 'Constantes:');
define('LIBRARIES', 'Bibliotecas:');
define('MAPS', 'Mapas:');
define('GO', 'Busca!');
define('SEARCH_BY_ADDRESS', 'Buscar por dirección:');
define('HOME', 'Índice del sitio');
define('ABOUT', 'Acerca de TWCC');
define('CONTACT_US', 'Contactos');
define('DONATE', 'Donar');
define('WE_NEED_YOU','Necesitamos su ayuda!');
define('SUPPORT_TEXT','Contamos con el apoyo generoso de los usuarios de TWCC para seguir manteniendo y mejorando este sitio web gratis.<br>Su dinero puede hacer la diferencia y apoyar el fondo hoy.');
define('HOW_WE_PLAN','Cómo se planea utilizar los fondos:<br><ul>
<li>Diseño de una interfaz para dispositivos móviles, teléfonos inteligentes y tabletas.</li>
<li><span style="color:#808080">Alquilar un nuevo servidor con el fin de prestar un servicio mejor y más rápido.</span></li>
</ul>');
define('LAST_5_DONORS','Gracias a los donantes!<br>Lista de los últimos cinco donantes:');
define('DO_NOT_SHOW_AGAIN', 'No volver a mostrar este mensaje de nuevo.');
define('GIT_COMMITS_LINK', '<a target="_blank" href="https://github.com/ClemRz/TWCC/commits/master" title="GitHub">%s</a>');
define('CHANGELOG', sprintf(GIT_COMMITS_LINK, '<img src="'.DIR_WS_IMAGES.'github_32.png" alt="Git" width="32" height="32">'));
define('SELECT_YOUR_LANGUAGE', 'Idioma: ');

define('HELP', 'Ayuda');
define('CLOSE', 'Cerrar');
define('HELP_1', 'Seleccione el sistema de referencia de sus datos.');
define('HELP_2', 'Seleccione el sistema de referencia de destino.');
define('HELP_3', 'Ingrese las coordenadas.</p>
								<div><b>O</b></div>
								<p>Haga clic en el mapa.</p>
								<div><b>O</b></div>
								<p>Arrastrar el icono en el mapa.</p>
								<div><b>O</b></div>
								<p>Ingrese una dirección en la barra de búsqueda.');
define('HELP_4', 'Presione el botón para convertir sus coordenadas.');
define('PREVIOUS', 'Anterior');
define('NEXT', 'Suigiente');
define('FINISH', 'Fin!');
define('LOADING', 'Cargando, por favor espere...');
define('YOU_CANT_FIND', 'Usted no puede encontrar su sistema de referencia?');
define('UNDEFINED_TITLE', 'Título no definido');
define('CONVERT', 'Convertir');
define('SYSTEM_DEFINITION', 'Definición del sistema');

define('OPTIONS', 'Opciones:');
define('MODE', 'Modo:');
define('CONVENTION_TITLE', 'Convención');
define('CONVENTION', CONVENTION_TITLE.' <a href="" title="'.HELP.'" class="convention">[?]</a>:');
define('SURVEY', 'Survey');
define('GAUSS_BOMFORD', 'Gauss-Bomford');
define('AUTO_ZOOM', 'Zoom automático:');
define('PRINT_CURRENT_MAP', 'Imprimir el mapa:');
define('FULL_SCREEN', 'Pantalla completa:');

define('CUSTOM_SYSTEM', 'Sistema de referencia definido por el usuario');
define('SEARCH_SYSTEM', 'Buscar en el formato <span class="underlined"><a href="'.DIR_WS_IMAGES.'snippet_proj4js_format.png" class="snippet">Proj4js</a></span> en <span class="underlined">Spatial Reference</span>:');
define('SEARCH_EXAMPLE', 'Ej: European Datum 1950');
define('SEARCH', 'Buscar!');
define('COME_BACK', '<span class="underlined">Volver</span> y añadir la definición del nuevo sistema de referencia en <span class="underlined">TWCC</span>:');
define('SYSTEM_EXAMPLE', '<a href="" class="toggle-next">Ejemplos...</a>
													<ul style="display:none;" class="toogle-me"><li>+title=ED 1950 (Deg) +proj=longlat +ellps=intl +no_defs</li>
													<li>EPSG:4326</li>
													<li>ESRI:37231</li>
													<li>IAU2000:29901</li>
													<li>SR-ORG:38</li>
													<li>IGNF:RRAF91</li></ul>');
define('ADD', 'Añadir!');
define('FREQUENT_USE', 'Usted utiliza este sistema frecuentemente?<br>Contáctenos y lo añadiremos a TWCC de forma permanente!');

define('DO_RESEARCH', 'Buscar');
define('CLOSE_ON_SELECT', 'Cerrar automaticamente');
define('RESEARCH', 'Búsqueda avanzada');
define('RESEARCH_FORM', 'Formulario de búsqueda');
define('CRS_CODE', 'Código');
define('CRS_NAME', 'Nombre (use el carácter % como comodín)');
define('CRS_COUNTRY', 'País');
define('OPTN_ALL', 'Todos');
define('RESULT', 'Resultado de la búsqueda');
define('RESULT_EMPTY', 'No se han encontrado resultados para su búsqueda');
define('RESULT_FIRST', 'Por favor, introduzca al menos un criterio de búsqueda y haga clic en ');

define('PLEASE_FILL_FORM', 'Favor de llenar el formulario.');
define('EMAIL', 'Correo electrónico:');
define('MESSAGE', 'Mensage:');
define('SEND_MESSAGE', 'Enviar');
define('MESSAGE_SENT', 'Gracias!\\n\\rSu mensaje ha sido enviado.\\n\\rLo tomaremos en cuenta lo mas pronto posible.');
define('MESSAGE_NOT_SENT', 'Lo sentimos, su mensaje no ha sido enviado.\\n\\rPor favor intente otra vez.\\n\\rErr. code ');
define('MESSAGE_WRONG_EMAIL', 'El correo electrónico que usted ha entrado parece estar mal.\\n\\rPor favor intente otra vez.');

define('W3C_HTML', '<a href="http://validator.w3.org/check?uri=referer" title="W3C HTML 5 compliant" target="_blank"><img src="http://www.w3.org/Icons/valid-xhtml10-blue.png" alt="W3C XHTML 1.0 compliant" style="border:0px none;height:15px;"></a>');
define('ABOUT_CONTENT', '<h2>¿Qué es TWCC?</h2>
					<p>TWCC, "The World Coordinate Converter", que significa "El convertidor de coordenadas universal",
					es una herramienta '.sprintf(GIT_COMMITS_LINK, '<img src="'.DIR_WS_IMAGES.'opensource_32.png" alt="" width="32" height="32"><i>Open Source</i>').' para convertir coordenadas geodésicas que cubre una amplia gama de sistemas de referencia.</p>
					<p>Varias herramientas de conversión de coordenadas existen, sin embargo, lo que hace que la fuerza de TWCC es:</p>
					<ul><li>Esta herramienta es <b>intuitiva y fácil</b> de usar.</li>
					<li>La incorporación de sistemas definidos por el usuario y el uso de un mapa interactivo lo vuelven <b>flexible</b>.</li>
					<li><b>Ninguna descarga</b> o instalación especial se requiere, sólo es necesario tener una conexión a Internet.</li>
					<li>TWCC es <b>compatible</b> con la mayoría de los sistemas operativos (Mac, Linux, Windows...). '.W3C_HTML.'</li>
					<li>TWCC es <b>totalmente GRATUITO</b> y bajo la licencia Affero GNU: '.APPLICATION_LICENSE.'</li></ul>
					<p>TWCC fue elaborado por <a href="" class="contact" title="'.CONTACT_US.'">Clément Ronzon</a> después las investigaciones
					y desarrollos llevados a cabo para <a href="http://www.grottocenter.org/" target="_blank">GrottoCenter.org</a>.</p>
					<p>Un agradecimiento especial a: Roland Aigner, Alessandro Avaro, Leszek Pawlowicz, Lê Viết Thanh.</p>
					<p>Para preguntas o sugerencias, por favor <b>póngase en contacto</b> con nosotros.</p>
					<p>Usted puede <b>apoyar esta iniciativa</b> donando.</p>');

define('PROJECTION', 'Proyección:');
define('UNITS', 'Unidades:');
define('DATUM', 'Datum:');
define('NAME', 'Nombre:');
define('NAD_GRIDS', 'NAD Grids:');
define('ELLIPSOID', 'Elipsoide:');
define('SEMIMAJOR_RADIUS', 'radio de semi-principales:');
define('SEMIMINOR_RADIUS', 'Semi-radio menor de edad:');
define('INVERSE_FLATTENING', 'aplanamiento inversa:');
define('CENTRAL_LATITUDE', 'Central latitud:');
define('STANDARD_PARALLEL_1', 'Norma 1 en paralelo:');
define('STANDARD_PARALLEL_2', 'Norma 2 en paralelo:');
define('USED_IN_MERC_AND_EQC', 'Utilizado en merc y CCE:');
define('CENTRAL_LONGITUDE', 'Central de longitud:');
define('FOR_SOMERC_PROJECTION', 'Para la proyección somerc:');
define('FALSE_EASTING', 'Falso Easting:');
define('FALSE_NORTHING', 'Falso northing:');
define('PROJECTION_SCALE_FACTOR', 'Proyección factor de escala:');
define('SPHERE_AREA_OF_ELLIPSOID', 'Esfera - área de elipsoide:');
define('TOWARD_WGS84_SCALING', 'Hacia WGS84 escalado:');
define('CARTESIAN_SCALING', 'ampliación cartesiano:');
define('FROM_GREENWICH_SCALING', 'Ampliación de Greenwich:');

define('COORDINATE_REFERENCE_SYSTEMS', 'Sistemas de referencia');

define('DIRECT_LINK', 'Enlace directo');

define('ERROR_CONTACT_US', 'Error #%s. Por favor, contáctenos.');

define('POLL', 'Encuesta de satisfacción del usuario');
define('S_POLL', 'Encuesta');
define('RATE', 'Votar');
define('PLEASE_TAKE_A_MOMENT', 'Encuesta, segunda parte.');
define('AVERAGE_RATING', 'Prom.: %s</span> sobre <span class="reviewcount"> %s votos');
define('ITEM_NAME_1', '¿Viene con frecuencia en TWCC?');
define('ITEM_LABELS_1', 'Primera vez|Semestralmente|Trimestralmente|Mensualmente|Semanalmente');
define('ITEM_NAME_2', 'Por favor califica TWCC');
define('ITEM_LABELS_2', 'Pobre|Feria|Bueno|Muy bueno|Excelente');
define('ITEM_NAME_3', '¿Desea una versión móvil de TWCC?');
define('ITEM_LABELS_3', 'Sin interés|¿Por qué no?|Sería cool|Sí|Sí realmente');
define('ITEM_NAME_4', '¿Cuánto estaría dispuesto a pagar para tener TWCC en su teléfono móvil?');
define('ITEM_LABELS_4', '&lt;$1|entre $1 y $5|entre $5 y $10|entre $10 y $50|&gt;$50');
define('ITEM_NAME_5', '¿Qué tipo de teléfono móvil utiliza?');
define('ITEM_LABELS_5', 'Otro|Windows Mobile|Blackberry|Android|iPhone');
define('RATER_ERROR_MAX', 'Ya ha calificado este tema. Se le permitió %s voto(s).');
define('RATER_ERROR_EMPTY', 'No ha seleccionado un valor.');
define('RATER_THANKS', 'Gracias por votar.');
define('THIS_ITEM', 'este tema');
define('LEAVE_A_COMMENT', 'Dejar un comentario...');
define('POLL_COMMENTS', 'El resultado de la primera encuesta muestra que la mayoría de los usuarios de TWCC les gustaría tener una versión móvil de este en su teléfono. Por favor, tome 5 segundos para contestar a esta nueva encuesta.');

define('LENGTH', 'Longitud:');
define('AREA', 'Zona:');
define('MAGNETIC_DECLINATION', 'Declinación Magnética');

define('FACEBOOK', 'TWCC en Facebook');

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

define('LOOKING_FOR_TRANSLATOR', 'Estamos buscando a alguien para traducir TWCC a árabe! <br> Si usted está interesado, por favor <a href="#" title="contact" class="contact">póngase en contacto</a> con nosotros.');
?>
