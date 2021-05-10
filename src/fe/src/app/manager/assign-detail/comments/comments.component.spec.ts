import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsAdComponent } from './comments.component';

describe('CommentsAdComponent', () => {
  let component: CommentsAdComponent;
  let fixture: ComponentFixture<CommentsAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsAdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
