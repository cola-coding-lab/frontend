import { TestBed } from '@angular/core/testing';

import { ProjectExplorerApi } from './project-explorer-api.service';

describe('ApiService', () => {
  let service: ProjectExplorerApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectExplorerApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
