import { Injectable } from '@angular/core';
import { ShareService } from '../../../util/share.service';
import { IProject } from '../../project/project';

@Injectable({
  providedIn: 'root',
})
export class OutputProjectService extends ShareService<IProject> {
  constructor() { super(); }
}
