#
# Copyright (c) 2014 by Lifted Studios. All Rights Reserved.
#

CSON = require 'season'
fs = require 'fs'
path = require 'path'

# Represents the list of packages that the user wants synchronized.
class PackageList
  # Creates a new instance of the `PackageList` class.
  constructor: ->
    @configDirPath = atom.getConfigDirPath()

  # Gets the list of packages that the user wants synchronized.
  #
  # @return [Array] List of names of packages.
  getPackages: ->
    configPath = path.join(@configDirPath, 'packages.cson')
    if fs.existsSync(configPath)
      obj = CSON.readFileSync(configPath)
      obj['packages']
    else
      []

module.exports = PackageList
