import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivatePartChatComponent } from './private-part-chat.component';

describe('PrivatePartChatComponent', () => {
  let component: PrivatePartChatComponent;
  let fixture: ComponentFixture<PrivatePartChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivatePartChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivatePartChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
