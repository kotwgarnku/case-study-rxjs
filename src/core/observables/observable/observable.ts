import {
  Observer,
  OperatorFunction,
  Subscribable,
  TearDownLogic
} from "core/interfaces";
import { SafeObserver } from "core/safe-observer";
import { Subscription } from "core/subscription";
import { Subscriber } from "core/subscriber";
import { noop, isFunction } from "utils";

export class Observable<T> implements Subscribable<T> {
  constructor(
    private readonly dataSource: (
      observer: SafeObserver<T>
    ) => TearDownLogic = noop
  ) {}

  subscribe(observer?: Observer<T>): Subscription {
    if (observer) {
      const subscriber = new Subscriber(observer);
      let tearDownLogic: TearDownLogic | undefined;

      try {
        tearDownLogic = this.dataSource(subscriber);
      } catch (err) {
        subscriber.error(err);
        if (isFunction(tearDownLogic)) {
          tearDownLogic();
        }
      }

      return new Subscription(() => {
        subscriber.stop();
        if (isFunction(tearDownLogic)) {
          tearDownLogic();
        }
      });
    } else {
      return Subscription.empty();
    }
  }

  pipe(): Observable<T>;
  pipe<A>(op1: OperatorFunction<T, A>): Observable<A>;
  pipe<A, B>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>
  ): Observable<B>;
  pipe<A, B, C>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>
  ): Observable<C>;
  pipe(...operators: OperatorFunction<any, any>[]): Observable<any> {
    return operators.reduce(
      (observable, operator) => operator(observable),
      this as Observable<any>
    );
  }
}
