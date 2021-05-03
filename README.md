

# RxQueryStore

Simple, type-safe, framework agnostic state management for javascript applications

# Install
```
npm install --save rx-query-store

# rxjs is a required peer dependency
npm install --save rxjs
```

# Angular Example Usage
```
// angular example (see ./apps/demo for a complete example)
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
```

# Running the Demo APP
```
# clone this repo
npx degit jacksloan/rx-query-store

# install dependencies
npm ci

# run the demo app
npm run start
```