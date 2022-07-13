import { Component, OnInit } from '@angular/core';
import { ComputedComponent } from 'src/util/computed.component';
import { environment } from '../../environments/environment';
import { ThemeSwitchService } from '../workspace/theme-switch/theme-switch.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: [ './footer.component.scss' ],
})
export class FooterComponent extends ComputedComponent implements OnInit {
  public info = {
    href: environment.baseHref,
    text: environment.title,
  };
  private theme;

  constructor(
    private readonly themeService: ThemeSwitchService,
  ) {
    super();
    this.theme = this.themeService.theme;
  }

  public get year(): number {
    return new Date().getFullYear();
  }

  protected get selectorPrefix(): string {
    return 'footer';
  }

  ngOnInit(): void {
    this.themeService.subscribe(theme => this.theme = theme);
  }

  public themeClass() {
    return [
      `bg-${this.theme}`,
      `footer-${this.theme}`,
    ];
  }
}
