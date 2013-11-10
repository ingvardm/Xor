'use strict';

module.exports = function(grunt) {

    require('matchdep').filterDev('grunt-*')
        .forEach(grunt.loadNpmTasks);  

    // Project configuration.
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: '.',
                    middleware: function(connect, options) {
                        return [
                            require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
                            connect.static(options.base)
                        ];
                    }
                }
            }
        },
        // Task configuration.
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                node: true,
                globals: {
                    '$': false
                }
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            app_files: {
                src: ['js/*.js']
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            app_files: {
                files: '<%= jshint.app_files.src %>',
                tasks: ['jshint:app_files']
            },
            index: {
                files: ['index.html'],
                options:{
                    livereload: true
                }
            }
        }
    });

    // Default task.
    grunt.registerTask('default', [
        'connect',
        'watch'
    ]);

};