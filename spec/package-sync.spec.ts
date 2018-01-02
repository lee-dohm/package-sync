import * as chai from 'chai'
import * as os from 'os'

import PackageSync from '../lib/package-sync'

import {createList, deleteList} from './helpers'

const expect = chai.expect

describe('PackageSync', () => {
  let sync: PackageSync

  beforeEach(() => {
    deleteList()

    sync = new PackageSync()
  })

  describe('getMissingPackages', () => {
    it('gets a list of missing packages', () => {
      createList(['foo', 'bar', 'baz'])

      expect(sync.getMissingPackages(os.tmpdir())).to.have.members(['foo', 'bar', 'baz'])
    })
  })
})
