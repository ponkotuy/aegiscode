module.exports = (grunt) ->
  grunt.initConfig
    watch:
      files: ['src/coffee/**/*.coffee']
      tasks: 'coffee'
    coffee:
      compile:
        options:
          sourceMap: true
        files:
          'build/js/aegis.js': ['src/coffee/*.coffee']
    coffeeDeploy:
      compile:
        options:
          join: true
        files:
          'build/js/aegis.js': ['src/coffee/*.coffee']
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.registerTask 'default', ['coffee', 'watch']
