import { Observer } from "core/interfaces";

import { Observable } from "../observable/observable";

const emptyValue = Symbol.for("emptyValue");

export function combineLatest(
  observables: Record<string, Observable<any>>
): Observable<Record<string, any>> {
  let combined: Record<string, any> = Object.keys(observables).reduce(
    (p, key) => ({ ...p, [key]: emptyValue }),
    {}
  );

  const stream = new Observable(
    (observer: Observer<Record<string, any>>) => {
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
  return Object.values(obj).every(value => value === emptyValue);
}
