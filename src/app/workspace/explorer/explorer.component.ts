import { Component, OnInit } from '@angular/core';
import { OpenTabsService } from '../editor/tab-container/open-tabs.service';
import { EditorFile } from '../../file/file.model';
import { CurrentProjectService } from '../../project/current-project.service';
import { Project } from '../../project/project';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: ['./explorer.component.scss'],
})
export class ExplorerComponent implements OnInit {
  public root?: EditorFile; // = { name: '/', type: 'directory', children: [] };
  public project?: Project;

  constructor(
    private openTabsService: OpenTabsService,
    private currentProjectService: CurrentProjectService,
  ) {
    this.setFiles = this.setFiles.bind(this);
  }

  ngOnInit(): void {
    this.currentProjectService.subscribe(
      project => this.project = project,
      err => console.error(err),
    );
  }

  public setFiles(files: EditorFile[]): void {
    this.currentProjectService.update(files);
  }

  public select(file: EditorFile): void {
    this.openTabsService.select(file);
  }
}
