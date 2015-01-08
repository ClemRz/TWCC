/**
 * This file is part of TWCC.
 *
 * TWCC is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * TWCC is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with TWCC.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @copyright Copyright (c) 2010-2014 Clément Ronzon
 * @license http://www.gnu.org/licenses/agpl.txt
 */

/**
 * Events triggered by Auth and attached to the body:
 *  -
 */

(function($) {
    "use strict";
    /*global window, document, jQuery */

    if (window.TWCCAuth !== undefined) {
        return;
    }

    var instance,
    init = function(opts) {

        var _updateTips, _checkLength, _checkRegexp, _initRegistrationForm, _initLoginForm,
            _options = $.extend(true, {}, opts);

        function _t() {
            return _options.utils.t.apply(this, arguments);
        }

        function _checkUnicity(v,b,c,k) {
                var t, u;
                u = _options.system.dirWsIncludes + 'u.php';
                t = $.ajax({type:'POST', url:u, async:false, cache:false, data:'ff=g'}).responseText;
                if(t.length<10) {
                    alert((_t('errorContactUs')).replace('%s', t));
                } else {
                    _options.utils.setCookie(_options.system.tokenName, t);
                    $.post(u, {ff: 'd', t: t, b: b, c: c, v: v}, function(code) { if(typeof(k) == 'function') k(code==='1'); });
                }
        }

        if (_options.context.GET.isSetTmp) { // To Remove Before Prod
            if(_options.context.session.isLoggedIn) {
            } else {
                var _regName, _regEmail, _regPassword, _tips;

                _updateTips = function(t) {
                  _tips
                    .text(t)
                    .addClass('ui-state-highlight');
                  setTimeout(function() {
                    _tips.removeClass('ui-state-highlight', 1500);
                  }, 500);
                };

                _checkLength = function(o, n, min, max) {
                  if (o.val().length > max || o.val().length < min) {
                    o.addClass("ui-state-error");
                    _updateTips((_t('checkLength')).replace('%n', n).replace('%min', min).replace('%max', max));
                    return false;
                  } else {
                    return true;
                  }
                };

                _checkRegexp = function( o, regexp, n ) {
                  if ( !( regexp.test( o.val() ) ) ) {
                    o.addClass( "ui-state-error" );
                    _updateTips( n );
                    return false;
                  } else {
                    return true;
                  }
                };

                _initRegistrationForm = function() {
                  var hash = window.location.hash.replace("#", "");
                  _regName = $('#regName');
                  _regEmail = $('#regEmail');
                  _regPassword = $('#regPassword');
                  var allFields = $([]).add(_regName).add(_regEmail).add(_regPassword);
                  _tips = $('.validateTips');

                  var dialogOpts = {
                    autoOpen: hash=="register",
                    height: 300,
                    width: 350,
                    modal: true,
                    buttons: {
                      Cancel: function() {
                        $( this ).dialog("close");
                      }
                    },
                    close: function() {
                      allFields.val("").removeClass("ui-state-error");
                    }
                  };
                  dialogOpts[_t('signUp')] = function() {
                    var bValid = true;
                    allFields.removeClass( "ui-state-error" );

                    bValid = bValid && _checkLength(_regName, "username", 3, 16);
                    bValid = bValid && _checkLength(_regEmail, "email", 6, 80);
                    bValid = bValid && _checkLength(_regPassword, "password", 5, 16);

                    bValid = bValid && _checkRegexp(_regName, /^[a-z]([0-9a-z_\s])+$/i, _t('checkName'));
                    // From jquery.validate.js (by joern), contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
                    bValid = bValid && _checkRegexp(_regEmail, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, _t('checkEmail'));
                    bValid = bValid && _checkRegexp(_regPassword, /^([0-9a-zA-Z])+$/, _t('checkPassword'));

                    if ( bValid ) {
                      _checkUnicity(_regEmail.val(),'users','username',function(c) {
                        if (!c) {
                          _regEmail.addClass("ui-state-error");
                          _updateTips(_t('checkUnicity'));
                        } else {
            //DO HERE WHATEVER IT NEEDS TO BE DONE TO FOLLOW THE FLOW CHART
                          //$("#dialog-registration-form").dialog("close");
                          $('#register-form').submit();
                        }
                      });
                    }
                  };
                  $( "#dialog-registration-form" ).dialog(dialogOpts);

                  $("#sign-up")
                    .button()
                    .click(function() {
                      $("#dialog-registration-form").dialog("open");
                    });
                };

                _initLoginForm = function() {
                  var hash = window.location.hash.replace("#", "");
                  var logEmail = $('#logEmail');
                  var logPassword = $('#logPassword');
                  var allFields = $([]).add(logEmail).add(logPassword);
                  var buttonsOptions = {
                      Cancel: function() {
                        $( this ).dialog("close");
                      }
                    };

                  buttonsOptions[_t('logIn')] = function() {
                        $('#login-form').submit();
                      };

                  $( "#dialog-login-form" ).dialog({
                    autoOpen: hash=="login",
                    modal: true,
                    buttons: buttonsOptions,
                    close: function() {
                      allFields.val("");
                    }
                  });

                  $("#log-in")
                    .click(function(event) {
                      event.preventDefault();
                      $("#dialog-login-form").dialog("open");
                    });
                };
            }
        }

        function _initAuth() {
            if (_options.context.GET.isSetTmp) { // To Remove Before Prod
                if(_options.context.session.isLoggedIn) {
                } else {
                    _initRegistrationForm();
                    _initLoginForm();
                }
            }
        }

        _initAuth();
        return {
            /*promise: _dfd.promise()*/ //TODO
        };
    };

    // exports
    window.TWCCAuth = {
        getInstance: function (opts) {
            instance = instance || init(opts);
            return instance;
        }
    };
})(jQuery);