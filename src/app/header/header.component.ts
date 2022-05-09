import { Component, OnInit } from '@angular/core';
import { ComputedComponent } from 'src/util/computed.component';
import { setDocumentProperty } from 'src/util/properties';
import { environment } from '../../environments/environment';
import { CurrentProjectService } from '../project/current-project.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [ './header.component.scss' ],
})
export class HeaderComponent extends ComputedComponent implements OnInit {
  public title = environment.title;

  constructor(private currentProjectService: CurrentProjectService) { super(); }

  public get hasProject(): boolean {
    return this.currentProjectService.activeProject !== undefined;
  }

  ngOnInit(): void {
    setDocumentProperty('header-height', this.height);
  }
}
