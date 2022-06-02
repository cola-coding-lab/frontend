import { Injectable } from '@angular/core';
import { ShareService } from '../../../util/share.service';
import { OutputFile } from './output-file.model';

@Injectable({
  providedIn: 'root',
})
export class OutputLibsService extends ShareService<OutputFile> {
  constructor() {
    super([ {
      id: 'p5.js',
      place: 'head',
      src: 'https://cdn.jsdelivr.net/npm/p5@1.4.1/lib/p5.js',
    } ]);
  }
}
