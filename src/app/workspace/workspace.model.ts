export type BootstrapBreakPoint = 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

interface StringNumber {[key: string]: number;}

export interface BootstrapBreakPoints extends StringNumber {
  'sm': number;
  'md': number;
  'lg': number;
  'xl': number;
  'xxl': number;
}


