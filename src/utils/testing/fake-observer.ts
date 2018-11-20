import { Observer } from 'core/interfaces';

export function createFakeObserver<T>(): Observer<T> {
  return {
    next: jasmine.createSpy('fakeObserver.next'),
    error: jasmine.createSpy('fakeObserver.error'),
    complete: jasmine.createSpy('fakeObserver.complete'),
  };
}
