import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[addFile]',
})
export class ExplorerAddFileDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
