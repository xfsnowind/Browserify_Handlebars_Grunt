module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            debug: {
                src: ["src/**/*.js"],
                dest: "www/main.js",
                options: {
                    debug: true
                }
            },
            test: {
                src: ["test/specs/*.js"],
                dest: "test/testmain.js",
                options: {
                    debug: true
                }
            },
            release: {
                src: ["src/**/*.js"],
                dest: "www/main.js",
            }
        },

        sass: {
            main: {
                options: {
                    noCache: true
                },
                files: {
                    'www/main.css': 'css/main.scss'
                }
            }
        },

        copy: {
            resources: {
                cwd: "src/",
                expand: true,
                src: ["resources/**/*"],
                dest: "www/"
            },
            package: {
                src: "package.json",
                dest: 'www/'
            // },
            // release: {
            //     cwd: "webkitbuilds/releases/nodewebkitapp/",
            //     expand: true,
            //     src: ["**/*"],
            //     dest: "bin/"
            }
        },

        handlebarsify: {
            compile: {
               files: {
                   "src/templateJS/screen.js": "src/templates/screen.hbs"
               }
            },
        },

        jshint: {
            // define the files to lint
            files: ['gruntfile.js', 'src/*.js'],
            options: {
                // more options here if you want to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },

        jslint: {
           ci: {
                src: [
                    'src/*.js'
                ],
                // options: {
                //     failOnError: false,
                //     checkstyle: 'jslint.xml',
                // }
           }
        },

        watch: {
            options: {
                livereload: true
            },
            gruntfiles: {
                files: "gruntfile.js",
                task: ['clean', 'default']
            },
            src: {
                files: "src/*.js",
                tasks: ['test_part', 'browserify:debug'],
                options: {
                    atBegin: true
                }
            },
            templates: {
                files: "src/templates/*.hbs",
                tasks: ["handlebarsify", "browserify:debug"]
            },
            css: {
                files: "css/*.scss",
                tasks: "sass"
            },
        },

        clean: {
            build: ["src/templateJS/", "www/main.js", "www/main.css", "www/package.json", "www/resources"],
            test: ["test/*.js"],
            release: ["webkitbuilds"]
        },

        mochaTest: {
          test: {
            options: {
              reporter: 'spec'
            },
            src: ['test/specs/*.js']
          }
        },

        mocha: {
            default: {
                options: {
                    urls: [ 'http://localhost:9002/test/index.html' ]
                }
            },
            ci: {
                options: {
                    // reporter: 'xunit-file',
                    urls: [ 'http://localhost:9002/test/index.html' ]
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 9000,
                    base: "www"
                }
            // },
            // test: {
            //     options: {
            //         port: 9002,
            //         base: "."
            //     }
            }
        },

        nodewebkit: {
            options: {
                app_name: "nodewebkitapp",
                build_dir: "./webkitbuilds",
                win: true,
                mac: true,
                linux64: true,
                linux32: true,
                keep_nw: true
            },
            src: ["www/**/*"]
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-mocha');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-handlebarsify");
    grunt.loadNpmTasks("grunt-node-webkit-builder");

    // Default task(s).
    grunt.registerTask('check', [
        "jshint",
        "jslint"
    ]);

    grunt.registerTask('test_part', [
        // 'connect:test',
        'mochaTest',
        'browserify:test',
        // 'mocha:default'
    ]);

    grunt.registerTask('build', [
        'sass',
        'handlebarsify'
    ]);

    grunt.registerTask('build_for_debug', [
        "browserify:debug",
        "copy:resources"
    ]);

    grunt.registerTask('build_for_release', [
        "browserify:release",
        "copy:package"
    ]);

    grunt.registerTask('test', [
        'check',
        'build',
        'browserify:debug',
        'browserify:test',
        'mochaTest',
        // 'connect:test',
        // 'mocha:default'
    ]);

    grunt.registerTask('default', [
        "check",
        "build",
        "build_for_debug",
        "test_part",
        "connect:server",
        "watch"
    ]);

    grunt.registerTask("release", [
        "check",
        "build",
        "build_for_release",
        "test_part",
        "nodewebkit",
        "copy:release"
    ]);
};
