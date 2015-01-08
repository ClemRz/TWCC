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

(function($) {
    "use strict";
    /*global window, document, jQuery */

    if (window.TWCCHistory !== undefined) {
        return;
    }

    var instance,
    init = function(opts) {

        var _options = $.extend(true, {}, opts),
            _array,
            _index,
            _enabled = true,
            _cookieName = _options.system.historyCookie,
            _min = 0,
            _max = _options.system.historyLimit;

        function _cleanWgs84(obj) {
            var wgs84, idx;
            if(obj === null || typeof(obj) != 'object') return obj;
            wgs84 = obj.constructor();
            for (idx in obj) {
                if (obj.hasOwnProperty(idx)) wgs84[idx] = _cleanWgs84(obj[idx]);
            }
            return wgs84;
        }
        function _importArray() {
            _array = _options.utils.getCookieContent(_cookieName);
            if ($.isEmptyObject(_array)) {
                _array = [];
            }
            _setIndexAt(_getMaxPosition());
        }
        function _getArray() {
            return _array;
        }
        function _exportArray() {
            _options.utils.setCookieContent(_cookieName, _getArray());
        }
        function _setArray(value) {
            _array = value;
        }
        function _toggle(enabled) {
            _enabled = enabled;
        }
        function _getMaxPosition() {
            return _getArray().length - 1;
        }
        function _setIndexAt(idx) {
            _index = Math.min(Math.abs(idx), _max);
            _options.utils.trigger($('body'), 'history.indexchanged', {
                currentIndex: idx,
                maxIndex: _getMaxPosition(),
                currentValue: _getCurrentValue()
            });
        }
        function _resetIndex() {
            _setIndexAt(_getMaxPosition());
        }
        function _getCurrentValue() {
            return _getArray()[_index];
        }
        function _push(value) {
            _array.push(value);
        }
        function _moveTo(idx) {
            _setIndexAt(idx);
            return _getCurrentValue();
        }
        function _sliceContent() {
            _setArray(_getArray().slice(_min, _index+1));
        }
        function _limit() {
            _setArray(_getArray().slice(-_max));
        }
        function _add(value) {
            if (_enabled && value) {
                value.wgs84 = _cleanWgs84(value.wgs84);
                if (JSON.stringify(value) !== JSON.stringify(_getCurrentValue())) {
                    _sliceContent();
                    _push(value);
                    _limit();
                    _resetIndex();
                    _exportArray();
                }
            }
        }
        function _moveToPrevious() {
            if (_index > _min) {
                return _moveTo(_index - 1);
            } else {
                return _getCurrentValue();
            }
        }
        function _moveToNext() {
            if (_index < _getMaxPosition()) {
                return _moveTo(_index + 1);
            } else {
                return _getCurrentValue();
            }
        }

        function _init() {
            _importArray();
        }

        _init();
        return {
            toggle: _toggle,
            isEnabled: function() {return _enabled;},
            add: _add,
            moveToPrevious: _moveToPrevious,
            moveToNext: _moveToNext,
            getCurrentValue: _getCurrentValue
        };
    };

    // exports
    window.TWCCHistory = {
        getInstance: function (opts) {
            instance = instance || init(opts);
            return instance;
        }
    };
})(jQuery);