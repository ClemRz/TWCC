<div id="p-about">
    <div class="section" style="font-size:1.2em;">
        <div style="float:right;font-size:10px;"><?php echo CHANGELOG; ?></div>
        <div style="float:right;"><?php echo PAYPAL_FORM; ?></div>
        <?php echo ABOUT_CONTENT; ?>
        <div><p><img src="<?php echo DIR_WS_IMAGES; ?>star.png" alt="" width="16" height="16"> <a class="link show-p-poll" href=""><?php echo POLL; ?></a></p></div>
        <?php if (USE_FACEBOOK) { ?>
            <div><iframe src="//www.facebook.com/plugins/likebox.php?locale=<?php echo LOCALE; ?>&amp;href=http%3A%2F%2Fwww.facebook.com%2FTWCC.free&amp;width=292&amp;colorscheme=light&amp;font=arial&amp;show_faces=false&amp;stream=false&amp;header=false&amp;height=66" style="border:none; overflow:hidden; width:100%; height:66px;"></iframe></div>
        <?php } ?>
        <a href="#" title="<?php echo CONTACT_US; ?>" class="contact contact-btn"><?php echo CONTACT_US; ?></a>
        <div id="app-versions"></div>
    </div>
</div><!-- #p-about -->