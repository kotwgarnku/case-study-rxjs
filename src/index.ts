import { Observable } from 'core/observables';
import { first, map } from 'core/operators';

new Observable(function dataSource(observer) {
  observer.next(1);
  observer.next(2);
  observer.complete();
})
  .pipe(
    first(),
    map((x) => `Hello ${x}`)
  )
  .subscribe({
    next(value) {
      console.log(value);
    },
  });
