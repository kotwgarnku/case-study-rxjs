import { Subscribable, Observer } from "core/interfaces";
import { Subscription } from "core/subscription";
import { SafeObserver } from "core/safe-observer";

import { Observable } from "../observable/observable";

export class Subject<T> extends Observable<T> implements Subscribable<T> {
  protected observers: SafeObserver<T>[];

  constructor() {
    super();
    this.observers = [];
  }

  subscribe(observer?: Observer<T>): Subscription {
    if (observer) {
      const safeObserver = new SafeObserver(observer);
      this.observers = [...this.observers, safeObserver];

      return new Subscription(() => {
        this.observers = this.observers.filter(obs => obs !== observer);
      });
    } else {
      return Subscription.empty();
    }
  }

  next(value: T): void {
    this.observers.forEach(observer => {
      observer.next(value);
    });
  }

  error(error: Error): void {
    this.observers.forEach(observer => {
      observer.error(error);
    });
  }

  complete(): void {
    this.observers.forEach(observer => {
      observer.complete();
    });
  }
}
