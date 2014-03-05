#
# Copyright (c) 2014 by Lifted Studios. All Rights Reserved.
#

class PackageSync
  activate: ->
    atom.workspaceView.command 'package-sync:sync', => @sync()

  sync: ->

module.exports = new PackageSync
