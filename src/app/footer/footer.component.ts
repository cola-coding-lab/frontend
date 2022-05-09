import { Component, OnInit } from '@angular/core';
import { ComputedComponent } from 'src/util/computed.component';
import { setDocumentProperty } from 'src/util/properties';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent extends ComputedComponent implements OnInit {
  public info = {
    href: environment.baseHref,
    text: environment.title,
  };

  public get year(): number {
    return new Date().getFullYear();
  }

  ngOnInit(): void {
    setDocumentProperty('footer-height', this.height);
  }
}
