import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VacationsTypesFacade } from '../vacations-types.facade';
import { optionsBooleanGeneral, optionsGenderGeneral } from 'src/app/core/core.interface';
@Component({
  selector: 'app-rewards-types',
  templateUrl: './vacations-types.component.html',
  styleUrl: './vacations-types.component.scss'
})
export class VacationsTypesComponent implements OnInit {
  edit: boolean = false;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    protected vacationsTypesFacade: VacationsTypesFacade
  ) {
    this.registerForm = this.fb.group(
      {
        id: [''],
        name: [null, [Validators.required]],
        // yearlyBalanceCeiling: [null, [Validators.required]],
        // minimumRequest: [null, [Validators.required]],
        // maximumRequest: [null, [Validators.required]],
        salaryDiscountRate: [null, [Validators.required]],
        gender: [null, [Validators.required]],
        isGrantedOnlyOnce: [null, [Validators.required]],
        isSalaryBased: [null],
        requiresOneYearOfService: [null],
        minYearsOfServiceForIncreasedDuration: [null],
        ageRange: [''],

        exceptionHoliday: [null],
        startDate: [''],
        endDate: [''],
        duration: [null]
      },
      { validators: this.ageRangeValidator }
    );
  }

  ngOnInit() {
    this.registerForm.get('name').statusChanges.subscribe((e) => {
      console.log(this.registerForm.get('name').touched);
      console.log(this.registerForm.get('name').invalid);
    });
    this.edit = false;
    this.registerForm.get('id').setValue('');
    this.vacationsTypesFacade.GetVacationsType();
  }

  onDelete(Id: string): void {
    if (confirm('هل أنت متأكد من عملية المسح؟')) {
      this.edit = false;
      this.vacationsTypesFacade.deleteVacationsType(Id);
      this.registerForm.reset();
    }
  }
  onReset(): void {
    this.edit = false;
    this.registerForm.reset();
    // this.registerForm.setErrors(null);
  }
  onAdd(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched(); // Mark all controls as touched
      return; // Stop submission if the form is invalid
    }
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
