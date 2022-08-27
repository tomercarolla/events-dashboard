import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DashboardService } from '../store/dashboard.service';
import { map, Observable, Subscription, tap } from 'rxjs';
import { DashboardStore } from '../store/dashboard.store';
import { DashboardQuery } from '../store/dashboard.query';
import { EventDetails } from '../store/event.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'talon-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort) set matSort(sp: MatSort) {
    this._sort = sp;
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this._paginator = mp;
  }

  displayedColumns: string[] = ['eventType', 'severity', 'user', 'time'];

  dataSource = new MatTableDataSource<EventDetails>();

  isLoading$ = this.dashboardQuery.selectIsLoading$;

  events$: Observable<EventDetails[]> = this.dashboardQuery.selectEvents$.pipe(
    tap((res) => {
      this.dataSource = new MatTableDataSource(res);

      if (this._sort instanceof MatSort) {
        this.dataSource.sort = this._sort;
      }

      if (this._paginator instanceof MatPaginator) {
        this.dataSource.paginator = this._paginator;
      }

      this.changeDetectionRef.detectChanges();
    })
  );

  allEvents: EventDetails[] = [];

  eventsTypes: string[] = [];

  getAllEventsSubscription: Subscription | null = null;

  eventTypesControl = new FormControl([]);

  private _paginator: MatPaginator | undefined;

  private _sort: MatSort | undefined;

  constructor(
    private dashboardService: DashboardService,
    private dashboardStore: DashboardStore,
    private dashboardQuery: DashboardQuery,
    private changeDetectionRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getAllEvents();

    this.dashboardStore.update((store) => {
      return {
        ...store,
        isLoading: true,
      };
    });
  }

  ngOnDestroy(): void {
    this.getAllEventsSubscription?.unsubscribe();
  }

  checkEventTypeName(eventTypeName: string): string {
    let eventName = eventTypeName;

    switch (eventTypeName) {
      case 'openBrowser':
        eventName = 'Open Browser';

        break;
      case 'fileDownload':
        eventName = 'File Download';

        break;
      case 'fileUpload':
        eventName = 'File Upload';

        break;
      case 'loginFail':
        eventName = 'Login Fail';

        break;
      default:
        break;
    }

    return eventName;
  }

  removeEventFromFilter(event: Event, eventName: string): void {
    event.stopPropagation();

    const filteredEvents = this.eventTypesControl.value as never[];

    this.removeEvent(filteredEvents, eventName);
    this.eventTypesControl.setValue(filteredEvents);
  }

  private removeEvent(filteredArray: string[], eventName: string): void {
    const index = filteredArray.indexOf(eventName);

    if (index !== -1) {
      filteredArray.splice(index, 1);
    }
  }

  private getAllEvents(): void {
    this.getAllEventsSubscription = this.dashboardService
      .getAllEvents()
      .pipe(
        map((events) => {
          const typesOfEvents = events.map((item) => item.eventType);

          this.eventsTypes = [...new Set(typesOfEvents)];
          this.allEvents = events;

          this.dashboardStore.update((store) => {
            return {
              ...store,
              eventDetails: events,
              isLoading: false,
            };
          });
        })
      )
      .subscribe();
  }
}
