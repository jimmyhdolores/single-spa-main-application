import { TestBed } from '@angular/core/testing';

import { WindowTerminalService } from './window-terminal.service';

describe('WindowTerminalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WindowTerminalService = TestBed.get(WindowTerminalService);
    expect(service).toBeTruthy();
  });
});
