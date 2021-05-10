import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListAdComponent } from './check-list.component';

describe('CheckListAdComponent', () => {
  let component: CheckListAdComponent;
  let fixture: ComponentFixture<CheckListAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckListAdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckListAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
