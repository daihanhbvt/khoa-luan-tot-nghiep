import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanDetailComponent } from './clean-detail.component';

describe('CleanDetailComponent', () => {
  let component: CleanDetailComponent;
  let fixture: ComponentFixture<CleanDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleanDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
