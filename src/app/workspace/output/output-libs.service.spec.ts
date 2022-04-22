import { TestBed } from '@angular/core/testing';

import { OutputLibsService } from './output-libs.service';

describe('OutputLibsService', () => {
  let service: OutputLibsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OutputLibsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
