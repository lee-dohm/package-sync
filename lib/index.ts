/// <reference path="./busy-signal" />

import {CompositeDisposable} from 'atom'
import {BusySignalService} from 'busy-signal'

import PackageSync from './package-sync'

let busySignal: BusySignalService
let disposable: CompositeDisposable
let packageSync: PackageSync

function loadModule(): void {
  if (!packageSync) {
    packageSync = new PackageSync()
  }
}

/**
 * Activates the package.
 */
export function activate(): void {
  disposable = new CompositeDisposable()

  disposable.add(atom.commands.add('atom-workspace', 'package-sync:create-package-list', () => {
    loadModule()
    packageSync.createPackageList()
  }))

  disposable.add(atom.commands.add('atom-workspace', 'package-sync:open-package-list', () => {
    loadModule()
    packageSync.openPackageList()
  }))

  disposable.add(atom.commands.add('atom-workspace', 'package-sync:sync', () => {
    loadModule()
    packageSync.sync(busySignal)
  }))

  disposable.add(atom.packages.onDidActivateInitialPackages(() => {
    disposable.add(atom.packages.onDidLoadPackage(() => {
      if (atom.config.get('package-sync.createOnChange')) {
        loadModule()
        packageSync.createPackageList()
      }
    }))

    disposable.add(atom.packages.onDidUnloadPackage(() => {
      if (atom.config.get('package-sync.createOnChange')) {
        loadModule()
        packageSync.createPackageList()
      }
    }))
  }))
}

export function consumeBusySignal(busySignalService: BusySignalService): void {
  busySignal = busySignalService
}

/**
 * Deactivates the package.
 */
export function deactivate(): void {
  disposable.dispose()
}
