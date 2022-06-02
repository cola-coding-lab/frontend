export function downloadBlob(blob: Blob, filename?: string): HTMLAnchorElement {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');

  a.href = url;
  a.download = filename || 'download';
  a.title = a.download;
  a.target = a.download;

  const clickHandler = () => {
    setTimeout(() => {
      window.URL.revokeObjectURL(url);
      a.removeEventListener('click', clickHandler);
    }, 150);
  };

  a.addEventListener('click', clickHandler, false);

  return a;
}
