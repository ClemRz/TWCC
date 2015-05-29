/*
 * flopmang
 * https://github.com/dylancwood/flopmang
 *
 * Copyright (c) 2014 Dylan Wood
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        watch: {
            dev: {
                files: ['lib/*.js', 'test/*.js'],
                tasks: ['jshint', 'test']
            }
        },

        jshint: {
            all: [
                'Gruntfile.js',
                'lib/*.js',
                'test/**.js'
            ],
            options: {
                jshintrc: '.jshintrc',
            },
        },

        jscs: {
            src: {
                options: {
                    config: '.jscs.json'
                },
                files: {
                    src: [
                        'Gruntfile.js',
                        'lib/*.js',
                        'test/**.js'
                    ],
                }
            },
        },

        mochacli: {
            options: {
                files: 'test/*_test.js'
            },
            spec: {
                options: {
                    reporter: 'spec',
                    timeout: 10000
                }
            }
        },

        bump: {
            options: {
                files: ['package.json'],
                commitFiles: ['-a'],
                pushTo: 'origin'
            }
        },
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.loadNpmTasks('grunt-mocha-cli');
    grunt.loadNpmTasks('grunt-bump');

    grunt.registerTask('test', ['jshint', 'jscs', 'mochacli']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['test']);

};
