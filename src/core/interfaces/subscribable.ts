import { Subscription } from "core/subscription";

import { Observer } from "./observer";

export interface Subscribable<T> {
  subscribe(observer: Observer<T>): Subscription;
}
