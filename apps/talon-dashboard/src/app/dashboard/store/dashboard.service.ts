import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EventDetails} from './event.model';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient) {
  }

  getAllEvents(): Observable<EventDetails[]> {
    return this.http.get<EventDetails[]>(`${environment.baseUrl}`);
  }

  getFilteredEvents(params: HttpParams): Observable<EventDetails[]> {
    return this.http.get<EventDetails[]>(`${environment.baseUrl}?`, {params});
  }
}
