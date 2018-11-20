import { Observable } from 'core/observables'
import { Observer } from 'core/interfaces'
import { isFunction } from 'utils'
import { createFakeObserver } from 'utils/testing'

import { map } from './map'

describe('Operator: map', function() {
  const baseObservable = new Observable(dataSource)
  let observableAfterOperator: Observable<number>
  let fakeObserver: Observer<number>

  beforeEach(function() {
    observableAfterOperator = baseObservable.pipe(map((x) => 2 * x))
    fakeObserver = createFakeObserver()
  })

  it('should exist', function() {
    const result = isFunction(map)
    expect(result).toBe(true)
  })

  it('should return operator', function() {
    const result = isFunction(map(function() {}))
    expect(result).toBe(true)
  })

  it('should return new Observable', function() {
    expect(observableAfterOperator).not.toBe(baseObservable)
  })

  it('should use given function', function() {
    observableAfterOperator.subscribe(fakeObserver)
    expect(fakeObserver.next).toHaveBeenCalledWith(2)
  })
})

function dataSource(observer: Observer<number>) {
  observer.next(1)
  observer.complete()
}
