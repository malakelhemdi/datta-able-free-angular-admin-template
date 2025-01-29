import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReHireFacade } from '../reHire.facade';
import { MessageType } from '../../../../shared/shared.interfaces';
import { SharedFacade } from '../../../../shared/shared.facade';
import { optionsOvertime, optionsPayrollStatus, optionsSocialStatus } from '../../../../core/core.interface';
import { EmployeeFacade } from '../../employee/employee.facade';
import { JobTitleFacade } from '../../job-title/job-title.facade';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, filter, map, merge, Observable, OperatorFunction, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-clinics',
  templateUrl: './reHire.component.html',
  styleUrls: ['./reHire.component.scss']
})
export default class ReHireComponent implements OnInit {
  phoneNumberPattern = '[0][9]{1}[1,2,4,3,5]{1}[0-9]{7}';
  patternFloat = '^-?\\d*(\\.\\d+)?$';

  rest = false;

  constructor(
    private _formBuilder: FormBuilder,
    protected reHireFacade: ReHireFacade,
    private sharedFacade: SharedFacade,
    protected employeeFacade: EmployeeFacade,
    // protected jobTitleFacade: JobTitleFacade,
    private cdr: ChangeDetectorRef
  ) {
    this.onSubmit();
  }
  @ViewChild('instance', { static: true }) instance: NgbTypeahead;

  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      switchMap((term) =>
        this.employeeFacade.employee$.pipe(
          map((emp) => emp.map((e) => e.name)),
          map((employees) =>
            term === ''
              ? employees // Show all employees if term is empty
              : employees.filter((employee) => employee.toLowerCase().includes(term.toLowerCase()))
          )
        )
      )
    );
  };

  registerForm = this._formBuilder.group({
    value: ['', Validators.required],
    code: [''],
    phoneNumber: ['', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.phoneNumberPattern)]],
    employeeName: ['']
  });
  registerFormRequest = this._formBuilder.group({
    employeeId: ['', Validators.required],
    effDate: ['', Validators.required],
    Notes: this._formBuilder.array([])
  });
  ngOnInit() {}

  onSubmit(): void {
    this.registerFormRequest.controls.employeeId.setValue('');
    this.employeeFacade.GetEmployee();
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
    this.reHireFacade.GetEmployee(searchType, text);
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

  onReHire(): void {
    const employee = this.reHireFacade.EmployeeSubject$.getValue();
    if (employee != null) {
      this.registerFormRequest.controls.employeeId.setValue(employee.id);
    }
    if (this.registerFormRequest.valid && this.isAnyFieldFilled()) {
      this.registerFormRequest.controls.effDate.value == '' || this.registerFormRequest.controls.effDate.value == null
        ? this.registerFormRequest.controls.effDate.setValue(employee.effDate)
        : '';

      this.reHireFacade.ReHire(this.registerFormRequest.value);
      this.onReset();
    } else {
      this.showNotification('عفواً، الرجاء ادخل بيانات ليتم تحديثها ', '');
    }
  }
  isAnyFieldFilled() {
    const controls = this.registerFormRequest.controls;
    return controls.effDate.value;
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
