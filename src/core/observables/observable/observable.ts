import {
  Observer,
  OperatorFunction,
  Subscribable,
  TearDownLogic
} from "core/interfaces";
import { SafeObserver } from "core/safe-observer";
import { Subscription } from "core/subscription";
import { noop } from "utils";

export class Observable<T> implements Subscribable<T> {
  constructor(
    readonly dataSource: (observer: SafeObserver<T>) => TearDownLogic = noop
  ) {}

  subscribe(observer?: Observer<T>): Subscription {
    if (observer) {
      return new Subscription(this.dataSource(new SafeObserver(observer)));
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
    if (operators.length === 0) {
      return this as Observable<any>;
    } else {
      return operators.reduce(
        (observable, operator) => operator(observable),
        this as Observable<any>
      );
    }
  }
}
