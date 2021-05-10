import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListCdComponent } from './check-list.component';

describe('CheckListCdComponent', () => {
  let component: CheckListCdComponent;
  let fixture: ComponentFixture<CheckListCdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckListCdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckListCdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
