import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksAssignComponent } from './tasks-assign.component';

describe('TasksAssignComponent', () => {
  let component: TasksAssignComponent;
  let fixture: ComponentFixture<TasksAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
