module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            commom: {
                src: ["src/**/*.js"],
                dest: "www/main.js",
                options: {
                    debug: true
                }
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
            package: {
                src: "package.json",
                dest: 'www/'
            }
        },

        handlebarsify: {
            compile: {
               files: {
                   "templateJS/template.js": "src/templates/template.hbs",
                   "templateJS/partial.js": "src/templates/partial.hbs"
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
                tasks: ['browserify'],
                options: {
                    atBegin: true
                }
            },
            templates: {
                files: "src/templates/*.hbs",
                tasks: ["handlebarsify", "browserify"]
            },
            css: {
                files: "css/*.scss",
                tasks: "sass"
            },
        },

        clean: {
            build: ["src/templateJS", "www/main.js", "www/main.css", "www/package.json"],
        },

        connect: {
            server: {
                options: {
                    port: 9000,
                    base: "www"
                }
            }
        },

        nodewebkit: {
            options: {
                app_name: "nodewebkitapp",
                build_dir: "./webkitbuilds",
                win: true,
                mac: true,
                linux64: true,
                keep_nw: true
            },
            src: ["www/*"]
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-handlebarsify");
    grunt.loadNpmTasks("grunt-node-webkit-builder");

        // Default task(s).
    grunt.registerTask('check', ['jshint']);
    grunt.registerTask('build', ['sass', 'handlebarsify']);
    grunt.registerTask('install', ["browserify"]);
    grunt.registerTask('default', ["check", "build", "install", "connect", "watch"]);
    grunt.registerTask("release", ["check", "build", "copy", "install", "nodewebkit"]);
};
