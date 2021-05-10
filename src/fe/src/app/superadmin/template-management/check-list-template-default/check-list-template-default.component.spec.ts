import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListTemplateDefaultComponent } from './check-list-template-default.component';

describe('CheckListTemplateComponent', () => {
  let component: CheckListTemplateDefaultComponent;
  let fixture: ComponentFixture<CheckListTemplateDefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckListTemplateDefaultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckListTemplateDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
