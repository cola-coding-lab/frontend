import { EditorFile, emptyFile } from '../file/file.model';
import { IProject } from './project.model';

export class Project implements IProject {
  public readonly name: string;
  public readonly title: string;
  public readonly description: string;
  public files: EditorFile[];

  constructor(json?: string | IProject) {
    const obj = typeof json === 'string' ? JSON.parse(json) : json;
    this.name = obj?.name || '';
    this.title = obj?.title || '';
    this.description = obj?.description || '';
    this.files = obj?.files || [];
  }

  public get projectRoot(): EditorFile {
    return { name: '/', type: 'directory', children: this.files };
  }

  public static fromJson(json: string | IProject): Project {
    return new Project(json);
  }

  public static fromEmpty(): Project {
    return new Project({
      name: 'Empty',
      title: 'Leeres Projekt',
      description: 'Starte mit einem leeren Projekt',
      files: [emptyFile()],
    });
  }

  public save(): void {
    localStorage.setItem(this.name, JSON.stringify(this));
    this.files.forEach(file => file.isModified = false);
  }
}
