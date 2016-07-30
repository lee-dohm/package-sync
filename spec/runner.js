'use babel'

import {createRunner} from 'atom-mocha-test-runner'
import {expect} from 'chai'
global.expect = expect

module.exports = createRunner({
  testSuffixes: ['spec.js', 'spec.coffee']
})
