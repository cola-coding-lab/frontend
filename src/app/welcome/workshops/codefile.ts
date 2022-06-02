export interface Codefile {
  name: string;
  type: MimeType;
  content: string;
}


export enum MimeType  {
  js = 'text/javascript',
  css = 'text/css',
  html = 'text/html',
  jpeg = 'image/jpeg',
  png = 'image/png',
  gif = 'image/gif'
}
