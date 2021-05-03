import { Injectable } from '@angular/core';
import { RxQueryStore } from 'libs/rx-query-store/src';
import { timer } from 'rxjs';

interface AppState {
  loading: boolean;
  error: any;
  data: string;
}

@Injectable({ providedIn: 'root' })
export class AppStore extends RxQueryStore<AppState> {
  constructor() {
    super({
      data: null,
      error: null,
      loading: false,
    });
  }

  readonly loading$ = this.query('loading');
  readonly data$ = this.query('data');
  readonly error$ = this.query('error');

  async loadData() {
    try {
      this.patch({ loading: true });
      await timer(3000).toPromise();
      this.patch({ data: new Date().toISOString() });
    } catch (error) {
      this.patch({ error });
    } finally {
      this.patch({ loading: false });
    }
  }
}
