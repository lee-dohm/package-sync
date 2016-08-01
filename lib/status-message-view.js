/** @babel */
/** @jsx etch.dom */

import etch from 'etch'

export default class StatusMessageView {
  constructor () {
    this.message = ''

    etch.initialize(this)
  }

  render () {
    return <div className="status-message-view">{this.message}</div>
  }

  update (message) {
    this.message = message

    return etch.update(this)
  }

  destroy () {
    etch.destroy(this)
  }
}
