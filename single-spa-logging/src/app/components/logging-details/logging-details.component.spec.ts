import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggingDetailsComponent } from './logging-details.component';

describe('LoggingDetailsComponent', () => {
  let component: LoggingDetailsComponent;
  let fixture: ComponentFixture<LoggingDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoggingDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
