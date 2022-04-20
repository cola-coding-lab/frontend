import { Component, Input, OnInit } from '@angular/core';
import { Lesson } from '../welcome/workshops/lesson';

@Component({
  selector: 'app-lessons-workspace',
  templateUrl: './lessons-workspace.component.html',
  styleUrls: ['./lessons-workspace.component.scss']
})
export class LessonsWorkspaceComponent implements OnInit {
  @Input() lesson!: Lesson;

  constructor() { }

  ngOnInit(): void {
  }

}
