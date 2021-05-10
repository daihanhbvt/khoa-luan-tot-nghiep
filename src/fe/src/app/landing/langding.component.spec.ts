import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LangdingComponent } from './langding.component';

describe('LangdingComponent', () => {
  let component: LangdingComponent;
  let fixture: ComponentFixture<LangdingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LangdingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LangdingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
