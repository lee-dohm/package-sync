CSON = require 'season'
fs = require 'fs'
os = require 'os'
path = require 'path'

# Module of helper methods for tests.
module.exports =
  createPackages: (packages, packagesPath = @getPackagesPath()) ->
    CSON.writeFileSync(packagesPath, packages)

  deletePackages: (packagesPath = @getPackagesPath()) ->
    if fs.existsSync(packagesPath)
      fs.unlinkSync(packagesPath)

  getPackagesPath: ->
    path.join(os.tmpdir(), 'packages.cson')
