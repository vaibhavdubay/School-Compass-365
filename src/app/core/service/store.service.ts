import { Action, MemoizedSelector, Store } from '@ngrx/store';
import { filter } from 'rxjs';

export class StoreService<S> {
  constructor(private store: Store) {}
  public select<T>(selector: MemoizedSelector<object, T, (s1: S) => T>) {
    return this.store
      .select(selector)
      .pipe(filter((d) => d !== undefined && d !== null));
  }

  public dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
