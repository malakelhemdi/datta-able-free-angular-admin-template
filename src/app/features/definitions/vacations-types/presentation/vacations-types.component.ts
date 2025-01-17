import { Component, OnDestroy, OnInit } from '@angular/core';
declare var $: any;
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { VacationsTypesFacade } from '../vacations-types.facade';
import { optionsBooleanGeneral, optionsGenderGeneral } from 'src/app/core/core.interface';
@Component({
  selector: 'app-rewards-types',
  templateUrl: './vacations-types.component.html',
  styleUrl: './vacations-types.component.scss'
})
export class VacationsTypesComponent implements OnInit, OnDestroy {
  edit: boolean = false;
  registerForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    // yearlyBalanceCeiling: [Validators.required],
    // minimumRequest: [Validators.required],
    // maximumRequest: [Validators.required],
    salaryDiscountRate: [Validators.required],
    gender: [0, Validators.required],
    isGrantedOnlyOnce: ['', Validators.required],
    isSalaryBased: [false],
    requiresOneYearOfService: [false],
    minYearsOfServiceForIncreasedDuration: [0],
    AgeRange: [''],

    exceptionHoliday: [0],
    startDate: [''],
    endDate: [''],
    duration: [0]
  });
  //amal
  //    minAgeForIncreasedDuration: [0],   AgeRange: [[24, 45]],
  constructor(
    private fb: FormBuilder,
    protected vacationsTypesFacade: VacationsTypesFacade
  ) {
    this.onSubmit();
  }
  ngOnInit() {
    this.edit = false;
  }
  ngOnDestroy(): void {}
  onSubmit(): void {
    this.registerForm.controls.id.setValue('');
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
    console.log(this.registerForm)
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
  // onMinAgeChange(event: any) {
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
  ageRangeValidator(control: any): { [key: string]: boolean } | null {
    const value = control.value;
    const regex = /^\d+\s*-\s*\d+$/; // التأكد من أن المدخل بتنسيق "من - إلى"
    if (value && !regex.test(value)) {
      console.log('invalidAgeRange');
      return { 'invalidAgeRange': true }; // إذا لم يكن المدخل بتنسيق صحيح، return خطأ
    }
    return null; // المدخل صحيح
  }
  protected readonly optionsGenderGeneral = optionsGenderGeneral;
  protected readonly optionsBooleanGeneral = optionsBooleanGeneral;
}
