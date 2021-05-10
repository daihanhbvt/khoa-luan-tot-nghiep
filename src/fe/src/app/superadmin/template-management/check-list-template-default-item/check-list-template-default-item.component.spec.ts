import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListTemplateDefaultItemComponent } from './check-list-template-default-item.component';

describe('CheckListTemplateDefaultItemComponent', () => {
  let component: CheckListTemplateDefaultItemComponent;
  let fixture: ComponentFixture<CheckListTemplateDefaultItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckListTemplateDefaultItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckListTemplateDefaultItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
