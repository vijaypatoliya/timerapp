import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationErrors } from './validation-errors.component';

describe('ValidationErrorsComponent', () => {
  let component: ValidationErrors;
  let fixture: ComponentFixture<ValidationErrors>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationErrors ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationErrors);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
