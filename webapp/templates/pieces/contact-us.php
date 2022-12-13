<div id="p-contact">
    <div class="section">
        <p><?php echo PLEASE_FILL_FORM; ?></p>
        <form id="contact-form">
            <div>
                <label for="email"><?php echo EMAIL; ?></label>
                <input type="text" name="email" id="email" value="" style="width:100%;"><br>
                <label for="message"><?php echo MESSAGE; ?></label>
                <textarea rows="5" cols="33" name="message" id="message" style="width:100%;"></textarea>
                <a href="#" id="send-message" title="<?php echo SEND_MESSAGE; ?>" class="contact-button"><?php echo SEND_MESSAGE; ?></a>
            </div>
        </form>
    </div>
</div><!-- #p-contact -->