'use babel'

import CSON from 'season'
import fs from 'fs'
import os from 'os'
import path from 'path'

import PackageList from '../lib/package-list'

import MockAtomEnvironment from './mock-atom-environment'
import MockConfig from './mock-config'
import {fixture} from './helpers'

describe('PackageList', function () {
  let packageList

  describe('getList', function () {
    describe('when packages.cson does not exist', function () {
      beforeEach(function () {
        packageList = new PackageList(fixture('does-not-exist.cson'))
      })

      it('returns an empty array', function () {
        list = packageList.getList()

        expect(list).to.be.instanceof(Array)
        expect(list.length).to.equal(0)
      })
    })

    describe('when packages.cson exists but is blank', function () {
      beforeEach(function () {
        packageList = new PackageList(fixture('blank.cson'))
      })

      it('returns an empty array', function () {
        list = packageList.getList()

        expect(list).to.be.instanceof(Array)
        expect(list.length).to.equal(0)
      })
    })

    describe('when packages.cson contains an empty list', function () {
      beforeEach(function () {
        packageList = new PackageList(fixture('empty.cson'))
      })

      it('returns an empty array', function () {
        list = packageList.getList()

        expect(list).to.be.instanceof(Array)
        expect(list.length).to.equal(0)
      })
    })

    describe('when packages.cson contains an unrecognized structure', function () {
      beforeEach(function () {
        packageList = new PackageList(fixture('no-packages-property.cson'))
      })

      it('returns an empty array', function () {
        list = packageList.getList()

        expect(list).to.be.instanceof(Array)
        expect(list.length).to.equal(0)
      })
    })

    describe('when packages.cson is malformed', function () {
      beforeEach(function () {
        packageList = new PackageList(fixture('malformed.cson'))
      })

      it('returns an empty array', function () {
        list = packageList.getList()

        expect(list).to.be.instanceof(Array)
        expect(list.length).to.equal(0)
      })
    })

    describe('when packages.cson contains a list', function () {
      beforeEach(function () {
        packageList = new PackageList(fixture('packages.cson'))
      })

      it('returns the list of packages', function () {
        expect(packageList.getList()).to.have.members(["foo", "bar", "baz"])
      })
    })
  })

  describe('setList', function () {
    let listPath

    beforeEach(function () {
      listPath = path.join(os.tmpdir(), 'packages.cson')
      packageList = new PackageList(listPath)
    })

    afterEach(function () {
      if (fs.existsSync(listPath)) {
        fs.unlinkSync(listPath)
      }
    })

    describe('when given a valid list', function () {
      describe('and the packages file does not exist yet', function () {
        it('writes the contents to the file', function () {
          packageList.setList(['foo', 'bar', 'baz'])
          obj = CSON.readFileSync(listPath)

          expect(obj).to.deep.equal({'packages': ['foo', 'bar', 'baz']})
        })
      })

      describe('and the packages file already exists', function () {
        beforeEach(function () {
          CSON.writeFileSync(listPath, {'packages': []})
        })

        it('is not changed', function () {
          packageList.setList(['foo', 'bar', 'baz'])
          obj = CSON.readFileSync(listPath)

          expect(obj).to.deep.equal({'packages': []})
        })

        describe('when forceOverwrite is true', function () {
          beforeEach(function () {
            config = new MockConfig({'package-sync.forceOverwrite': true})
            atomEnv = new MockAtomEnvironment(config)
            packageList = new PackageList(listPath, atomEnv)
          })

          it('changes the list', function () {
            packageList.setList(['foo', 'bar', 'baz'])
            obj = CSON.readFileSync(listPath)

            expect(obj).to.deep.equal({'packages': ['foo', 'bar', 'baz']})
          })
        })
      })
    })
  })

  describe('getPath', function () {
    it('returns the path that was given', function () {
      let packageList = new PackageList('test.txt')

      expect(packageList.getPath()).to.equal('test.txt')
    })
  })
})
