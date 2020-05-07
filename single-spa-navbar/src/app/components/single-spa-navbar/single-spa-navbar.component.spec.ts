import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleSpaNavbarComponent } from './single-spa-navbar.component';

describe('SingleSpaNavbarComponent', () => {
  let component: SingleSpaNavbarComponent;
  let fixture: ComponentFixture<SingleSpaNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleSpaNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleSpaNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
