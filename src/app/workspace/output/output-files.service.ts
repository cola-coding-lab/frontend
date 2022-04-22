import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { Codefile } from '../../welcome/workshops/codefile';

@Injectable({
  providedIn: 'root',
})
export class OutputFilesService {
  private subject: Subject<Codefile[]>;
  private files: Codefile[] = [];

  constructor() {
    this.subject = new BehaviorSubject<Codefile[]>([]);
  }

  public subscribe(next: (values: Codefile[]) => void, error?: (err: Error) => void, complete?: () => void): Subscription {
    return this.subject.subscribe(next, error, complete);
  }

  public add(file: Codefile): void {
    if (!this.files.includes(file)) {
      this.files.push(file);
      this.subject.next(this.files);
    }
  }

  public remove(file: Codefile): void {
    const files = this.files.filter(f => file !== f);
    if (files.length !== this.files.length) {
      this.files = files;
      this.subject.next(this.files);
    }
  }

  public clear(): void {
    this.files = [];
    this.subject.next([]);
  }
}
