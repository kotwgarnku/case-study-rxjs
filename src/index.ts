import { Observable } from "core/observables";
import { SafeObserver } from "core/safe-observer";
import { map } from "core/operators";

new Observable(function dataSource(observer: SafeObserver<number>) {
  observer.next(1);
  observer.next(2);
  observer.complete();
})
  .pipe(map(x => `Hello ${x}`))
  .subscribe({
    next(value) {
      console.log(value);
    }
  });
