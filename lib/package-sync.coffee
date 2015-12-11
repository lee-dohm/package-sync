fs = require 'fs'

{BufferedProcess} = require 'atom'

PackageList = require './package-list'
StatusMessage = require './status-message'

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

  # Internal: Timeout for messages that should be up longer.
  longMessageTimeout: 15000

  # Internal: Status bar message.
  message: null

  # Internal: Packages in the process of being installed.
  packagesToInstall: []

  # Internal: Timeout for messages that should be up for only a short time.
  shortMessageTimeout: 1000

  # Internal: Timeout for status bar message.
  timeout: null

  # Public: Creates the package list for the user from the list of available packages.
  createPackageList: ->
    new PackageList().setPackages()

  # Public: Opens the package list.
  openPackageList: ->
    atom.workspace.open(PackageList.getPackageListPath())

  # Public: Installs any packages that are missing from the `packages.cson` configuration file.
  sync: ->
    missing = @getMissingPackages()
    @installPackages(missing)

  # Internal: Displays a message in the status bar.
  #
  # If `timeout` is specified, the message will automatically be cleared in `timeout` milliseconds.
  #
  # message - A {String} containing the message to be displayed.
  # timeout - An optional {Number} specifying the time in milliseconds until the message will be
  #           cleared.
  displayMessage: (message, timeout) ->
    clearTimeout(@timeout) if @timeout?
    if @message?
      @message.setText(message)
    else
      @message = new StatusMessage(message)

    @setMessageTimeout(timeout) if timeout?

  # Internal: Execute APM to install the given package.
  #
  # pkg - A {String} containing the name of the package to install.
  executeApm: (pkg) ->
    @displayMessage("Installing #{pkg}")
    command = @apmPath
    args = ['install', pkg]
    stdout = (output) ->
    stderr = (output) ->
    exit = (exitCode) =>
      if exitCode is 0
        if @packagesToInstall.length > 0
          @displayMessage("#{pkg} installed!", @shortMessageTimeout)
        else
          @displayMessage('Package Sync complete!', @longMessageTimeout)
      else
        @displayMessage("An error occurred installing #{pkg}", @longMessageTimeout)

      @currentInstall = null
      @installPackage()

    @currentInstall = new BufferedProcess({command, args, stdout, stderr, exit})

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
    @executeApm(@packagesToInstall.shift())

  # Internal: Installs each of the packages in the given list.
  #
  # packages - An {Array} containing the names of packages to install.
  installPackages: (packages) ->
    @packagesToInstall.push(packages...)
    @installPackage()

  # Internal: Sets a timeout to remove the status bar message.
  #
  # timeout - The {Number} of milliseconds until the message should be removed.
  setMessageTimeout: (timeout) ->
    clearTimeout(@timeout) if @timeout?
    @timeout = setTimeout(=>
      @message.remove()
      @message = null
    , timeout)
