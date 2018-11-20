import { Subscribable, PartialObserver, Observer } from "core/interfaces";
import { Subscription } from "core/subscription";
import { Subscriber } from "core/subscriber";

import { Observable } from "../observable/observable";

export class Subject<T> extends Observable<T>
  implements Subscribable<T>, Observer<T> {
  protected subscribers: Subscriber<T>[];

  constructor() {
    super();
    this.subscribers = [];
  }

  subscribe(observer?: PartialObserver<T>): Subscription {
    if (observer) {
      const subscriber = new Subscriber(observer);
      this.subscribers = [...this.subscribers, subscriber];

      return new Subscription(() => {
        subscriber.stop();
        this.subscribers = this.subscribers.filter(subs => subs !== subscriber);
      });
    } else {
      return Subscription.empty();
    }
  }

  next(value: T): void {
    this.subscribers.forEach(subscriber => {
      subscriber.next(value);
    });
  }

  error(error: Error): void {
    this.subscribers.forEach(subscriber => {
      subscriber.error(error);
    });
  }

  complete(): void {
    this.subscribers.forEach(subscriber => {
      subscriber.complete();
    });
  }
}
