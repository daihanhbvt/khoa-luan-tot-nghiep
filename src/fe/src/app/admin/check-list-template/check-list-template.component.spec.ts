import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListTemplateComponent } from './check-list-template.component';

describe('CheckListTemplateComponent', () => {
  let component: CheckListTemplateComponent;
  let fixture: ComponentFixture<CheckListTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckListTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckListTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
