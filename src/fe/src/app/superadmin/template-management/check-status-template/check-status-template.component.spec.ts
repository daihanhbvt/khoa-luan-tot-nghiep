import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckStatusTemplateComponent } from './check-status-template.component';

describe('CheckStatusTemplateComponent', () => {
  let component: CheckStatusTemplateComponent;
  let fixture: ComponentFixture<CheckStatusTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckStatusTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckStatusTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
