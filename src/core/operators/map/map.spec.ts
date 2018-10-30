import { Observable } from "core/observables";
import { SafeObserver } from "core/safe-observer";
import { isFunction } from "utils";

import { map } from "./map";
import { createFakeObserver } from "utils/testing/fake-observer";

describe("Operator: map", function() {
  const baseObservable = new Observable(dataSource);
  let mappedObservable: Observable<number>;
  let fakeObserver: SafeObserver<number>;

  beforeEach(function() {
    mappedObservable = baseObservable.pipe(map(x => 2 * x));
    fakeObserver = createFakeObserver();
  });

  it("should exist", function() {
    const result = isFunction(map);
    expect(result).toBe(true);
  });

  it("should return operator", function() {
    const result = isFunction(map(function() {}));
    expect(result).toBe(true);
  });

  it("should return new Observable", function() {
    const mappedObservable = baseObservable.pipe(map(x => 2 * x));
    expect(mappedObservable).not.toBe(baseObservable);
  });

  it("should use given function", function() {
    const mappedObservable = baseObservable.pipe(map(x => 2 * x));
    mappedObservable.subscribe(fakeObserver);
    expect(fakeObserver.next).toHaveBeenCalledWith(2);
  });
});

function dataSource(observer: SafeObserver<number>) {
  observer.next(1);
  observer.complete();
}
