module.exports = function(grunt) {

  grunt.initConfig({
    sass: {
      dist: {
        options: {
          cacheLocation: 'styles/.scss-cache',
          style: 'compressed'
        },
        files: {
          'styles/css/main.css': 'styles/scss/main.scss'
        }
      }
    },
    watch: {
      css: {
        files: ['styles/scss/**/*.scss'],
        tasks: 'sass:dist'
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src : 'styles/css/style.css'
        },
        options: {
          proxy: "<%= project_name %>.dev"
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-browser-sync");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.registerTask('default', ["watch"]);
};
