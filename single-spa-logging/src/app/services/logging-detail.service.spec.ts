import { TestBed } from '@angular/core/testing';

import { LoggingDetailService } from './logging-detail.service';

describe('LoggingDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoggingDetailService = TestBed.get(LoggingDetailService);
    expect(service).toBeTruthy();
  });
});
