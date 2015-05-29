'use strict';

var assert = require('assert');

var _ = require('underscore');
var ArgUtil = require('../lib/argUtil.js');

// Create an object to emulate the grunt.task.current object
var GruntTaskPolyfill = function (options) {
    this.taskOptions = options;
};
GruntTaskPolyfill.prototype.options = function (extendThis) {
    return _.extend(extendThis, this.taskOptions);
};

describe('argUtil', function () {
    var configs = [
        {
            option: 'testStr',
            defaultValue: 'testStr'
        },
        {
            option: 'testStr2',
            defaultValue: 'testStr2',
            useValue: true
        },
    ];
    var options = {
        testStr: false
    };
    var expectedOptions = {
        testStr: false,
        testStr2: 'testStr2'
    };
    var task = new GruntTaskPolyfill(options);
    var argUtil = new ArgUtil(task, configs);
    describe('constructor', function () {
        describe('args', function () {
            it('should create an args array', function () {
                assert(argUtil.args.length === 2, 'Two args must be created');
                assert.equal(argUtil.args[0].option, configs[0].option);
                assert.equal(argUtil.args[0].defaultValue, configs[0].defaultValue);
                assert.equal(argUtil.args[0].flag, undefined);
                assert.equal(argUtil.args[1].option, configs[1].option);
                assert.equal(argUtil.args[1].defaultValue, configs[1].defaultValue);
                assert.equal(argUtil.args[1].flag, undefined);
            });
        });
        describe('options', function () {
            it('should have an options property', function () {
                assert(!!argUtil.options, 'options property not set');
                assert.deepEqual(argUtil.options, expectedOptions);
            });
        });
        describe('argument values', function () {
            it('should have set values in all options', function () {
                argUtil.args.forEach(function (arg) {
                    assert.equal(
                        arg.value,
                        expectedOptions[arg.option],
                        'value for ' + arg.option + ' not set'
                    );
                });
            });
        });
    });
    describe('getArgFlags', function () {
        it('return flags', function () {
            var expectedFlags = [
                '--test-str2',
                'testStr2'
            ];
            var flags = argUtil.getArgFlags();
            assert.deepEqual(expectedFlags, flags);
        });
    });
});
