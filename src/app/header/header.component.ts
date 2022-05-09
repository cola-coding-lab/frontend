import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ComputedComponent } from 'src/util/computed.component';
import { setDocumentProperty } from 'src/util/properties';
import { environment } from '../../environments/environment';
import { CurrentProjectService } from '../project/current-project.service';
import { ProjectModalComponent } from '../workspace/explorer/project/project-modal/project-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ],
})
export class HeaderComponent extends ComputedComponent implements OnInit {
  public title = environment.title;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private currentProjectService: CurrentProjectService,
  ) { super(); }

  public get hasProject(): boolean {
    return this.currentProjectService.activeProject !== undefined;
  }

  ngOnInit(): void {
    setDocumentProperty('header-height', this.height);
  }

  public openProjectModal() {
    ProjectModalComponent.create(this.viewContainerRef);
  }
}
