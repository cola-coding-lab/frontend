import { Directory, EditorFile, emptyFile } from '../file/file.model';
import { v4 } from 'uuid';
import { db } from '../../util/db/db';

export interface IProject {
  id: string;
  name: string;
  title: string;
  description: string;
  files: EditorFile[];
  showHidden?: boolean;
}

export class Project implements IProject {
  public readonly id: string;
  public readonly name: string;
  public title: string;
  public description: string;
  public files: EditorFile[];
  public showHidden: boolean;

  constructor(json?: string | IProject) {
    const obj = typeof json === 'string' ? JSON.parse(json) : json;
    this.id = obj?.id || v4();
    this.name = obj?.name || '';
    this.title = obj?.title || '';
    this.description = obj?.description || '';
    this.files = obj?.files?.map((file: EditorFile) => {return { ...file, projectId: this.id };}) || [];
    this.showHidden = obj?.showHidden || false;
  }

  public get projectRoot(): Directory {
    return { projectId: this.id, name: '/', children: this.files };
  }

  public static fromJson(json: string | IProject): Project {
    return new Project(json);
  }

  public static fromEmpty(): Project {
    const id = v4();
    return new Project({
      id,
      name: 'Empty',
      title: 'Leeres Projekt',
      description: 'Starte mit einem leeren Projekt',
      files: [ emptyFile(id) ],
    });
  }

  public static filesForExport(project?: Project): EditorFile[] {
    if (!project) { return []; }
    const flatChildren = (children?: EditorFile[]): EditorFile[] => {
      if (!children || children.length === 0) {return [];}
      // const dirs = children.filter(c => c.type === 'directory');
      let tmp: EditorFile[] = [];
      // dirs.forEach(dir => { tmp = [ ...flatChildren(dir.children) ]; });
      const files = children; //.filter(c => c.type !== 'directory');
      return [ ...files, ...tmp ];
    };

    return flatChildren(project.files);
  }

  public toJson(): IProject {
    return {
      ...this,
      projectRoot: undefined,
      files: this.files.map(file => {
        return { ...file, editor: undefined };
      }),
    };
  }

  public save(): void {
    db.projects.put({
      id: this.id,
      name: this.name,
      title: this.title,
      description: this.description,
      showHidden: this.showHidden,
    });
    db.saveFiles(this.files);
  }
}
