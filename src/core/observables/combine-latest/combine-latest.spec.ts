import { Observable } from "../observable/observable";
import { combineLatest } from "./combine-latest";

describe("combineLatest", function() {
  it("should work", function(done) {
    const A = new Observable(observer => {
      let nA = 1;
      const interval = setInterval(() => observer.next((nA += 1)), 10);

      return () => {
        clearInterval(interval);
      };
    });

    const B = new Observable(observer => {
      let nA = 1;
      const interval = setInterval(() => observer.next((nA += 10)), 20);

      return () => {
        clearInterval(interval);
      };
    });

    const C = new Observable(observer => {
      let nA = 1;
      const interval = setInterval(() => observer.next((nA += 100)), 50);

      return () => {
        clearInterval(interval);
      };
    });

    let times = 0;

    const subscription = combineLatest({
      a: A,
      b: B,
      c: C
    }).subscribe({
      next() {
        times += 1;
        if (times >= 10) {
          subscription.unsubscribe();
          expect(times).toBe(10);
          done();
        }
      }
    });
  });
});
