<div id="p-donate">
    <h3><?php echo WE_NEED_YOU; ?></h3>
    <p><?php echo SUPPORT_TEXT; ?></p>
    <div class="progressbar"></div>
    <div class="donate_inner_text"><?php echo getTotalDonation(); ?>€ / <?php echo DONATION_MAX; ?>€</div>
    <div class="checklist"><?php echo HOW_WE_PLAN; ?></div>
    <div class="table">
        <div class="row">
            <div class="cell" style="width:161px;vertical-align:middle;">
                <?php echo PAYPAL_FORM; ?>
            </div>
            <div class="cell" style="vertical-align:middle;">
                <?php echo LAST_5_DONORS.getLastFiveDonors(); ?>
            </div>
            <?php if (!IS_LIGHT && BANNER_ADS_ENABLED) { ?>
                <div class="cell" style="width:300px">
                    <ins class="adsbygoogle" data-ad-client="<?php echo ADSENSE_ID;?>" data-ad-slot="<?php echo DONATE_SQUARE_AD_SLOT; ?>" style="display:inline-block;width:300px;height:250px;"></ins>
                </div>
            <?php } ?>
        </div>
    </div>
    <?php if (!IS_LIGHT && BANNER_ADS_ENABLED) { ?>
        <ins class="adsbygoogle" data-ad-client="<?php echo ADSENSE_ID;?>" data-ad-slot="<?php echo DONATE_HORIZONTAL_AD_SLOT; ?>" style="display:inline-block;width:728px;height:90px;"></ins>
    <?php } ?>
    <div class="bottom-right">
        <input type="checkbox" class="dont-show-again" style="vertical-align: middle;"> <?php echo DO_NOT_SHOW_AGAIN; ?>
    </div>
</div>