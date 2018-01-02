import {StatusBar, Tile} from 'atom/status-bar'

/**
 * Displays a message in the status bar.
 */
export default class StatusMessage {
  item: Element
  statusBar: StatusBar
  tile: Tile

  /**
   * Displays `message` in the status bar.
   *
   * If the status bar does not exist, no message is displayed and no error
   * occurs.
   */
  constructor (message: string) {
    this.statusBar = document.querySelector('status-bar') as StatusBar

    if (this.statusBar) {
      this.item = document.createElement('div')
      this.item.classList.add('inline-block')
      this.setText(message)

      this.tile = this.statusBar.addLeftTile({item: this.item})
    }
  }

  /**
   * Removes the message from the status bar.
   */
  remove () {
    if (this.tile) {
      this.tile.destroy()
    }
  }

  /**
   * Updates the text of the message.
   */
  setText (text: string) {
    if (this.statusBar) {
      this.item.innerHTML = text
    }
  }
}
