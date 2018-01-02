import * as fs from 'fs'

import {BufferedProcess} from 'atom'

import PackageList from './package-list'
import StatusMessage from './status-message'

export default class PackageSync {
  readonly apmPath = atom.packages.getApmPath()
  readonly longMessageTimeout = 15000
  readonly shortMessageTimeout = 1000

  currentInstall: BufferedProcess | null
  message: StatusMessage | null
  packagesToInstall: string[]
  timeout: NodeJS.Timer | null

  constructor() {
    this.currentInstall = null
    this.message = null
    this.packagesToInstall = []
    this.timeout = null
  }

  /**
   * Creates the package list.
   */
  createPackageList(configDir?: string): void {
    let list = new PackageList(configDir)
    list.setPackages()
  }

  /**
   * Opens the package list in the workspace.
   */
  openPackageList(configDir?: string): void {
    let list = new PackageList(configDir)
    atom.workspace.open(list.path)
  }

  /**
   * Syncs the package list by installing any missing packages.
   */
  sync(): void {
    let missing = this.getMissingPackages()
    this.installPackages(missing)
  }

  /**
   * Displays the `message` for the given `timeout` in milliseconds or indefinitely.
   */
  displayMessage(message: string, timeout?: number): void {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }

    if (this.message) {
      this.message.setText(message)
    } else {
      this.message = new StatusMessage(message)
    }

    if (timeout) {
      this.setMessageTimeout(timeout)
    }
  }

  /**
   * Executes apm to install the given package by name.
   *
   * When the given package is done installing, it attempts to install the next package in the
   * `packagesToInstall` list.
   */
  executeApm(pkg: string): void {
    this.displayMessage(`Installing ${pkg}`)

    let command = this.apmPath
    let args = ['install', pkg]
    let stdout = (output: string) => {}
    let stderr = (output: string) => {}
    let exit = (exitCode: number) => {
      if (exitCode === 0) {
        if (this.packagesToInstall.length > 0) {
          this.displayMessage(`${pkg} installed!`, this.shortMessageTimeout)
        } else {
          this.displayMessage('Package sync complete!', this.longMessageTimeout)
        }
      } else {
        this.displayMessage(`An error occurred installing ${pkg}`, this.longMessageTimeout)
      }

      this.currentInstall = null
      this.installPackage()
    }

    this.currentInstall = new BufferedProcess({command, args, stdout, stderr, exit})
  }

  /**
   * Gets the list of missing package names by comparing against the current package list.
   */
  getMissingPackages(configDir?: string): string[] {
    let list = new PackageList(configDir)
    let syncPackages = list.getPackages()
    let availablePackages = atom.packages.getAvailablePackageNames()

    return syncPackages.filter((value) => { return !(value in availablePackages) })
  }

  /**
   * Installs the next package in the list, if one exists.
   */
  installPackage(): void {
    if (this.currentInstall) {
      return
    }

    let nextPackage = this.packagesToInstall.shift()

    if (nextPackage) {
      this.executeApm(nextPackage)
    }
  }

  /**
   * Queues up the given list of packages to be installed and starts the process.
   */
  installPackages(packages: string[]): void {
    this.packagesToInstall.push(...packages)
    this.installPackage()
  }

  /**
   * Sets up a timeout for the currently displayed message.
   */
  setMessageTimeout(timeout: number): void {
    if (this.timeout) {
      clearTimeout(this.timeout)
    }

    this.timeout = setTimeout(() => {
      if (this.message) {
        this.message.remove()
        this.message = null
      }
    }, timeout)
  }
}
