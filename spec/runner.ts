let createRunner = require('atom-mocha-test-runner').createRunner

module.exports = createRunner({
  testSuffixes: ['spec.ts', 'spec.js']
}, (mocha: any) => {
  mocha.timeout(parseInt(process.env.MOCHA_TIMEOUT || '5000', 10))
})
