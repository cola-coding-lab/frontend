export interface ContextMenuItem {
  text: string;
  event: string;
  data?: any;
}

export interface ContextMenuClick {
  event: any;
  data: ContextMenuItem;
  target?: HTMLElement;
}
