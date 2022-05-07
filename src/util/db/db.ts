import Dexie, { Table } from 'dexie';
import { IProject } from '../../app/project/project.model';
import { EditorFile, FileType } from '../../app/file/file.model';

export interface DbProject {
  id: string;
  name: string;
  title: string;
  description: string;
  showHidden: boolean;
}

interface DbFsItem {
  id?: number;
  name: string;
  projectId: string;
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
    this.version(1).stores({
      projects: 'id',
      files: '[id+projectId], projectId',
      directories: '[id+projectId], projectId',
    });
    this.on('populate', () => this.populate());
  }

  async populate() {
    // Todo?
  }

  async deleteProject(project: IProject) {
    this.files.where('projectId').equals(project.id).delete();
    this.directories.where('projectId').equals(project.id).delete();
    this.projects.where('id').equals(project.id).delete();
  }

  async  getStoredProjects() {
    const [ projects, files, dirs ] = await Promise.all([
        this.projects.toArray(),
        this.files.toArray(),
        this.directories.toArray(),
      ],
    );

    return projects.map<IProject>(project => {
      return {
        ...project,
        files: files.filter(file => file.projectId === project.id).map<EditorFile>(file => {
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
