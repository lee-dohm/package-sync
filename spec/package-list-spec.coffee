#
# Copyright (c) 2014 by Lifted Studios. All Rights Reserved.
#

CSON = require 'season'
fs = require 'fs'
path = require 'path'
os = require 'os'

PackageList = require '../lib/package-list'

h = require './helpers'

describe 'PackageList', ->
  list = null

  beforeEach ->
    spyOn(atom, 'getConfigDirPath').andReturn(os.tmpdir())
    list = new PackageList

  afterEach ->
    h.deletePackages()

  describe 'getPackages', ->
    it 'gives an empty array when there is not a packages.cson', ->
      expect(list.getPackages()).toEqual([])

    it 'gives an empty array when there is an empty packages.cson', ->
      h.createPackages({'packages': []})
      expect(list.getPackages()).toEqual([])

    it 'gives the packages list when there is a non-zero packages.cson', ->
      h.createPackages({'packages': ['foo', 'bar', 'baz']})
      expect(list.getPackages()).toEqual(['foo', 'bar', 'baz'])

  describe 'setPackages', ->
    it 'creates the packages.cson if it does not exist', ->
      list.setPackages()
      expect(fs.existsSync(h.getPackagesPath())).toBe(true)

    it 'creates the list of packages if packages.cson does not exist', ->
      list.setPackages()

      packages = list.getPackages()
      available = atom.packages.getAvailablePackageNames()
      for pkg in available when not atom.packages.isBundledPackage(pkg)
        expect(packages).toContain(pkg)


    it 'does not update the packages.cson if it does exist', ->
      h.createPackages({'packages': []})

      list.setPackages()

      expect(list.getPackages()).toEqual([])
