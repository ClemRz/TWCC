<?php
/*

	Copyright Clément Ronzon

*/
?>
		<script type="text/javascript" src="http://www.google.com/jsapi?key=ABQIAAAA_X2bDeJ9Hz-baUkItUM1WRR2kQNbL0Z6HrwZBIwJK7eKir2c8BSiWWIhiSXsO7m07yrRrc1XkvckRw"></script>
    <script type="text/javascript">
    //<![CDATA[
		var converterHash, convUnits, convLabels, convWrapper, convOptions, convDefs, convSrc, convDest, convNfo, convCallBack, convReadOnly, SHDelay, defIdx, mapFlag,
			converterFlag, firstCallBack, cityLocations, mapTimedOut, readyTriggered, myCookie, historizeFlag, historyIndex, graticule, surveyConvention;
		convUnits = {'dms':{'D':'<?php echo UNIT_DEGREE; ?>', 'M':"<?php echo UNIT_MINUTE; ?>", 'S':'<?php echo UNIT_SECOND; ?>'},
									'dd':{'x':{'DD':'<?php echo UNIT_DEGREE_EAST; ?>'}, 'y':{'DD':'<?php echo UNIT_DEGREE_NORTH; ?>'}},
									'xy':{'XY':{'m':'<?php echo UNIT_METER; ?>', 'km':'<?php echo UNIT_KILOMETER; ?>'}},
									'zxy':{'XY':{'m':'<?php echo UNIT_METER; ?>', 'km':'<?php echo UNIT_KILOMETER; ?>'}},
									'csv':{'CSV':'', 'L':''}};
		convLabels = {'dms':{'x':'<?php echo LABEL_LNG; ?>', 'y':'<?php echo LABEL_LAT; ?>', 'convergence':'<?php echo LABEL_CONVERGENCE; ?>'},
									'dd':{'x':'<?php echo LABEL_LNG; ?>', 'y':'<?php echo LABEL_LAT; ?>', 'convergence':'<?php echo LABEL_CONVERGENCE; ?>'},
									'xy':{'x':'<?php echo LABEL_X; ?>', 'y':'<?php echo LABEL_Y; ?>', 'convergence':'<?php echo LABEL_CONVERGENCE; ?>'},
									'zxy':{'x':'<?php echo LABEL_X; ?>', 'y':'<?php echo LABEL_Y; ?>', 'z':'<?php echo LABEL_ZONE; ?>', 'e':'<?php echo LABEL_HEMI; ?>', 'convergence':'<?php echo LABEL_CONVERGENCE; ?>'},
									'csv':{'csv':'<?php echo LABEL_CSV; ?>', 'l':'<?php echo LABEL_FORMAT; ?>'}};
		convOptions = {'x':{'E':'<?php echo OPTION_E; ?>','W':'<?php echo OPTION_W; ?>'},
									 'y':{'N':'<?php echo OPTION_N; ?>','<?php echo OPTION_S; ?>':'S'},
									 'o':{'_DMS':'<?php echo OPTION_DMS; ?>', '_DD':'<?php echo OPTION_DD; ?>'},
									 'e':{'n':'<?php echo OPTION_NORTH; ?>', 's':'<?php echo OPTION_SOUTH; ?>'},
									 'f':{'c':'<?php echo OPTION_CSV; ?>', 'm':'<?php echo OPTION_MANUAL; ?>'},
									 'u':{'_M':'<?php echo OPTION_M; ?>', '_KM':'<?php echo OPTION_KM; ?>'}};
		convWrapper = {'converter':['div'],
										'title':['h3'],
										'set':['table', {'border':'0', 'width':'100%'}],
										'fields':['td', {'class':'key-fields', 'width':'100%'}],
										'label':['td', {'class':'key-label'}],
										'container':['tr']};
		convDefs = '<?php echo HTTP_SERVER . '/' . DIR_WS_INCLUDES; ?>c.php';
		convSrc = 'Source';
		convDest = 'Dest';
		convNfo = "JavaScript:showCRSInfo('|');";
		convReadOnly = false;
		SHDelay = 250;
		defIdx = 0;
		readyTriggered = false;
		mapTimedOut = false;
		cityLocations = [<?php echo getCapitalsLocations(); ?>];
		
		function initLanguages() {
			$(".dropdown dt a").bind("click", function(event) {
				event.preventDefault();
				$(".dropdown dd ul").slideToggle(200);
			});
									
			$(".dropdown dd ul li a").bind("click", function(event) {
				var html, value, url;
				event.preventDefault();
				html = $(this).html();
				value = $(this).parent().find('span.value').text();
				$(".dropdown dt a span").html(html);
				$(".dropdown dd ul").hide();
				//$(location).prop('href',$(this).prop('href')); //BUG
				document.location.href = $(this).prop('href');
			});

			$(document).bind('click', function(event) {
				var $clicked = $(event.target);
				if (!$clicked.parents().hasClass("dropdown")) $(".dropdown dd ul").hide();
			});
		}
		
		function initNextBtn() {
			$('.next_button').button({ icons: {secondary:'ui-icon-seek-next'} });
		}
		
		function initUI() {
			initNextBtn();
			$('#hstPrev').button({ icons: {primary:'ui-icon-seek-first'}, text: false });
			$('#help').button({ icons: {primary:'ui-icon-help'}, text: false });
			$('#hstNext').button({ icons: {primary:'ui-icon-seek-end'}, text: false });
			$('#convSource').button({ icons: {primary:'ui-icon-arrowthick-1-s'} });
			$('#convDest').button({ icons: {primary:'ui-icon-arrowthick-1-n'} });
			$('#send-message, #contact-us, #send-to-us').button({ icons: {secondary:'ui-icon-mail-closed'} });
			$('#language>dt>a').button({ icons: {secondary:'ui-icon-triangle-1-s'} }).height(19);
			$('#language>dt>a>.ui-button-text').css('padding-top', '2px');
			$('#language>dd>ul').width($('#language>dt>a').width());
			$('#manual-radio').buttonset()
//													.button('widget').css('margin-right', '13px')
													.find('label').height(19)
													.find('.ui-button-text').css('padding-top', '2px');
			$('#convention-radio').buttonset()
													.find('label').height(19)
													.find('.ui-button-text').css('padding-top', '2px');
			$('#auto-zoom-toggle').button({ icons: {primary:'ui-icon-zoomin'}, text: false, disabled:true})
													.find('label').height(19)
													.find('.ui-button-text').css('padding-top', '2px');
			$('#print-map').button({ icons: {primary:'ui-icon-print'}, text: false})
													//.find('label').height(19)
													.find('.ui-button-text').css('padding-top', '2px');
			$('.p-content, .trsp-panel, .opt-panel, .key, .dropdown dt a').addClass('ui-corner-all');
      $('.opt-panel').draggable({ handle: ".drag_handler" });
        //.resizable({ghost: true, handles: "n, e, s, w, ne, se, sw, nw"});
			$('.view').addClass('ui-corner-br').addClass('ui-corner-tr');
      $('.searchbtn').addClass('ui-corner-br').addClass('ui-corner-tr').addClass('ui-corner-bl').addClass('ui-corner-tl');
			$('.search-field').addClass('ui-corner-bl').addClass('ui-corner-tl');
      $.bt.defaults.trigger = 'none';
			$.bt.defaults.showTip = function(box){$(box).fadeIn(SHDelay);};
			$.bt.defaults.hideTip = function(box, callback){$(box).animate({opacity: 0}, SHDelay, callback);};
			$.bt.defaults.shrinkToFit = true;
			$.bt.defaults.padding = '0px';
			$.bt.defaults.windowMargin = '0px';
			$.bt.defaults.fill = 'rgba(0, 0, 0, .9)';
			$.bt.defaults.cornerRadius = 10;
			$.bt.defaults.strokeWidth = 1;
			$.bt.defaults.shadow = true;
			$.bt.defaults.shadowOffsetX = 3;
			$.bt.defaults.shadowOffsetY = 3;
			$.bt.defaults.shadowBlur = 3;
			$.bt.defaults.shadowColor = 'rgba(6,6,6,.5)';
			$.bt.defaults.shadowOverlap = false;
			$.bt.defaults.noShadowOpts = {strokeStyle: '#666', strokeWidth: 1};
			$.bt.defaults.positions = ['left', 'top'];
			$.bt.defaults.cssStyles = {color: '#FFF'};
			$.bt.defaults.closeWhenOthersOpen = true;
			$.bt.defaults.clickAnywhereToClose = false;
			$('#crsSource').bt({contentSelector: "$('#help-1')"});
			$('#crsDest').bt({contentSelector: "$('#help-2')"});
			$('#xySource').bt({contentSelector: "$('#help-3')"});
			$('#convSource').bt({contentSelector: "$('#help-4')"});
			$('#o-container').accordion({
				collapsible:true,
				active:false,
				heightStyle: "content",
				icons:{"header":"ui-icon-gear"}
			});
		}
    
    function checkUnicity(v,b,c,k) {
			var t, u;
			u = '<?php echo DIR_WS_INCLUDES; ?>u.php';
			t = $.ajax({type:'POST', url:u, async:false, cache:false, data:'ff=g'}).responseText;
			if(t.length<10) return alert(('<?php echo ERROR_CONTACT_US; ?>').replace('%s', t));
			$.cookie('<?php echo TOKEN_NAME; ?>',t);
			$.post(u, {ff: 'd', t: t, b: b, c: c, v: v}, function(code) { if(typeof(k) == 'function') k(code==='1'); });
    }
<?php if (isset($_GET['tmp'])) { // To Remove Before Prod ?>
<?php if($Auth->loggedIn()) { ?>
<?php } else { ?>
    var regName, regEmail, regPassword, tips;

    function updateTips(t) {
      tips
        .text(t)
        .addClass('ui-state-highlight');
      setTimeout(function() {
        tips.removeClass('ui-state-highlight', 1500);
      }, 500);
    }
    
    function checkLength(o, n, min, max) {
      if (o.val().length > max || o.val().length < min) {
        o.addClass("ui-state-error");
        updateTips(('<?php echo CHECK_LENGTH; ?>').replace('%n', n).replace('%min', min).replace('%max', max));
        return false;
      } else {
        return true;
      }
    }
    
    function checkRegexp( o, regexp, n ) {
      if ( !( regexp.test( o.val() ) ) ) {
        o.addClass( "ui-state-error" );
        updateTips( n );
        return false;
      } else {
        return true;
      }
    }
    
    function initRegistrationForm() {
      var hash = window.location.hash.replace("#", "");
      regName = $('#regName');
      regEmail = $('#regEmail');
      regPassword = $('#regPassword');
      var allFields = $([]).add(regName).add(regEmail).add(regPassword);
      tips = $('.validateTips');
      
      $( "#dialog-registration-form" ).dialog({
        autoOpen: hash=="register",
        height: 300,
        width: 350,
        modal: true,
        buttons: {
          "<?php echo SIGN_UP;?>": function() {
            var bValid = true;
            allFields.removeClass( "ui-state-error" );

            bValid = bValid && checkLength(regName, "username", 3, 16);
            bValid = bValid && checkLength(regEmail, "email", 6, 80);
            bValid = bValid && checkLength(regPassword, "password", 5, 16);
   
            bValid = bValid && checkRegexp(regName, /^[a-z]([0-9a-z_\s])+$/i, "<?php echo CHECK_NAME;?>");
            // From jquery.validate.js (by joern), contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
            bValid = bValid && checkRegexp(regEmail, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "<?php echo CHECK_EMAIL;?>");
            bValid = bValid && checkRegexp(regPassword, /^([0-9a-zA-Z])+$/, "<?php echo CHECK_PASSWORD;?>");
   
            if ( bValid ) {
              checkUnicity(regEmail.val(),'users','username',function(c) {
                if (!c) {
                  regEmail.addClass("ui-state-error");
                  updateTips('<?php echo CHECK_UNICITY; ?>');
                } else {
//DO HERE WHATEVER IT NEEDS TO BE DONE TO FOLLOW THE FLOW CHART
                  //$("#dialog-registration-form").dialog("close");
                  $('#register-form').submit();
                }
              });
            }
          },
          Cancel: function() {
            $( this ).dialog("close");
          }
        },
        close: function() {
          allFields.val("").removeClass("ui-state-error");
        }
      });
 
      $("#sign-up")
        .button()
        .click(function() {
          $("#dialog-registration-form").dialog("open");
        });
    }
    
    function initLoginForm() {
      var hash = window.location.hash.replace("#", "");
      var logEmail = $('#logEmail');
      var logPassword = $('#logPassword');
      var allFields = $([]).add(logEmail).add(logPassword);
      
      $( "#dialog-login-form" ).dialog({
        autoOpen: hash=="login",
        modal: true,
        buttons: {
          "<?php echo LOG_IN;?>": function() {
            $('#login-form').submit();
          },
          Cancel: function() {
            $( this ).dialog("close");
          }
        },
        close: function() {
          allFields.val("");
        }
      });

      $("#log-in")
        .click(function(event) {
          event.preventDefault();
          $("#dialog-login-form").dialog("open");
        });
    }
<?php } ?>
<?php } ?>

		function initBindings() {
			$('.close_button', '#help-1').bind("click", function(event) {
        event.preventDefault();
				void($('#crsSource').btOff());
				$('#help').animate({opacity: 'show'}, SHDelay);
			});
			$('.close_button', '#help-2').bind("click", function(event) {
        event.preventDefault();
				$('#crsDest').btOff();
				$('#help').animate({opacity: 'show'}, SHDelay);
			});
			$('.close_button', '#help-3').bind("click", function(event) {
        event.preventDefault();
				$('#xySource').btOff();
				$('#help').animate({opacity: 'show'}, SHDelay);
			});
			$('.close_button, .next_button', '#help-4').bind("click", function(event) {
        event.preventDefault();
				$('#convSource').btOff();
				$('#help').animate({opacity: 'show'}, SHDelay);
			});
			$('.next_button', '#help-1').bind("click", function(event) {
        event.preventDefault();
				$('#crsDest').btOn();
			});
			$('.next_button', '#help-2').bind("click", function(event) {
        event.preventDefault();
				$('#xySource').btOn();
			});
			$('.next_button', '#help-3').bind("click", function(event) {
        event.preventDefault();
				$('#convSource').btOn();
			});
			$('#help').bind("click", function(event) {
				initNextBtn();
				$(this).animate({opacity: 'hide'}, SHDelay);
			});
			$('#convSource').bind("click", function(event) {
        event.preventDefault();
				hideAll();
				converterHash.transform('Source');
			});
			$('#convDest').bind("click", function(event) {
        event.preventDefault();
				hideAll();
				converterHash.transform('Dest');
			});
			$('a.snippet').bind("click", function(event) {
        event.preventDefault();
			});
			$('a.snippet').mouseenter(function() {
				$('body').append('<div id="Tip" style="z-index:9999;" class="ui-corner-all"><img src="'+this.href+'" alt="'+this.href+'"><\/div>');
			});
			$('a.snippet').mousemove(function(e) {
				$('#Tip')
					.css({'left': e.pageX+16, 'top': e.pageY+16})
					.show();
			});
			$('a.snippet').mouseout(function() {
				$('#Tip').remove();
			});
			$('.toggle-next').bind("click", function(event) {
				event.preventDefault();
				$(this).parent().find('.toogle-me').toggle();
			});
			$('#searchSource').bind("click", function(event) {
        event.preventDefault();
				hideAll();
        $('#select').val('crsSource');
				$('#p-research').dialog("open");
			});
			$('#searchDest').bind("click", function(event) {
        event.preventDefault();
				hideAll();
        $('#select').val('crsDest');
				$('#p-research').dialog("open");
			});
			$('.convention').bind("click", function(event) {
        event.preventDefault();
				$('#p-convention_help').dialog("open");
			});
			$('#print-map').bind("click", function(event) {
        event.preventDefault();
				var staticMapURL = "http://maps.googleapis.com/maps/api/staticmap?";
				//staticMapURL += "center=" + map.getCenter().toUrlValue();
				staticMapURL += "&zoom=" + map.getZoom().toString();
				staticMapURL += "&size=640x640";
				staticMapURL += "&visual_refresh=true";
				staticMapURL += "&maptype=" + map.getMapTypeId().toString();
				staticMapURL += "&language=<?php echo LANGUAGE_CODE; ?>";
				if (converterHash.WGS84.length == 1) {//converterHash.isManual) {
					staticMapURL += "&markers=" + converterHash.WGS84[0].y + "," + converterHash.WGS84[0].x; //marker.getPosition().toUrlValue();
				} else {
					var tmp = new Array();
					$.each(converterHash.WGS84, function(index,value) {
						tmp.push(value.y + "," + value.x);
					});
					staticMapURL += "&path=geodesic:true|" + tmp.join("|");
				}
				staticMapURL += "&sensor=false";
				window.open(staticMapURL, '_blank');
			});
			$('#crsSource').btOn();
			$('#help').animate({opacity: 'hide'}, SHDelay);
		}
    
    /*Return the title from the definition*/
    if (typeof(getDefTitle) != 'function') {
      function getDefTitle(def, code) {
        var title;
        title = def.replace(/.*\+title=([^\+]+).*/gi, '$1');
        title = (title != '' && title != undefined) ? title : code;
        return title;
      }
    }
		
    function buildCRSList(grplabel, def, crsSource, crsDest) {
      var label;
      label = getDefTitle(Proj4js.defs[def], def);
      if ($("optgroup[label='"+grplabel+"']", crsSource).length == 0) {
        $(crsSource).append($('<optgroup>', {label:grplabel}));
      }
      $("optgroup[label='"+grplabel+"']", crsSource).append($('<option>', {val:def, text:label}));
      if (crsDest) {
        if ($("optgroup[label='"+grplabel+"']", crsDest).length == 0) {
          $(crsDest).append($('<optgroup>', {label:grplabel}));
        }
        $("optgroup[label='"+grplabel+"']", crsDest).append($('<option>', {val:def, text:label}));
      }
    }
    
    function initResearch() {
      $("#research").bind("click", function(event) {
          event.preventDefault();
          goResearch();
      });
    }
    
    function goResearch() {
      $('#crsResult').html('<option value="#", class:"disabledoption"><?php echo LOADING; ?><\/option>');
      $('#crsResult').prop('disabled', true);
      $.post('<?php echo HTTP_SERVER . '/' . DIR_WS_INCLUDES; ?>c.php', {
         l:'<?php echo LANGUAGE_CODE; ?>',
         i:$('#crsCountry').val(),
         c:$('#crsCode').val(),
         n:$('#crsName').val(),
         f:''
      }, function(data) {
        $('#crsResult').html('');
        if($(data).length == 0) {
          $('#crsResult').append($('<option>', {val:'', text:"<?php echo RESULT_EMPTY?>", classname:'disabledoption'}));
        } else {
          $('#crsResult').prop('disabled', false);
          for (country in data) {
            for (crs in data[country]) {
              buildCRSList(country, crs, $('#crsResult'));
            }
          }
        }
			});
    }
    
    function selectResultResearch(code) {
      if ($('#closeSearch').prop('checked')) $('#p-research').dialog("close");
      $('#' + $('#select').val()).val(code).change();
    }
    
		function showPoll(do_hide) {
			do_hide = (do_hide == undefined) ? true : do_hide;
			$('#poll-info').html('<div class="loading"><img src="' + dir_ws_images + 'loading.gif" alt=""><?php echo LOADING; ?><\/div>');
			if (do_hide) hideAll();
			$('#p-poll').dialog("open");
			loadPoll();
		}
		
		function loadPoll(serialized_values) {
			serialized_values = (serialized_values == undefined) ? '' : serialized_values;
			$('#poll-info').html('<div class="loading"><img src="' + dir_ws_images + 'loading.gif" alt=""><?php echo LOADING; ?><\/div>');
			$.post('<?php echo DIR_WS_MODULES; ?>rater/forms.php', 'rater=true&'+serialized_values, function(data) {
				$('#poll-info').html(data);
				$('form', $('#poll-info')).each(function(index) {
					//alert($(this).prop('id'));
					$(this).bind("submit", function(event) {
						event.preventDefault();
						loadPoll($(this).serialize());
					});
					bindContactUs();
				});
			});
		}
		
		function showCRSInfo(defCode) {
			$('#crs-info').html('<div class="loading"><img src="' + dir_ws_images + 'loading.gif" alt=""><?php echo LOADING; ?><\/div>');
			hideAll();
			$('#p-crs').dialog("open");
			$.post('<?php echo DIR_WS_INCLUDES; ?>crs_info.php', {c:converterHash.ProjHash[defCode].srsCode, d:converterHash.ProjHash[defCode].defData, l:'<?php echo LANGUAGE_CODE; ?>'}, function(data) {
				$('#crs-info').html(data);
			});
		}
		
		function bindContactUs() {
			$('.contact').bind("click", function(event) {
        event.preventDefault();
				hideAll();
				$('#p-contact').dialog("open");
			});
		}
    
    function removeAnchor(anchor) {
      window.location.hash = '';
    }
    
    function addAnchor(anchor) {
      window.location.hash = '#' + anchor;
    }
		
		function initContactNAbout() {
      var hash = window.location.hash.replace("#", "");
			$('#p-new').dialog({
						closeText: "<?php echo CLOSE; ?>",
						modal: true,
						title: "<?php echo CUSTOM_SYSTEM; ?>",
						width: 400,
						autoOpen: false
			});
			$('#p-contact').dialog({
						closeText: "<?php echo CLOSE; ?>",
						modal: true,
						title: "<?php echo CONTACT_US; ?>",
						width: 500,
            open: function(event, ui) {addAnchor("contact");},
            close: function(event, ui) {removeAnchor("contact");},
						autoOpen: hash=="contact"
			});
			$('#p-about').dialog({
						closeText: "<?php echo CLOSE; ?>",
						modal: true,
						title: "<?php echo ABOUT; ?>",
						width: "70%",
            open: function(event, ui) {addAnchor("about");},
            close: function(event, ui) {removeAnchor("about");},
						autoOpen: hash=="about"
			});
			$('#p-crs').dialog({
						closeText: "<?php echo CLOSE; ?>",
						modal: true,
						title: "<?php echo SYSTEM_DEFINITION; ?>",
						width: 500,
						autoOpen: false
			});
			$('#p-poll').dialog({
						closeText: "<?php echo CLOSE; ?>",
						modal: true,
						title: "<?php echo POLL; ?>",
						width: 500,
            open: function(event, ui) {addAnchor("poll");},
            close: function(event, ui) {removeAnchor("poll");},
						autoOpen: hash=="poll"
			});
			$('#p-info').dialog({
						closeText: "<?php echo CLOSE; ?>",
						modal: true,
						title: "Information",
						width: "30%",
						autoOpen: false
			});
			$('#p-donate').dialog({
						closeText: "<?php echo CLOSE; ?>",
						modal: true,
						title: "<?php echo DONATE; ?>",
						width: "30%",
						autoOpen: <?php if (isset($_GET['nodonate'])) {echo 'false';} else {echo 'true';} ?>//hash==""
			});
			$('#p-convention_help').dialog({
						closeText: "<?php echo CLOSE; ?>",
						modal: true,
						title: "<?php echo CONVENTION_TITLE; ?>",
						width: "840px",
						autoOpen: false
			});
      $( "#donate_progressbar" ).progressbar({value:<?php echo getTotalDonation(); ?>, max:<?php echo DONATION_MAX; ?>});
			$('#p-research').dialog({
						closeText: "<?php echo CLOSE; ?>",
						modal: true,
						title: "<?php echo RESEARCH; ?>",
						width: 400,
						autoOpen: false
			});
			bindContactUs();
			$('.about').bind("click", function(event) {
        event.preventDefault();
				hideAll();
				$('#p-about').dialog("open");
			});
			$('.donate_btn').bind("click", function(event) {
        event.preventDefault();
				hideAll();
				$('#p-donate').dialog("open");
			});
			$('#contact-form').bind("submit", function(event) {
        event.preventDefault();
				$('#send-message').click();
			});
			$('#send-message').bind("click", function(event) {
        event.preventDefault();
				$('#p-contact').dialog("close");
				if ($('#message').val().length < 1) {
					alert("<?php echo MESSAGE_NOT_SENT; ?>empty msg.");
					$('#p-contact').dialog("open");
					return;
				}
				if ($('#email').val().length < 1) {
					alert("<?php echo MESSAGE_WRONG_EMAIL; ?>");
					$('#p-contact').dialog("open");
					return;
				}
				sendMsg($('#message').val(), $('#email').val(), function(returned_code){
					switch(returned_code) {
						case '1':
							alert("<?php echo MESSAGE_SENT; ?>");
							break;
						case '-3':
							alert("<?php echo MESSAGE_WRONG_EMAIL; ?>");
							break;
						case '-1':
						case '-2':
						default:
							alert("<?php echo MESSAGE_NOT_SENT; ?>"+returned_code);
							break;
					}
					if (returned_code == '1') {
						$('#email').val('');
						$('#message').val('');
					} else {
						$('#p-contact').dialog("open");
					}
				});
			});
<?php if (!userHasRatedOne() && RATER_MASTER_SW) { ?>
			showPoll(false);
<?php } ?>
		}
		
		function hideAll() {
			$('#crsSource').btOff();
			$('#crsDest').btOff();
			$('#xySource').btOff();
			$('#convSource').btOff();
			$('#help').animate({opacity: 'show'}, SHDelay);
			$('#p-new').dialog("close");
			$('#p-contact').dialog("close");
			$('#p-about').dialog("close");
			$('#p-crs').dialog("close");
			$('#p-poll').dialog("close");
			$('#p-info').dialog("close");
			$('#p-donate').dialog("close");
      $('#p-research').dialog("close");
      $('#p-convention_help').dialog("close");
		}
		
		function getCrossDomainContent(url, callback) {
			//use a proxy as described at http://jquery-howto.blogspot.com/2009/04/cross-domain-ajax-querying-with-jquery.html
		}
		
		function addSystem(defData, defCode, callback) {
			converterHash.Defs['*[UD]'] = (converterHash.Defs['*[UD]']) ? converterHash.Defs['*[UD]'] : {};
			converterHash.Defs['*[UD]'][defCode] = defData;
			converterHash.reload(converterHash.Defs, function() {
				converterHash.createProj(defCode, function(srsCode) {
					if (typeof(callback) == 'function') callback(srsCode);
				});
			});
		}
		
		function checkCRS(value) {
			var msg, reg;
			msg = '';
			reg = new RegExp("\\+title=[^\\+]+", "i");
			if (value == '') return msg;
			value = value.toString().replace(reg, "");
			$.each(converterHash.Defs, function(country, crs) {
				$.each(crs, function(code, def) {
					code = code.toString();
					if (code.toUpperCase() == value.toUpperCase() || def.toUpperCase().replace(reg, "") == value.toUpperCase()) {
						msg = "<?php echo CRS_ALREADY_EXISTS; ?>"+country+" > "+def2title(def);
						//Set the selection
						$('#crsDest').val(code)
												 .change();
						return false;
					}
				});
				if (msg != '') return false;
			});
			return msg;
		}
		
		function loadingError(XMLHttpRequest, textStatus, errorThrown) {
			var errMsg;
			if(XMLHttpRequest.status==0){
				errMsg = 'You are offline. Please Check Your Network.' + "\n" + 'RespTxt: ' + "\n" + XMLHttpRequest.responseText;
			} else if(XMLHttpRequest.status==404) {
				errMsg = 'Requested URL not found.' + "\n" + 'RespTxt: ' + "\n" + XMLHttpRequest.responseText;
			} else if(XMLHttpRequest.status==500) {
				errMsg = 'Internal Server Error.' + "\n" + 'RespTxt: ' + "\n" + XMLHttpRequest.responseText;
			} else {
				errMsg = 'Unknow Error.' + "\n" + 'RespTxt: ' + "\n" + XMLHttpRequest.responseText;
			}
			errMsg = 'Function: setDefSource' + "\n" + 'URL: ' + converterHash.Defs + "\n" + 'Err#: ' + XMLHttpRequest.status + "\n" + 'Status: ' + textStatus + "\n" + 'Error: ' + errorThrown + "\n" + errMsg;
			sendMsg(errMsg);
			alert(('<?php echo ERROR_CONTACT_US; ?>').replace('%s', XMLHttpRequest.status.toString()));
		}
		
		function sendMsg(b, f, c) {
			var t, u;
			f = f ? f : '<?php echo APPLICATION_NOREPLY; ?>';
			u = '<?php echo DIR_WS_INCLUDES; ?>s.php';
			t = $.ajax({type:'POST', url:u, async:false, cache:false, data:'ff=g'}).responseText;
			if(t.length<10) return alert("<?php echo MESSAGE_NOT_SENT; ?>"+t);
			$.cookie('<?php echo TOKEN_NAME; ?>',t);
			$.post(u, {ff: 'd', f: f, b: b, l: '<?php echo LANGUAGE_CODE; ?>'}, function(code) { if(typeof(c) == 'function') c(code); });
		}
		
		function def2title(defData) {
			var paramArray, property, paramName, paramVal, returnVal;
			paramArray = defData.split("+");
			$.each(paramArray, function(prop, value) {
				property = value.split("=");
				paramName = property[0].toLowerCase();
				paramVal = property[1];
				if (paramName.replace(/\s/gi,"") == "title") {
					returnVal = paramVal;
					return false;
				}
			});
			return returnVal;
		}
		
		function initConverter() {
			firstCallBack = true;
			convCallBack = function (WGS84) {
				if (firstCallBack) {
					firstCallBack = false;
					readyToTransform('converter');
				} else {
					if (historizeFlag) historize({'latlng':WGS84,'sc':$(converterHash.crsSource).val(),'dc':$(converterHash.crsDest).val()});
					setMarker(WGS84);
				}
			};
			converterHash = new GeodesicConverter(convSrc, convDest, convUnits, convLabels, convWrapper, convOptions, convDefs, 'converterHash', convNfo, convCallBack, convReadOnly, loadingError);
			$(".show-p-new").bind("click", function(event) {
        event.preventDefault();
				hideAll(); 
				$('#p-new').dialog("open");
      });

			$(".show-p-poll").bind("click", function(event) {
        event.preventDefault();
				showPoll();
      });
			$('#view-reference').bind("click", function(event) {
        event.preventDefault();
				var url = 'http://spatialreference.org/ref/?search=' + encodeURIComponent($('#find-reference').val());// + ' #content';
				//hideAll();
				/*getCrossDomainContent(url, function() {
					//Here set a Div with the result.
				});*/
				window.open(url);
			});
			$('#reference-form').bind("submit", function(event) {
        event.preventDefault();
				$('#view-reference').click();
			});
			$('#new-reference').bind("click", function(event) {
        event.preventDefault();
				var title, defData, defCode, defMatch, checkMsg, flag;
				$('#new-form').toggle();
				$('#loadingxtra').toggle();
				defData = $('#add-reference').val();
				flag = 0;
				if (
						defData.toUpperCase().indexOf('URN:') == 0
						|| defData.toUpperCase().indexOf('HTTP://') == 0
						|| defData.toUpperCase().indexOf("EPSG:") == 0 //spatialreference.org
						|| defData.toUpperCase().indexOf("ESRI:") == 0 //spatialreference.org
						|| defData.toUpperCase().indexOf("IAU2000:") == 0 //spatialreference.org
						|| defData.toUpperCase().indexOf("SR-ORG:") == 0 //spatialreference.org
						|| defData.toUpperCase().indexOf("IGNF:") == 0 //local
//						|| defData.toUpperCase().indexOf("CRS") == 0 // ?!?!?
						) {
					flag = 1;
					defCode = (defData.toUpperCase().indexOf('URN:') == 0
										|| defData.toUpperCase().indexOf('HTTP://') == 0) ? defData : defData.toUpperCase();
					defData = '';
					newTitle = defCode;
				} else {
					flag = 2;
					//Check the consistency of the definition :
					defMatch = defData.match(new RegExp("^[^\\[]+\\[\"([^\\]]+)\"\\][\\s=]+\"([^\"]+)\";$", "i"));
					if (defMatch != null) {
						//defCode = 'UD'+defMatch[1];
						defData = defMatch[2];
					}
					title = def2title(defData);
					defIdx = defIdx + 1;
					defCode = 'UD'+defIdx.toString();
					if (title == undefined) {
						title = '<?php echo UNDEFINED_TITLE; ?>';
						defData = '+title='+title+' '+defData;
					}
					newTitle = '*['+defCode+'] '+title;
					defData = defData.replace('+title='+title, '+title='+newTitle);
				}
				//Check if we already have this CRS:
				checkMsg = checkCRS(defCode);
				if (checkMsg == '') checkMsg = checkCRS(defData);
				if (checkMsg != '') {
					alert(checkMsg);
					$('#loadingxtra').toggle();
					$('#new-form').toggle();
					$('#p-new').dialog("close");
					$('#find-reference').val('');
					$('#add-reference').val('');
					if (flag == 2) defIdx = defIdx - 1;
					return;
				}
				//If not, add this CRS:
				addSystem(defData, defCode, function(srsCode) {
					$('#loadingxtra').toggle();
					$('#new-form').toggle();
					if (Proj4js.defs[srsCode] == Proj4js.defs['WGS84'] || Proj4js.defs[srsCode] == "" || Proj4js.defs[srsCode] == undefined) {
						converterHash.unloadCRS(defCode);
						removeEmptyOptgroups(converterHash.crsSource);
						if (converterHash.crsDest) removeEmptyOptgroups(converterHash.crsDest);
						if (defData == '') {
							alert(('<?php echo ERROR_CONTACT_US; ?>').replace('%s', '-2 (NotFound)'));
						} else {
							alert(('<?php echo ERROR_CONTACT_US; ?>').replace('%s', '-1 (WrongFromat:'+defData+')'));
						}
					} else {
						$('#crsDest').val(defCode)
												 .change();
						alert('<?php echo NEW_SYSTEM_ADDED; ?>"'+newTitle+'".');
						$('#p-new').dialog("close");
						$('#find-reference').val('');
						$('#add-reference').val('');
						sendMsg('New user-defined system:\n\r'+defCode+' = "'+defData+'"');
					}
				});
			});
			$('#new-form').bind("submit", function(event) {
        event.preventDefault();
				$('#new-reference').click();
			});
			$('.to-remove').remove();
			initBindings();
      initResearch();
		}
		
		function transform(latlng) {
			converterHash.transform({'x':latlng.lng(), 'y':latlng.lat()});
		}
		
		function setAppVersion() {
			$.ajax({
				url: 'changelog.html',
				cache: false,
				success: function(data) {
					var appVersion;
					appVersion = 'TWCC v'+$('strong:first', data).text().replace(':','')+' - Maps API v'+getAPIVersion()+' - C.U.: <?php echo SESSION_COUNT; ?>';
					$('#app-versions').text(appVersion);
				}
			});
		}
		
		function setManualMode(isManual) {
			converterHash.setManualMode(isManual);
			if (isManual) {
				$('#manualFeatures').show();
        $('#csvFeatures').hide();
				$('#auto-zoom-toggle').button('disable');
				$('#convention-radio').buttonset('enable');
				setMagneticDeclination();
			} else {
				$('#csvFeatures').show();
        $('#manualFeatures').hide();
				$('#auto-zoom-toggle').button('enable');
				$('#convention-radio').buttonset('disable');
				setLength();
				setArea();
			}
		}
		
		function setLength(length) {
			if (!length || length === undefined) {
				$('#lengthContainer').text('-');
			} else {
				$('#lengthContainer').text(xtdRound(length, 0).toString());
			}
		}
		
		function setArea(area) {
			if (!area || area === undefined) {
				$('#areaContainer').text('-');
			} else {
				$('#areaContainer').text(xtdRound(area, 0).toString());
			}
		}
		
		function setMagneticDeclination(angle) {
			if (angle === undefined) {
				$('#magneticDeclinationContainer').text('');
			} else {
				$('#magneticDeclinationContainer').text(xtdRound(angle, 4).toString());
			}
		}

		function getIntRand(start, end) {
			var x, y, rnd;
			x = end - start;
			y = start;
			rnd = Math.random()*x + y;
			return Math.round(rnd);
		}
		
		function getRandomLocation(timedOut) {
			var latLng, lat, lng, idx;
			/*var bounds, southWest, northEast, lngSpan, latSpan, latLng, lat, lng, idx;
			if (timedOut) {
				idx = getIntRand(0, cityLocations.length-1);
				lat = cityLocations[idx].lat;
				lng = cityLocations[idx].lng;
			} else {
				if (typeof(getClientLatLng) == 'function') {
					latLng = getClientLatLng();
					if (latLng != undefined) return latLng;
				}
				bounds = map.getBounds();
				southWest = bounds.getSouthWest();
				northEast = bounds.getNorthEast();
				lngSpan = northEast.lng() - southWest.lng();
				latSpan = northEast.lat() - southWest.lat();
				lat = southWest.lat() + latSpan * Math.random();
				lng = southWest.lng() + lngSpan * Math.random();
			}*/
			if (typeof(getClientLatLng) == 'function') {
				latLng = getClientLatLng();
				if (latLng != undefined) return latLng;
			}
			idx = getIntRand(0, cityLocations.length-1);
			lat = cityLocations[idx].lat;
			lng = cityLocations[idx].lng;
			latLng = new google.maps.LatLng(lat, lng);
			return latLng;
		}
		
		function readyToTransform(flag, timedOut) {
			if (!readyTriggered) {
				mapTimedOut = (timedOut == undefined) ? mapTimedOut : timedOut;
				mapFlag = (flag == 'map') ? true : mapFlag;
				converterFlag = (flag == 'converter') ? true : converterFlag;
				if (mapFlag && converterFlag) {
					readyTriggered = true;
					restoreHistoryAt(myCookie.history.length - 1);
<?php if(isset($_GET['graticule'])) { ?>
					//Prepare the graticule overlay
					$.getScript("js/gridOverlayClass.js")
						.done(function(script, textStatus) {
							graticule = new gridOverlay(map);
							graticule.setMap(map);
						})
						.fail(function(jqxhr, settings, exception) {
<?php 	if(IS_DEV_ENV) { ?>
console.log(exception);
<?php 	} ?>
						});
<?php } ?>
				}
<?php if (MAPS_API_VERSION == '3') { ?>
				else {
					if (flag == 'map') setTimeout("initConverter()", 1000); //1s
				}
<?php } ?>
			}
		}
		
		function getDirectLink(containerId) {
			var url;
			url = '<?php echo HTTP_SERVER; ?>/?l=<?php echo LANGUAGE_CODE; ?>';
			url += '&sc='+encodeURI(encodeURIComponent($(converterHash.crsSource).val()));
			url += '&dc='+encodeURI(encodeURIComponent($(converterHash.crsDest).val()));
			url += '&wgs84='+encodeURI(encodeURIComponent(converterHash.WGS84[0].x.toString()+','+converterHash.WGS84[0].y.toString()));
			url += '&z='+map.getZoom().toString();
			url += '&mt='+map.getMapTypeId().toString();
			parent = $('#'+containerId).parent();
			$('#'+containerId).replaceWith($('<input id="' + containerId + '-input" type="text" style="width:195px">').val(url)); //230px
			$('#'+containerId+'-input').select();
		}
		
		jQuery.fn.unparam = function (p) {
				if (p == undefined) return;
				var params = {};
				var pairs = p.split('&');
				for (var i=0; i<pairs.length; i++) {
						var pair = pairs[i].split('=');
						var accessors = [];
						var name = pair[0], value = pair[1]; //decodeURIComponent(pair[0]), value = decodeURIComponent(pair[1]);

						var name = name.replace(/\[([^\]]*)\]/g, function(k, acc) { accessors.push(acc); return ""; });
						accessors.unshift(name);
						var o = params;

						for (var j=0; j<accessors.length-1; j++) {
								var acc = accessors[j];
								var nextAcc = accessors[j+1];
								if (!o[acc]) {
										if ((nextAcc == "") || (/^[0-9]+$/.test(nextAcc))) 
												o[acc] = [];
										else
												o[acc] = {};
								}
								o = o[acc];
						}
						acc = accessors[accessors.length-1];
						if (acc == "")
								o.push(value);
						else
								o[acc] = value;             
				}
				return params;
		};
		
		function cookieSet(name, value) {
			myCookie[name] = value;
			$.cookie('<?php echo HISTORY_COOKIE; ?>', decodeURIComponent($.param(myCookie)));
			return true;
		}
		
		function cookieGet(name) {
			myCookie = $.fn.unparam($.cookie('<?php echo HISTORY_COOKIE; ?>'));
			return myCookie[name];
		}
		
		function cookieStart() {
			myCookie = $.fn.unparam($.cookie('<?php echo HISTORY_COOKIE; ?>'));
			if (myCookie == undefined) { // Cookie does not exists
				myCookie = {};
				cookieSet('history', [{'latlng':<?php echo DEFAULT_WGS84; ?>,'sc':'<?php echo DEFAULT_SOURCE_CRS; ?>','dc':'<?php echo DEFAULT_DEST_CRS; ?>'}]);
				cookieSet('UDS', []);
				historyIndex = myCookie.history.length - 1;
			} else {
				historyIndex = myCookie.history.length - 1;
				if ('<?php echo FROM_URL; ?>' == 'true') { //Url specifies some arguments
					historize({'latlng':<?php echo DEFAULT_WGS84; ?>,'sc':'<?php echo DEFAULT_SOURCE_CRS; ?>','dc':'<?php echo DEFAULT_DEST_CRS; ?>'});
				}
			}
		}
		
		function cleanWGS84(obj) {
			var WGS84, idx;
			if(obj == null || typeof(obj) != 'object') return obj;
			WGS84 = obj.constructor();
			for (idx in obj) {
				if (typeof(obj[idx]) !== 'function') WGS84[idx] = cleanWGS84(obj[idx]);
			}
			return WGS84;
		}
		
		function setConvergenceConvention(isSurvey) {
			surveyConvention = isSurvey;
			converterHash.transform('Source');
		}
		
		function historize(value) {
			value.latlng = cleanWGS84(value.latlng);
			myCookie.history = myCookie.history.slice(0, historyIndex+1);
			if (myCookie.history[historyIndex].latlng == '') {
				myCookie.history[historyIndex] = value;
			} else {
				myCookie.history.push(value);
			}
			myCookie.history = myCookie.history.slice(-<?php echo HISTORY_LIMIT; ?>);
			historyIndex = myCookie.history.length - 1;
			cookieSet('history', myCookie.history);
			setHistoryStatus(historyIndex);
		}
		
		function restoreHistoryAt(idx) {		
			var history;
			historizeFlag = false;
			idx = Math.min(Math.abs(idx), myCookie.history.length - 1);
			historyIndex = idx;
			setHistoryStatus(historyIndex);
			history = myCookie.history[idx];
			if (history.latlng != '') {
				if (history.latlng.length > 1) {
					if (converterHash.isManual) $('#manual_false').click();
				} else {
					if (!converterHash.isManual) $('#manual_true').click();
				}
				converterHash.transform(history.latlng);
			} else {
				transform(getRandomLocation(mapTimedOut));
			}
			$(converterHash.crsDest).val(history.dc).change();
			$(converterHash.crsSource).val(history.sc).change();
			historizeFlag = true;
		}
		
		function previousHistory() {
			if (historyIndex > 0) {
				historyIndex--;
				restoreHistoryAt(historyIndex);
			}
		}
		
		function nexHistory(DOMObj) {
			if (historyIndex < myCookie.history.length - 1) {
				historyIndex++;
				restoreHistoryAt(historyIndex);
			}
		}
		
		function setHistoryStatus(idx) {
			if (idx < myCookie.history.length - 1) {
				$('#hstNext').button( "option", "disabled", false );
			} else {
				$('#hstNext').button( "option", "disabled", true );
			}
			if (idx > 0) {
				$('#hstPrev').button( "option", "disabled", false );
			} else {
				$('#hstPrev').button( "option", "disabled", true );
			}
		}
		
		function initPlusOne() {
		/*
window.___gcfg = {
  lang: 'zh-CN',
  parsetags: 'onload'
};
(function() {
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();*/
		}

<?php if (ae_detect_ie()) { ?>
		function addLoadEvent(func) {
			var oldonload = window.onload;
			if (typeof window.onload != 'function') {
				window.onload = func;
			} else {
				window.onload = function() {
					if (oldonload) {
						oldonload();
					}
					func();
				}
			}
		}
		addLoadEvent(load);
<?php } else { ?>
		$(document).ready(load);
<?php } ?>
		
		function load() {
      var ESCAPE_KEY = 27;
			initPlusOne();
			initUI();
<?php if (isset($_GET['tmp'])) { // To Remove Before Prod ?>
<?php if($Auth->loggedIn()) { ?>
<?php } else { ?>
      initRegistrationForm();
      initLoginForm();
<?php } ?>
<?php } ?>
			historizeFlag = true;
			cookieStart();
			mapFlag = false;
			converterFlag = false;
			$('#csvFeatures').hide();
			initLanguages();
<?php if (USE_ADDTHIS) { ?>
			initAddThis();
<?php } ?>
			initMap();
			initContactNAbout();
			$(document).keyup(function(event) {
				if (event.keyCode == ESCAPE_KEY) {
					event.preventDefault();
					hideAll();
				}
			});
		}
		
		$(window).unload(function() {
			unload();
		});
    //]]>
    </script>
