import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../project/project';

@Component({
  selector: 'explorer-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  @Input('project') public project!: Project;
  collapse: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  saveProjectChanges() {
    this.collapse = true;
    this.project.save();
  }
}
