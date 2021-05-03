import { BehaviorSubject, Observable } from 'rxjs';
import { delay, distinctUntilChanged, map, shareReplay } from 'rxjs/operators';

export abstract class RxQueryStore<S> {
  public readonly state$: Observable<S>;

  private readonly _state$: BehaviorSubject<S>;

  /**
   * Update the current state
   * @param mapFn function applied to a snapshot of the current state
   */
  update(mapFn: (state: S) => S) {
    this._state$.next(mapFn(this.snapshot));
  }

  /**
   * Merge partial state into current.
   * (NOTE: does not apply a deep merge)
   * @param update the partial state to merge into existing state
   */
  patch(update: Partial<S>) {
    this.update((state) => ({ ...state, ...update }));
  }

  /**
   * @return a snapshot of the current state
   */
  get snapshot(): S {
    return this._state$.value;
  }

  /**
   * Query for a distinct slice of state
   */
  query<K extends keyof S>(key: K): Observable<S[K]>;
  query<T>(project: (state: S) => T): Observable<T>;
  query(): Observable<S>;
  query<T>(
    selector?: ((state: S) => T) | keyof S,
    comparator?: (a: T, b: T) => boolean
  ) {
    let _selector = (s) => s;

    if (typeof selector === 'function') {
      _selector = selector;
    }

    if (typeof selector === 'string') {
      _selector = (s) => s[selector];
    }

    return this.state$.pipe(
      map(_selector),
      comparator ? distinctUntilChanged(comparator) : distinctUntilChanged()
    );
  }

  protected constructor(initialState: S) {
    this._state$ = new BehaviorSubject<S>(initialState);

    this.state$ = this._state$.pipe(delay(0), shareReplay(1));
  }
}
