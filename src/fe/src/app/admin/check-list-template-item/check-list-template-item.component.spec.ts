import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckListTemplateItemComponent } from './check-list-template-item.component';

describe('CheckListTemplateItemComponent', () => {
  let component: CheckListTemplateItemComponent;
  let fixture: ComponentFixture<CheckListTemplateItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckListTemplateItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckListTemplateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
