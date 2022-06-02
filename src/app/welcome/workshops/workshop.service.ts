import { Injectable } from '@angular/core';
import { WorkshopOverview, WorkshopOverviewAPIResponse } from './workshopOverview';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class WorkshopService {
  private subject = new Subject<any>();

  constructor(
    private http: HttpClient
  ) {

  }

  sendClickEvent(id: number) {
    console.log(`workshopservice sendclickevent , id: ${id}, this.subject.next(id) -> ${this.subject.next(id)}`); 

    this.subject.next(id);
  }

  getClickEvent(id : number): Observable<any> {
    console.log(`workshopservice getclickevent , id: ${id} und subject: ${this.subject}`);

    return this.subject.asObservable();

  }

  getWorkshops(): Observable<WorkshopOverviewAPIResponse> {
    console.log(`${environment.api.src}/${environment.api.version}/vcl/workshops`);
    return this.http.get<WorkshopOverviewAPIResponse>(`${environment.api.src}/${environment.api.version}/vcl/workshops`);
  }
}
