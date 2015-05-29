'use strict';

var assert = require('assert');

var _ = require('underscore');
var Arg = require('../lib/arg.js');

describe('arg', function () {
    describe('constructor', function () {
        it('should create new Arg with all properties provided', function () {
            var config = {
                option: 'testStr',
                defaultValue: 'testStr',
                validationFn: 'testStr',
                flag: 'testStr',
                useDasherize: 'testStr',
                required: 'testStr',
                useValue: 'testStr',
                useAsFlag: 'testStr',
                value: 'testStr',
                customValueFn: 'testStr',
                customFlagFn: 'testStr'
            };
            var arg = new Arg(config);
            assert.deepEqual(arg, config);
        });
        it('should use proper defaults', function () {
            var config = {
                option: 'testStr'
            };
            var expectedObj = {
                option: 'testStr',
                defaultValue: undefined,
                validationFn: undefined,
                flag: undefined,
                useDasherize: true,
                required: false,
                useValue: false,
                useAsFlag: true,
                value: undefined,
                customValueFn: undefined,
                customFlagFn: undefined
            };
            var arg = new Arg(config);
            assert.deepEqual(arg, expectedObj);
        });
        it('should throw error if invalid config is passed', function () {
            var expectedErrMsg = 'Unknown values passed to Arg constructor';
            var errorMsg = '';
            var config = {
                option: 'testStr',
                invalidProperty: null
            };
            try {
                var arg = new Arg(config);
            } catch (e) {
                errorMsg = e.message;
            }
            assert.equal(errorMsg.match(expectedErrMsg), expectedErrMsg);
        });
        it('should throw error if no option name is passed', function () {
            var expectedErrMsg = 'An `option` property must be specified in Arg';
            var errorMsg = '';
            var config = {
            };
            try {
                var arg = new Arg(config);
            } catch (e) {
                errorMsg = e.message;
            }
            assert.equal(errorMsg.match(expectedErrMsg), expectedErrMsg);
        });
    });
    describe('getFlag', function () {
        it('should create dasherized flag using option name', function () {
            var config = {
                option: 'testStr',
                value: true
            };
            var arg = new Arg(config);
            var expected = '--test-str';
            var result = arg.getFlag();
            assert.equal(expected, result);
        });
        it('should use provided flag', function () {
            var config = {
                option: 'testStr',
                flag: 'anotherTestStr',
                value: true
            };
            var arg = new Arg(config);
            var expected = 'anotherTestStr';
            var result = arg.getFlag();
            assert.equal(expected, result);
        });
        it('should use customFlagFn', function () {
            var config = {
                option: 'testStr',
                flag: 'anotherTestStr',
                customFlagFn: function (arg) {
                    return arg.value + 'Test';
                },
                value: 'cool'
            };
            var arg = new Arg(config);
            var expected = 'coolTest';
            var result = arg.getFlag();
            assert.equal(expected, result);
        });
        it('should use customFlagFn even if useAsFlag is false', function () {
            var config = {
                option: 'testStr',
                flag: 'anotherTestStr',
                customFlagFn: function (arg) {
                    return arg.value + 'Test';
                },
                value: 'cool',
                useAsFlag: false
            };
            var arg = new Arg(config);
            var expected = 'coolTest';
            var result = arg.getFlag();
            assert.equal(expected, result);
        });
        it('should use optionName if dasherize is false', function () {
            var config = {
                option: 'testStr',
                value: 'cool',
                useDasherize: false
            };
            var arg = new Arg(config);
            var expected = 'testStr';
            var result = arg.getFlag();
            assert.equal(expected, result);
        });
        it('should return null if value is falsy', function () {
            var config = {
                option: 'testStr',
                value: false,
                useDasherize: false
            };
            var arg = new Arg(config);
            var expected = null;
            var result = arg.getFlag();
            assert.equal(expected, result);
        });
        it('should return null if useAsFlag is falsy', function () {
            var config = {
                option: 'testStr',
                value: true,
                useAsFlag: false
            };
            var arg = new Arg(config);
            var expected = null;
            var result = arg.getFlag();
            assert.equal(expected, result);
        });
        it('should error if required is true and value is falsy', function () {
            var expectedErrMsg = 'testStr is required';
            var errorMsg = '';
            var config = {
                option: 'testStr',
                value: null,
                required: true
            };
            var arg = new Arg(config);
            try {
                var result = arg.getFlag();
            } catch (e) {
                errorMsg = e.message;
            }
            assert.equal(errorMsg.match(expectedErrMsg), expectedErrMsg);
        });
    });
    describe('validate', function () {
        it('should error if required is true and value is falsy', function () {
            var expectedErrMsg = 'testStr is required';
            var errorMsg = '';
            var config = {
                option: 'testStr',
                value: null,
                required: true
            };
            var arg = new Arg(config);
            try {
                var result = arg.validate();
            } catch (e) {
                errorMsg = e.message;
            }
            assert.equal(errorMsg.match(expectedErrMsg), expectedErrMsg);
        });
        it('should NOT error if required is true and value is zero', function () {
            var expectedErrMsg = 'nothing';
            var errorMsg = 'nothing';
            var config = {
                option: 'testStr',
                value: 0,
                required: true
            };
            var arg = new Arg(config);
            try {
                var result = arg.validate();
            } catch (e) {
                errorMsg = e.message;
            }
            assert.equal(errorMsg.match(expectedErrMsg), expectedErrMsg);
        });
        it('should NOT error if required is true and value is truey', function () {
            var expectedErrMsg = 'nothing';
            var errorMsg = 'nothing';
            var config = {
                option: 'testStr',
                value: true,
                required: true
            };
            var arg = new Arg(config);
            try {
                var result = arg.validate();
            } catch (e) {
                errorMsg = e.message;
            }
            assert.equal(errorMsg.match(expectedErrMsg), expectedErrMsg);
        });
        it('should use validation function', function () {
            var expectedErrMsg = 'custom validation error';
            var errorMsg = 'nothing';
            var config = {
                option: 'testStr',
                value: true,
                validationFn: function (arg) {
                    if (arg.option === 'testStr') {
                        throw new Error('custom validation error');
                    }
                }
            };
            var arg = new Arg(config);
            try {
                var result = arg.validate();
            } catch (e) {
                errorMsg = e.message;
            }
            assert.equal(errorMsg.match(expectedErrMsg), expectedErrMsg);
        });
    });
    describe('setValueFromOptions', function () {
        it('should populate value from options', function () {
            var config = {
                option: 'testStr',
                defaultValue: 'testStr'
            };
            var options = { testStr: 'newValue' };
            var arg = new Arg(config);
            arg.setValueFromOptions(options);
            assert.equal(arg.value, options.testStr);
        });
    });
    describe('getValue', function () {
        it('should not return value in default state', function () {
            var config = {
                option: 'testStr',
                value: 'testStr'
            };
            var arg = new Arg(config);
            var expected = null;
            var result = arg.getValue();
            assert.equal(expected, result);
        });
        it('should return value when useValue is true', function () {
            var config = {
                option: 'testStr',
                value: 'testStr',
                useValue: true
            };
            var arg = new Arg(config);
            var expected = 'testStr';
            var result = arg.getValue();
            assert.equal(expected, result);
        });
        it('should use customValueFn', function () {
            var config = {
                option: 'testStr',
                flag: 'anotherTestStr',
                customValueFn: function (arg) {
                    return arg.value + 'Test';
                },
                value: 'cool',
                useValue: true
            };
            var arg = new Arg(config);
            var expected = 'coolTest';
            var result = arg.getValue();
            assert.equal(expected, result);
        });
        it('should use customValueFn even if useValue is false', function () {
            var config = {
                option: 'testStr',
                flag: 'anotherTestStr',
                customValueFn: function (arg) {
                    return arg.value + 'Test';
                },
                value: 'cool',
                useValue: false
            };
            var arg = new Arg(config);
            var expected = 'coolTest';
            var result = arg.getValue();
            assert.equal(expected, result);
        });
        it('should return null if value is falsy', function () {
            var config = {
                option: 'testStr',
                value: '',
                useDasherize: false,
                useValue: true
            };
            var arg = new Arg(config);
            var expected = null;
            var result = arg.getValue();
            assert.equal(expected, result);
        });
        it('should return null if useValue is falsy', function () {
            var config = {
                option: 'testStr',
                value: true,
                useValue: false
            };
            var arg = new Arg(config);
            var expected = null;
            var result = arg.getValue();
            assert.equal(expected, result);
        });
        it('should error if required is true and value is falsy', function () {
            var expectedErrMsg = 'testStr is required';
            var errorMsg = '';
            var config = {
                option: 'testStr',
                value: null,
                required: true
            };
            var arg = new Arg(config);
            try {
                var result = arg.getValue();
            } catch (e) {
                errorMsg = e.message;
            }
            assert.equal(errorMsg.match(expectedErrMsg), expectedErrMsg);
        });
    });
});
