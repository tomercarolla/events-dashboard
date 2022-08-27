import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { UserDetails } from './event.model';

export interface DashboardState {
  eventDetails: {
    user: UserDetails;
    eventType: string;
    severity: string;
    time: Date | string;
  }[];
  isLoading: boolean;
}

export const createInitialState = (): DashboardState => {
  return {
    eventDetails: [
      {
        user: {
          name: '',
          email: '',
        },
        eventType: '',
        severity: '',
        time: '',
      },
    ],
    isLoading: false,
  };
};

@Injectable({
  providedIn: 'root',
})
@StoreConfig({ name: 'Dashboard' })
export class DashboardStore extends Store<DashboardState> {
  constructor() {
    super(createInitialState());
  }
}
