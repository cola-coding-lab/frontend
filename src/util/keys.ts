export const increaseKeys = [ '+', '=', '*', '´', '`' ];
export const decreaseKeys = [ '-', '_' ];

export function isScrollEvent(event: KeyboardEvent): boolean {
  return (event.ctrlKey && (
    [ ...increaseKeys, ...decreaseKeys ].includes(event.key)
  ));
}
