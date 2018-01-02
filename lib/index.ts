import {CompositeDisposable} from 'atom'

import PackageSync from './package-sync'

let disposable: CompositeDisposable

/**
 * Activates the package.
 */
export function activate(): void {
  disposable = new CompositeDisposable()

  let packageSync = new PackageSync()

  disposable.add(atom.commands.add('atom-workspace', 'package-sync:create-package-list', () => {
    packageSync.createPackageList()
  }))

  disposable.add(atom.commands.add('atom-workspace', 'package-sync:open-package-list', () => {
    packageSync.openPackageList()
  }))

  disposable.add(atom.commands.add('atom-workspace', 'package-sync:sync', () => {
    packageSync.sync()
  }))

  disposable.add(atom.packages.onDidActivateInitialPackages(() => {
    disposable.add(atom.packages.onDidLoadPackage(() => {
      if (atom.config.get('package-sync.createOnChange')) {
        packageSync.createPackageList()
      }
    }))

    disposable.add(atom.packages.onDidUnloadPackage(() => {
      if (atom.config.get('package-sync.createOnChange')) {
        packageSync.createPackageList()
      }
    }))
  }))
}

/**
 * Deactivates the package.
 */
export function deactivate(): void {
  disposable.dispose()
}
