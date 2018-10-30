import { SafeObserver } from "core/safe-observer";

export function createFakeObserver<T>(): SafeObserver<T> {
  return {
    next: jasmine.createSpy("fakeObserver.next"),
    error: jasmine.createSpy("fakeObserver.error"),
    complete: jasmine.createSpy("fakeObserver.complete")
  } as any as SafeObserver<T>;
}
