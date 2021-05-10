import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanStatusComponent } from './clean-status.component';

describe('CleanStatusComponent', () => {
  let component: CleanStatusComponent;
  let fixture: ComponentFixture<CleanStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleanStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
