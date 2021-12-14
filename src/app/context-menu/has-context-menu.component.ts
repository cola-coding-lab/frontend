import { Component, HostListener, ViewChild } from "@angular/core";
import { ContextMenuComponent } from "./context-menu.component";
import { ContextMenuDirective } from "./context-menu.directive";
import { ContextMenuClick, ContextMenuItem } from "./context-menu.model";

@Component({
  template: '<ng-template contextMenu></ng-template>'
})
export abstract class HasContextMenuComponent<T extends any> {
  @ViewChild(ContextMenuDirective, { static: true }) contextMenu!: ContextMenuDirective;
  protected contextMenuItems: ContextMenuItem[] = [];
  protected contextMenuCustomStyle: any = {};

  public displayContextMenu($event: MouseEvent, data?: T): void {
    $event.preventDefault();

    const viewContainerRef = this.contextMenu.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent<ContextMenuComponent>(ContextMenuComponent);
    componentRef.instance.contextMenuItems = this.contextMenuItems;
    componentRef.instance.target = $event.target as HTMLElement;

    componentRef.instance.onContextMenuItemClick.subscribe(($click: ContextMenuClick) => {
      this.onContextMenuItemClick($click, data);
      viewContainerRef.clear();
    });

    Object.assign(viewContainerRef.element.nativeElement.previousSibling.style, {
      position: 'fixed',
      left: `${$event.clientX}px`,
      top: `${$event.clientY}px`,
      background: '#2d2d2d',
      color: '#fff',
      padding: '15px',
      'z-index': '9999999',
      ...this.contextMenuCustomStyle,
    });
  }

  protected abstract onContextMenuItemClick($event: ContextMenuClick, data?: T): void;

  @HostListener('document:click')
  documentClick(): void {
    const viewContainerRef = this.contextMenu?.viewContainerRef;
    viewContainerRef?.clear();
  }
}
