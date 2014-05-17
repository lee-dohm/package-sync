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
    if fs.existsSync(@getConfigPath())
      obj = CSON.readFileSync(@getConfigPath())
      obj['packages']
    else
      []

  # Public: Sets the list of packages to the list of available packages.
  setPackages: ->
    unless fs.existsSync(@getConfigPath())
      CSON.writeFileSync(@getConfigPath(), {'packages': atom.packages.getAvailablePackageNames()})

  # Internal: Gets the path to the package list.
  #
  # Returns a {String} containing the path to the list of available packages.
  getConfigPath: ->
    path.join(@configDirPath, 'packages.cson')
