# Public: Displays a message in the status bar.
module.exports =
class StatusMessage
  # Public: Displays `message` in the status bar.
  #
  # If the status bar does not exist for whatever reason, no message is displayed and no error
  # occurs.
  #
  # message - A {String} containing the message to display.
  constructor: (message) ->
    @statusBar = document.querySelector('status-bar')
    if @statusBar
      @item = document.createElement('div')
      @item.classList.add('inline-block')
      @setText(message)

      @tile = @statusBar.addLeftTile({@item})

  # Public: Removes the message from the status bar.
  remove: ->
    @tile?.destroy()

  # Public: Updates the text of the message.
  #
  # text - A {String} containing the new message to display.
  setText: (text) ->
    @item.innerHTML = text if @statusBar
