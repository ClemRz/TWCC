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
define('IS_LIGHT', false);
require($_SERVER['DOCUMENT_ROOT'] . '/includes/application_top.php'); ?>
<!DOCTYPE html>
<html lang="<?php echo LANGUAGE_CODE; ?>" dir="<?php echo DIR; ?>">
<head>
    <?php include('pieces/head.php'); ?>
</head>
<body>
<?php if (USE_FACEBOOK) { ?>
    <div id="fb-root"></div>
<?php } ?>
<?php include('pieces/header.php'); ?>
<main>
    <div id="map-container">
        <div id="map" class=".map" dir="ltr"></div>

        <div id="c-container" class="trsp-panel ui-corner-all">
            <?php include('pieces/credit.php'); ?>
        </div><!-- #c-container -->
        <div id="license" class="trsp-panel ui-corner-all">
            <?php include('pieces/copyright.php'); ?>
        </div><!-- #license -->

        <div id="o-container" class="trsp-panel ui-corner-all" style="width:325px;">
            <h3><?php echo OPTIONS; ?></h3>
            <div>
                <p>
                            <span class="csv-radio button-set">
                                <?php echo MODE; ?>
                                <input name="csv" id="csv_false" type="radio" checked="checked" value="0"
                                       style="border:0px none;"><label
                                        for="csv_false"><?php echo OPTION_MANUAL; ?></label>
                                <input name="csv" id="csv_true" type="radio" value="1" style="border:0px none;"><label
                                        for="csv_true"><?php echo OPTION_CSV; ?></label>
                            </span>
                </p>
                <p>
                    <?php echo CONVENTION; ?>
                    <span class="convention-radio button-set">
                                <input name="convention" id="survey_true" type="radio" checked="checked" value="1"
                                       style="border:0px none;"><label for="survey_true"><?php echo SURVEY; ?></label>
                                <input name="convention" id="survey_false" type="radio" value="0"
                                       style="border:0px none;"><label
                                for="survey_false"><?php echo GAUSS_BOMFORD; ?></label>
                            </span>
                </p>
                <p>
                    <?php echo AUTO_ZOOM; ?>
                    <input type="checkbox" id="auto-zoom-toggle" checked="checked"><label
                            for="auto-zoom-toggle"><?php echo AUTO_ZOOM; ?></label>
                </p>
                <!--<p>
                            <?php /*echo PRINT_CURRENT_MAP; */ ?>
                            <a href="#" id="print-map"><?php /*echo PRINT_CURRENT_MAP; */ ?></a>
                        </p>-->
                <p>
                    <?php echo FULL_SCREEN; ?>
                    <a href="#" id="full-screen"><?php echo FULL_SCREEN; ?></a>
                </p>
            </div>
        </div><!-- #o-container -->

        <div id="d-container" class="trsp-panel ui-corner-all">
            <div id="csvFeatures">
                <?php echo LENGTH; ?> <span id="lengthContainer">-</span><br>
                <?php echo AREA; ?> <span id="areaContainer">-</span>
            </div>
            <div id="manualFeatures">
                <div id="magneticDeclinationContainer">
                    <img src="<?php echo DIR_WS_IMAGES; ?>MN.png" alt="" width="15"
                         height="15"><?php echo MAGNETIC_DECLINATION; ?> = <span
                            class="angle"></span><?php echo UNIT_DEGREE; ?>
                </div>
            </div>
        </div><!-- #d-container -->
        <?php if (false) { ?>
            <div id="c-ads-1" class="trsp-panel ui-corner-all">
                <ins class="adsbygoogle" data-ad-client="<?php /*echo ADSENSE_ID;*/ ?>"
                     data-ad-slot="<?php /*echo MAP_AD_SLOT; */ ?>" data-ad-format="<?php /*echo MAP_AD_FORMAT_1; */ ?>"
                     style="display:inline-block;width:200px;max-height:600px;"></ins>
            </div><!-- #c-ads-1 -->
        <?php } ?>
        <?php include('pieces/converter.php') ?>
    </div>
</main>

<div style="display:none;">
    <?php for ($i = 1; $i <= 4; $i++) { ?>
        <div class="help-<?php echo $i; ?> help-contents">
            <!--a href="#" class="close_button" title="<?php echo CLOSE; ?>"><?php echo CLOSE; ?></a-->
            <a href="#" title="<?php echo CLOSE; ?>"
               class="close_button ui-white-icon ui-icon ui-icon-circle-close"><?php echo CLOSE; ?></a>
            <p><span class="step"><?php echo $i; ?>.</span> <?php echo constant('HELP_' . $i); ?></p>
            <a href="#" class="next_button" title="<?php if ($i != 4) {
                echo NEXT;
            } else {
                echo FINISH;
            } ?>"><?php if ($i != 4) {
                    echo NEXT;
                } else {
                    echo FINISH;
                } ?></a>
            <?php if ($i == 1) { ?>
                <div class="bottom-right">
                    <input type="checkbox" class="dont-show-again"
                           style="vertical-align: middle;"> <?php echo DO_NOT_SHOW_AGAIN; ?>
                </div>
            <?php } ?>
        </div><!-- .help-<?php echo $i; ?> -->
    <?php } ?>
</div>

<?php include('pieces/new-crs.php'); ?>

<div id="p-loading">
    <div class="logs"></div>
    <div class="progressbar-container">
        <div class="progressbar">
            <div class="progress-label">Loading...</div>
        </div>
    </div>
</div><!-- #p-loading -->

<?php include('pieces/search-crs.php'); ?>
<?php include('pieces/contact-us.php'); ?>
<?php include('pieces/about.php'); ?>
<?php include('pieces/info-crs.php'); ?>

<div id="p-poll">
    <div id="poll-info" class="section" style="font-size:1.2em;">

    </div>
</div><!-- #p-poll -->

<?php if (false) { ?>
    <div id="p-info">
        <br>
        <h2><?php echo LOOKING_FOR_TRANSLATOR; ?></h2>
        <?php if (BANNER_ADS_ENABLED) { ?>
            <ins class="adsbygoogle" data-ad-client="<?php echo ADSENSE_ID; ?>"
                 data-ad-slot="<?php echo INFO_AD_SLOT; ?>" style="display:inline-block;width:728px;height:90px;"></ins>
        <?php } ?>
    </div>
<?php } ?>

<?php include('pieces/donate.php'); ?>

<div id="p-convention_help">
    <p>
        <img src="<?php echo DIR_WS_IMAGES; ?>survey_396x320.jpg" alt="" width="396" height="320">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <img src="<?php echo DIR_WS_IMAGES; ?>gauss-bomford_381x320.jpg" alt="" width="381" height="320">
    </p>
    <p>
        <?php echo CREDIT; ?> <a href="https://ge0mlib.com/papers/Guide/IOGP/373-21.pdf" target="_blank">International Association
            of Oil &amp; Gas Producers (OGP)</a>
    </p>
</div>

<?php if (isset($_GET['tmp'])) { // To Remove Before Prod ?>
    <?php if ($Auth->loggedIn()) { ?>
    <?php } else { ?>
        <div id="dialog-registration-form" title="<?php echo SIGN_UP; ?>" class="account-form">
            <p class="validateTips"><?php echo ALL_FIELDS_REQUIRED; ?></p>
            <form action="register.php" method="post" id="register-form">
                <fieldset>
                    <label for="regName"><?php echo REG_NAME; ?></label>
                    <input type="text" name="regName" id="regName" class="text ui-widget-content ui-corner-all">
                    <label for="regEmail"><?php echo REG_EMAIL; ?></label>
                    <input type="text" name="regEmail" id="regEmail" value=""
                           class="text ui-widget-content ui-corner-all">
                    <label for="regPassword"><?php echo REG_PASSWORD; ?></label>
                    <input type="password" name="regPassword" id="regPassword" value=""
                           class="text ui-widget-content ui-corner-all">
                </fieldset>
            </form>
        </div>
        <div id="dialog-login-form" title="<?php echo LOG_IN; ?>" class="account-form">
            <form action="login.php" method="post" id="login-form">
                <fieldset>
                    <label for="logEmail"><?php echo LOG_EMAIL; ?></label>
                    <input type="text" name="logEmail" id="logEmail" value=""
                           class="text ui-widget-content ui-corner-all">
                    <label for="logPassword"><?php echo LOG_PASSWORD; ?></label>
                    <input type="password" name="logPassword" id="logPassword" value=""
                           class="text ui-widget-content ui-corner-all">
                    <input type="hidden" name="r" value="<?PHP echo htmlspecialchars(@$_REQUEST['r']); ?>" id="r">
                </fieldset>
            </form>
        </div>
    <?php } ?>
<?php } ?>
</body>
</html>
