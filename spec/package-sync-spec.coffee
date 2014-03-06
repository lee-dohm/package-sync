#
# Copyright (c) 2014 by Lifted Studios. All Rights Reserved.
#

os = require 'os'

PackageSync = require '../lib/package-sync'

h = require './helpers'

describe 'PackageSync', ->
  afterEach ->
    h.deletePackages()

  it 'gets a list of missing packages', ->
    h.createPackages({'packages': ['foo', 'bar', 'baz']})
    spyOn(atom, 'getConfigDirPath').andReturn(os.tmpdir())

    expect(PackageSync.getMissingPackages()).toEqual(['foo', 'bar', 'baz'])

  it 'gets a list of missing packages, excluding ones that are not missing', ->
    h.createPackages({'packages': ['foo', 'bar', 'baz']})
    spyOn(atom, 'getConfigDirPath').andReturn(os.tmpdir())
    spyOn(atom.packages, 'getAvailablePackageNames').andReturn(['foo'])

    expect(PackageSync.getMissingPackages()).toEqual(['bar', 'baz'])
