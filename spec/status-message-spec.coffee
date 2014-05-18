#
# Copyright (c) 2014 by Lifted Studios. All Rights Reserved.
#

{$$, WorkspaceView} = require 'atom'

StatusMessage = require '../lib/status-message'

describe 'StatusMessage', ->
  [statusBar, statusPanel] = []

  beforeEach ->
    atom.workspaceView = new WorkspaceView
    atom.workspace = atom.workspaceView.model
    atom.workspaceView.simulateDomAttachment()

    statusPanel = {
      element: {
        lastChild: {
          innerHTML: null
        }

        removeChild: (obj) ->
      }
    }

    statusBar = {
      appendLeft: (obj) ->
    }

    atom.workspaceView.statusBar = statusBar
    spyOn(statusBar, 'appendLeft').andReturn(statusPanel)
    spyOn(statusPanel.element, 'removeChild')

  it 'displays a message in the status bar', ->
    new StatusMessage('Message')

    expect(statusBar.appendLeft.calls[0].args[0]).toMatch('Message')

  it 'does not throw if there is no status bar', ->
    new StatusMessage('Message')

  it 'removes the message', ->
    message = new StatusMessage('Message')
    message.remove()

    expect(statusPanel.element.removeChild).toHaveBeenCalledWith(statusPanel.element.lastChild)

  it 'updates the message', ->
    message = new StatusMessage('Message')
    message.setText('Something else')

    expect(statusPanel.element.lastChild.innerHTML).toEqual('Something else')
