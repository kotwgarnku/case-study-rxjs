import { Observable } from "../observable/observable";
import { ReplaySubject } from "../replay-subject/replay-subject";
import { SafeObserver } from "core/safe-observer";

const emptyValue = Symbol.for("emptyValue");

export function combineLatest(
  observables: Record<string, Observable<any>>
): Observable<Record<string, any>> {
  let combined: Record<string, any> = Object.keys(observables).reduce(
    (p, key) => ({ ...p, [key]: emptyValue }),
    {}
  );

  const stream = new Observable(
    (observer: SafeObserver<Record<string, any>>) => {
      const subscriptions = Object.entries(observables).map(
        ([key, observable]) =>
          observable.subscribe({
            next(value) {
              combined = Object.assign(combined, {
                [key]: value
              });

              if (hasAllValues(combined)) {
                observer.next(combined);
              }
            }
          })
      );

      return () => {
        subscriptions.forEach(subscription => subscription.unsubscribe());
      };
    }
  );

  return stream;
}

function hasAllValues(obj: Record<string, any>): boolean {
  return !Object.values(obj).some(value => value === emptyValue);
}
