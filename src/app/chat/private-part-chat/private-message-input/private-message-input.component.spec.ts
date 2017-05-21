import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateMessageInputComponent } from './private-message-input.component';

describe('PrivateMessageInputComponent', () => {
  let component: PrivateMessageInputComponent;
  let fixture: ComponentFixture<PrivateMessageInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivateMessageInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateMessageInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
