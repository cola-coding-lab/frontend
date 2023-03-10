import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ComputedComponent } from 'src/util/computed.component';
import { DraftService } from '../welcome/draft.service';
import { environment } from '../../environments/environment';
import { CurrentProjectService } from '../project/current-project.service';
import { ThemeSwitchService } from '../workspace/theme-switch/theme-switch.service';
import { ProjectModalComponent } from '../workspace/explorer/project/project-modal/project-modal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ],
})
export class HeaderComponent extends ComputedComponent implements OnInit {
  public isEditor = environment.isEditor;
  public title = environment.title;
  private theme;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private currentProjectService: CurrentProjectService,
    private themeService: ThemeSwitchService,
    private draftService: DraftService,
  ) {
    super();
    this.theme = themeService.theme;
  }

  public get hasProject(): boolean {
    return this.currentProjectService.activeProject !== undefined;
  }

  protected get selectorPrefix(): string {
    return 'header';
  }

  ngOnInit(): void {
    this.themeService.subscribe(theme => this.theme = theme);
  }

  public openProjectModal() {
    ProjectModalComponent.create(this.viewContainerRef);
  }

  public themeClass() {
    return [
      `bg-${this.theme}`,
      `navbar-${this.theme}`,
    ];
  }

  getDraft(id: number) {
    this.draftService.current = id;
  }
}
