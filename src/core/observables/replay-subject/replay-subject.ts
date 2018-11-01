import { Observer } from "core/interfaces";
import { SafeObserver } from "core/safe-observer";
import { Subscription } from "core/subscription";

import { Subject } from "../subject/subject";
import { Buffer } from "./buffer";

export class ReplaySubject<T> extends Subject<T> {
  private buffer: Buffer<T>;

  constructor(bufferSize = Number.POSITIVE_INFINITY) {
    super();
    this.buffer = new Buffer<T>(bufferSize);
  }

  subscribe(observer?: Observer<T>): Subscription {
    if (observer) {
      const safeObserver = new SafeObserver(observer);
      this.observers = [...this.observers, safeObserver];

      this.buffer.content().forEach(value => safeObserver.next(value));

      return new Subscription(() => {
        this.observers = this.observers.filter(obs => obs !== observer);
      });
    } else {
      return Subscription.empty();
    }
  }

  next(value: T) {
    this.buffer.push(value);
    super.next(value);
  }
}
