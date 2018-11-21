import { OperatorFunction, Predicate } from 'core/interfaces';
import { Observable } from 'core/observables';
import { SafeObserver } from 'core/safe-observer/safe-observer';

export function first<T>(
  predicate: Predicate<T> = () => true
): OperatorFunction<T, T> {
  return function firstOperator(observable: Observable<T>): Observable<T> {
    return new Observable<T>((observer) => {
      const operatorObserver: SafeObserver<T> = new SafeObserver({
        next(value: T) {
          try {
            if (predicate(value)) {
              observer.next(value);
              observer.complete();
            }
          } catch (e) {
            observer.error(e);
          }
        },
      });
      const subscription = observable.subscribe(operatorObserver);
      return () => subscription.unsubscribe();
    });
  };
}
