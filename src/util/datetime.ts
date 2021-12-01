const lpad = (num: number, size = 2, pad = '0') => {
  return `${num}`.length >= size ? `${num}` : new Array(size - `${num}`.length + 1).join(pad) + `${num}`;
};

export const timestamp = (): string => {
  const now = new Date();
  return `${now.getFullYear()}-${lpad(now.getMonth())}-${lpad(now.getDate())}_${lpad(now.getHours())}:${lpad(now.getMinutes())}:${lpad(now.getSeconds())}:${lpad(now.getMilliseconds(), 3)}`;
};
