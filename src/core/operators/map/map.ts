import { OperatorFunction, UnaryFunction } from 'core/interfaces';
import { Observable } from 'core/observables';
import { SafeObserver } from 'core/safe-observer/safe-observer';

export function map<T, R>(
  mapping: UnaryFunction<T, R>
): OperatorFunction<T, R> {
  return function mapOperator(observable: Observable<T>): Observable<R> {
    return new Observable<R>((observer) => {
      const operatorObserver: SafeObserver<T> = new SafeObserver({
        next(value: T) {
          observer.next(mapping(value));
        },
      });
      const subscription = observable.subscribe(operatorObserver);
      return () => subscription.unsubscribe();
    });
  };
}
