import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomStatusTemplateComponent } from './room-status-template.component';

describe('RoomStatusTemplateComponent', () => {
  let component: RoomStatusTemplateComponent;
  let fixture: ComponentFixture<RoomStatusTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomStatusTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomStatusTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
