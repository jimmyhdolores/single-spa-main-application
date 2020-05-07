import { TestBed } from '@angular/core/testing';

import { MemoryDetailsService } from './memory-details.service';

describe('MemoryDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemoryDetailsService = TestBed.get(MemoryDetailsService);
    expect(service).toBeTruthy();
  });
});
