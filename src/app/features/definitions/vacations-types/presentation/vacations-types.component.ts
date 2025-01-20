import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VacationsTypesFacade } from '../vacations-types.facade';
import { optionsBooleanGeneral, optionsGenderGeneral } from 'src/app/core/core.interface';
@Component({
  selector: 'app-rewards-types',
  templateUrl: './vacations-types.component.html',
  styleUrl: './vacations-types.component.scss'
})
export class VacationsTypesComponent implements OnInit, OnDestroy {
  edit: boolean = false;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    protected vacationsTypesFacade: VacationsTypesFacade
  ) {
    this.onSubmit();
  }

  ngOnInit() {
    this.edit = false;
    this.registerForm = this.fb.group(
      {
        id: [''],
        name: ['', Validators.required],
        yearlyBalanceCeiling: [Validators.required],
        minimumRequest: [Validators.required],
        maximumRequest: [Validators.required],
        salaryDiscountRate: [Validators.required],
        gender: [0, Validators.required],
        isGrantedOnlyOnce: ['', Validators.required],
        isSalaryBased: [false],
        requiresOneYearOfService: [false],
        minYearsOfServiceForIncreasedDuration: [0],
        ageRange: [''],

        exceptionHoliday: [0],
        startDate: [''],
        endDate: [''],
        duration: [0]
      },
      { validators: this.ageRangeValidator }
    );
    this.vacationsTypesFacade.VacationsType$.subscribe((v) => {
      console.log(v);
    });
  }
  ngOnDestroy(): void {}
  onSubmit(): void {
    this.registerForm.get('id').setValue('');
    this.vacationsTypesFacade.GetVacationsType();
  }
  onDelete(Id: string): void {
    this.edit = false;
    this.vacationsTypesFacade.deleteVacationsType(Id);
    this.registerForm.reset();
  }
  onReset(): void {
    this.edit = false;
    this.registerForm.reset();
    this.registerForm.setErrors(null);
  }
  onAdd(): void {
    if (this.registerForm.valid) {
      if (this.edit) {
        this.vacationsTypesFacade.UpdateVacationsType(this.registerForm?.value);
        this.onReset();
      } else {
        this.vacationsTypesFacade.AddVacationsType(this.registerForm?.value);
        this.onReset();
      }
    }
  }
  onEdit(bonusesType: any): void {
    this.registerForm.patchValue(bonusesType);
    this.edit = true;
  }
  //  onMinAgeChange(event: any) {
  //   const minAge = event.target.value;
  //   const currentMax =  this.registerForm.get('AgeRange')?.value[1];  // Get current max age
  //   this.registerForm.get('AgeRange')?.setValue([minAge, currentMax]);
  // }
  //
  // // Update max age value in form when slider changes
  // onMaxAgeChange(event: any) {
  //   const maxAge = event.target.value;
  //   const currentMin =  this.registerForm.get('AgeRange')?.value[0];  // Get current min age
  //   this.registerForm.get('AgeRange')?.setValue([currentMin, maxAge]);
  // }
  getControl(control: AbstractControl, controlName: string): AbstractControl | null {
    return control.get(controlName);
  }
  ageRangeValidator(group: FormGroup): { [key: string]: boolean } | null {
    const value = group.get('ageRange')?.value;
    const regex = /^\d+\s*-\s*\d+$/; // التأكد من أن المدخل بتنسيق "من - إلى"
    if (value && !regex.test(value)) {
      return { invalidAgeRange: true }; // إذا لم يكن المدخل بتنسيق صحيح، return خطأ
    }
    return null; // المدخل صحيح
  }
  protected readonly optionsGenderGeneral = optionsGenderGeneral;
  protected readonly optionsBooleanGeneral = optionsBooleanGeneral;
}
