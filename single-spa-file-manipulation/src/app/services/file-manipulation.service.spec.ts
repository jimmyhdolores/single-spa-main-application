import { TestBed } from '@angular/core/testing';

import { FileManipulationService } from './file-manipulation.service';

describe('FileManipulationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileManipulationService = TestBed.get(FileManipulationService);
    expect(service).toBeTruthy();
  });
});
