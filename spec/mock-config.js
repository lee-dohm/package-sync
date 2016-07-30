'use babel'

export default class MockConfig {
  constructor (obj) {
    this.obj = obj
  }

  get (key) {
    return this.obj[key]
  }
}
