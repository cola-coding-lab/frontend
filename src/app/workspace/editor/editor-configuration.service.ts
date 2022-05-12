import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject, Subscription } from 'rxjs';
import { EditorConfiguration } from 'codemirror';
import { decreaseKeys, increaseKeys, isScrollEvent } from '../../../util/keys';
import { ThemeSwitchService } from '../theme-switch/theme-switch.service';

export enum FontSizeEvent {
  increase,
  decrease,
}

const themes = {
  light: 'default',
  dark: 'dracula',
};

@Injectable({
  providedIn: 'root',
})
export class EditorConfigurationService implements OnDestroy {
  private readonly fontSizeEmitter = new EventEmitter<FontSizeEvent>();
  private readonly subject: Subject<EditorConfiguration>;
  private readonly themeSubject: Subject<string>;
  private configuration: EditorConfiguration = {};

  constructor(
    private themeService: ThemeSwitchService,
  ) {
    this.subject = new BehaviorSubject(this.configuration);
    this.themeSubject = new ReplaySubject(1);
    this.onKeyDownListener = this.onKeyDownListener.bind(this);
    this.onWheelListener = this.onWheelListener.bind(this);
    document.addEventListener('keydown', this.onKeyDownListener);
    document.addEventListener('wheel', this.onWheelListener, { passive: false });
    this.themeService.subscribe(theme => {
      this.update({ theme: themes[theme] });
      this.themeSubject.next(themes[theme]);
    });
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.onKeyDownListener);
  }

  public subscribe(next: (value: EditorConfiguration) => void,
                   error?: (err: Error) => void,
                   complete?: () => void): Subscription {
    return this.subject.subscribe(next, error, complete);
  }

  public theme$(next: (t: string) => void,
                error?: (e: Error) => void,
                complete?: () => void): Subscription {
    return this.themeSubject.subscribe(next, error, complete);
  }

  public fontSize$(next: (fs: FontSizeEvent) => void,
                   error?: (err: Error) => void,
                   complete?: () => void): Subscription {
    return this.fontSizeEmitter.subscribe(next, error, complete);
  }

  public update(config: EditorConfiguration): void {
    this.configuration = { ...this.configuration, ...config };
    this.subject.next(this.configuration);
  }

  private onWheelListener(event: WheelEvent): void {
    if (event.ctrlKey) {
      event.preventDefault();
      this.fontSizeEmitter.emit(event.deltaY < 0 ? FontSizeEvent.increase : FontSizeEvent.decrease);
    }
  }

  private onKeyDownListener(event: KeyboardEvent): void {
    if (isScrollEvent(event)) {
      event.preventDefault();
      if (increaseKeys.includes(event.key)) {
        this.fontSizeEmitter.emit(FontSizeEvent.increase);
      }
      if (decreaseKeys.includes(event.key)) {
        this.fontSizeEmitter.emit(FontSizeEvent.decrease);
      }
    }
  }
}
