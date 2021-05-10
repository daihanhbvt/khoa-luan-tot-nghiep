import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleanStatusTemplateComponent } from './clean-status-template.component';

describe('CleanStatusTemplateComponent', () => {
  let component: CleanStatusTemplateComponent;
  let fixture: ComponentFixture<CleanStatusTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleanStatusTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CleanStatusTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
