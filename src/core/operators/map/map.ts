import { OperatorFunction, UnaryFunction, Observer } from "core/interfaces";
import { Observable } from "core/observables";
import { SafeObserver } from "core/safe-observer";

export function map<T, R>(
  mapping: UnaryFunction<T, R>
): OperatorFunction<T, R> {
  return function innerMap(observable: Observable<T>): Observable<R> {
    return new Observable<R>((observer: Observer<R>) => {
      const safeObserver = new SafeObserver(observer);
      const mappedSafeObserver: SafeObserver<T> = new SafeObserver({
        next(value: T) {
          safeObserver.next(mapping(value));
        },
        error(err: Error) {
          safeObserver.error(err);
        },
        complete() {
          safeObserver.complete();
        }
      });
      observable.dataSource(mappedSafeObserver);
    });
  };
}
