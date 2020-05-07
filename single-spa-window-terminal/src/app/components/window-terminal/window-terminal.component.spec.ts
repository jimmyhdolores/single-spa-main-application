import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowTerminalComponent } from './window-terminal.component';

describe('WindowTerminalComponent', () => {
  let component: WindowTerminalComponent;
  let fixture: ComponentFixture<WindowTerminalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WindowTerminalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowTerminalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
