var testacular = require('testacular');

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg:'<json:package.json>',
    meta:{},
    lint:{
      files:['grunt.js']
    }
  });

  // Default task for travis.
  grunt.registerTask('travis', 'lint testsingle');

  grunt.registerTask('testsingle', 'run tests and exit', function () {

    var specDone = this.async();
    var testacularCmd = process.platform === 'win32' ? 'testacular.cmd' : 'testacular';
    var child = grunt.utils.spawn({cmd:testacularCmd, args:['start', '--single-run']}, function (err, result, code) {
      if (code) {
        grunt.fail.fatal("Test failed...", code);
      } else {
        specDone();
      }
    });

    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
  });

};