import { TestBed } from '@angular/core/testing';

import { OpenTabsService } from './open-tabs.service';

describe('OpenTabsService', () => {
  let service: OpenTabsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenTabsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
