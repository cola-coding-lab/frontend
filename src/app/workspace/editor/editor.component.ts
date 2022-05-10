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
import { EditorFromTextArea } from 'codemirror';
import { Subscription, timer } from 'rxjs';
import { EditorFile } from '../../file/file.model';
import { db } from '../../../util/db/db';

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
  public codeMirrorTheme: string = 'default';

  public themes = [
    'default',
    'dracula',
  ];

  private resizeObserver: ResizeObserver;
  private saveSubscription?: Subscription;

  constructor(private elRef: ElementRef) {
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
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.elRef.nativeElement.parentElement);
    this.setEditor();
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }

  public updateTheme(): void {
    this.codeMirrorEditor?.setOption('theme', this.codeMirrorTheme);
    this.codeMirrorEditor?.refresh();
  }

  public updateFontSize($event: any): void {
    const { value, min, max } = $event.target;
    if (+value < +min) {
      $event.target.value = min;
      return $event.target.dispatchEvent(new Event('change'));
    }
    if (+value > +max) {
      $event.target.value = max;
      return $event.target.dispatchEvent(new Event('change'));
    }
    const div = this.editor?.nativeElement.querySelector('.CodeMirror');
    div.style.fontSize = `${value}px`;
    this.codeMirrorEditor?.refresh();
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

    const options = {
      lineNumbers: true,
      mode: this.file?.type || 'text/text',
      styleActiveLine: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      theme: 'dracula',
      tabSize: 2,
      value: this.file?.content || '',
      extraKeys: {
        'Ctrl-S': this.save,
      },
    };

    this.codeMirrorEditor = CodeMirror.fromTextArea(this.code.nativeElement, options);
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
