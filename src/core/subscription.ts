import { isFunction, noop } from 'utils'

import { TearDownLogic } from './interfaces'

export class Subscription {
  constructor(private tearDownLogic: TearDownLogic = noop) {}

  unsubscribe() {
    if (isFunction(this.tearDownLogic)) {
      this.tearDownLogic()
    }
  }

  static empty() {
    return new Subscription()
  }
}
