import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ComputedComponent } from 'src/util/computed.component';
import { setDocumentProperty } from 'src/util/properties';
import { environment } from '../../environments/environment';
import { CurrentProjectService } from '../project/current-project.service';
import { ProjectModalComponent } from '../workspace/explorer/project/project-modal/project-modal.component';
import { ThemeSwitchService } from '../workspace/theme-switch/theme-switch.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ],
})
export class HeaderComponent extends ComputedComponent implements OnInit {
  public title = environment.title;
  private theme;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private currentProjectService: CurrentProjectService,
    private themeService: ThemeSwitchService,
  ) {
    super();
    this.theme = themeService.theme;
  }

  public get hasProject(): boolean {
    return this.currentProjectService.activeProject !== undefined;
  }

  ngOnInit(): void {
    setDocumentProperty('header-height', this.height);
    this.themeService.subscribe(theme => {
      this.theme = theme;
    });
  }

  public openProjectModal() {
    ProjectModalComponent.create(this.viewContainerRef);
  }

  public themeClass() {
    return [
      `bg-${this.theme}`,
      `navbar-${this.theme}`,
    ]
  }
}
