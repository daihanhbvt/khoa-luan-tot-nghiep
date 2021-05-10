import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomTypeTemplateComponent } from './room-type-template.component';

describe('RoomTypeTemplateComponent', () => {
  let component: RoomTypeTemplateComponent;
  let fixture: ComponentFixture<RoomTypeTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomTypeTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomTypeTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
