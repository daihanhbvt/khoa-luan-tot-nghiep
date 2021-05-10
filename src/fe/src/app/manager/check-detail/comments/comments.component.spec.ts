import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsCdComponent } from './comments.component';

describe('CommentsCdComponent', () => {
  let component: CommentsCdComponent;
  let fixture: ComponentFixture<CommentsCdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentsCdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsCdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
