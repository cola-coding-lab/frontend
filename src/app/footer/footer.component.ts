import { Component, OnInit } from '@angular/core';
import { ComputedComponent } from 'src/util/computed.component';
import { getDocumentProperty, setDocumentProperty } from 'src/util/properties';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent extends ComputedComponent implements OnInit {
  public info = {
    href: '#',
    text: 'Resize',
  };
  
  ngOnInit(): void {
    setDocumentProperty('footer-height', this.height);
  }

  public get year(): number {
    return new Date().getFullYear();
  }
}
