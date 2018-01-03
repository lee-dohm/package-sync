import * as CSON from 'season'
import * as fs from 'fs'
import * as path from 'path'

/**
 * Information that gets stored in the `packages.cson` file.
 */
interface PackagesFile {
  readonly packages: string[]
}

/**
 * Represents the stored package list.
 */
export default class PackageList {
  private path: string

  public constructor(configDir = atom.getConfigDirPath()) {
    this.path = path.join(configDir, 'packages.cson')
  }

  /**
   * Gets the packages from the list.
   */
  public getPackages(): string[] {
    if (fs.existsSync(this.path)) {
      let obj = CSON.readFileSync(this.path) as PackagesFile
      return obj.packages
    }

    return []
  }

  /**
   * Get the path where the list is stored.
   */
  public getPath(): string {
    return this.path
  }

  /**
   * Updates the stored package list with what is currently installed if the list doesn't exist or
   * the `forceOverwrite` configuration option is set to `true`.
   */
  public setPackages(): void {
    if (atom.config.get('package-sync.forceOverwrite') || !fs.existsSync(this.path)) {
      let available = atom.packages.getAvailablePackageNames()
      let names = available.filter((name: string) => { return !atom.packages.isBundledPackage(name) })

      CSON.writeFileSync(this.path, {packages: names})
    }
  }
}
