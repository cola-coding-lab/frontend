import { NgSwitchCase, NgSwitch } from '@angular/common';
import { Component, Input, OnInit, Output } from '@angular/core';
import { environment } from "../../environments/environment";
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { DraftService } from './draft.service';
// import { EventEmitter } from 'stream';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit{
    
 id : number = 1;
 clickEventsubscription : Subscription;

 constructor( private draftService : DraftService) {
    this.clickEventsubscription = this.draftService.getClickEvent(this.id).subscribe (id => this.id = id);
    console.log(`welcomeCom, constructor`)

  }

  ngOnInit(): void {
      
  }

  getDraftWorkshops(id : number) {
    this.id = id;
    this.draftService.getClickEvent(id);
    console.log(`welcomeCom, getDraftWorkshops, id: ${id}`);
  }

}
