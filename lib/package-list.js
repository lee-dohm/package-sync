'use babel'

import CSON from 'season'
import fs from 'fs'
import path from 'path'

/**
 * Maintains the list of installed community packages on disk.
 */
export default class PackageList {
  /**
   * Public: Constructs the package list from a file on disk.
   *
   * * `listPath` {String} Path to the packages list on disk.
   * * `atomEnv` {AtomEnvironment} Reference to the Atom environment.
   */
  constructor (listPath = path.join(global.atom.getConfigDirPath(), 'packages.cson'), atomEnv = global.atom) {
    this.atomEnv = atomEnv
    this.listPath = listPath
  }

  /**
   * Public: Gets the list of packages.
   *
   * Returns the array of saved packages or an empty array if something went wrong.
   */
  getList () {
    try {
      let obj = CSON.readFileSync(this.listPath)

      if (obj['packages']) {
        return obj['packages']
      } else {
        return []
      }
    } catch(_err) {
      return []
    }
  }

  /**
   * Public: Sets the list of packages.
   *
   * * `list` {Array} List of installed packages to store.
   */
  setList (list = this.getInstalledPackages()) {
    if (!fs.existsSync(this.listPath) || this.atomEnv.config.get('package-sync.forceOverwrite')) {
      CSON.writeFileSync(this.listPath, {'packages': list})
    }
  }

  getInstalledPackages () {
    let available = this.atomEnv.packages.getAvailablePackageNames()
    let packages = available.filter((name) => {
      return !this.atomEnv.packages.isBundledPackage(name)
    })

    return packages
  }
}
