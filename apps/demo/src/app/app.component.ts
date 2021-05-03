import { Component, OnInit } from '@angular/core';
import { AppStore } from './app-store.service';

@Component({
  selector: 'rx-query-store-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(public store: AppStore) {}

  async refresh() {
    await this.store.loadData();
  }

  ngOnInit() {
    this.store.loadData();
  }
}
