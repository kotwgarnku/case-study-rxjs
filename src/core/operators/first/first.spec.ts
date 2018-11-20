import { Observable } from "core/observables";
import { Observer } from "core/interfaces";
import { isFunction } from "utils";
import { createFakeObserver } from "utils/testing";

import { first } from "./first";

describe("Operator: first", function() {
  const baseObservable = new Observable(dataSource);
  let observableAfterOperator: Observable<number>;
  let fakeObserver: Observer<number>;

  beforeEach(function() {
    observableAfterOperator = baseObservable.pipe(first());
    fakeObserver = createFakeObserver();
  });

  it("should exist", function() {
    const result = isFunction(first);
    expect(result).toBe(true);
  });

  it("should return operator", function() {
    const result = isFunction(first());
    expect(result).toBe(true);
  });

  it("should return new Observable", function() {
    expect(observableAfterOperator).not.toBe(baseObservable);
  });

  it("should complete after first value function", function() {
    observableAfterOperator.subscribe(fakeObserver);
    expect(fakeObserver.next).toHaveBeenCalledWith(1);
    expect(fakeObserver.next).toHaveBeenCalledTimes(1);
    expect(fakeObserver.complete).toHaveBeenCalled();
  });

  it("should use given predicate function", function() {
    observableAfterOperator = baseObservable.pipe(first(value => value === 3));
    observableAfterOperator.subscribe(fakeObserver);
    expect(fakeObserver.next).toHaveBeenCalledWith(3);
    expect(fakeObserver.next).toHaveBeenCalledTimes(1);
    expect(fakeObserver.complete).toHaveBeenCalled();
  });
});

function dataSource(observer: Observer<number>) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
  observer.next(4);
  observer.next(5);
  observer.complete();
}
