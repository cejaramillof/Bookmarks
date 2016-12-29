module.exports = function (grunt) {
    grunt.initConfig({
        concat: {
            css: {
                src: [
                    'css/*'
                ],
                dest: 'build/css/app.css'
            },
            js: {
                src: [
                    // 'lib/*' (Todas las librerias del proyecto)
                    './bower_components/jquery/dist/jquery.js',
                    './bower_components/bootstrap/dist/js/bootstrap.js',
                    './bower_components/angular/angular.js',
                    './bower_components/angular-resource/angular-resource.js',
                    './bower_components/bootstrap-select/dist/js/bootstrap-select.js',
                    'js/app.js'                    
                ],
                dest: 'build/js/app.js'
            }
        },
        cssmin: {
            css: {
                src: [
                    './bower_components/bootstrap/dist/css/bootstrap.css',
                    './bower_components/bootstrap-select/dist/css/bootstrap-select.css',
                    'build/css/app.css'
                ],
                dest: 'build/css/app.min.css'
            }
        },
        uglify: {
            js: {
                files: {
                    'build/js/app.min.js': ['build/js/app.js']
                }
            }
        },
        processhtml: {
            dist: {
                files: {
                    'build/index.html' : 'index.html'
                }
            }
        },
        copy: {
            fonts: {
                expand: true,
                src: './bower_components/bootstrap/dist/fonts/**',
                dest: 'build/fonts/',
                flatten: true,
                filter: 'isFile'
            }
        }
    });
  
    //Load the plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-processhtml');
  
    //Default task(s).
    grunt.registerTask('default', ['concat:css','concat:js','cssmin','copy:fonts','uglify','processhtml']);
};