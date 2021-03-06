import { PartialObserver } from '../interfaces';
import { SafeObserver } from '../safe-observer/safe-observer';

export class Subscriber<T> extends SafeObserver<T> {
  private isStopped: boolean;

  constructor(observer: PartialObserver<T>) {
    super(observer);
    this.isStopped = false;
  }

  next(value: T) {
    if (!this.isStopped) {
      super.next(value);
    }
  }

  error(err: Error) {
    if (!this.isStopped) {
      super.error(err);
      this.stop();
    }
  }

  complete() {
    if (!this.isStopped) {
      super.complete();
      this.stop();
    }
  }

  stop() {
    this.isStopped = true;
  }
}
