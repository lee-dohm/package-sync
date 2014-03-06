#
# Copyright (c) 2014 by Lifted Studios. All Rights Reserved.
#

CSON = require 'season'
fs = require 'fs'
path = require 'path'

module.exports =
# Public: Represents the list of packages that the user wants synchronized.
class PackageList
  # Public: Creates a new instance of the {PackageList} class.
  #
  # Returns a {PackageList}.
  constructor: ->
    @configDirPath = atom.getConfigDirPath()

  # Public: Gets the list of packages that the user wants synchronized.
  #
  # Returns an {Array} of names of packages.
  getPackages: ->
    configPath = path.join(@configDirPath, 'packages.cson')
    if fs.existsSync(configPath)
      obj = CSON.readFileSync(configPath)
      obj['packages']
    else
      []
