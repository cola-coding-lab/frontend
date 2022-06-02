import { Injectable, Input } from '@angular/core';
import { inject } from '@angular/core/testing';
// import { timeStamp } from 'console';
import { Observable, Subject } from 'rxjs';
import { WelcomeComponent } from './welcome.component';

@Injectable({
  providedIn: 'root'
})

export class DraftService {

// getting the draft depending on clickEvent from header
private subject = new Subject<any>();
id : number = 0;

constructor( ) {}

getClickEvent(id : number) : Observable<any> {
  console.log(`draftService, getClickEvent, id: ${id}`);
  return this.subject.asObservable();
}

// load welcome page depending on draft
    loadWelcomeDraftService(id : number) {
      console.log(`welcomeCom, laodWelcomeDraft, id: ${id}`); 
      this.subject.next(id);
   }

}
