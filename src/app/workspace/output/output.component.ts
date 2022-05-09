import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { OutputFile } from './output-file.model';
import { OutputFilesService } from './output-files.service';
import { OutputLibsService } from './output-libs.service';
import { CodeFile } from '../../file/file.model';
import { createDoc } from '../../../util/output/export';
import { OutputProjectService } from './output-project.service';
import { IProject } from '../../project/project';


@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: [ './output.component.scss' ],
})
export class OutputComponent implements AfterViewInit {
  @ViewChild('iframe', { static: false }) iframe!: ElementRef<HTMLIFrameElement>;
  public onresize = false;
  private resizeObserver: ResizeObserver;
  private files: CodeFile[] = [];
  private jsLibs: OutputFile[] = [];
  private project?: IProject;

  constructor(
    private elRef: ElementRef,
    private filesService: OutputFilesService,
    private projectService: OutputProjectService,
    private libsService: OutputLibsService,
  ) {
    this.resizeObserver = new ResizeObserver(_ => {
      console.log('resize ' + OutputComponent.name);
    });
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.elRef.nativeElement.parentElement);
    this.filesService.subscribe(values => {
      if (values !== this.files) {
        this.files = values;
        this.iframe.nativeElement.contentWindow?.location.reload();
      }
    });
    this.libsService.subscribe(values => {
      if (values !== this.jsLibs) {
        this.jsLibs = values;
        this.iframe.nativeElement.contentWindow?.location.reload();
      }
    });
    this.projectService.subscribe(([ project ]) => {
      if (project !== this.project) {
        this.project = project;
        this.iframe.nativeElement.contentWindow?.location.reload();
      }
    });
  }

  public onLoad(iframe: HTMLIFrameElement): void {
    try {
      createDoc(iframe, { jsLibs: this.jsLibs, project: this.project, files: this.files });
    } catch (err) {
      console.error((err as Error).message);
      this.iframe.nativeElement.contentWindow?.location.reload();
    }
  }
}
