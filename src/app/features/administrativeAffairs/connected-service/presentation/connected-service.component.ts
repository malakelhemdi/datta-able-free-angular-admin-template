import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConnectedServiceFacade } from '../connected-service.facade';

@Component({
  selector: 'connected-service',
  templateUrl: './connected-service.component.html',
  styleUrls: ['./connected-service.component.scss']
})
export default class ConnectedServiceComponent implements OnInit {
  constructor(
    private connectedServiceFacade: ConnectedServiceFacade,
    private fb: FormBuilder
  ) {}
  employees = this.connectedServiceFacade.employeeSubject$;
  form: FormGroup;

  ngOnInit(): void {
    this.form = this.fb.group({
      employee: [null, Validators.required],
      previousExperience: this.fb.array([
        this.fb.group({
          companyName: [null, Validators.required],
          from: [null, Validators.required],
          to: [null, Validators.required],
          fieldDays: [null, Validators.required, Validators.min(0)],
          totalVacation: [null, Validators.required, Validators.min(0)]
        })
      ])
    });

    this.connectedServiceFacade.employeeSubject$.subscribe((employee) => {
      console.log(employee[0]);

      this.form.get('employee').setValue(employee[0]);
    });
  }

  addPreviousExperience() {
    const newExperience = this.fb.group({
      companyName: [null, Validators.required],
      from: [null, Validators.required],
      to: [null, Validators.required],
      fieldDays: [null, Validators.required, Validators.min(0)],
      totalVacation: [null, Validators.required, Validators.min(0)]
    });

    (this.form.get('previousExperience') as FormArray).push(newExperience);
  }

  removePreviousExperience(index: number) {
    const experiences = this.form.get('previousExperience') as FormArray;
    if (experiences.length > 1) {
      experiences.removeAt(index);
    }
  }

  public setEmployeeByCode = (code: string) => {
    if (code) this.connectedServiceFacade.GetEmployee('1', code);
  };

  getAsFormArray(control: AbstractControl) {
    return <FormArray>control;
  }
}
