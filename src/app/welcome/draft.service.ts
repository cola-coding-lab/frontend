import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DraftService {
  private id: number = 1;
  private subject: Subject<number>;

  constructor() {
    this.subject = new BehaviorSubject<number>(this.id);
  }

  get current$(): Observable<number> {
    return this.subject.asObservable();
  }

  get current() {
    return this.id;
  }

  set current(id: number) {
    this.id = id;
    this.subject.next(id);
  }
}
