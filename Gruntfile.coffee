#
# Copyright (c) 2014 by Lifted Studios. All Rights Reserved.
#

module.exports = (grunt) ->
  grunt.loadNpmTasks('grunt-coffeelint')
  grunt.loadNpmTasks('grunt-shell')

  grunt.initConfig {
    coffeelint: {
      options: {
        configFile: 'coffeelint.json'
      }
      src: ['lib/*']
      tests: ['spec/*']
    }

    shell: {
      doc: {
        command: 'biscotto'
      }
    }
  }

  grunt.registerTask('lint', 'coffeelint')
  grunt.registerTask('doc', 'shell:doc')
  grunt.registerTask('default', ['lint', 'doc'])
