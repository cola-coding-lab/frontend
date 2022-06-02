import { OutputFile } from '../../app/workspace/output/output-file.model';
import { IProject } from '../../app/project/project';
import { CodeFile } from '../../app/file/file.model';

interface CreateDocumentOptions {
  project?: IProject;
  files?: CodeFile[];
  jsLibs: OutputFile[];
  removeSettings?: boolean;
}

class CreateDocumentError extends Error {
  constructor(msg: string, public readonly iframe: HTMLIFrameElement) { super(msg); }
}

function CodeFile2OutputFile(file: CodeFile): OutputFile {
  return {
    id: file.name,
    innerHTML: file.content,
    place: 'body',
  };
}

export function createDoc(iframe: HTMLIFrameElement, options: CreateDocumentOptions): Document {
  const doc = iframe.contentDocument || iframe.contentWindow?.document;
  if (!doc) { throw new CreateDocumentError('could not create Document', iframe); }
  const { jsLibs, files, project, removeSettings } = options;
  jsLibs.forEach(lib => addScript(doc, lib));
  files?.map<OutputFile>(CodeFile2OutputFile).forEach(file => addScript(doc, file));
  project?.files.map<OutputFile>(CodeFile2OutputFile).forEach(file => addScript(doc, file));

  doc.title = project?.title || 'VCL';

  if (project) {
    const description = doc.createElement('meta') as HTMLMetaElement;
    description.name = 'description';
    description.content = project.description;
    doc.head.appendChild(description);
  }
  if (removeSettings) { doc.querySelector('script#settings')?.remove(); }

  return doc;
}

export function addScript(doc: Document, lib: OutputFile): void {
  const script = doc.createElement('script');
  const place = lib.place || 'body';
  if (lib.src) { script.src = lib.src; }
  script.innerHTML = lib.innerHTML || '';
  if (lib.id) { script.id = lib.id; }
  script.async = false;
  doc[place].append(script);
}
