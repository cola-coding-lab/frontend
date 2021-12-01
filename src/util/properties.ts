const cssUnits = ['px', 'em', '%', 'vh', 'vw'] as const;
const cssUnitsCheck = new RegExp(`\\d+(${cssUnits.join('|')})$`);
type CSSUnit = typeof cssUnits[number];


export function getProperty(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(cssVariableName(name));
}

export function setProperty(name: string, value: string | number, unit: CSSUnit = 'px'): void {
  value = valueContainsUnit(value) ? `${value}` : `${value}${unit}`;
  if (isValidValue(value)) {
    document.documentElement.style.setProperty(cssVariableName(name), value);
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