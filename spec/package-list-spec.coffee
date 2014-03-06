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

  it 'gives an empty array when there is not a packages.cson', ->
    expect(list.getPackages()).toEqual([])

  it 'gives an empty array when there is an empty packages.cson', ->
    h.createPackages({'packages': []})
    expect(list.getPackages()).toEqual([])

  it 'gives the packages list when there is a non-zero packages.cson', ->
    h.createPackages({'packages': ['foo', 'bar', 'baz']})
    expect(list.getPackages()).toEqual(['foo', 'bar', 'baz'])
