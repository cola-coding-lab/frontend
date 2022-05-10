import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ModalService } from './modal.service';

@Component({ template: '' })
export abstract class BaseModalComponent implements OnInit, OnDestroy {
  @Input() id!: string;
  @Output() public closed = new EventEmitter<void>();
  public readonly element: HTMLElement;

  protected constructor(
    private er: ElementRef,
    protected modalService: ModalService,
  ) {
    this.element = er.nativeElement;
    this.onKeyUp = this.onKeyUp.bind(this);
  }


  public get isOpen(): boolean {
    return this.element.style.visibility === 'visible' && this.element.style.opacity === '1';
  }

  private onKeyUp(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  ngOnInit(): void {
    if (!this.id) {
      console.error('modal must have an id!');
      return;
    }

    document.body.appendChild(this.element);

    this.element.addEventListener('click', el => {
      const target = el.target as HTMLElement;
      if (target?.className === 'cola-modal-background') {
        this.close();
      }
    });

    this.modalService.add(this);
  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.ownerDocument.removeEventListener('keyup', this.onKeyUp);
    this.element.remove();
  }

  public open(): void {
    this.element.style.visibility = 'visible';
    this.element.style.opacity = '1';
    document.body.classList.add('cola-modal-open');
    this.element.ownerDocument.addEventListener('keyup', this.onKeyUp)
  }

  public close(): void {
    this.element.style.opacity = '0';
    this.element.style.visibility = 'hidden';
    document.body.classList.remove('cola-modal-open');
    this.element.ownerDocument.removeEventListener('keyup', this.onKeyUp);
    this.closed.emit();
  }
}
