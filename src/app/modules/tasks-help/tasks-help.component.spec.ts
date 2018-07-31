import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksHelpComponent } from './tasks-help.component';

describe('TasksHelpComponent', () => {
  let component: TasksHelpComponent;
  let fixture: ComponentFixture<TasksHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
