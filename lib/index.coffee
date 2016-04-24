PackageSync = null
packageSync = null

# Loads the module on-demand.
loadModule = ->
  PackageSync ?= require './package-sync'
  packageSync ?= new PackageSync()

module.exports =
  activate: ->
    atom.commands.add 'atom-workspace', 'package-sync:create-package-list', ->
      loadModule()
      packageSync.createPackageList()

    atom.commands.add 'atom-workspace', 'package-sync:open-package-list', ->
      loadModule()
      packageSync.openPackageList()

    atom.commands.add 'atom-workspace', 'package-sync:sync', ->
      loadModule()
      packageSync.sync()

    atom.packages.onDidActivateInitialPackages ->
      atom.packages.onDidLoadPackage ->
        if atom.config.get('package-sync.createOnChange')
          loadModule()
          packageSync.createPackageList()

      atom.packages.onDidUnloadPackage ->
        if atom.config.get('package-sync.createOnChange')
          loadModule()
          packageSync.createPackageList()

  config:
    forceOverwrite:
      title: 'Overwrite packages.cson'
      description: 'Overwrite packages.cson even when it is present.'
      type: 'boolean'
      default: false
    createOnChange:
      title: 'Create on change'
      description: 'Create package list when packages are installed or removed.'
      type: 'boolean'
      default: false
