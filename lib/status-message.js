'use babel'

export default class StatusMessage {
  constructor () {
    this.view = new StatusMessageView()
    this.panel = atom.workspace.addFooterPanel({item: this.view.element, visible: false})
  }

  addMessage (message, timeout = 1000) {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }

    this.view.setMessage(message)
    this.panel.show()

    this.timeoutId = setTimeout(() => {
      this.panel.hide()
      this.timeoutId = null
    }, timeout)
  }
}
