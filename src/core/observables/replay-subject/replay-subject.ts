import { Observer } from "core/interfaces";
import { Subscriber } from "core/subscriber";
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
      const subscriber = new Subscriber(observer);
      this.subscribers = [...this.subscribers, subscriber];

      this.buffer.content().forEach(value => subscriber.next(value));

      return new Subscription(() => {
        subscriber.stop();
        this.subscribers = this.subscribers.filter(subs => subs !== subscriber);
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
