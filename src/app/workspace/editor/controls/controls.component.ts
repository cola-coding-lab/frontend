import { Component, EventEmitter, Output } from '@angular/core';
import { ControlState } from './controls.model';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: [ './controls.component.scss' ],
})
export class ControlsComponent {
  @Output() public state = new EventEmitter<ControlState>();
  private mState: ControlState = ControlState.STOP;

  constructor() { }

  public run(): void {
    this.mState = ControlState.RUN;
    this.emit();
  }

  public stop(): void {
    this.mState = ControlState.STOP;
    this.emit();
  }

  public isActive(): boolean {
    return this.mState === ControlState.RUN;
  }

  private emit(): void {
    this.state.emit(this.mState);
  }
}
