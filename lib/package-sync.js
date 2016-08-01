/** @babel */

import {BufferedProcess} from 'atom'

import PackageList from './package-list'
import StatusMessage from './status-message'

const longTimeout = 15000
const shortTimeout = 1000
const statusMessage = new StatusMessage()

let currentInstall = null
let packagesToInstall = []

export function createPackageList () {
  let list = new PackageList()
  list.setPackages()
}

export function openPackageList () {
  let list = new PackageList()

  atom.workspace.open(list.getPath())
}

export function sync () {
  let missing = getMissingPackages()

  installPackages(missing)
}

function displayMessage(message, timeout) {
  statusMessage.setMessage(message, timeout)
}

function executeApm (packageName) {
  displayMessage(`Installing ${packageName} ...`)

  const command = atom.packages.getApmPath()
  const args = ['install', packageName]
  const stdout = () => {}
  const stderr = () => {}
  const exit = (exitCode) => {
    if (exitCode === 0) {
      if (packagesToInstall.length > 0) {
        displayMessage(`${packageName} installed!`, shortTimeout)
      } else {
        displayMessage("Package sync complete!", longTimeout)
      }
    } else {
      displayMessage(`An error occurred installing ${packageName}`, longTimeout)
    }

    currentInstall = null
    installPackage()
  }

  currentInstall = new BufferedProcess({command, args, stdout, stderr, exit})
}

function getMissingPackages () {
  const packageList = new PackageList()
  const packages = packageList.getList()
  const available = atom.packages.getAvailablePackageNames()

  return packages.filter((package) => { return !available.includes(package) })
}

function installPackage () {
  if (currentInstall || packagesToInstall.length === 0) {
    executeApm(packagesToInstall.shift())
  }
}

function installPackages (missing) {
  packagesToInstall.push(...missing)
  installPackage()
}
