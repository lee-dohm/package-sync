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
  # Public: Gets the list of packages that the user wants synchronized.
  #
  # Returns an {Array} containing the package names.
  getPackages: ->
    if fs.existsSync(PackageList.getPackageListPath())
      obj = CSON.readFileSync(PackageList.getPackageListPath())
      obj['packages']
    else
      []

  # Public: Sets the list of packages to the list of available packages.
  setPackages: ->
    if atom.config.get('package-sync.forceOverwrite') or not fs.existsSync(PackageList.getPackageListPath())
      available = atom.packages.getAvailablePackageNames()
      packages = (name for name in available when not atom.packages.isBundledPackage(name))
      CSON.writeFileSync(PackageList.getPackageListPath(), {'packages': packages})

  # Internal: Gets the path to the package list.
  #
  # Returns a {String} containing the path to the list of available packages.
  @getPackageListPath: ->
    @packageListPath ?= path.join(atom.getConfigDirPath(), 'packages.cson')
