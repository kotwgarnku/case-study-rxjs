import { createFakeObserver, FakeObserver } from 'utils/testing';

import { Subscriber } from './subscriber';

describe('Subscriber', function() {
  let observer: FakeObserver<number>;

  beforeEach(function() {
    observer = createFakeObserver();
  });

  describe('Method: next', function() {
    describe('When: observer has valid next() method', function() {
      let safeObserver: Subscriber<number>;

      beforeEach(function() {
        safeObserver = new Subscriber(observer);
      });

      it('should pass valid value to observer', function() {
        const expectedValue = 5;
        safeObserver.next(expectedValue);
        expect(observer.next).toHaveBeenCalledWith(expectedValue);
      });

      it('should not call error or complete', function() {
        safeObserver.next(5);
        expect(observer.error).not.toHaveBeenCalled();
        expect(observer.complete).not.toHaveBeenCalled();
      });

      it('should not call next() when stopped', function() {
        const expectedValue = 5;
        safeObserver.next(expectedValue);
        expect(observer.next).toHaveBeenCalledWith(expectedValue);
        observer.next.calls.reset();
        safeObserver.stop();
        safeObserver.next(expectedValue);
        expect(observer.next).not.toHaveBeenCalled();
      });
    });
  });

  describe('Method: error', function() {
    describe('When: observer has valid error() method', function() {
      let safeObserver: Subscriber<number>;

      beforeEach(function() {
        safeObserver = new Subscriber(observer);
      });

      it('should pass valid error to observer', function() {
        const expectedError = new Error('Observer error.');
        safeObserver.error(expectedError);
        expect(observer.error).toHaveBeenCalledWith(expectedError);
      });

      it('should not call next or complete', function() {
        safeObserver.error(new Error('Observer error.'));
        expect(observer.next).not.toHaveBeenCalled();
        expect(observer.complete).not.toHaveBeenCalled();
      });

      it('should stop subscriber after error()', function() {
        const expectedError = new Error('Observer error.');
        safeObserver.error(expectedError);
        expect(observer.error).toHaveBeenCalled();
        observer.error.calls.reset();
        safeObserver.error(expectedError);
        expect(observer.error).not.toHaveBeenCalled();
      });

      it('should not call error() when stopped', function() {
        const expectedError = new Error('Observer error.');
        safeObserver.error(expectedError);
        expect(observer.error).toHaveBeenCalledWith(expectedError);
        observer.error.calls.reset();
        safeObserver.stop();
        safeObserver.error(expectedError);
        expect(observer.error).not.toHaveBeenCalled();
      });
    });
  });

  describe('Method: complete', function() {
    describe('When: observer has valid complete() method', function() {
      let safeObserver: Subscriber<number>;

      beforeEach(function() {
        safeObserver = new Subscriber(observer);
      });

      it('should call complete in observer', function() {
        safeObserver.complete();
        expect(observer.complete).toHaveBeenCalled();
      });

      it('should stop subscriber after complete()', function() {
        safeObserver.complete();
        expect(observer.complete).toHaveBeenCalled();
        observer.complete.calls.reset();
        safeObserver.complete();
        expect(observer.complete).not.toHaveBeenCalled();
      });

      it('should not call complete() when stopped', function() {
        safeObserver.stop();
        safeObserver.complete();
        expect(observer.complete).not.toHaveBeenCalled();
      });
    });
  });
});
