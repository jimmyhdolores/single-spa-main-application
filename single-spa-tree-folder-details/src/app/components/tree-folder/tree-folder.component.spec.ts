import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeFolderComponent } from './tree-folder.component';

describe('TreeFolderComponent', () => {
  let component: TreeFolderComponent;
  let fixture: ComponentFixture<TreeFolderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeFolderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeFolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
