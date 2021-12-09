import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[contextMenu]'
})
export class ContextMenuDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
