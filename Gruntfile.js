"use strict";

module.exports = function(grunt) {

    require("matchdep").filterDev("grunt-*")
        .forEach(grunt.loadNpmTasks);  

    // Project configuration.
    grunt.initConfig({
        connect: {
            server: {
                options: {
                    port: 8080,
                    base: ".",
                    middleware: function(connect, options) {
                        return [
                            require("grunt-contrib-livereload/lib/utils").livereloadSnippet,
                            connect.static(options.base)
                        ];
                    }
                }
            }
        },
        
        less:{
            development:{
                options: {},
                files: { "css/main.css": "css/main.less"}
            }
        },

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
                    "$": false,
                    "window": false,
                    "requirejs": false,
                    "require": false,
                    "define": false
                }
            },

            gruntfile: {
                src: "Gruntfile.js"
            },

            app_files: {
                src: ["scripts/*.js"]
            }
        },
        watch: {
            gruntfile: {
                files: "<%= jshint.gruntfile.src %>",
                tasks: ["jshint:gruntfile"]
            },

            app_files: {
                files: "<%= jshint.app_files.src %>",
                tasks: ["jshint:app_files"],
                options:{
                    livereload: true
                }
            },
            
            less: {
                files: "css/main.less",
                tasks: ["less:development"],
                options:{
                    livereload: true
                }
            },

            index: {
                files: ["index.html","css/xor.css"],
                options:{
                    livereload: true
                }
            }
        }
    });

    // Default task.
    grunt.registerTask("default", [
        "connect",
        "watch"
    ]);

};