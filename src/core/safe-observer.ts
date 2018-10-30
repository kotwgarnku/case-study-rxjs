import { Observer } from "./interfaces";
import { isFunction } from "utils";

export class SafeObserver<T> {
  constructor(private readonly observer: Observer<T>) {}

  next(value: T) {
    if ("next" in this.observer && isFunction(this.observer.next)) {
      this.observer.next(value);
    }
  }

  error(err: Error) {
    if ("error" in this.observer && isFunction(this.observer.error)) {
      this.observer.error(err);
    }
  }

  complete() {
    if ("complete" in this.observer && isFunction(this.observer.complete)) {
      this.observer.complete();
    }
  }
}
