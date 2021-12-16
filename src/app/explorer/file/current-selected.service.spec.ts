import { TestBed } from '@angular/core/testing';

import { CurrentSelectedService } from './current-selected.service';

describe('CurrentSelectedService', () => {
  let service: CurrentSelectedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentSelectedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
