// import { Pipe, PipeTransform } from '@angular/core';
// import { Converter } from 'showdown';
// import { DomSanitizer, SafeHtml, SafeScript, SafeStyle, SafeUrl,SafeResourceUrl, SecurityContext} from '@angular/platform-browser';
// @Pipe({
//   name: 'md'
// })

// export class Md2htmlPipe implements PipeTransform {



// // Datei: safe-pipe.ts Projekt: macliems/JixyFront
// // let sanitizer = 

//  public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
//    switch (type) {
//      case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
//      case 'style': return this.sanitizer.bypassSecurityTrustStyle(value);
//      case 'script': return this.sanitizer.bypassSecurityTrustScript(value);
//      case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
//      case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
//      default: throw new Error(`Invalid safe type specified: ${type}`);
//    }
//  }


// //  showdown.parseImgDimensions(true);


//  abstract class DomSanitizer implements Sanitizer {
//   abstract sanitize(context: SecurityContext, value: string | SafeValue): string | null
//   abstract bypassSecurityTrustHtml(value: string): SafeHtml
//   abstract bypassSecurityTrustStyle(value: string): SafeStyle
//   abstract bypassSecurityTrustScript(value: string): SafeScript
//   abstract bypassSecurityTrustUrl(value: string): SafeUrl
//   abstract bypassSecurityTrustResourceUrl(value: string): SafeResourceUrl
// }


import { Pipe, PipeTransform } from '@angular/core';
import { Converter } from 'showdown';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';


@Pipe({
  name: 'scss2html'
})
export class Md2htmlPipe implements PipeTransform {
  private showdownConverter: Converter = new Converter();

  constructor(private domSanitizer: DomSanitizer) {
    this.showdownConverter.setOption('simpleLineBreak', true);

  }
  const value = lessons-workspace.component.scss 

  transform(value: string, ...args: unknown[]): SafeStyle {
    const scss = this.value.parseImgDimensions(true);

    // const scss = this.showdownConverter.makeHtml(value);
    
    // const sanitizedHtml = this.domSanitizer.bypassSecurityTrustHtml(html);

    // const htmlScss = sanitizedscss.parseImgDimensions(true);

    return scss;
  }


}