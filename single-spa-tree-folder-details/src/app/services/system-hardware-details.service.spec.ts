import { TestBed } from '@angular/core/testing';

import { SystemHardwareDetailsService } from './system-hardware-details.service';

describe('SystemHardwareDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SystemHardwareDetailsService = TestBed.get(SystemHardwareDetailsService);
    expect(service).toBeTruthy();
  });
});
