import PackageSync from './package-sync'

let packageSync: PackageSync | null = null

function loadModule() : PackageSync {
  if (!packageSync) {
    const _PackageSync: typeof PackageSync = require('./package-sync')
    packageSync = new _PackageSync()
  }

  return packageSync
}

export function activate() {
  atom.commands.add('atom-workspace', 'package-sync:create-package-list', () => {
    loadModule().createPackageList()
  })

  atom.commands.add('atom-workspace', 'package-sync:open-package-list', () => {
    loadModule().openPackageList()
  })

  atom.commands.add('atom-workspace', 'package-sync:sync', () => {
    loadModule().sync()
  })

  atom.packages.onDidActivateInitialPackages(() => {
    atom.packages.onDidLoadPackage(() => {
      if (atom.config.get('package-sync.createOnChange')) {
        loadModule().createPackageList()
      }
    })

    atom.packages.onDidUnloadPackage(() => {
      if (atom.config.get('package-sync.createOnChange')) {
        loadModule().createPackageList()
      }
    })
  })
}
