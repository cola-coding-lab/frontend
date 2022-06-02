import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeSwitchService {
  private static LS_KEY = 'SELECTED_THEME';
  private readonly subject: Subject<Theme>;

  constructor() {
    this.subject = new BehaviorSubject<Theme>(this.theme);
  }

  public get theme(): Theme {
    return (localStorage.getItem(ThemeSwitchService.LS_KEY) || 'light') as Theme;
  }

  public set theme(theme: Theme) {
    localStorage.setItem(ThemeSwitchService.LS_KEY, theme);
    this.subject.next(theme);
  }

  public subscribe(next: (t: Theme) => void, error?: (e: Error) => void, complete?: () => void): Subscription {
    return this.subject.subscribe(next, error, complete);
  }
}
