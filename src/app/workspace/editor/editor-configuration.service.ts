import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { EditorConfiguration } from 'codemirror';
import { decreaseKeys, increaseKeys, isScrollEvent } from '../../../util/keys';

export enum FontSizeEvent {
  increase,
  decrease,
}

@Injectable({
  providedIn: 'root',
})
export class EditorConfigurationService implements OnDestroy {
  public readonly fontSizeEmitter = new EventEmitter<FontSizeEvent>();
  private readonly subject: Subject<EditorConfiguration>;
  private configuration: EditorConfiguration = {};

  constructor() {
    this.subject = new BehaviorSubject(this.configuration);
    this.onKeyDownListener = this.onKeyDownListener.bind(this);
    this.onWheelListener = this.onWheelListener.bind(this);
    document.addEventListener('keydown', this.onKeyDownListener);
    document.addEventListener('wheel', this.onWheelListener, { passive: false });
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.onKeyDownListener);
  }

  public subscribe(next: (value: EditorConfiguration) => void,
                   error?: (err: Error) => void,
                   complete?: () => void): Subscription {
    return this.subject.subscribe(next, error, complete);
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
