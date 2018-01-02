import * as CSON from 'season'
import * as fs from 'fs'
import * as path from 'path'

interface PackagesFile {
  packages: string[]
}

/**
 * Represents the stored package list.
 */
export default class PackageList {
  static packageListPath = path.join(atom.getConfigDirPath(), 'packages.cson')

  /**
   * Gets the path to the stored package list.
   */
  static getPackageListPath(): string {
    return this.packageListPath
  }

  /**
   * Gets the packages from the list.
   */
  getPackages(): string[] {
    if (fs.existsSync(PackageList.getPackageListPath())) {
      let obj = CSON.readFileSync(PackageList.getPackageListPath()) as PackagesFile
      return obj.packages
    }

    return []
  }

  /**
   * Updates the stored package list with what is currently installed if the list doesn't exist or
   * the `forceOverwrite` configuration option is set to `true`.
   */
  setPackages(): void {
    if (atom.config.get('package-sync.forceOverwrite') || !fs.existsSync(PackageList.getPackageListPath())) {
      let available = atom.packages.getAvailablePackageNames()
      let names = available.filter((name: string) => { return !atom.packages.isBundledPackage(name) })

      CSON.writeFileSync(PackageList.getPackageListPath(), {packages: names})
    }
  }
}
