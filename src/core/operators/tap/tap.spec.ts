import { Observable } from 'core/observables';
import { Observer } from 'core/interfaces';
import { isFunction, noop } from 'utils';
import { createFakeObserver, FakeObserver } from 'utils/testing';

import { tap } from './tap';

describe('Operator: tap', function() {
  const baseObservable = new Observable(dataSource);
  let observableAfterOperator: Observable<number>;
  let fakeObserver: FakeObserver<number>;

  beforeEach(function() {
    observableAfterOperator = baseObservable.pipe(tap(noop));
    fakeObserver = createFakeObserver();
  });

  it('should exist', function() {
    const result = isFunction(tap);
    expect(result).toBe(true);
  });

  it('should return operator', function() {
    const result = isFunction(tap(noop));
    expect(result).toBe(true);
  });

  it('should return new Observable', function() {
    expect(observableAfterOperator).not.toBe(baseObservable);
  });

  it('should pass value from next()', function() {
    observableAfterOperator.subscribe(fakeObserver);
    expect(fakeObserver.next).toHaveBeenCalledWith(1);
    expect(fakeObserver.next).toHaveBeenCalledWith(2);
    expect(fakeObserver.next).toHaveBeenCalledWith(3);
  });

  it('should use given function', function() {
    let times = 0;
    observableAfterOperator = baseObservable.pipe(
      tap(() => {
        times += 1;
      })
    );
    observableAfterOperator.subscribe(fakeObserver);
    expect(times).toEqual(3);
  });

  it('should call error() when given function throws', function() {
    const expectedError = new Error('Tap error');
    observableAfterOperator = baseObservable.pipe(
      tap(() => {
        throw expectedError;
      })
    );
    observableAfterOperator.subscribe(fakeObserver);
    expect(fakeObserver.error).toHaveBeenCalledWith(expectedError);
  });
});

function dataSource(observer: Observer<number>) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.complete();
}
