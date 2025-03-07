import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { EmployeeBonusesFacade } from '../employee-bonuses.facade';
import { MessageType } from '../../../../shared/shared.interfaces';
import { SharedFacade } from '../../../../shared/shared.facade';
import { EmployeeFacade } from '../../employee/employee.facade';

@Component({
  selector: 'app-rewards-types',
  templateUrl: './employee-bonuses.component.html',
  styleUrl: './employee-bonuses.component.scss'
})
export class EmployeeBonusesComponent implements OnInit {
  rest: boolean = false;
  isCollapsed = true;
  multiCollapsed1 = false;
  multiCollapsed2 = false;
  phoneNumberPattern = '[0][9]{1}[1,2,4,3,5]{1}[0-9]{7}';
  patternFloat = '^-?\\d*(\\.\\d+)?$';
  registerForm = this.fb.group({
    id: [null],
    employeeId: [''],
    dateOfGet: ['', Validators.required],
    amount: [
      0, // Initial value
      [
        Validators.required,
        Validators.pattern(this.patternFloat) // Use the numeric pattern here
      ]
    ],
    expiryDate: [''],

    basicSalary: [{ value: '', disabled: true }],
    grossSalary: [{ value: '', disabled: true }]
  });

  registerFormSearch = this.fb.group({
    value: ['', Validators.required],
    code: [''],
    phoneNumber: ['', [Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.phoneNumberPattern)]],
    employee: [null]
  });
  constructor(
    private fb: FormBuilder,
    protected employeeBonusesFacade: EmployeeBonusesFacade,
    private sharedFacade: SharedFacade,
    protected employeeFacade: EmployeeFacade,
    private cdr: ChangeDetectorRef
  ) {
    this.onSubmit();
  }

  loadEmployees = (page: number, pageSize: number, searchQuery?: string): void => {
    this.employeeFacade.GetEmployee(page, pageSize, searchQuery);
  };

  ngOnInit() {
    this.onSubmit();
    this.rest = false;
    this.loadEmployees(1, 10);

    this.employeeBonusesFacade.EmployeeBonuses$.subscribe((data) => {
      this.rest = true;
      if (data) {
        this.registerForm.controls.employeeId.setValue(data.id);
      }
    });
  }

  onSubmit(): void {
    // this.employeeBonusesFacade.EmployeeBonuses$.subscribe(null);
    this.registerForm.controls.id.setValue('');
    // this.employeeFacade.GetEmployee();
    this.employeeBonusesFacade.GetBonusesType(1,10);
  }

  loadBonusesType(page: number, pageSize: number): void {
    this.employeeBonusesFacade.GetBonusesType(page, pageSize);
  }
  onchange() {
    this.rest = false;
  }
  onCancel(id): void {
    let request = {
      employeeId: this.employeeBonusesFacade.EmployeeBonusesSubject$.getValue().id,
      id: id,
      deleteDate: new Date().toISOString()
    };
    this.employeeBonusesFacade.cancelEmployeeBonuses(request);
    this.rest = false;
    this.onClean();
    // this.onSearch();
  }
  onReset(): void {
    // this.edit = false;
    this.registerForm.reset();
    this.registerForm.setErrors(null);
    this.registerFormSearch.reset();
    this.registerFormSearch.setErrors(null);
    this.employeeBonusesFacade.EmployeeBonusesSubject$.next(null);
    // this.employeeBonusesFacade.EmployeeBonuses$.subscribe(null);
  }
  onClean(): void {
    this.registerForm.reset();
    this.registerForm.setErrors(null);
    this.registerFormSearch.reset();
    this.registerFormSearch.setErrors(null);
    this.employeeBonusesFacade.EmployeeBonusesSubject$.next(null);
    // this.employeeBonusesFacade.EmployeeBonuses$.subscribe(null);
  }
  onAdd(): void {
    const employeeBonuses = this.employeeBonusesFacade.EmployeeBonusesSubject$.getValue();
    employeeBonuses != null ? this.registerForm.controls.employeeId.setValue(employeeBonuses.id) : '';
    if (this.registerForm.valid) {
      const  req = {
        employeeId: this.registerForm?.value.employeeId,
        id: this.registerForm?.value.id.id,
        amount: this.registerForm?.value.amount,
        dateOfGet: this.registerForm?.value.dateOfGet,
        expiryDate: this.registerForm?.value.expiryDate
      }

      this.employeeBonusesFacade.AddEmployeeBonuses(req);
      this.onClean();
      this.rest = false;
    } else {
      if (this.registerForm.value.id == '' || this.registerForm.value.id == null || this.registerForm.controls.id.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء اختر نوع العلاواة    ', ['']);
        return;
      } else if (
        this.registerForm.value.amount == 0 ||
        this.registerForm.value.amount == null ||
        this.registerForm.controls.amount.invalid
      ) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال قيمة العلاواة وبصيغة صحيحة ', ['']);
        return;
      } else if (
        this.registerForm.value.dateOfGet == '' ||
        this.registerForm.value.dateOfGet == null ||
        this.registerForm.controls.dateOfGet.invalid
      ) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال تاريخ الحصول علي العلاواة', ['']);
        return;
      }
    }
  }

  onSearch(): void {
    if (
      (this.registerFormSearch.value.code == '' || this.registerFormSearch.value.code == null) &&
      (this.registerFormSearch.value.employee.name == '' || this.registerFormSearch.value.employee == null) &&
      (this.registerFormSearch.value.phoneNumber == '' || this.registerFormSearch.value.phoneNumber == null)
    ) {
      this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخل بيانات للبحث   ', ['']);
      return;
    } else if (
      this.registerFormSearch.controls.phoneNumber.invalid &&
      this.registerFormSearch.value.phoneNumber != '' &&
      this.registerFormSearch.value.phoneNumber != null
    ) {
      this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال  رقم هاتف المستخدم بصيغة صحيحة  ', ['']);
      return;
    }

    const text =
      this.registerFormSearch.value?.employee &&
      this.registerFormSearch.value.employee.name != '' &&
      this.registerFormSearch.value.employee.name != null
        ? this.registerFormSearch.value.employee.name
        : this.registerFormSearch.value.code != '' && this.registerFormSearch.value.code != null
          ? this.registerFormSearch.value.code
          : this.registerFormSearch.value.phoneNumber;
    const searchType =
      this.registerFormSearch.value?.employee &&
      this.registerFormSearch.value.employee.name != '' &&
      this.registerFormSearch.value.employee.name != null
        ? '2'
        : this.registerFormSearch.value.code != '' && this.registerFormSearch.value.code != null
          ? '1'
          : '3';

    this.employeeBonusesFacade.GetEmployeeBonuses(searchType, text);
    // this.employeeBonusesFacade.GetEmployeeBonuses(searchType, text).subscribe(employees => {
    //   this.employeeBonusesFacade.EmployeeBonusesSubject$.next(employees);
    // });
    // this.cdr.detectChanges();
    // this.rest = true;
    // const employeeBonuses = this.employeeBonusesFacade.EmployeeBonusesSubject$.getValue();
    // employeeBonuses != null ? this.registerForm.controls.employeeId.setValue(employeeBonuses.id) : '';
    // this.cdr.detectChanges();
  }
}
