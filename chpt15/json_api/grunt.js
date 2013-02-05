/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({
    lint: {
      files: ['grunt.js', '*.js', 'test/*.js']
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
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        require: true,
        define: true,
        requirejs: true,
        describe: true,
        expect: true,
        it: true
      }
    },

    watch: {
      files: '<config:lint.files>',
      tasks: 'lint'
  },
  });

  // Default task.
  grunt.registerTask('default', 'lint');



};
