import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateMessageNavbarComponent } from './private-message-navbar.component';

describe('PrivateMessageNavbarComponent', () => {
  let component: PrivateMessageNavbarComponent;
  let fixture: ComponentFixture<PrivateMessageNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateMessageNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateMessageNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
