import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPartChatComponent } from './main-part-chat.component';

describe('MainPartChatComponent', () => {
  let component: MainPartChatComponent;
  let fixture: ComponentFixture<MainPartChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainPartChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPartChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
