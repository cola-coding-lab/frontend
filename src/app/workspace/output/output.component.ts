import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { OutputFile } from './output-file.model';
import { OutputFilesService } from './output-files.service';
import { OutputLibsService } from './output-libs.service';
import { CodeFile } from '../../file/file.model';
import { addScript } from '../../../util/output/add-script';


@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: [ './output.component.scss' ],
})
export class OutputComponent implements AfterViewInit {
  @ViewChild('iframe', { static: false }) iframe!: ElementRef;
  public onresize = false;
  private resizeObserver: ResizeObserver;
  private files: CodeFile[] = [];

  private jsLibs: OutputFile[] = [];

  constructor(
    private elRef: ElementRef,
    private filesService: OutputFilesService,
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
        this.iframe.nativeElement.contentWindow.location.reload();
      }
    });
    this.libsService.subscribe(values => {
      if (values !== this.jsLibs) {
        this.jsLibs = values;
        this.iframe.nativeElement.contentWindow.location.reload();
      }
    });
  }

  public onLoad(iframe: HTMLIFrameElement): void {
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (doc) {
      this.jsLibs.forEach(lib => {
        addScript(doc, lib);
      });

      this.files.map<OutputFile>(file => {
        return { id: file.name, innerHTML: file.content, place: 'body' };
      }).forEach(file => {
        addScript(doc, file);
      });
    }
  }
}
