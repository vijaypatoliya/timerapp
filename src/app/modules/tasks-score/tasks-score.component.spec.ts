import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksScoreComponent } from './tasks-score.component';

describe('TasksScoreComponent', () => {
  let component: TasksScoreComponent;
  let fixture: ComponentFixture<TasksScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
