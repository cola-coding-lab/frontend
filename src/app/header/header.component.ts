import { Component, OnInit } from '@angular/core';
import { ComputedComponent } from 'src/util/computed.component';
import { getProperty, setProperty } from 'src/util/properties';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends ComputedComponent implements OnInit {
  public title = 'Resizable';
  
  ngOnInit(): void {
    setProperty('header-height', this.height);
  }
}
