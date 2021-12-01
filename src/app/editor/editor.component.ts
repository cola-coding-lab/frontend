import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import * as CodeMirror from 'codemirror';
import { EditorFromTextArea } from 'codemirror';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('code', { static: true }) public code!: ElementRef;
  @ViewChild('editor', { static: true }) public editor!: ElementRef;

  public codeMirrorEditor?: EditorFromTextArea;
  public codeMirrorTheme: string = 'default';

  public themes = [
    'default',
    'dracula',
  ];

  private resizeObserver: ResizeObserver;

  constructor(private elRef: ElementRef) {
    this.resizeObserver = new ResizeObserver(_ => {
      this.codeMirrorEditor?.refresh();
    });
  }

  ngAfterViewInit(): void {
    if (!this.code) { return; }
    this.resizeObserver.observe(this.elRef.nativeElement.parentElement);

    const options = {
      lineNumbers: true,
      mode: 'application/javascript',
      styleActiveLine: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      theme: 'dracula',
      tabSize: 2
    }

    this.codeMirrorEditor = CodeMirror.fromTextArea(this.code.nativeElement, options);
    console.log(this.codeMirrorEditor);
    this.codeMirrorEditor.refresh();
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }

  public updateTheme(): void {
    this.codeMirrorEditor?.setOption('theme', this.codeMirrorTheme);
    this.codeMirrorEditor?.refresh();
  }

  public updateFontSize($event: any): void {
    console.log($event);
    const { value, min, max } = $event.target;
    if (+value < +min) {
      $event.target.value = min;
      return $event.target.dispatchEvent(new Event('change'));
    }
    if (+value > +max) {
      $event.target.value = max;
      return $event.target.dispatchEvent(new Event('change'));
    }
    console.log(value);
    const div = this.editor.nativeElement.querySelector('.CodeMirror');
    div.style.fontSize = `${value}px`;
    this.codeMirrorEditor?.refresh();
  }
}
