import { Component, OnInit, ViewChild } from '@angular/core';
import { OpenTabsService } from '../editor/tab-container/open-tabs.service';
import { CodeFile, EditorFile, MimeType } from '../../file/file.model';
import { CurrentProjectService } from '../../project/current-project.service';
import { Project } from '../../project/project';
import { ControlState } from '../editor/controls/controls.model';
import { OutputFilesService } from '../output/output-files.service';
import { FileComponent } from './file/file.component';

@Component({
  selector: 'app-explorer',
  templateUrl: './explorer.component.html',
  styleUrls: [ './explorer.component.scss' ],
})
export class ExplorerComponent implements OnInit {
  public project?: Project;
  private explorerFile?: FileComponent;

  constructor(
    private openTabsService: OpenTabsService,
    private outputFilesService: OutputFilesService,
    private currentProjectService: CurrentProjectService,
  ) {
    this.setFiles = this.setFiles.bind(this);
  }

  @ViewChild('explorerFile') set expFile(ref: FileComponent) {
    this.explorerFile = ref;
  }

  ngOnInit(): void {
    this.currentProjectService.subscribe(
      project => {
        this.project = project;
        this.project.files.forEach(file => {
          if (file.isOpen) { this.openTabsService.select(file); }
        });
      },
      err => console.error(err),
    );
  }

  public setFiles(files: EditorFile[]): void {
    this.currentProjectService.update(files);
  }

  public select(file: EditorFile): void {
    this.openTabsService.select(file);
  }

  public controlStateChanged(state: ControlState): void {
    if (state === ControlState.RUN) {
      this.project?.save();
      const files = Project.filesForExport(this.project).sort((a, b) => {
        if (a.name > b.name) { return 1; }
        if (b.name > a.name) { return -1; }
        return 0;
      }).map<CodeFile>(f => {
        return { name: f.name, type: f.type as MimeType, content: f.content || '' };
      });
      const mainIdx = files.findIndex(f => f.name.match(/(index|main)\.js/i));
      if (mainIdx >= 0) {
        files.push(files.splice(mainIdx, 1).pop()!);
      }
      this.outputFilesService.update(files);
    } else {
      this.outputFilesService.clear();
    }
  }

  public add(): void {
    this.explorerFile?.add();
  }
}
