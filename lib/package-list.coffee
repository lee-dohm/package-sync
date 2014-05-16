#
# Copyright (c) 2014 by Lifted Studios. All Rights Reserved.
#

CSON = require 'season'
fs = require 'fs'
path = require 'path'

# Public: Represents the list of packages that the user wants synchronized.
#
# ## Events
#
# This class has no events.
module.exports =
class PackageList
  # Public: Creates a new instance of the `PackageList` class.
  constructor: ->
    @configDirPath = atom.getConfigDirPath()

  # Public: Gets the list of packages that the user wants synchronized.
  #
  # Returns an {Array} containing the package names.
  getPackages: ->
    configPath = path.join(@configDirPath, 'packages.cson')
    if fs.existsSync(configPath)
      obj = CSON.readFileSync(configPath)
      obj['packages']
    else
      []
