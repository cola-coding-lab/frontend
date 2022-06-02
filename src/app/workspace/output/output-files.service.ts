import { Injectable } from '@angular/core';
import { Codefile } from '../../welcome/workshops/codefile';
import { ShareService } from '../../../util/share.service';

@Injectable({
  providedIn: 'root',
})
export class OutputFilesService extends ShareService<Codefile> {
  constructor() {
    super();
  }
}
