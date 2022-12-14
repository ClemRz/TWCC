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
define('IS_LIGHT', true);
require($_SERVER['DOCUMENT_ROOT'] . '/includes/application_top.php'); ?>
<!DOCTYPE html>
<html lang="<?php echo LANGUAGE_CODE; ?>" dir="<?php echo DIR; ?>" class="light">
<head>
    <?php include('pieces/head.php'); ?>
</head>
<body>
<?php if (USE_FACEBOOK) { ?>
    <div id="fb-root"></div>
<?php } ?>
<?php include('pieces/header.php'); ?>
<main>
    <?php include('pieces/converter.php') ?>
    <?php if (BANNER_ADS_ENABLED) { ?>
        <ins class="adsbygoogle" data-ad-client="<?php echo ADSENSE_ID; ?>"
             data-ad-slot="<?php echo MOBILE_BOTTOM_AD_SLOT; ?>" style="display:block;" data-ad-format="auto"
             data-full-width-responsive="true"></ins>
    <?php } ?>
</main>
<?php include('pieces/new-crs.php'); ?>
<?php include('pieces/search-crs.php'); ?>
<?php include('pieces/contact-us.php'); ?>
<?php include('pieces/about.php'); ?>
<?php include('pieces/info-crs.php'); ?>
<?php include('pieces/donate.php'); ?>
</body>
</html>
