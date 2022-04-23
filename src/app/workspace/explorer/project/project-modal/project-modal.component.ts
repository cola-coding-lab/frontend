import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IProject } from '../../../../project/project.model';
import { Project } from '../../../../project/project';
import { v4 } from 'uuid';
import { IAvailableProjects, ProjectService } from '../project.service';
import { ModalComponent } from '../../../../modal/modal.component';

@Component({
  selector: 'app-project-modal',
  templateUrl: './project-modal.component.html',
  styleUrls: ['./project-modal.component.scss']
})
export class ProjectModalComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('modal', { static: false }) modal!: ModalComponent;
  public availableProjects?: IAvailableProjects;
  private afterInit = new BehaviorSubject(false);
  private availableSubscription?: Subscription;

  constructor(
    private projectService: ProjectService,
  ) { }

  public get newProject(): boolean {
    return !this.projectService.activeProject;
  }

  ngOnDestroy(): void {
    this.availableSubscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.availableSubscription = this.projectService.subscribeAvailable(value => this.availableProjects = value);
  }

  ngAfterViewInit(): void {
    if (this.newProject) { this.open(); }
    this.afterInit.next(true);
  }

  public createProject(project: IProject, create = false): void {
    if (create) {
      project = Project.fromJson(JSON.stringify(project));
      project.name = v4();
    }
    this.projectService.activeProject = project;
    this.modal?.close();
  }

  public open(): void {
    this.afterInit.subscribe(isInit => {
      if (isInit) { this.modal?.open(); }
    });
  }

}
