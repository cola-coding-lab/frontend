import { Component, HostListener, OnInit, QueryList, ViewChildren } from '@angular/core';
import { getPropertyFor, setPropertyFor } from 'src/util/properties';
import { parseNum } from '../../util/number';
import { FlexContainerComponent } from './flex-container/flex-container.component';
import { breakpoints, dividerVars, getDirection, measurements, viewMeasures } from './workspace.constants';
import { BootstrapBreakPoint } from './workspace.model';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
})
export class WorkspaceComponent implements OnInit {
  @ViewChildren(FlexContainerComponent) private children!: QueryList<FlexContainerComponent>;
  private innerWidth: number = 0;

  constructor() { }

  @HostListener('window:resize', ['$event'])
  onResize(event: UIEvent): void {
    const previousWidth = this.innerWidth;
    this.innerWidth = (event.target as Window).innerWidth;
    Object.keys(breakpoints).forEach(bpt => {
      if ((previousWidth < breakpoints[bpt] && this.innerWidth >= breakpoints[bpt])
        || (previousWidth >= breakpoints[bpt] && this.innerWidth < breakpoints[bpt])) {
        return this.children['_results'].forEach((child: FlexContainerComponent) => {
          child.switch(bpt);
        });
      }
    });
  }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  public resize($event: MouseEvent): void {
    // https://htmldom.dev/create-resizable-split-views/
    let x = $event.clientX;
    let y = $event.clientY;

    const resizer = $event.target as HTMLElement;
    const prevSibling = resizer.previousElementSibling as HTMLElement;
    const nextSibling = resizer.nextElementSibling as HTMLElement;
    const direction = getDirection(resizer);
    const m = measurements[direction];
    const vm = viewMeasures[direction];

    const prevMin = parseNum(getComputedStyle(prevSibling).getPropertyValue(`min-${m}`));
    const nextMin = parseNum(getComputedStyle(nextSibling).getPropertyValue(`min-${m}`));

    const prevValue = prevSibling?.getBoundingClientRect()[m];

    console.log(direction, m, prevMin, nextMin, prevValue);

    const oldAfter = getPropertyFor(resizer, dividerVars.after);
    const oldLt = getPropertyFor(resizer, dividerVars.lt);
    setPropertyFor(resizer, dividerVars.after, 100, vm);
    setPropertyFor(resizer, dividerVars.lt, -50, vm);

    const mouseMoveHandler = (e: MouseEvent) => {
      const pos: { [key: string]: number } = {
        height: e.clientY - y,
        width: e.clientX - x,
      };

      const newVal = (prevValue + pos[m]) * 100 / (resizer.parentNode! as Element).getBoundingClientRect()[m];
      if (newVal > prevMin && newVal < (100 - nextMin)) {
        prevSibling.style[m] = `${newVal}%`;
        nextSibling.style[m] = `${100 - newVal}%`;
      }
    };
    const mouseUpHandler = () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
      resizer.style.setProperty(dividerVars.after, oldAfter);
      resizer.style.setProperty(dividerVars.lt, oldLt);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  }

  public getDirection(breakpoint: BootstrapBreakPoint = 'lg'): string {
    return this.innerWidth >= breakpoints[breakpoint] ? 'horizontal' : 'vertical';
  }
}

