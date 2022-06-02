import { TestBed } from '@angular/core/testing';

import { ProjectExplorerApiService } from './project-explorer-api.service';

describe('ProjectExplorerApiService', () => {
  let service: ProjectExplorerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectExplorerApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
