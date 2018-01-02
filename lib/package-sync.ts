/// <reference path="./busy-signal" />

import * as fs from 'fs'

import {BufferedProcess} from 'atom'
import {BusyMessage, BusySignalService} from 'busy-signal'

import PackageList from './package-list'

export default class PackageSync {
  readonly apmPath = atom.packages.getApmPath()

  busyMessage: BusyMessage
  busySignal: BusySignalService | null
  currentInstall: BufferedProcess | null
  packagesToInstall: string[]

  constructor() {
    this.busySignal = null
    this.currentInstall = null
    this.packagesToInstall = []
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
  sync(busySignal: BusySignalService | null): void {
    if (busySignal) {
      this.busySignal = busySignal
      this.busyMessage = this.busySignal.reportBusy('Starting package sync', {revealTooltip: true})
    }

    let missing = this.getMissingPackages()
    this.installPackages(missing)
  }

  /**
   * Clears the busy message, if one is set.
   */
  clearBusyMessage(): void {
    if (this.busySignal) {
      this.busyMessage.dispose()
      this.busySignal = null
    }
  }

  /**
   * Executes apm to install the given package by name.
   *
   * When the given package is done installing, it attempts to install the next package in the
   * `packagesToInstall` list.
   */
  executeApm(pkg: string): void {
    let command = this.apmPath
    let args = ['install', pkg]
    let stdout = (output: string) => {}
    let stderr = (output: string) => {}
    let exit = (exitCode: number) => {
      if (exitCode !== 0) {
        this.setBusyMessage(`An error occurred installing ${pkg}`)
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
      this.setBusyMessage(`Installing ${nextPackage}`)
      this.executeApm(nextPackage)
    } else {
      this.clearBusyMessage()
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
   * Updates the busy message, if one is set.
   */
  setBusyMessage(message: string): void {
    if (this.busySignal) {
      this.busyMessage.setTitle(message)
    }
  }
}
