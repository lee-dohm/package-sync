os = require 'os'

PackageSync = require '../lib/package-sync'

h = require './helpers'

describe 'PackageSync', ->
  beforeEach ->
    @sync = new PackageSync()

  afterEach ->
    h.deletePackages()

  describe 'getMissingPackages', ->
    it 'gets a list of missing packages', ->
      h.createPackages({'packages': ['foo', 'bar', 'baz']})
      spyOn(atom, 'getConfigDirPath').andReturn(os.tmpdir())

      expect(@sync.getMissingPackages()).toEqual(['foo', 'bar', 'baz'])

    it 'gets a list of missing packages, excluding ones that are not missing', ->
      h.createPackages({'packages': ['foo', 'bar', 'baz']})
      spyOn(atom, 'getConfigDirPath').andReturn(os.tmpdir())
      spyOn(atom.packages, 'getAvailablePackageNames').andReturn(['foo'])

      expect(@sync.getMissingPackages()).toEqual(['bar', 'baz'])
