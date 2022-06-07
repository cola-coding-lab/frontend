import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { CurrentSelectedService } from '../../explorer/file/current-selected.service';
import { EditorFile } from '../../../file/file.model';
import { db } from '../../../../util/db/db';

@Injectable({
  providedIn: 'root',
})
export class OpenTabsService {
  private subject: Subject<EditorFile[]>;
  private files: EditorFile[] = [];

  constructor(
    private explorerCurrentSelectedService: CurrentSelectedService,
  ) {
    this.subject = new BehaviorSubject<EditorFile[]>([]);
  }

  public subscribe(next: (values: EditorFile[]) => void, error?: (err: Error) => void, complete?: () => void): Subscription {
    return this.subject.subscribe(next, error, complete);
  }

  public add(file: EditorFile): void {
    if (!this.files.find(f => f.id === file.id)) {
      this.files.push(file);
      this.subject.next(this.files);
    }
  }

  public remove(file: EditorFile): void {
    file.isOpen = false;
    file.editor = undefined;
    this.files = this.files.filter(f => file.id !== f.id);
    this.subject.next(this.files);
    db.saveFile(file);
  }

  public select(file: EditorFile): void {
    this.files.forEach(f => { f.isOpen = false; });
    file.isOpen = true;
    this.add(file);
    this.explorerCurrentSelectedService.currentSelected = file;
    db.saveFile(file);
  }

  public clear(): void {
    this.files.forEach(f => {f.isOpen = false; });
    this.files = [];
    this.subject.next(this.files);
  }
}
