import { PartialObserver } from 'core/interfaces'
import { Subscriber } from 'core/subscriber'
import { Subscription } from 'core/subscription'

import { Subject } from '../subject/subject'
import { Buffer } from './buffer'

export class ReplaySubject<T> extends Subject<T> {
  private buffer: Buffer<T>

  constructor(bufferSize = Number.POSITIVE_INFINITY) {
    super()
    this.buffer = new Buffer<T>(bufferSize)
  }

  subscribe(observer?: PartialObserver<T>): Subscription {
    if (observer) {
      const subscriber = new Subscriber(observer)
      this.buffer.content().forEach((value) => subscriber.next(value))
    }

    return super.subscribe(observer)
  }

  next(value: T) {
    this.buffer.push(value)
    super.next(value)
  }
}
