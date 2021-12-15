export function parseNum(value: string, fallback = 1): number {
  return +(/(\d{1,3})%?/.exec(value)?.[1] || fallback);
}
