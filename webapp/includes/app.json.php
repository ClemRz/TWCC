<?php //UNUSED
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
if (!IS_DEV_ENV) {
    require_once('application_top.php');
}
if(!headers_sent() && basename($_SERVER["REQUEST_URI"]) == basename(__FILE__)) {
    header('Content-Type: application/json, charset=utf-8');
}
?>
{
    "system": {
        "applicationNoreply": "<?php echo APPLICATION_NOREPLY; ?>",
        "dirWsImages": "<?php echo DIR_WS_IMAGES; ?>",
        "dirWsIncludes": "<?php echo DIR_WS_INCLUDES; ?>",
        "dirWsModules": "<?php echo DIR_WS_MODULES; ?>",
        "historyCookie": "<?php echo HISTORY_COOKIE; ?>",
        "historyLimit": <?php echo HISTORY_LIMIT; ?>,
        "httpServer": "<?php echo HTTP_SERVER; ?>",
        "preferencesCookie": "<?php echo PREFERENCES_COOKIE; ?>",
        "raterMasterSw": <?php echo RATER_MASTER_SW ? "true" : "false"; ?>,
        "timeout": <?php echo MAP_TIMEOUT_MS; ?>,
        "tokenName": "<?php echo TOKEN_NAME; ?>",
        "facebookEnabled": <?php echo USE_FACEBOOK ? "true" : "false"; ?>,
        "facebookAppId": "<?php echo FACEBOOK_KEY; ?>",
        "adsense": {
            "parameters": {
                "google_color_border": ["FFFFFF"],
                "google_color_bg": ["FFFFFF"],
                "google_color_link": ["000000"],
                "google_color_text": ["000000"],
                "google_color_url": ["808080"],
                "google_ui_features": "rc:6",
                "google_font_size": "account_default",
                "google_language": "<?php echo LANGUAGE_CODE; ?>"
            },
            "publisherId": "<?php echo ADSENSE_ID; ?>",
            "channelsId": {
                "adUnit": "<?php echo ADUNIT_CHANNEL; ?>"
            },
            "adsFormats": [
                "<?php echo MAP_AD_FORMAT_1; ?>",
                "<?php echo MAP_AD_FORMAT_2; ?>"
            ]
        },
    },
    "context": {
        "languageCode": "<?php echo LANGUAGE_CODE; ?>",
        "locale": "<?php echo LOCALE; ?>",
        "googlePlusLocale": "<?php echo GOOGLE_PLUS_LOCALE; ?>",
        "isDevEnv": <?php echo IS_DEV_ENV ? "true" : "false"; ?>,
        "aeDetectIe": <?php echo ae_detect_ie() ? "true" : "false"; ?>,
        "GET": {
            "isSetTmp": <?php echo isset($_GET['tmp']) ? "true" : "false"; ?>,
            "isSetNoDonate": <?php echo isset($_GET['nodonate']) ? "true" : "false"; ?>,
            "isSetGraticule": <?php echo isset($_GET['graticule']) ? "true" : "false"; ?>
        },
        "session": {
            "isLoggedIn": <?php echo isset($Auth) && $Auth->loggedIn() ? "true" : "false"; ?>,
            "userHasRatedOne": <?php echo RATER_MASTER_SW && userHasRatedOne() ? "true" : "false"; ?>
        },
        "converter": {
            "defaultWgs84": <?php echo DEFAULT_WGS84; ?>,
            "defaultSourceSrs": "<?php echo DEFAULT_SOURCE_CRS; ?>",
            "defaultDestSrs": "<?php echo DEFAULT_DEST_CRS; ?>",
            "fromUrl": <?php echo FROM_URL ? "true" : "false"; ?>,
            "fromRss": <?php echo FROM_RSS ? "true" : "false"; ?>
        }
    },
    "donations": {
        "total": <?php echo getTotalDonation(); ?>,
        "max": <?php echo DONATION_MAX; ?>
    },
    "translations": {
        "about": "<?php echo CONTACT_US; ?>",
        "address": "<?php echo ADDRESS; ?>",
        "checkEmail": "<?php echo CHECK_EMAIL;?>",
        "checkLength": "<?php echo CHECK_LENGTH; ?>",
        "checkName": "<?php echo CHECK_NAME;?>",
        "checkPassword": "<?php echo CHECK_PASSWORD;?>",
        "checkUnicity": "<?php echo CHECK_UNICITY; ?>",
        "conventionTitle": "<?php echo CONVENTION_TITLE; ?>",
        "crsAlreadyExists": "<?php echo CRS_ALREADY_EXISTS; ?>",
        "close": "<?php echo CLOSE; ?>",
        "contactUs": "<?php echo CONTACT_US; ?>",
        "customSystem": "<?php echo CUSTOM_SYSTEM; ?>",
        "directLink": "<?php echo DIRECT_LINK; ?>",
        "donate": "<?php echo DONATE; ?>",
        "dragMe": "<?php echo DRAG_ME; ?>",
        "elevation": "<?php echo ELEVATION; ?>",
        "errorContactUs": "<?php echo ERROR_CONTACT_US; ?>",
        "geocoderFailed": "<?php echo GEOCODER_FAILED; ?>",
        "labelConvergence": "<?php echo LABEL_CONVERGENCE; ?>",
        "labelCsv": "<?php echo LABEL_CSV; ?>",
        "labelFormat": "<?php echo LABEL_FORMAT; ?>",
        "labelHemi": "<?php echo LABEL_HEMI; ?>",
        "labelLat": "<?php echo LABEL_LAT; ?>",
        "labelLng": "<?php echo LABEL_LNG; ?>",
        "labelX": "<?php echo LABEL_X; ?>",
        "labelY": "<?php echo LABEL_Y; ?>",
        "labelZone": "<?php echo LABEL_ZONE; ?>",
        "loading": "<?php echo LOADING; ?>",
        "logIn": "<?php echo LOG_IN;?>",
        "messageNotSent": "<?php echo MESSAGE_NOT_SENT; ?>",
        "messageSent": "<?php echo MESSAGE_SENT; ?>",
        "messageWrongEmail": "<?php echo MESSAGE_WRONG_EMAIL; ?>",
        "newSystemAdded": "<?php echo NEW_SYSTEM_ADDED; ?>",
        "optionCsv": "<?php echo OPTION_CSV; ?>",
        "optionDD": "<?php echo OPTION_DD; ?>",
        "optionDM": "<?php echo OPTION_DM; ?>",
        "optionDMS": "<?php echo OPTION_DMS; ?>",
        "optionE": "<?php echo OPTION_E; ?>",
        "optionF": "<?php echo OPTION_F; ?>",
        "optionKM": "<?php echo OPTION_KM; ?>",
        "optionM": "<?php echo OPTION_M; ?>",
        "optionManual": "<?php echo OPTION_MANUAL; ?>",
        "optionN": "<?php echo OPTION_N; ?>",
        "optionNorth": "<?php echo OPTION_NORTH; ?>",
        "optionS": "<?php echo OPTION_S; ?>",
        "optionSouth": "<?php echo OPTION_SOUTH; ?>",
        "optionW": "<?php echo OPTION_W; ?>",
        "poll": "<?php echo POLL;?>",
        "research": "<?php echo RESEARCH; ?>",
        "resultEmpty": "<?php echo RESULT_EMPTY; ?>",
        "signUp": "<?php echo SIGN_UP;?>",
        "systemDefinition": "<?php echo SYSTEM_DEFINITION;?>",
        "undefinedTitle": "<?php echo UNDEFINED_TITLE; ?>",
        "unitDegree": "<?php echo UNIT_DEGREE; ?>",
        "unitDegreeEast": "<?php echo UNIT_DEGREE_EAST; ?>",
        "unitDegreeNorth": "<?php echo UNIT_DEGREE_NORTH; ?>",
        "unitFeet": "<?php echo UNIT_FEET; ?>",
        "unitKilometer": "<?php echo UNIT_KILOMETER; ?>",
        "unitMeter": "<?php echo UNIT_METER; ?>",
        "unitMinute": "<?php echo UNIT_MINUTE; ?>",
        "unitSecond": "\<?php echo UNIT_SECOND; ?>",
        "zoom": "<?php echo ZOOM; ?>"
    },
    "TWCCMapOptions": {
        "infowindowAdsSelector": "#twcc-ads>ins",
        "locationSelector": "#find-location",
        "mapOptions": {
            "zoom": <?php echo DEFAULT_ZOOM; ?>,
            "mapTypeId": "<?php echo DEFAULT_MAP_TYPE; ?>"
        },
        "wmsProviders": <?php require(DIR_FS_SCRIPT . "wms_providers.json"); ?>
    },
    "TWCCConverterOptions": {
    },
    "connectorsOptions": {
        "w3w": {
            "key": "<?php echo W3W_KEY; ?>"
        }
    },
    "locations": {
        "capitals": [
            <?php echo getCapitalsLocations(); ?>
        ]
    }
}