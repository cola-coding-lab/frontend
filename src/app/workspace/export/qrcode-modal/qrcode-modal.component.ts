import { Component, Input, OnInit, ViewChild } from '@angular/core';
import * as QRCode from 'qrcode-svg';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ModalComponent } from '../../../modal/modal.component';

@Component({
  selector: 'app-qrcode-modal',
  templateUrl: './qrcode-modal.component.html',
  styleUrls: [ './qrcode-modal.component.scss' ],
})
export class QrcodeModalComponent implements OnInit {
  @Input() public content: string = '';
  @ViewChild('modal', { static: true }) modal!: ModalComponent;

  constructor(
    private readonly sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
  }

  qrcode(): SafeHtml {
    const qr = new QRCode({
      content: this.content,
      container: 'svg-viewbox',
      join: true,
    });
    return this.sanitizer.bypassSecurityTrustHtml(qr.svg());
  }

  public open(): void {
    this.modal.open();
  }
}
