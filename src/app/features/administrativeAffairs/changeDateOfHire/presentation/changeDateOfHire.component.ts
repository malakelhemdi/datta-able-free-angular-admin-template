import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChangeDateOfHireFacade } from '../changeDateOfHire.facade';
import { MessageType } from '../../../../shared/shared.interfaces';
import { SharedFacade } from '../../../../shared/shared.facade';
import { optionsOvertime, optionsPayrollStatus, optionsSocialStatus } from '../../../../core/core.interface';
import { EmployeeFacade } from '../../employee/employee.facade';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-clinics',
  templateUrl: './changeDateOfHire.component.html',
  styleUrls: ['./changeDateOfHire.component.scss']
})
export default class ChangeDateOfHireComponent implements OnInit {
  phoneNumberPattern = '[0][9]{1}[1,2,4,3,5]{1}[0-9]{7}';
  patternFloat = '^-?\\d*(\\.\\d+)?$';
  rest = false;

  loadEmployees = (page: number, pageSize: number, searchQuery?: string): void => {
    this.employeeFacade.GetEmployee(page, pageSize);
  };

  onEmployeeSelect(employee: any) {
    this.registerForm.controls.employeeName.setValue(employee.name);
  }

  constructor(
    private _formBuilder: FormBuilder,
    protected changeDateOfHireFacade: ChangeDateOfHireFacade,
    private sharedFacade: SharedFacade,
    protected employeeFacade: EmployeeFacade,
    // protected jobTitleFacade: JobTitleFacade,
    private cdr: ChangeDetectorRef
  ) {
    this.onSubmit();
  }

  registerForm = this._formBuilder.group({
    value: ['', Validators.required],
    code: [''],
    phoneNumber: ['', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.phoneNumberPattern)]],
    employeeName: ['']
  });
  registerFormRequest = this._formBuilder.group({
    employeeId: ['', Validators.required],
    HireDate: ['', Validators.required],
    effDate: [''],
    Notes: this._formBuilder.array([])
  });
  ngOnInit() {
    this.registerFormRequest.controls.employeeId.setValue('');
    this.loadEmployees(1, 10);
  }

  onSubmit(): void {
    // this.employeeFacade.GetEmployee();
  }
  onSearch(): void {
    if (
      (this.registerForm.value.code == '' || this.registerForm.value.code == null) &&
      (this.registerForm.value.employeeName == '' || this.registerForm.value.employeeName == null) &&
      (this.registerForm.value.phoneNumber == '' || this.registerForm.value.phoneNumber == null)
    ) {
      this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخل بيانات للبحث   ', ['']);
      return;
    } else if (
      this.registerForm.controls.phoneNumber.invalid &&
      this.registerForm.value.phoneNumber != '' &&
      this.registerForm.value.phoneNumber != null
    ) {
      this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال  رقم هاتف المستخدم بصيغة صحيحة  ', ['']);
      return;
    }

    const text =
      this.registerForm.controls.employeeName.value != '' && this.registerForm.controls.employeeName.value != null
        ? this.registerForm.value.employeeName
        : this.registerForm.controls.code.value != '' && this.registerForm.controls.code.value != null
          ? this.registerForm.value.code
          : this.registerForm.value.phoneNumber;
    const searchType =
      this.registerForm.controls.employeeName.value != '' && this.registerForm.controls.employeeName.value != null
        ? '2'
        : this.registerForm.controls.code.value != '' && this.registerForm.controls.code.value != null
          ? '1'
          : '3';
    // this.demotionFacade.GetEmployee(searchType,text);
    this.changeDateOfHireFacade.GetEmployee(searchType, text);
    this.cdr.detectChanges();
    this.rest = true;
  }

  onReset(): void {
    this.registerForm.reset();
    this.registerForm.setErrors(null);
    this.registerFormRequest.reset();
    this.registerFormRequest.setErrors(null);
    this.rest = false;
  }

  onChangeDateOfHire(): void {
    const employee = this.changeDateOfHireFacade.EmployeeSubject$.getValue();
    if (employee != null) {
      this.registerFormRequest.controls.employeeId.setValue(employee.id);
    }
    if (this.registerFormRequest.valid && this.isAnyFieldFilled()) {
      this.registerFormRequest.controls.effDate.value == '' || this.registerFormRequest.controls.effDate.value == null
        ? this.registerFormRequest.controls.effDate.setValue(employee.effDate.toString())
        : '';

      this.changeDateOfHireFacade.ChangeDateOfHire(this.registerFormRequest.value);
      this.onReset();
    } else {
      this.showNotification('عفواً، الرجاء ادخل بيانات ليتم تحديثها ', '');
    }
  }
  isAnyFieldFilled() {
    const controls = this.registerFormRequest.controls;
    return controls.HireDate.value || controls.effDate.value;
  }
  showNotification(title, text) {
    this.sharedFacade.showMessage(MessageType.warning, title, ['']);
  }

  getLabelFormOptions(options: any, item: number): string {
    const option = options.find((opt) => opt.value.toString() == item);
    return option ? option.label : '';
  }
  getLabelFormOptionsInt(options: any, item: string): string {
    const option = options.find((opt) => opt.value == item);
    return option ? option.label : '';
  }
  onchange() {
    this.rest = false;
  }

  createNote(): FormGroup {
    return this._formBuilder.group({
      text: ['', Validators.required]
    });
  }
  addNote(): void {
    // if(this.secondFormGroup.value.socialStatus == 3){
    const NoteArray = this.registerFormRequest.get('Notes') as FormArray;
    if (NoteArray.length == 0) {
      NoteArray.push(this.createNote());
    }
  }
  removeNote(index: number) {
    this.Notes.removeAt(index);
  }
  get Notes(): FormArray {
    return this.registerFormRequest.get('Notes') as FormArray;
  }
  getControl(control: AbstractControl, controlName: string): AbstractControl | null {
    return control.get(controlName);
  }
  protected readonly Object = Object;
  protected readonly optionsSocialStatus = optionsSocialStatus;
  protected readonly optionsOvertime = optionsOvertime;
  protected readonly optionsPayrollStatus = optionsPayrollStatus;
}
