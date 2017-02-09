module.exports = function (grunt) {

    grunt.initConfig({

        concat: {
            js: {
                src: 'js/**/*.js',
                dest: 'myRetail.js'
            }
        },

        uglify: {
            js: {
                files: {
                    'myRetail.min.js': ['myRetail.js']
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['concat', 'uglify']);

}
