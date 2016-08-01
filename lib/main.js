/** @babel */

import {CompositeDisposable} from 'atom'

let createPackageList = null
let openPackageList = null
let sync = null

function loadModule () {
  ({createPackageList, openPackageList, sync} = require('./package-sync'))
}

export function activate () {
  this.disposables = new CompositeDisposable()

  this.disposables.add(atom.commands.add('atom-workspace', {
    'package-sync:create-package-list': () => {
      loadModule()
      createPackageList()
    },
    'package-sync:open-package-list': () => {
      loadModule()
      openPackageList()
    },
    'package-sync:sync': () => {
      loadModule()
      sync()
    }
  }))

  this.disposables.add(atom.packages.onDidActivateInitialPackages(() => {
    this.disposables.add(atom.packages.onDidLoadPackage(() => {
      if (atom.config.get('package-sync.createOnChange')) {
        loadModule()
        createPackageList()
      }
    }))

    this.disposables.add(atom.packages.onDidUnloadPackage(() => {
      if (atom.config.get('package-sync.createOnChange')) {
        loadModule()
        createPackageList()
      }
    }))
  }))
}

export function deactivate () {
  this.disposables.dispose()
  this.disposables = null
}
