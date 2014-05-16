#
# Copyright (c) 2014 by Lifted Studios. All Rights Reserved.
#

{BufferedProcess} = require 'atom'

PackageList = require './package-list'

# Public: Performs the package synchronization.
#
# ## Events
#
# This class has no events.
module.exports =
class PackageSync
  # Internal: Path to `apm`.
  apmPath: atom.packages.getApmPath()

  # Internal: Process object of the current install.
  currentInstall: null

  # Internal: Packages in the process of being installed.
  packagesToInstall: []

  # Public: Activates the `Package Sync` package.
  activate: ->
    atom.workspaceView.command 'package-sync:sync', => @sync()

  # Public: Installs any packages that are missing from the `packages.cson` configuration file.
  sync: ->
    console.log('Synchronize packages')
    missing = @getMissingPackages()
    @installPackages(missing)

  # Internal: Gets the list of packages that are missing.
  #
  # Returns an {Array} of names of packages that need to be installed.
  getMissingPackages: ->
    list = new PackageList()
    syncPackages = list.getPackages()
    availablePackages = atom.packages.getAvailablePackageNames()
    value for value in syncPackages when value not in availablePackages

  # Internal: Installs the next package in the list.
  installPackage: ->
    # Exit if there is already an installation running or if there are no more
    # packages to install.
    return if @currentInstall? or @packagesToInstall.length is 0

    pkg = @packagesToInstall.shift()

    console.log("Install #{pkg}")
    command = @apmPath
    args = ['install', pkg]
    stdout = (output) -> console.log(output)
    stderr = (output) -> console.log(output)
    exit = (exitCode) =>
      console.log("apm install #{pkg} exited with code #{exitCode}")
      @currentInstall = null
      @installPackage()

    @currentInstall = new BufferedProcess({command, args, stdout, stderr, exit})

  # Internal: Installs each of the packages in the given list.
  #
  # packages - An {Array} containing the names of packages to install.
  installPackages: (packages) ->
    @packagesToInstall.push(packages...)
    @installPackage()
