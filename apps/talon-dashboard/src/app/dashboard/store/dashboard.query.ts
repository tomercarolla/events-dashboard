import { Query } from '@datorama/akita';
import { DashboardState, DashboardStore } from './dashboard.store';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardQuery extends Query<DashboardState> {
  selectEvents$ = this.select((store) => store.eventDetails);

  selectIsLoading$ = this.select((store) => store.isLoading);

  constructor(protected override store: DashboardStore) {
    super(store);
  }
}
