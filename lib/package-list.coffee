#
# Copyright (c) 2014 by Lifted Studios. All Rights Reserved.
#

CSON = require 'season'
fs = require 'fs'
path = require 'path'

module.exports =
class PackageList
  constructor: ->
    @configDirPath = atom.getConfigDirPath()

  getPackages: ->
    configPath = path.join(@configDirPath, 'packages.cson')
    if fs.existsSync(configPath)
      obj = CSON.readFileSync(configPath)
      obj['packages']
    else
      []
