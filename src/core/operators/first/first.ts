import { OperatorFunction, Predicate } from 'core/interfaces'
import { Observable } from 'core/observables'
import { SafeObserver } from 'core/safe-observer'

export function first<T>(
  predicate: Predicate<T> = () => true
): OperatorFunction<T, T> {
  return function innerFirst(observable: Observable<T>): Observable<T> {
    return new Observable<T>((observer) => {
      const firstObserver: SafeObserver<T> = new SafeObserver({
        next(value: T) {
          if (predicate(value)) {
            observer.next(value)
            observer.complete()
          }
        },
        error(err: Error) {
          observer.error(err)
        },
        complete() {
          observer.complete()
        },
      })
      const subscription = observable.subscribe(firstObserver)
      return () => subscription.unsubscribe()
    })
  }
}
