import { Observable } from 'core/observables';
import { map, tap } from 'core/operators';

const subscription = new Observable<number>(function dataSource(observer) {
  let times = 0;
  const interval = setInterval(() => {
    observer.next(times+=1);
  }, 100);
  return () => clearInterval(interval);
})
  .pipe(
    map((x) => 2 * x),
    map((x) => 3 * x),
    tap(console.log)
  )
  .subscribe({
    next(value) {
      if (value === 60) {
        subscription.unsubscribe();
      }
    },
  });
