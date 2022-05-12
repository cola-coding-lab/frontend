import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as CodeMirror from 'codemirror';
import { EditorConfiguration, EditorFromTextArea } from 'codemirror';
import { Subscription, timer } from 'rxjs';
import { EditorFile } from '../../file/file.model';
import { db } from '../../../util/db/db';
import { EditorConfigurationService, FontSizeEvent } from './editor-configuration.service';
import { parseNum } from '../../../util/number';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: [ './editor.component.scss' ],
})
export class EditorComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  private static readonly AUTO_SAVE_AFTER = 5000; // 5 seconds
  @ViewChild('code', { static: true }) public code!: ElementRef;
  @ViewChild('editor', { static: true }) public editor!: ElementRef;
  @Input() file?: EditorFile;
  public codeMirrorEditor?: EditorFromTextArea;
  private config: EditorConfiguration = {};
  private resizeObserver: ResizeObserver;
  private saveSubscription?: Subscription;

  constructor(
    private elRef: ElementRef,
    private configService: EditorConfigurationService,
  ) {
    this.resizeObserver = new ResizeObserver(_ => {
      this.codeMirrorEditor?.refresh();
    });
    this.save = this.save.bind(this);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.setEditor();
  }

  ngOnInit(): void {
    if (!this.file) { throw new Error('no file given'); }
    this.config = {
      lineNumbers: true,
      mode: this.file?.type || 'text/text',
      styleActiveLine: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      theme: 'default',
      tabSize: 2,
      value: this.file?.content || '',
      extraKeys: {
        'Ctrl-S': this.save,
      },
    };
    this.configService.theme$(theme => {
      this.config.theme = theme;
      this.codeMirrorEditor?.setOption('theme', theme);
    });
    this.configService.fontSize$(value => {
      const div: HTMLDivElement = this.editor.nativeElement.querySelector('.CodeMirror');
      const current = parseNum(div.style.fontSize, 16);
      if (value === FontSizeEvent.increase && current < 48) {
        div.style.fontSize = `${current + 1}px`;
        this.codeMirrorEditor?.refresh();
      }
      if (value === FontSizeEvent.decrease && current > 8) {
        div.style.fontSize = `${current - 1}px`;
        this.codeMirrorEditor?.refresh();
      }
    });
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.elRef.nativeElement.parentElement);
    this.setEditor();
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }

  public save(cm?: CodeMirror.Editor): void {
    cm = cm || this.codeMirrorEditor;
    if (!cm || !this.file) { return; }
    console.info(`save ${this.file.name}`);
    this.file.content = cm.getValue();
    this.file.isModified = undefined;
    db.saveFile(this.file);
  }

  private resetEditor(): void {
    this.codeMirrorEditor?.toTextArea();
    this.saveSubscription?.unsubscribe();
    this.codeMirrorEditor = undefined;
    if (this.file) {
      this.file.isModified = undefined;
      this.file.editor = undefined;
    }
  }

  private setEditor(): void {
    if (!this.code) { return; }
    this.resetEditor();

    this.codeMirrorEditor = CodeMirror.fromTextArea(this.code.nativeElement, this.config);
    this.codeMirrorEditor.setValue(this.file?.content || '');
    this.codeMirrorEditor.on('change', (cm: CodeMirror.Editor) => {
      if (!this.file) { return; }
      this.saveSubscription?.unsubscribe();
      this.file.isModified = true;

      this.saveSubscription = timer(EditorComponent.AUTO_SAVE_AFTER).subscribe(_ => {
        this.save(cm);
      });
    });
    if (this.file) { this.file.editor = this.codeMirrorEditor; }
    this.codeMirrorEditor.refresh();
  }
}
