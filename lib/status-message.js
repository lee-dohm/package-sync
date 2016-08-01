/** @babel */

import StatusMessageView from './status-message-view'

export default class StatusMessage {
  constructor (workspace = global.atom.workspace) {
    this.view = new StatusMessageView()
    this.panel = workspace.addFooterPanel({item: this.view.element, visible: false, priority: 1000})
  }

  setMessage (message, timeout = 1000) {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }

    this.view.update(message).then(() => {
      this.panel.show()

      this.timeoutId = setTimeout(() => {
        this.panel.hide()
        this.timeoutId = null
      }, timeout)
    })
  }
}
