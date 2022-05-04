import { Directory, EditorFile, emptyFile } from '../file/file.model';
import { IProject } from './project.model';
import { v4 } from 'uuid';

export class Project implements IProject {
  public readonly id: number;
  public readonly name: string;
  public title: string;
  public description: string;
  public files: EditorFile[];
  public showHidden: boolean;

  constructor(json?: string | IProject) {
    const obj = typeof json === 'string' ? JSON.parse(json) : json;
    obj.files = convertFiles(obj.files);
    this.id = obj?.id || 0;
    this.name = obj?.name || '';
    this.title = obj?.title || '';
    this.description = obj?.description || '';
    this.files = obj?.files || [];
    this.showHidden = obj?.showHidden || false;
  }

  public get projectRoot(): Directory {
    return { name: '/', children: this.files };
  }

  public static fromJson(json: string | IProject): Project {
    return new Project(json);
  }

  public static fromEmpty(): Project {
    const projectName = 'Empty' + v4();
    return new Project({
      name: projectName,
      title: 'Leeres Projekt',
      description: 'Starte mit einem leeren Projekt',
      files: [ emptyFile(projectName) ],
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
    localStorage.setItem(this.name, JSON.stringify(this.toJson()));
    this.files.forEach(file => file.isModified = false);
  }
}


function convertFiles(files: EditorFile[] | ScriptFile[]) {
  return files.map<EditorFile>(f => {
    if (f && 'script' in f) {
      return { name: f.filename, type: f.filetype, content: f.script.innerHTML || '' } as EditorFile;
    }
    return f as EditorFile;
  });
}


export interface IScript {
  src?: string;
  innerHTML?: string;
}

export interface ScriptFile {
  script: IScript;
  filename: string;
  filetype: ScriptFileType;
  isModule?: boolean;
  isActive?: boolean;
  isModified?: boolean;
}

// http://www.iana.org/assignments/media-types/media-types.xhtml
export enum ScriptFileType {
  javascript = 'application/javascript',
  json = 'application/json',
  plain = 'text/plain',
}
