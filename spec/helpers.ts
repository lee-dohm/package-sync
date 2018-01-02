import * as CSON from 'season'
import * as fs from 'fs'
import * as os from 'os'
import * as path from 'path'

export function createList(list: string[]): void {
  let packagesPath = getPackagesPath()

  CSON.writeFileSync(packagesPath, {packages: list})
}

export function deleteList(): void {
  let packagesPath = getPackagesPath()

  if (fs.existsSync(packagesPath)) {
    fs.unlinkSync(packagesPath)
  }
}

export function getPackagesPath(): string {
  return path.join(os.tmpdir(), 'packages.cson')
}
