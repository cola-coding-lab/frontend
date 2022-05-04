import Dexie, { Table } from 'dexie';
import { IProject } from '../../app/project/project.model';
import { EditorFile, FileType } from '../../app/file/file.model';

export interface DbProject {
  name: string;
  title: string;
  description: string;
  showHidden: boolean;
}

interface DbFsItem {
  id?: number;
  name: string;
  projectName: string;
}

export interface DbFile extends DbFsItem {
  type: string;
  content: string;
  isOpen: boolean;
}

export interface DbDir extends DbFsItem {
  children: number[];
}


export class AppDB extends Dexie {
  projects!: Table<DbProject, number>;
  files!: Table<DbFile, number>;
  directories!: Table<DbFile, number>;

  constructor() {
    super('vcl-fs-db');
    this.version(3).stores({
      projects: 'name',
      files: '++id, projectName',
      directories: '++id, projectName',
    });
    this.on('populate', () => this.populate());
  }

  async populate() {
    // Todo?
  }

  async foo() {
    const [ projects, files, dirs ] = await Promise.all([
        this.projects.toArray(),
        this.files.toArray(),
        this.directories.toArray(),
      ],
    );

    return projects.map<IProject>(project => {
      return {
        ...project,
        files: files.filter(file => file.projectName === project.name).map<EditorFile>(file => {
          return {
            ...file,
            type: file.type as FileType
          };
        }),
      };
    });
  }
}

export const db = new AppDB();
