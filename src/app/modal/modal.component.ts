import { Component, ElementRef } from '@angular/core';
import { BaseModalComponent } from './base-modal.component';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: [ './modal.component.scss' ],
})
export class ModalComponent extends BaseModalComponent {
  constructor(er: ElementRef, modalService: ModalService) {
    super(er, modalService);
  }
}
