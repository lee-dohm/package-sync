import * as chai from 'chai'
import * as fs from 'fs'
import * as os from 'os'

import PackageList from '../lib/package-list'

import {createList, deleteList, getPackagesPath} from './helpers'

const expect = chai.expect

describe('PackageList', () => {
  let list: PackageList

  beforeEach(() => {
    list = new PackageList(os.tmpdir())
  })

  describe('getPackages', () => {
    beforeEach(() => {
      deleteList()
    })

    it('gives an empty array when there is no packages.cson', () => {
      expect(list.getPackages()).to.be.empty
    })

    it('gives an empty array when the package list is empty', () => {
      createList([])
      expect(list.getPackages()).to.be.empty
    })

    it('gives the packages list when the list is non-empty', () => {
      createList(['foo', 'bar', 'baz'])
      expect(list.getPackages()).to.have.members(['foo', 'bar', 'baz'])
    })
  })

  describe('setPackages', () => {
    describe('when forceOverwrite is set to false', () => {
      beforeEach(() => {
        atom.config.set('package-sync.forceOverwrite', false)
      })

      describe('when the file does not exist', () => {
        beforeEach(() => {
          deleteList()
        })

        it('creates the packages file', () => {
          list.setPackages()

          expect(fs.existsSync(getPackagesPath())).to.be.true
        })

        it('includes all of the currently installed packages', () => {
          let available = atom.packages.getAvailablePackageNames()
          let installed = available.filter((name: string) => { return !atom.packages.isBundledPackage(name) })

          expect(list.getPackages()).to.have.members(installed)
        })
      })

      describe('when the file does exist', () => {
        beforeEach(() => {
          createList([])
        })

        it('does not change the file', () => {
          list.setPackages()

          expect(list.getPackages()).to.be.empty
        })
      })
    })

    describe('when forceOverwrite is set to true', () => {
      beforeEach(() => {
        atom.config.set('package-sync.forceOverwrite', true)
      })

      describe('when the file does not exist', () => {
        beforeEach(() => {
          deleteList()
        })

        it('creates the packages file', () => {
          list.setPackages()

          expect(fs.existsSync(getPackagesPath())).to.be.true
        })

        it('includes all of the currently installed packages', () => {
          let available = atom.packages.getAvailablePackageNames()
          let installed = available.filter((name: string) => { return !atom.packages.isBundledPackage(name) })

          expect(list.getPackages()).to.have.members(installed)
        })
      })

      describe('when the file does exist', () => {
        beforeEach(() => {
          createList([])
        })

        it('updates the contents of the file', () => {
          list.setPackages()

          let available = atom.packages.getAvailablePackageNames()
          let installed = available.filter((name: string) => { return !atom.packages.isBundledPackage(name) })

          expect(list.getPackages()).to.have.members(installed)
        })
      })
    })
  })
})
