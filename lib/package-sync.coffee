#
# Copyright (c) 2014 by Lifted Studios. All Rights Reserved.
#

{BufferedProcess} = require 'atom'

PackageList = require './package-list'

# Performs the package synchronization.
class PackageSync
  # Path to `apm`.
  apmPath = atom.packages.getApmPath()

  # Activates `PackageSync`.
  activate: ->
    atom.workspaceView.command 'package-sync:sync', => @sync()

  # Installs any packages that are missing from the `packages.cson` configuration file.
  sync: ->
    console.log('Synchronize packages')
    missing = @getMissingPackages()
    @installPackages(missing)

  # Gets the list of packages that are missing.
  #
  # @return [Array] List of names of packages that need to be installed.
  # @private
  getMissingPackages: ->
    list = new PackageList
    syncPackages = list.getPackages()
    availablePackages = atom.packages.getAvailablePackageNames()
    value for value in syncPackages when value not in availablePackages

  # Installs the named package.
  #
  # @param [String] pkg Name of the package to install.
  # @private
  installPackage: (pkg) ->
    console.log("Install #{pkg}")
    command = apmPath
    args = ['install', pkg]
    stdout = (output) -> console.log(output)
    stderr = (output) -> console.log(output)
    exit = (exitCode) -> console.log("apm install #{pkg} exited with code #{exitCode}")
    new BufferedProcess({command, args, stdout, stderr, exit})

  # Installs each of the packages in the given list.
  #
  # @param [Array<String>] List of names of packages to install.
  # @private
  installPackages: (packages) ->
    @installPackage(pkg) for pkg in packages

module.exports = new PackageSync
