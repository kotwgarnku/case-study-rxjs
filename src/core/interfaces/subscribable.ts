import { Subscription } from 'core/subscription/subscription'

import { PartialObserver } from './partial-observer'

export interface Subscribable<T> {
  subscribe(observer: PartialObserver<T>): Subscription
}
