const cssUnits = ['px', 'em', '%', 'vh', 'vw'] as const;
const cssUnitsCheck = new RegExp(`\\d+(${cssUnits.join('|')})$`);
type CSSUnit = typeof cssUnits[number];


export function getDocumentProperty(name: string): string {
  return getPropertyFor(document.documentElement, cssVariableName(name));
}

export function getPropertyFor(element: HTMLElement, name: string): string {
  return getComputedStyle(element).getPropertyValue(cssVariableName(name));
}

export function setDocumentProperty(name: string, value: string | number, unit: CSSUnit = 'px'): void {
  setPropertyFor(document.documentElement, name, value, unit);
}

export function setPropertyFor(element: HTMLElement, name: string, value: string | number, unit: CSSUnit = 'px'): void {
  if (element) {
    value = valueContainsUnit(value) ? `${value}` : `${value}${unit}`;
    if (isValidValue(value)) {
      element.style.setProperty(cssVariableName(name), value);
    }
  }
}

function cssVariableName(name: string): string {
  return name.startsWith('--') ? name : `--${name}`;
}

function valueContainsUnit(value: string | number): boolean {
  if (isNaN(+value)) { return cssUnitsCheck.test(`${value}`); }
  return false;
}

function isValidValue(value: string): boolean {
  return cssUnitsCheck.test(value);
}