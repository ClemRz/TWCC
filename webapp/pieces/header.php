<header class="<?php if (!IS_LIGHT) echo('bottom-shadow'); ?>">
    <div>
        <div id="h-top-left">
            <h3><a href="/" title="TWCC">TWCC</a></h3>
            <ul class="nav">
                <li class="nav_li first"><a href="#" class="about link"
                                            title="<?php echo ABOUT; ?>"><?php echo ABOUT; ?></a></li>
                <li class="nav_li"><a href="#" class="contact link"
                                      title="<?php echo CONTACT_US; ?>"><?php echo CONTACT_US; ?></a></li>
                <li class="nav_li">&nbsp;<?php echo PAYPAL_TINY_FORM; ?></li>
            </ul>
        </div><!-- #h-top-left -->
        <?php if (false && !IS_DEV_ENV) { ?>
            <div class="g-plusone" data-size="small" data-count="true"></div>
        <?php } ?>
        <div class="fb-like" data-href="http://www.facebook.com/TWCC.free" data-send="false" data-share="false"
             data-action="like" data-size="small" data-layout="<?php echo(IS_LIGHT ? 'button' : 'button_count'); ?>"
             data-width="" data-show-faces="false" data-font="arial"></div>
        <div id="h-top-right">
            <dl id="language" class="dropdown">
                <dt><a href="#"><span><?php echo getHTMLLanguage(LANGUAGE_CODE, !IS_LIGHT); ?></span></a></dt>
                <dd>
                    <ul><?php echo IS_LIGHT ? getLILanguagesLight() : getLILanguages(); ?></ul>
                </dd>
            </dl>
        </div><!-- #h-top-right -->
    </div>
    <div>
        <h2><?php echo APPLICATION_TITLE . APPLICATION_TITLE_BIS; ?></h2>
        <?php if (isset($_GET['tmp'])) { // To Remove Before Prod ?>
            <?php if ($Auth->loggedIn()) { ?>
                (<?php echo $Auth->username; ?>) <a href="logout.php"><?php echo LOGOUT; ?></a>
            <?php } else { ?>
                <button id="sign-up"><?php echo SIGN_UP; ?></button> <a href="#" id="log-in"><?php echo LOG_IN; ?></a>
            <?php } ?>
        <?php } else { ?>
            <?php if (false && BANNER_ADS_ENABLED) { ?>
                <ins class="adsbygoogle" data-ad-client="<?php echo ADSENSE_ID; ?>"
                     data-ad-slot="<?php echo BANNER_AD_SLOT; ?>"
                     style="display:inline-block;width:728px;height:15px;"></ins>
            <?php } ?>
        <?php } ?>
    </div>
</header><!-- #h-container -->