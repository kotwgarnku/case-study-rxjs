import { isFunction } from 'utils';

import { Observer, PartialObserver } from '../interfaces';

export class SafeObserver<T> implements Observer<T> {
  constructor(protected readonly observer: PartialObserver<T>) {}

  next(value: T) {
    if ('next' in this.observer && isFunction(this.observer.next)) {
      this.observer.next(value);
    }
  }

  error(err: Error) {
    if ('error' in this.observer && isFunction(this.observer.error)) {
      this.observer.error(err);
    }
  }

  complete() {
    if ('complete' in this.observer && isFunction(this.observer.complete)) {
      this.observer.complete();
    }
  }
}
