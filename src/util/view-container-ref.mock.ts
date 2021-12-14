import { ComponentFactory, ComponentRef, Injector, NgModuleRef, Type, ViewContainerRef } from '@angular/core';

export class ViewContainerRefMock extends ViewContainerRef {
  get element(): import('@angular/core').ElementRef<any> {
    throw new Error('Method not implemented.');
  }

  get injector(): import('@angular/core').Injector {
    throw new Error('Method not implemented.');
  }

  get parentInjector(): import('@angular/core').Injector {
    throw new Error('Method not implemented.');
  }

  get length(): number {
    throw new Error('Method not implemented.');
  }

  clear(): void {
    throw new Error('Method not implemented.');
  }

  get(index: number): import('@angular/core').ViewRef {
    throw new Error('Method not implemented.');
  }

  createEmbeddedView<C>(templateRef: import('@angular/core').TemplateRef<C>, context?: C, index?: number): import('@angular/core').EmbeddedViewRef<C> {
    throw new Error('Method not implemented.');
  }

  insert(viewRef: import('@angular/core').ViewRef, index?: number): import('@angular/core').ViewRef {
    throw new Error('Method not implemented.');
  }

  move(viewRef: import('@angular/core').ViewRef, currentIndex: number): import('@angular/core').ViewRef {
    throw new Error('Method not implemented.');
  }

  indexOf(viewRef: import('@angular/core').ViewRef): number {
    throw new Error('Method not implemented.');
  }

  remove(index?: number): void {
    throw new Error('Method not implemented.');
  }

  detach(index?: number): import('@angular/core').ViewRef {
    throw new Error('Method not implemented.');
  }

  createComponent<C>(componentType: Type<C>, options?: { index?: number; injector?: Injector; ngModuleRef?: NgModuleRef<unknown>; projectableNodes?: Node[][] }): ComponentRef<C>;
  createComponent<C>(componentFactory: ComponentFactory<C>, index?: number, injector?: Injector, projectableNodes?: any[][], ngModuleRef?: NgModuleRef<any>): ComponentRef<C>;
  createComponent(componentType: any, options?: { index?: number; injector?: Injector; ngModuleRef?: NgModuleRef<unknown>; projectableNodes?: Node[][] } | number, injector?: Injector, projectableNodes?: any[][], ngModuleRef?: NgModuleRef<any>): ComponentRef<any> {
    throw new Error('Method not implemented.');
  }

}
