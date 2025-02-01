import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConnectedServiceFacade } from '../connected-service.facade';
import { calculateDateDifference } from 'src/app/shared/utils/date-utils';
import { format } from 'date-fns';

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

  form: FormGroup;
  totalExperience = {
    days: 0,
    months: 0,
    years: 0
  };

  totalVacationDays = 0;
  currentDate = format(new Date(), 'yyyy-MM-dd');

  ngOnInit(): void {
    this.form = this.fb.group({
      employee: [null, Validators.required],
      previousExperience: this.fb.array([this.createExperienceGroup()]) // Initialize with one experience group
    });

    this.form.get('previousExperience').valueChanges.subscribe((values) => {
      this.totalExperience = {
        days: 0,
        months: 0,
        years: 0
      };
      values.forEach((value) => {
        if (value?.from && value.to) {
          if (this.dateRangeValueValidator(value?.from, value?.to)) {
            alert('تاريخ النهاية يجب أن يكون بعد تاريخ البداية');
            return;
          }
          const result = calculateDateDifference(value.from, value.to);
          this.totalExperience = {
            days: this.totalExperience.days + result.days,
            months: this.totalExperience.months + result.months,
            years: this.totalExperience.years + result.years
          };
        }
      });
      this.totalVacationDays = this.totalExperience.years * 30;
    });

    this.connectedServiceFacade.employeeSubject$.subscribe((employee) => {
      this.form.get('employee').setValue(employee.items[0]);
    });
  }

  private dateRangeValidator(group: FormGroup): { [key: string]: any } | null {
    const from = group.get('from')?.value;
    const to = group.get('to')?.value;

    if (!from || !to) {
      return null; // Do not validate if one of the fields is empty
    }

    const fromDate = new Date(from);
    const toDate = new Date(to);

    return fromDate <= toDate ? null : { dateRangeInvalid: true }; // Return error if invalid
  }

  private dateRangeValueValidator(from: string, to: string): boolean {
    if (!from || !to) {
      return null; // Do not validate if one of the fields is empty
    }

    const fromDate = new Date(from);
    const toDate = new Date(to);

    return fromDate >= toDate; // Return error if invalid
  }

  private createExperienceGroup(): FormGroup {
    return this.fb.group(
      {
        companyName: [null, Validators.required],
        from: [null, Validators.required],
        to: [null, Validators.required],
        fieldDays: [null, [Validators.required, Validators.min(0)]],
        totalVacation: [null, [Validators.required, Validators.min(0)]]
      },
      { validators: this.dateRangeValidator } // Add the custom validator
    );
  }

  // Add new experience group
  addPreviousExperience() {
    const previousExperienceArray = this.form.get('previousExperience') as FormArray;
    previousExperienceArray.push(this.createExperienceGroup());
  }
  // Remove an experience group
  removePreviousExperience(index: number) {
    const previousExperienceArray = this.form.get('previousExperience') as FormArray;
    if (previousExperienceArray.length > 1) {
      previousExperienceArray.removeAt(index);
    }
  }
  // Access FormArray
  getAsFormArray(control: AbstractControl): FormArray {
    return control as FormArray;
  }

  // Handle employee search by code
  public setEmployeeByCode(code: string) {
    if (code) {
      this.connectedServiceFacade.GetEmployee(1, 1, '1', code);
    }
  }
}
