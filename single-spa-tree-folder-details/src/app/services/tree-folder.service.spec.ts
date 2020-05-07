import { TestBed } from '@angular/core/testing';

import { TreeFolderService } from './tree-folder.service';

describe('TreeFolderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TreeFolderService = TestBed.get(TreeFolderService);
    expect(service).toBeTruthy();
  });
});
