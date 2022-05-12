import { Component, OnInit } from '@angular/core';
import { Theme, ThemeSwitchService } from './theme-switch.service';

@Component({
  selector: 'app-theme-switch',
  templateUrl: './theme-switch.component.html',
  styleUrls: ['./theme-switch.component.scss']
})
export class ThemeSwitchComponent implements OnInit {
  state: boolean = false;
  theme: Theme = 'light';

  constructor(private readonly themeSwitchService: ThemeSwitchService) { }

  ngOnInit(): void {
    this.switch((this.themeSwitchService.theme === 'dark'))
  }

  switch(state: boolean) {
    this.state = state;
    this.theme = state ? 'dark' : 'light';
    this.themeSwitchService.theme = this.theme;
  }
}
