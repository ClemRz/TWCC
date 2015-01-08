(function($, App) {
    "use strict";
    /*global window, jQuery, App */

    function _getRandomInteger(start, end) {
        var x, y, rnd;
        x = end - start;
        y = start;
        rnd = Math.random()*x + y;
        return Math.round(rnd);
    }

    function _round(value, decimals) {
        var valStr;
        decimals = decimals === undefined ? 0 : decimals;
        valStr = value.toString();
        if (valStr === '' || valStr == 'NaN') {
            return '';
        } else {
            return Math.round(_parseFloat(value) * Math.pow(10, _parseFloat(decimals))) / Math.pow(10, _parseFloat(decimals));
        }
    }

    function _parseFloat(value) {
        value = value.toString().replace(/,/gi, '.');
        if (isNaN(value)) value = 0;
        return parseFloat(value);
    }

    /**
     * Add Math to App
     */
    $.extend(App, {
        math: {
            getRandomInteger: _getRandomInteger,
            round: _round,
            parseFloat: _parseFloat
        }
    });
})(jQuery, App);