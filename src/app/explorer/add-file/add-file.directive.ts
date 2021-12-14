import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[addFile]',
})
export class AddFileDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
