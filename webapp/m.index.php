<?php require('includes/application_top.php'); ?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>TWCC for mobile</title>
    <link rel="stylesheet" href="http://code.jquery.com/mobile/1.3.1/jquery.mobile-1.3.1.min.css" />
    <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
    <script src="http://code.jquery.com/mobile/1.3.1/jquery.mobile-1.3.1.min.js"></script>
		<script type="text/javascript" src="js/lib/proj4js-combined.CRO.1.0.0.js"></script>
    <script type="text/javascript" src="js/converter.class.2.0.5.js"></script>
<?php
    require(DIR_WS_FUNCTIONS . 'm.global.js.php');
?>
  </head>
  <body>
    <div data-role="page" id="home">
    
      <div data-role="header">
        <h1>Home</h1>
      </div><!-- /header -->
      
      <div data-role="content">
        <p>Page content goes here.</p>
      </div><!-- /content -->
      
      <div data-role="footer" data-id="footer1" data-position="fixed">
        <div data-role="navbar">
          <ul>
            <li><a href="#home" class="ui-btn-active ui-state-persist">Home</a></li>
            <li><a href="#conv">conv</a></li>
          </ul>
        </div><!-- /navbar -->
      </div><!-- /footer -->
      
    </div><!-- /home page -->
    
    <div data-role="page" id="conv">
    
      <div data-role="header">
        <h1>Converter</h1>
      </div><!-- /header -->
      
      <div data-role="content">
        <div>
          <select name="crsSource" id="crsSource" onchange="javascript:converterHash.updateCrs(this, true);"><option value="#" class="to-remove"><?php echo LOADING; ?></option></select>
          <div id="loadingSource" class="loading"><img src="<?php echo DIR_WS_IMAGES; ?>loading.gif" alt=""/><?php echo LOADING; ?></div>
          <div id="xySource"></div>
          <a href="#" id="convSource" title="<?php echo CONVERT; ?>" class="convert_button"><?php echo CONVERT; ?></a>
        </div>
        <div>
          <select name="crsDest" id="crsDest" onchange="javascript:converterHash.updateCrs(this, true);"><option value="#" class="to-remove"><?php echo LOADING; ?></option></select>
          <div id="loadingDest" class="loading"><img src="<?php echo DIR_WS_IMAGES; ?>loading.gif" alt=""/><?php echo LOADING; ?></div>
          <div id="xyDest"></div>
          <a href="#" id="convDest" title="<?php echo CONVERT; ?>" class="convert_button"><?php echo CONVERT; ?></a>
        </div>
      </div><!-- /content -->
      
      <div data-role="footer" data-id="footer1" data-position="fixed">
        <div data-role="navbar">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#conv" class="ui-btn-active ui-state-persist">conv</a></li>
          </ul>
        </div><!-- /navbar -->
      </div><!-- /footer -->
      
    </div><!-- /conv page -->
    
  </body>
</html>