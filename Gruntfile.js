module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        banner:
            ' * <%= pkg.name %> - Version <%= pkg.version %>\n' +
            ' * <%= pkg.description %>\n' +
            ' * Author: <%= pkg.author.name %> - <%= pkg.author.email %>\n' +
            ' * Build date: <%= grunt.template.today("yyyy-mm-dd HH:MM:ss") %>\n' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.company %>\n' +
            ' * Released under the <%= pkg.license %> license\n' +
            ' *\n' +
            ' * This file is part of TWCC.\n' +
            ' *\n' +
            ' * TWCC is free software: you can redistribute it and/or modify\n' +
            ' * it under the terms of the GNU Affero General Public License as published by\n' +
            ' * the Free Software Foundation, either version 3 of the License, or\n' +
            ' * (at your option) any later version.\n' +
            ' *\n' +
            ' * TWCC is distributed in the hope that it will be useful,\n' +
            ' * but WITHOUT ANY WARRANTY; without even the implied warranty of\n' +
            ' * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n' +
            ' * GNU Affero General Public License for more details.\n' +
            ' *\n' +
            ' * You should have received a copy of the GNU Affero General Public License\n' +
            ' * along with TWCC.  If not, see <http://www.gnu.org/licenses/>.\n' +
            ' *\n' +
            ' * @copyright Copyright (c) 2010-2014 Clément Ronzon\n' +
            ' * @license http://www.gnu.org/licenses/agpl.txt\n',
        pkg: grunt.file.readJSON('package.json'),
        clean: ['webapp/js/dist', 'webapp/css/dist'],
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    'webapp/js/vendor/ZeroClipboard.min.js',
                    'webapp/js/history.js',
                    'webapp/js/main.js',
                    'webapp/js/math.js',
                    'webapp/js/vendor/jquery.bgiframe.js',
                    'webapp/js/vendor/jquery.bt.min.custom.js',
                    'webapp/js/vendor/jquery-ui.min.js',
                    'webapp/js/vendor/jquery.cookie.js',
                    'webapp/js/vendor/jquery.fullscreen-min.js',
                    'webapp/js/vendor/cookie-script.min.js',
                    'webapp/js/vendor/proj4.js',
                    'webapp/js/converter.class.js',
                    'webapp/js/vendor/cof2Obj.js',
                    'webapp/js/vendor/geomag.js',
                    'node_modules/blockadblock/blockadblock.js',
                    'webapp/js/map.bundle.js',
                    'webapp/js/ui.js',
                    'webapp/js/converter.js',
                    'webapp/js/analytics.js'
                ],
                dest: 'webapp/js/dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= banner %> */\n'
            },
            dist: {
                files: {
                    'webapp/js/dist/<%= pkg.name %>-<%= pkg.version %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        cssmin: {
            my_target: {
                files: [
                    {
                        expand: true,
                        cwd: 'webapp/css/',
                        src: ['all.css'],
                        dest: 'webapp/css/dist/',
                        ext: '-<%= pkg.version %>.min.css'
                    }
                ]
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'webapp/js/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: false,
                    module: true,
                    document: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        },
        replace: {
            template: {
                src: ['webapp/templates/*'],
                dest: 'webapp/',
                replacements: [{
                    from: /<%= [^%]+ %>/g,
                    to: function(matchedWord) {
                        return matchedWord;
                    }
                }]
            }
        },
        gitadd: {
            task: {
                options: {
                    force: true
                },
                files: {
                    src: ['<%= clean %>']
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-git');

    // Default task(s).
    grunt.registerTask('default', ['jshint', 'clean', 'concat', 'uglify', 'cssmin', 'replace', 'gitadd']);

};