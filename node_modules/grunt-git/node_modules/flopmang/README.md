flopmang
========

Flag-Option Manager for Grunt: framework for converting grunt task-options into CLI flags for child processes

## Getting started

**What this isn't:** this is not a grunt plugin. 

**What this is:** a utility to make writing and extending plugins that delegate to command line APIs easier. It provides a simple interface for mapping grunt-task-options to command line flags.

### Installation:
```shell
npm install --save flopmang
```

```js
var ArgUtil = require('flopmang');
```

### Quick example:
The code below illustrates how to set up a simple grunt multiTask that will run `npm install` in any directory you wish. When using configuring the task in the Gruntfile, the user will be able to specify the following options:

* *global* default: `undefined`: translated to `-g` if set to truey
* *saveDev* default: `undefined`: translated to `--save-dev` by underscore.string.dasherize
* *dir* default: `process.cwd`: translated to cwd option when spawning child process
*package* default: `undefined`: **required**. Only the value is appended to the args
```js
var ArgUtil = require('flopmang');
var async = require('async');

module.exports = function (grunt) {
    grunt.registerMulitTask(
        'npmInstall',
        'runs npm install in any directory'
        function () {
            var argConfigs = [
                {
                    option: 'global',
                    flag: '-g'
                },
                {
                    option: 'saveDev',
                },
                {
                    option: 'dir',
                    defaultValue: process.cwd,
                    useAsFlag:false,
                },
                {
                    option: 'package',
                    required: true,
                    useAsFlag: false,
                    useValue: true
                },
            ];
            var argUtil = new ArgUtil(this, argConfigs);

            var args = ['npm', 'install'].concat(argUtil.getArgFlags());

            var done = async();

            var options = argUtil.options;

            var spawnOpts = {};

            if (options.dir) {
                spawnOpts.cwd = options.dir;
            }

            var cp = grunt.util.spawn({
                args: args,
                opts: spawnOpts,
                function spawnEnd (err, result, code) {
                    if (err) {
                        throw err
                    }
                    grunt.log.writeln('\n' + result.stdout);
                    done();
                }
            });
        }
    );
```
The `argConfigs` array contains multiple objects that describe options, and how they should be mapped to CLI flags by `getArgFlags()`;

Using this multitask in a Gruntfile:

```js
grunt.initConfig({
    npmInstall{
        flopmang: {
            options: {
                package: 'flopmang',
                dir: '/home/dylancwood/project',
                global: false,
                saveDev: true
            }
        }
    }
});
```

## API
### argConfig
The following properties are available to configure each option/argument:

#### option
Type: `string`
Default value: `undefined`
**Required**

The name of the option (e.g. 'global' or 'package');

#### customFlagFn
Type: `function`
Default value: `undefined`

A function to be used to generate a custom flag value.
This function is given one argument: the current arg object.
This overrides `useAsFlag`.
example:
```
...
{
    option: 'customOption',
    customFlagFn: function (arg) {
        if (arg.value) {
            return arg.option + '-' + arg.value;
        }
        return null;
    }
}
...
```

#### customValueFn
Type: `function`
Default value: `undefined`

A function to be used to generate a custom value string.
This function is given one argument: the current arg object.
This overrides `useValue`. See above for example.

#### defaultValue
Type: `any`
Default value: `undefined`

The default value for the option if the user does not specify it

#### flag
Type: `string`
Default value: `undefined`

If set, and `useAsFlag` is true, this value will be used as the flag. This is overridden by the value returned by `customFlagFn`.

#### required
Type: `boolean`
Default value: `false`

If set to true, an error will be thrown if the value of the option is `null`, an empty string (`''`), or `undefined`. For more complex validation, see `validationFn`

#### useAsFlag
Type: `boolean`
Default value: `true`

If set to true, then the option label will be included in the flags unless the option's value is a falsy (*excluding zero*). This is overridden by the `customFlagFn`.

#### useDasherize
Type: `boolean`
Default value: `true`

If set to true, then the option label will be prepended with `--` and processed using underscore.string's `dasherize` function. (e.g. `oCamelCase` will be converted to `--o-camel-case`)

#### useValue
Type: `boolean`
Default value: `false`

If set to true, then the value of the option will be included in the flags unless the value is a falsy (*excluding zero*). This is overridden by the `customValueFn`.

#### validationFn
Type: `function`
Default value: `undefined`

The option will be validated using this function. This function may either throw an error, or return false to indicate that the option is invalid. Returning true indicates that the option is valid.
This function is given one argument: the current arg object.
example:
```
...
{
    option: 'customOption',
    validationFn: function (arg) {
        if (arg.value === undefined) {
            raise new Error('must provide a ' + arg.option);
        }
        if (arg.value > 10 && arg.value < 100) {
            return true
        }
        return false;
    }
}
...
```
#### value
Type: `any`
Default value: `undefined`

This should never be used. Though it is possible to set the value here, it will be overridden by the defaultValue before the constructor returns. 

### Constructor
```js
var flopmang = new FlOpMang(task, configs);
```
The constructor takes two arguments:

#### task
Type: `object`

The current grunt task. This is used to extend the default values with the user-provided options at run-time. Depending on the context from which you are calling the constructor, you can use `this`, or `grunt.task.current`.

#### configs
Type: `array`

An array of argConfig configuration objects as described above.
Example:
```js
var configs = [
    { option: 'option1' },
    { option: 'option2', useValue: true }
];
var flopMang = new FlopMang(grunt.task.current, configs);
```

### getArgFlags
The getArgFlags method returns an array of flags that have been created according to the `configs` and user-specified options. 

#### Example:
Suppose that we have the following `configs`:
```js
[
    { option: 'option1'},
    { option: 'option2', flag: '-o', defaultValue: true },
    { option: 'option3', useAsFlag: false, useValue: true }
]
```
And suppose that the config for the current task/target looks like this:
```js
options: {
    option1: true,
    option3: 100
}
```
getArgFlags will produce the following output:
```js
['--option1', '-o', 100]

```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
