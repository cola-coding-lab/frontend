import { Injectable } from '@angular/core';
import { WorkshopOverviewAPIResponse } from './workshop-overview.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { WorkshopDetailAPIResponse } from './workshop-detail.model';

@Injectable({
  providedIn: 'root',
})

export class WorkshopService {
  constructor(private http: HttpClient) { }

  workshops$(): Observable<WorkshopOverviewAPIResponse> {
    return this.http.get<WorkshopOverviewAPIResponse>(`${environment.api.src}/${environment.api.version}/vcl/workshops`);
  }

  workshop$(id: string): Observable<WorkshopDetailAPIResponse> {
    return this.http.get<WorkshopDetailAPIResponse>(`${environment.api.src}/${environment.api.version}/vcl/workshops/${id}`);
  }
}
