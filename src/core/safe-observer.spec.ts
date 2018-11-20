import { createFakeObserver } from 'utils/testing'

import { SafeObserver } from './safe-observer'
import { Observer } from './interfaces'

describe('SafeObserver', function() {
  let observer: Observer<number>

  beforeEach(function() {
    observer = createFakeObserver()
  })

  describe('Method: next', function() {
    describe('When: observer has valid next() method', function() {
      let safeObserver: SafeObserver<number>

      beforeEach(function() {
        safeObserver = new SafeObserver(observer)
      })

      it('should pass valid value to observer', function() {
        const expectedValue = 5
        safeObserver.next(expectedValue)
        expect(observer.next).toHaveBeenCalledWith(expectedValue)
      })

      it('should not call error or complete', function() {
        safeObserver.next(5)
        expect(observer.error).not.toHaveBeenCalled()
        expect(observer.complete).not.toHaveBeenCalled()
      })
    })
  })

  describe('Method: error', function() {
    describe('When: observer has valid error() method', function() {
      let safeObserver: SafeObserver<number>

      beforeEach(function() {
        safeObserver = new SafeObserver(observer)
      })

      it('should pass valid error to observer', function() {
        const expectedError = new Error('Observer error.')
        safeObserver.error(expectedError)
        expect(observer.error).toHaveBeenCalledWith(expectedError)
      })

      it('should not call next or complete', function() {
        safeObserver.error(new Error('Observer error.'))
        expect(observer.next).not.toHaveBeenCalled()
        expect(observer.complete).not.toHaveBeenCalled()
      })
    })
  })

  describe('Method: complete', function() {
    describe('When: observer has valid complete() method', function() {
      let safeObserver: SafeObserver<number>

      beforeEach(function() {
        safeObserver = new SafeObserver(observer)
      })

      it('should call complete in observer', function() {
        safeObserver.complete()
        expect(observer.complete).toHaveBeenCalled()
      })

      it('should not call next or error', function() {
        safeObserver.complete()
        expect(observer.next).not.toHaveBeenCalled()
        expect(observer.error).not.toHaveBeenCalled()
      })
    })
  })
})
