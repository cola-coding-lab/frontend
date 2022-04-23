import { BehaviorSubject, Subject, Subscription } from 'rxjs';

export abstract class ShareService<T> {
  protected subject: Subject<T[]>;
  protected data: T[] = [];

  protected constructor(initial: T[] = []) {
    this.subject = new BehaviorSubject<T[]>(initial);
  }

  public subscribe(next: (values: T[]) => void, error?: (err: Error) => void, complete?: () => void): Subscription {
    return this.subject.subscribe(next, error, complete);
  }

  public add(data: T): void {
    if (!this.data.includes(data)) {
      this.data.push(data);
      this.subject.next([ ...this.data ]);
    }
  }

  public remove(data: T): void {
    const tmp = this.data.filter(d => data !== d);
    if (tmp.length !== this.data.length) {
      this.data = tmp;
      this.subject.next([ ...this.data ]);
    }
  }

  public clear(): void {
    this.data = [];
    this.subject.next([]);
  }

  public update(data: T[]): void {
    this.data = data;
    this.subject.next([ ...this.data ]);
  }
}
