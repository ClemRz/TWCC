<div>
    <div id="l-title"><?php echo COPYRIGHT; ?></div>
    <div>
        <?php echo APPLICATION_LICENSE; ?>
        <span class="crs-icons">
            <?php if (false) { ?>
                <a class="show-p-poll" href="#" title="<?php echo POLL; ?>">
                    <img src="<?php echo DIR_WS_IMAGES; ?>star.png" alt="<?php echo POLL; ?>" width="16" height="16">
                </a>
            <?php } ?>
            <?php if (USE_FACEBOOK) { ?>
                <a href="https://www.facebook.com/TWCC.free" target="_blank" title="<?php echo FACEBOOK; ?>">
                    <img src="<?php echo DIR_WS_IMAGES; ?>icon-facebook.png" alt="<?php echo FACEBOOK; ?>" width="16"
                         height="16">
                </a>
            <?php } ?>
            <a href="/<?php echo LANGUAGE_CODE; ?>/rss/" title="RSS Feed" target="_blank" style="white-space:nowrap;">
                <img src="<?php echo DIR_WS_IMAGES; ?>rss.png" alt="RSS Feed" width="16" height="16">
            </a>
        </span>
    </div>
</div>