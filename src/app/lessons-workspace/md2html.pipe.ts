import { Pipe, PipeTransform } from '@angular/core';
import { Converter } from 'showdown';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'md2html'
})
export class Md2htmlPipe implements PipeTransform {
  private showdownConverter: Converter = new Converter();

  constructor(private domSanitizer: DomSanitizer) {
    this.showdownConverter.setOption('simpleLineBreaks', true);
  }

  transform(value: string, ...args: unknown[]): SafeHtml {
    const html = this.showdownConverter.makeHtml(value);
    const sanitizedHtml = this.domSanitizer.bypassSecurityTrustHtml(html);

    return sanitizedHtml;
  }

}
