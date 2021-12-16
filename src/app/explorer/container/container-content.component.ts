import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  template: '',
})
export abstract class ContainerContentComponent {
  @Output() public updateCollapse: EventEmitter<boolean> = new EventEmitter<boolean>();
}
