import { Observable } from '../observable/observable';
import { combineLatest } from './combine-latest';

// TODO: make real tests
xdescribe('combineLatest', function() {
  it('should work', function(done) {
    const A = new Observable((observer) => {
      let aValue = 1;
      const interval = setInterval(() => observer.next((aValue += 1)), 10);

      return () => {
        clearInterval(interval);
      };
    });

    const B = new Observable((observer) => {
      let bValue = 1;
      const interval = setInterval(() => observer.next((bValue += 10)), 20);

      return () => {
        clearInterval(interval);
      };
    });

    const C = new Observable((observer) => {
      let cValue = 1;
      const interval = setInterval(() => observer.next((cValue += 100)), 50);

      return () => {
        clearInterval(interval);
      };
    });

    let times = 0;

    const subscription = combineLatest({
      a: A,
      b: B,
      c: C,
    }).subscribe({
      next() {
        times += 1;
        if (times >= 3) {
          subscription.unsubscribe();
          expect(times).toBe(3);
          done();
        }
      },
    });
  });
});
