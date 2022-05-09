import { OutputFile } from '../../app/workspace/output/output-file.model';

export function addScript(doc: Document, lib:OutputFile): void {
  const script = doc.createElement('script');
  const place = lib.place || 'body';
  if (lib.src) { script.src = lib.src; }
  script.innerHTML = lib.innerHTML || '';
  if (lib.id) { script.id = lib.id; }
  script.async = false;
  doc[place].append(script);
}
