StatusMessage = require '../lib/status-message'

describe 'StatusMessage', ->
  [statusBar] = []

  beforeEach ->
    workspaceElement = atom.views.getView(atom.workspace)
    jasmine.attachToDOM(workspaceElement)

    waitsForPromise -> atom.packages.activatePackage('status-bar')

    runs ->
      statusBar = document.querySelector 'status-bar'

  it 'displays a message in the status bar', ->
    spyOn(statusBar, 'addLeftTile')

    message = new StatusMessage('Message')

    expect(statusBar.addLeftTile).toHaveBeenCalled()

  it 'does not throw if there is no status bar', ->
    atom.packages.deactivatePackage('status-bar')

    new StatusMessage('Message')

  it 'removes the message', ->
    message = new StatusMessage('Message')
    tile = message.tile
    spyOn(tile, 'destroy')
    message.remove()

    expect(tile.destroy).toHaveBeenCalled()

  it 'updates the message', ->
    message = new StatusMessage('Message')
    message.setText('Something else')

    expect(message.item.innerHTML).toEqual('Something else')
