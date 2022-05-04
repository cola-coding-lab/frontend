import { Pipe, PipeTransform } from '@angular/core';
import { ExplorerFile } from './file/file.model';

@Pipe({
  name: 'sortExplorer',
  pure: false,
})
export class SortExplorerPipe implements PipeTransform {
  transform(values?: ExplorerFile[]): ExplorerFile[] | undefined {
    values?.sort((a, b) => {
      const name = a.name.localeCompare(b.name);
      /*if (a.type === 'directory' && b.type === 'directory') { return name; }
      if (a.type !== 'directory' && b.type !== 'directory') { return name; }*/
      return -1;
    });
    return values;
  }
}
