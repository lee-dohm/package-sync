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

  createPackageList(): void {
    new PackageList().setPackages()
  }

  openPackageList(): void {
    atom.workspace.open(PackageList.getPackageListPath())
  }

  sync(): void {
    let missing = this.getMissingPackages()
    this.installPackages(missing)
  }

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

  getMissingPackages(): string[] {
    let list = new PackageList()
    let syncPackages = list.getPackages()
    let availablePackages = atom.packages.getAvailablePackageNames()

    return syncPackages.filter((value) => { !(value in availablePackages) })
  }

  installPackage(): void {
    if (this.currentInstall) {
      return
    }

    let nextPackage = this.packagesToInstall.shift()

    if (nextPackage) {
      this.executeApm(nextPackage)
    }
  }

  installPackages(packages: string[]): void {
    this.packagesToInstall.push(...packages)
    this.installPackage()
  }

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
