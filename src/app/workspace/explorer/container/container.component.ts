import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { ContainerContentComponent } from './container-content.component';

@Component({
  selector: 'explorer-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements AfterContentInit {
  @Input() public title!: string;
  @Input() public collapse: boolean = true;
  @ContentChildren(ContainerContentComponent) private children!: QueryList<ContainerContentComponent>;
  @Input() public showAdd: boolean = false;
  @Output() public addClicked: EventEmitter<void> = new EventEmitter<void>();

  ngAfterContentInit(): void {
    this.children.forEach(child => {
      child.updateCollapse.subscribe(collapse => this.collapse = collapse);
    });
  }

  add($event: MouseEvent) {
    $event.stopPropagation();
    this.addClicked.emit();
  }
}
