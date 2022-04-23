import { EditorFile } from '../app/file/file.model';
import { checkForActiveFile } from './file';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { StorageService } from '../app/storage/storage.service';

export abstract class BaseFileService {
  protected files: EditorFile[] = [];
  private readonly subject: Subject<EditorFile[]>;

  protected constructor(
    protected storageService: StorageService,
  ) {
    this.subject = new BehaviorSubject(checkForActiveFile(this.files));
  }

  public add(file: EditorFile): void {
    if (this.files.find(f => f.name === file.name)) {
      throw new Error('file already exists');
    }
    if (file.isOpen) {
      this.files = this.files.map(f => {
        f.isOpen = false;
        return f;
      });
    }
    this.files.push(file);
    this.subject.next(this.files);
  }

  public delete(file: EditorFile): void {
    this.storageService.remove(file.name);
    this.files = checkForActiveFile(this.files.filter(f => f.name !== file.name));
    this.subject.next(this.files);
    console.log(`${file.name} removed`);
  }

  public update(files: EditorFile[]): void {
    this.files = checkForActiveFile(files);
    this.files.forEach(file => this.save(file));
    this.subject.next(this.files);
  }

  public save(file: EditorFile): void {
    file.isModified = undefined;
    this.storageService.save(file.name, file);
    console.log(`${file.name} saved`);
  }

  public subscribe(
    next: (value: EditorFile[]) => void,
    error?: (error: any) => void,
    complete?: () => void,
  ): Subscription {
    return this.subject.subscribe(next, error, complete);
  }

  public abstract allStoredFiles(): EditorFile[];

  protected next(files: EditorFile[]): void {
    this.files = checkForActiveFile(files);
    this.subject.next(this.files);
  }
}
