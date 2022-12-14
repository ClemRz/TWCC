<div id="p-research">
    <div class="section">
        <p><b><?php echo RESEARCH_FORM; ?></b></p>
        <form id="research-form">
            <div>
                <label for="crsCode"><?php echo CRS_CODE; ?></label>
                <input type="text" name="crsCode" id="crsCode" value="" style="width:100%;"><br>
                <label for="crsName"><?php echo CRS_NAME; ?></label>
                <input type="text" name="crsName" id="crsName" value="" style="width:100%;"><br>
                <input type="hidden" name="select" id="select" value="destination">
                <label for="crsCountry"><?php echo CRS_COUNTRY; ?></label>
                <select name="crsCountry" id="crsCountry"><option value="%"><?php echo OPTN_ALL; ?></option>
                    <?php
                    $opt_countries = getCountries(LANGUAGE_CODE);
                    $html = '';
                    foreach($opt_countries as $iso => $name) {
                        $html .= '							<option value="'.$iso.'">'.$name.'</option>'."\n";
                    }
                    echo($html);
                    ?>
                </select>
            </div>
            <!--a href="#" id="research" title="<?php echo GO; ?>" class="searchbtn" style="color:#FFFFFF;"><?php echo GO; ?></a-->
            <div style="text-align:center;">
                <p><input type="submit" name="research" id="research" value="<?php echo GO; ?>" class="searchbtn" style="color:#FFFFFF;display:inline;"></p>
            </div>
        </form>
    </div>
    <div class="section">
        <p><b><?php echo RESULT; ?></b></p>
        <select disabled="disabled" size="5" name="crsResult" id="crsResult" style="width:100%;"><option value="#" class="disabledoption"><?php echo RESULT_FIRST.GO; ?></option></select>
        <input type="checkbox" name="closeSearch" id="closeSearch" value="close"><label for="closeSearch"><?php echo CLOSE_ON_SELECT; ?></label>
    </div>
</div><!-- #p-research -->