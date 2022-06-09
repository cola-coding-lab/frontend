import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { EditorFile } from '../../../file/file.model';

@Injectable({
  providedIn: 'root',
})
export class CurrentSelectedService {
  private currentSelectedSubject: Subject<EditorFile | undefined>;
  private current?: EditorFile;

  constructor() {
    this.currentSelectedSubject = new BehaviorSubject<EditorFile | undefined>(undefined);
  }

  public set currentSelected(value: EditorFile | null) {
    if (this.current?.id !== value?.id) {
      this.current = value || undefined;
      this.currentSelectedSubject.next(this.current);
    }
  }

  public currentSelected$(next: (value?: EditorFile) => void, error?: (err: Error) => void, complete?: () => void): Subscription {
    return this.currentSelectedSubject.subscribe(next, error, complete);
  }
}
