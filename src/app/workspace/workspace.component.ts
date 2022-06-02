import { Component } from '@angular/core';
import { ResizeableContainerComponent } from './resizeable-container.component';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: [ './workspace.component.scss' ],
})
export class WorkspaceComponent extends ResizeableContainerComponent {
  constructor() { super(); }

  ngOnInit(): void {
    super.ngOnInit();
  }
}

