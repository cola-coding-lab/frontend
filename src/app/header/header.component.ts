import { Component, Directive, ElementRef, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ComputedComponent } from 'src/util/computed.component';
import { setDocumentProperty } from 'src/util/properties';
import { ActivatedRoute, Params } from '@angular/router';
import { NgSwitch, NgSwitchCase } from '@angular/common';
import { WelcomeComponent } from '../welcome/welcome.component';
import { DraftService } from '../welcome/draft.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})

export class HeaderComponent extends ComputedComponent implements OnInit {
  [x: string]: any;
  public title = 'Resizable';


  constructor( private draftService : DraftService) {
    super();
  }

  ngOnInit(): void {
    setDocumentProperty('header-height', this.height);
  }

  getDraft(id : number) {
    this.draftService.loadWelcomeDraftService(id);
  }
}
