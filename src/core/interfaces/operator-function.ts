import { Observable } from 'core/observables/observable/observable'

import { UnaryFunction } from './unary-function'

export type OperatorFunction<T, R> = UnaryFunction<Observable<T>, Observable<R>>
