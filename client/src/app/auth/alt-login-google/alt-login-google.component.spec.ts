import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltLoginGoogleComponent } from './alt-login-google.component';

describe('AltLoginG+Component', () => {
  let component: AltLoginGoogleComponent;
  let fixture: ComponentFixture<AltLoginGoogleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltLoginGoogleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltLoginGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
