import { Injectable } from '@angular/core';
import { ShareService } from '../../../util/share.service';
import { CodeFile } from '../../file/file.model';

@Injectable({
  providedIn: 'root',
})
export class OutputFilesService extends ShareService<CodeFile> {
  constructor() {
    super();
  }
}
