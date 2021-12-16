import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { EditorFile } from '../../file/file.model';

@Injectable({
  providedIn: 'root',
})
export class CurrentSelectedService {
  private currentSelectedSubject: Subject<EditorFile | undefined>;

  constructor() {
    this.currentSelectedSubject = new BehaviorSubject<EditorFile | undefined>(undefined);
  }

  public set currentSelected(value: EditorFile | null) {
    this.currentSelectedSubject.next(value || undefined);
  }

  public currentSelected$(next: (value?: EditorFile) => void, error?: (err: Error) => void, complete?: () => void): Subscription {
    return this.currentSelectedSubject.subscribe(next, error, complete);
  }
}
