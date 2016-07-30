'use babel'

import CSON from 'season'
import fs from 'fs'
import path from 'path'

export default class PackageList {
  constructor (listPath = path.join(global.atom.getConfigDirPath(), 'packages.cson'), atomEnv = global.atom) {
    this.atomEnv = atomEnv
    this.listPath = listPath
  }

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
