import { Observer } from 'core/interfaces';

export interface FakeObserver<T> extends Observer<T> {
  next: jasmine.Spy;
  error: jasmine.Spy;
  complete: jasmine.Spy;
}

export function createFakeObserver<T>(): FakeObserver<T> {
  return {
    next: jasmine.createSpy('fakeObserver.next'),
    error: jasmine.createSpy('fakeObserver.error'),
    complete: jasmine.createSpy('fakeObserver.complete'),
  };
}
