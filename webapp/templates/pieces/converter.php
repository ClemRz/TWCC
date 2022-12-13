<div id="converter" class="ui-corner-all <?php if (!IS_LIGHT) echo('box-shadow'); ?>">
    <div class="section drag-handle table">
        <span><a class="history previous" title="<?php echo PREVIOUS; ?>" href="#"><?php echo PREVIOUS; ?></a></span>
        <span class="hide-when-light"><a id="help" title="<?php echo HELP; ?>" href="#"><?php echo HELP; ?></a></span>
        <span><a class="history next" title="<?php echo NEXT; ?>" href="#"><?php echo NEXT; ?></a></span>
    </div>
    <div class="section converter-container source">
        <div style="white-space:nowrap" class="crs-head table">
            <div class="row">
                <div class="middle cell">
                    <a class="show-p-new" href="#" title="<?php echo YOU_CANT_FIND; ?>"><img src="<?php echo DIR_WS_IMAGES; ?>plus.png" alt="" width="16" height="16"></a>
                </div>
                <div class="widest cell">
                    <select name="source" class="crs-list"><option value="#" class="to-remove"><?php echo LOADING; ?></option></select>
                </div>
                <div class="cell">
                    <a class="serach-crs" title="<?php echo DO_RESEARCH; ?>" href="#"><img src="<?php echo DIR_WS_IMAGES; ?>search.png" alt="<?php echo DO_RESEARCH; ?>" class="search-crs" width="15" height="14"></a>
                </div>
            </div>
        </div>
        <div class="loading"><img src="<?php echo DIR_WS_IMAGES; ?>loading.gif" alt="" width="35" height="35"><?php echo LOADING; ?></div>
        <div class="container"></div>
        <div class="table">
            <div class="row">
                <div class="widest cell">
                    <a href="#" title="<?php echo CONVERT; ?>" class="convert-button"><?php echo CONVERT; ?></a>
                </div>
                <div class="middle cell">
                    <span class="view ui-corner-all octicon octicon-clippy" title="<?php echo COPY_TO_CLIPBOARD; ?>"></span>
                </div>
            </div>
        </div>
    </div>
    <div class="section converter-container destination">
        <div style="white-space:nowrap" class="crs-head table">
            <div class="row">
                <div class="middle cell">
                    <a class="show-p-new" href="#" title="<?php echo YOU_CANT_FIND; ?>"><img src="<?php echo DIR_WS_IMAGES; ?>plus.png" alt="" width="16" height="16"></a>
                </div>
                <div class="widest cell">
                    <select name="destination" class="crs-list"><option value="#" class="to-remove"><?php echo LOADING; ?></option></select>
                </div>
                <div class="cell">
                    <a class="serach-crs" title="<?php echo DO_RESEARCH; ?>" href="#"><img src="<?php echo DIR_WS_IMAGES; ?>search.png" alt="<?php echo DO_RESEARCH; ?>" class="search-crs" width="15" height="14"></a>
                </div>
            </div>
        </div>
        <div class="loading"><img src="<?php echo DIR_WS_IMAGES; ?>loading.gif" alt="" width="35" height="35"><?php echo LOADING; ?></div>
        <div class="container"></div>
        <div class="table">
            <div class="row">
                <div class="widest cell">
                    <a href="#" title="<?php echo CONVERT; ?>" class="convert-button"><?php echo CONVERT; ?></a>
                </div>
                <div class="middle cell">
                    <span class="view ui-corner-all octicon octicon-clippy" title="<?php echo COPY_TO_CLIPBOARD; ?>"></span>
                </div>
            </div>
        </div>
    </div>
</div><!-- #converter -->