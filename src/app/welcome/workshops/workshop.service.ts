import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http'
// import { catchError, map, tap } from 'rxjs/operators';
import { WorkshopOverview, WorkshopOverviewAPIResponse } from './workshopOverview';
import { WORKSHOPS } from './mock-workshops';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})


export class WorkshopService {
  // private workshop = WORKSHOPS;
// workshops : Workshop[] = WORKSHOPS[];

  constructor(
    private http: HttpClient
  ) {

  }


  // public subscribe () {

  // }

  getWorkshops(): Observable<WorkshopOverviewAPIResponse> {
    console.log(`${environment.api.src}/${environment.api.version}/vcl/workshops`);
    return this.http.get<WorkshopOverviewAPIResponse>(`${environment.api.src}/${environment.api.version}/vcl/workshops`);
  }

  // getWorkshops() {
  //   this.workshops;
  // }
  // getWorkshops() {
  //   return WORKSHOPS;
  // }
  // URL to web api
  // private workshopsUrl = 'api/workshops';

  // httpOptions = {
  //   headers: new HttpHeaders({'ContentType': 'application/json'})
  // };

  // constructor(
  //   private http : HttpClient
  // ) { }

// getWorkshops() : Observable<Workshop[]>{
//   const workshops = WORKSHOPS;
//   return workshops;
// }

  // getWorkshops(): Observable<Workshop[]> {
  //   const url = `${this.workshopsUrl}`
  // /?id=${id}`;
  // return this.http.get<Workshop[]>(url)
  // .pipe(
  //   map(workshops => workshops[0]),
  //   tap(w => {
  //     const outcome = w ? 'fetched' : 'did not find';
  //     this.console.log(`${outcome} workshop id=${id}`);
  //   }),
  //   // catchError(this.handleError<Workshops>(`getWorkshops id =${id}`))
  // );
  // }
}
