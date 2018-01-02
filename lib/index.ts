import PackageSync from './package-sync'

/**
 * Activates the package.
 */
export function activate(): void {
  let packageSync = new PackageSync()

  atom.commands.add('atom-workspace', 'package-sync:create-package-list', () => {
    packageSync.createPackageList()
  })

  atom.commands.add('atom-workspace', 'package-sync:open-package-list', () => {
    packageSync.openPackageList()
  })

  atom.commands.add('atom-workspace', 'package-sync:sync', () => {
    packageSync.sync()
  })

  atom.packages.onDidActivateInitialPackages(() => {
    atom.packages.onDidLoadPackage(() => {
      if (atom.config.get('package-sync.createOnChange')) {
        packageSync.createPackageList()
      }
    })

    atom.packages.onDidUnloadPackage(() => {
      if (atom.config.get('package-sync.createOnChange')) {
        packageSync.createPackageList()
      }
    })
  })
}
