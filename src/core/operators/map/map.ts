import { OperatorFunction, UnaryFunction } from 'core/interfaces'
import { Observable } from 'core/observables'
import { SafeObserver } from 'core/safe-observer'

export function map<T, R>(
  mapping: UnaryFunction<T, R>
): OperatorFunction<T, R> {
  return function innerMap(observable: Observable<T>): Observable<R> {
    return new Observable<R>((observer) => {
      const mappedObserver: SafeObserver<T> = new SafeObserver({
        next(value: T) {
          observer.next(mapping(value))
        },
        error(err: Error) {
          observer.error(err)
        },
        complete() {
          observer.complete()
        },
      })
      const subscription = observable.subscribe(mappedObserver)
      return () => subscription.unsubscribe()
    })
  }
}
