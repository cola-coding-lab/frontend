import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Codefile } from '../../welcome/workshops/codefile';
import { OutputFile } from './output-file.model';
import { OutputFilesService } from './output-files.service';
import { OutputLibsService } from './output-libs.service';


@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss'],
})
export class OutputComponent implements AfterViewInit {
  @ViewChild('iframe', { static: false }) iframe!: ElementRef;
  public onresize = false;
  private resizeObserver: ResizeObserver;
  private files: Codefile[] = [];

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

  private static addScript(doc: Document, lib: OutputFile): void {
    const script = doc.createElement('script');
    const place = lib.place || 'body';
    if (lib.src) { script.src = lib.src; }
    script.innerHTML = lib.innerHTML || '';
    doc[place].append(script);
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.elRef.nativeElement.parentElement);
    this.filesService.subscribe(values => this.files = values);
    this.iframe.nativeElement.contentWindow.location.reload();
  }

  public onLoad(iframe: HTMLIFrameElement): void {
    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (doc) {
      console.log(doc);
      this.jsLibs.forEach(lib => {
        OutputComponent.addScript(doc, lib);
      });

      this.files.map<OutputFile>(file => {
        return { id: file.name, innerHTML: file.content, place: 'body' };
      }).forEach(file => {
        OutputComponent.addScript(doc, file);
      });
    }
  }
}
