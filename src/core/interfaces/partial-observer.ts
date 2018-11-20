import { AtLeastOneOf } from 'types';

import { Observer } from './observer';

export type PartialObserver<T> = AtLeastOneOf<Observer<T>>;
