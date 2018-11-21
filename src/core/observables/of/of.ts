import { Observable } from '../observable/observable';

export function of<T>(value: T): Observable<T> {
  return new Observable(function ofDataSource(observer) {
    observer.next(value);
    observer.complete();
  });
}
