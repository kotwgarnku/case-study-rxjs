import { OperatorFunction, UnaryFunction } from 'core/interfaces';
import { Observable } from 'core/observables';
import { SafeObserver } from 'core/safe-observer/safe-observer';

export function tap<T>(
  tapFunction: UnaryFunction<T, any>
): OperatorFunction<T, T> {
  return function tapOperator(observable: Observable<T>): Observable<T> {
    return new Observable<T>((observer) => {
      const operatorObserver: SafeObserver<T> = new SafeObserver({
        next(value: T) {
          try {
            tapFunction(value);
            observer.next(value);
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
