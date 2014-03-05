#
# Copyright (c) 2014 by Lifted Studios. All Rights Reserved.
#

CSON = require 'season'
fs = require 'fs'
path = require 'path'
os = require 'os'

PackageList = require '../lib/package-list'

describe 'PackageList', ->
  packagesPath = path.join(os.tmpdir(), 'packages.cson')
  tempDir = os.tmpdir()
  list = null

  createPackages = (packages) ->
    CSON.writeFileSync(packagesPath, packages)

  beforeEach ->
    spyOn(atom, 'getConfigDirPath').andReturn(tempDir)
    list = new PackageList

  afterEach ->
    if fs.existsSync(packagesPath)
      fs.unlinkSync(packagesPath)

  it 'gives an empty array when there is not a packages.cson', ->
    expect(list.getPackages()).toEqual([])

  it 'gives an empty array when there is an empty packages.cson', ->
    createPackages({'packages': []})
    expect(list.getPackages()).toEqual([])

  it 'gives the packages list when there is a non-zero packages.cson', ->
    createPackages({'packages': ['foo', 'bar', 'baz']})
    expect(list.getPackages()).toEqual(['foo', 'bar', 'baz'])
