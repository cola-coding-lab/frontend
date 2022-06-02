import { TestBed } from '@angular/core/testing';

import { OutputProjectService } from './output-project.service';

describe('OutputProjectService', () => {
  let service: OutputProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutputProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
