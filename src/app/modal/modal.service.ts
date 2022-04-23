import { Injectable } from '@angular/core';
import { BaseModalComponent } from './base-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modals: BaseModalComponent[] = [];

  constructor() { }

  public remove(id: string): void {
    this.modals = this.modals.filter(m => m.id !== id);
  }

  public add(modal: BaseModalComponent): void {
    this.modals.push(modal);
  }

  public open(id: string): void {
    const modal = this.modals.find(m => m.id === id);
    modal?.open();
  }

  public close(id: string): void {
    const modal = this.modals.find(m => m.id === id);
    modal?.close();
  }
}
