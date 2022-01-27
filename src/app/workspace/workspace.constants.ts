import { BootstrapBreakPoints } from './workspace.model';

export const breakpoints: BootstrapBreakPoints = {
  'sm': 576,
  'md': 768,
  'lg': 992,
  'xl': 1200,
  'xxl': 1400,
};

export const measurements: { [key: string]: 'height' | 'width' } = {
  vertical: 'height',
  horizontal: 'width',
};

export const viewMeasures: { [key: string]: 'vh' | 'vw' } = {
  vertical: 'vh',
  horizontal: 'vw',
};

export const dividerVars = {
  size: '--divider-size',
  after: '--divider-after',
  lt: '--divider-lt',
};

type Direction = 'vertical' | 'horizontal';

export function getDirection(element: HTMLElement,
                             attribute: string = 'data-direction',
                             fallback: Direction = 'horizontal'): Direction {
  return /vertical|horizontal/i.exec(element.getAttribute(attribute) || '')?.[0] as Direction || fallback;
}
