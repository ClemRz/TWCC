<div id="p-new">
    <div class="section">
        <p><span class="step">1.</span> <?php echo SEARCH_SYSTEM; ?><br>
            <span class="example"><?php echo SEARCH_EXAMPLE; ?></span></p>
        <form id="reference-form" class="search-form">
            <input type="text" id="find-reference" class="search-field" value="" style="width:200px;height:16px;">
            <a id="view-reference" target="_blank" title="<?php echo SEARCH; ?>" class="view" style="color:#FFFFFF;"><?php echo SEARCH; ?></a>
        </form>
    </div>
    <div class="section">
        <p><span class="step">2.</span> <?php echo COME_BACK; ?></p>
        <div class="example"><?php echo SYSTEM_EXAMPLE; ?></div>
        <form id="new-form" class="search-form">
            <input type="text" id="add-reference" class="search-field" value="" style="width:200px;height:16px;">
            <input type="hidden" name="target" value="">
            <a id="new-reference" title="<?php echo ADD; ?>" class="view" style="color:#FFFFFF;"><?php echo ADD; ?></a>
        </form>
        <div id="loadingxtra" style="display:none;background-color:#FFFFFF;text-align:center;">
            <img src="<?php echo DIR_WS_IMAGES; ?>loading.gif" alt="<?php echo LOADING; ?>" width="35" height="35">
        </div>
    </div>
    <div class="section">
        <p><span class="step">3.</span> <?php echo FREQUENT_USE; ?></p>
        <a href="#" title="<?php echo CONTACT_US; ?>" class="contact contact-btn"><?php echo CONTACT_US; ?></a>
    </div>
</div><!-- #p-new -->