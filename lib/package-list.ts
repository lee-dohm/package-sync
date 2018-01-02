import * as CSON from 'season'
import * as fs from 'fs'
import * as path from 'path'

interface PackagesFile {
  packages: string[]
}

export default class PackageList {
  static packageListPath = path.join(atom.getConfigDirPath(), 'packages.cson')

  static getPackageListPath () {
    return this.packageListPath
  }

  getPackages () : string[] {
    if (fs.existsSync(PackageList.getPackageListPath())) {
      let obj = CSON.readFileSync(PackageList.getPackageListPath()) as PackagesFile
      return obj.packages
    }

    return []
  }

  setPackages () {
    if (atom.config.get('package-sync.forceOverwrite') || !fs.existsSync(PackageList.getPackageListPath())) {
      let available = atom.packages.getAvailablePackageNames()
      let names = available.filter((name: string) => { !atom.packages.isBundledPackage(name) })
      CSON.writeFileSync(PackageList.getPackageListPath(), {'packages': names})
    }
  }
}
