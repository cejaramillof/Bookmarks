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
                    'js/bootstrap-select.min.js',
                    'js/app.js'                    
                ],
                dest: 'build/js/app.js'
            }
        },
        cssmin: {
            css: {
                src: 'build/css/app.css',
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
        }
    });
  
    //Load the plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-processhtml');
  
    //Default task(s).
    grunt.registerTask('default', ['concat:css','concat:js','cssmin','uglify','processhtml']);
};