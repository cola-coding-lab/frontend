import { TestBed } from '@angular/core/testing';

import { EditorConfigurationService } from './editor-configuration.service';

describe('EditorSettingsService', () => {
  let service: EditorConfigurationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditorConfigurationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
