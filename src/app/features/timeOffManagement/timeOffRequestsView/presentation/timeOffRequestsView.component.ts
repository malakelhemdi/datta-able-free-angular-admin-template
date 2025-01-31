import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { optionsBooleanGeneral, optionsJobClassification } from '../../../../core/core.interface';
import { TimeOffRequestsViewFacade } from '../timeOffRequestsView.facade';
import { EmployeeFacade } from '../../../administrativeAffairs/employee/employee.facade';
import { MessageType } from '../../../../shared/shared.interfaces';
import { SharedFacade } from '../../../../shared/shared.facade';

@Component({
  selector: 'app-rewards-types',
  templateUrl: './timeOffRequestsView.component.html',
  styleUrl: './timeOffRequestsView.component.scss'
})
export class TimeOffRequestsViewComponent implements OnInit {
  submitted: boolean = false;
  activeTab: number = 1;
  registerForm = this.fb.group({
    IsApproved: [1],
    FromDate: [''],
    ToDate: [''],
    EmployeeId: ['']
  });

  constructor(
    private fb: FormBuilder,
    protected timeOffRequestsViewFacade: TimeOffRequestsViewFacade,
    protected employeeFacade: EmployeeFacade,
    private sharedFacade: SharedFacade
  ) {
    this.onSubmit();
    // this.employeeFacade.GetEmployeePage('','');
    // this.changePass();
  }

  get f() {
    return this.registerForm.controls;
  }
  switchToTab(activeTab: number, tabNumber: number): void {
    this.activeTab = activeTab;
    this.registerForm.controls.IsApproved.setValue(tabNumber);
    if (
      this.registerForm.value.FromDate == '' ||
      this.registerForm.value.FromDate == null ||
      this.registerForm.value.ToDate == '' ||
      this.registerForm.value.ToDate == null
    ) {
      this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخل التواريخ  للبحث   ', ['']);
      return;
    } else {
      this.timeOffRequestsViewFacade.GetTimeOffRequestsByManager(this.registerForm.value);
      this.submitted = true;
    }
  }
  // changePass() {
  //
  //   if (this.registerForm.value.changePassword) {
  //     this.registerForm.controls.password.setValidators([
  //       Validators.minLength(6),
  //       Validators.maxLength(16),
  //       Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,16}$/)
  //     ]);
  //     this.registerForm.controls.confirmPassword.setValidators([
  //       Validators.minLength(6),
  //       Validators.maxLength(16),
  //       Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,16}$/)
  //     ]);
  //   } else {
  //     this.registerForm.controls.password.clearValidators();
  //     this.registerForm.controls.confirmPassword.clearValidators();
  //   }
  // }

  ngOnInit() {
    this.submitted = false;
  }

  onSubmit(): void {
    // this.timeOffRequestsViewFacade.GetTimeOffRequestsByManager(this.registerForm.controls);
  }

  onSearch(): void {
    if (
      this.registerForm.value.FromDate == '' ||
      this.registerForm.value.FromDate == null ||
      this.registerForm.value.ToDate == '' ||
      this.registerForm.value.ToDate == null
    ) {
      this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخل التواريخ  للبحث   ', ['']);
    } else {
      this.timeOffRequestsViewFacade.GetTimeOffRequestsByManager(this.registerForm.value);
      this.submitted = true;
    }
  }

  onDelete(Id: string): void {
    // this.edit = false;
    // this.timeOffRequestsViewFacade.deleteUser(Id);
    // this.registerForm.reset();
    if (confirm('هل أنت متأكد من عملية الرفض؟')) {
      const prev = this.employeeFacade.employeePageSubject$.getValue();
      const result = prev.items.filter((x: any) => x.id != Id);
      this.employeeFacade.employeePageSubject$.next({
        ...prev,
        items: result
      });
      this.employeeFacade.employeePageSubject$.subscribe();
      this.sharedFacade.showMessage(MessageType.success, 'تم رفض طلب الإجازة بنجاح', ['']);
    }
  }

  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();
    this.registerForm.setErrors(null);
    this.timeOffRequestsViewFacade.TimeOffRequest$.subscribe(null);
    this.timeOffRequestsViewFacade.TimeOffRequestSubject.next([]);
  }

  // onAdd(): void {
  //   const optionEmployee = this.employeeFacade.employeeSubject$.getValue().find(x => x.id == this.registerForm.value.employeeId);
  //   //const optionGroup = this.permissionFacade.GroupsMenuSubject$.getValue().find((x: {
  //     //id: string | null | undefined;
  //   //}) => x.id == this.registerForm.value.roleId);
  //   //this.registerForm.value.roleName =  this.registerForm.value.roleId != ''?   optionGroup.name : '';
  //   this.registerForm.value.employeeName =  this.registerForm.value.employeeId != '' && this.registerForm.value.employeeId != null ?   optionEmployee.name: '';
  //   if (this.registerForm.valid) {
  //     if (this.edit) {
  //       this.timeOffRequestsViewFacade.UpdateUser(this.registerForm?.value);
  //       this.onReset();
  //     } else {
  //       this.timeOffRequestsViewFacade.AddUser(this.registerForm?.value);
  //       this.onReset();
  //
  //     }
  //   }
  //   else {
  //     if (this.registerForm.value.name == '') {
  //       this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال اسم المستخدم  ', ['']);
  //       return;
  //     }else if ( this.registerForm.controls.roleId.invalid ) {
  //       this.sharedFacade.showMessage(MessageType.warning, 'عفواً، رجاء اختر المجموعة', ['']);
  //       return;
  //     }else if ( this.registerForm.controls.userName.invalid ) {
  //       this.sharedFacade.showMessage(MessageType.warning, 'عفواً، رجاء ادخال اسم الدخول', ['']);
  //       return;
  //     }
  //     else if (  this.registerForm.value.password =='' || this.registerForm.value.confirmPassword ==' ' || this.registerForm.controls.password.invalid &&(this.registerForm.value.changePassword )) {
  //         this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال كلمة المرور بطول يتراوح بين 6 إلى 16حرف وتتضمن على الأقل حرف صغير واحد وحرف كبير واحد ورقم واحد وحرف خاص واحد', ['']);
  //         return;
  //       }else if (  this.registerForm.value.password != this.registerForm.value.confirmPassword  &&(this.registerForm.value.changePassword || this.edit)) {
  //         this.sharedFacade.showMessage(MessageType.warning, 'عفواً،  كلمة المرور غير متطابقة', ['']);
  //         return;
  //       }
  //   }
  // }

  ApproveTimeOffRequest(Id: any): void {
    this.timeOffRequestsViewFacade.ApproveTimeOffRequest(Id);
    // const prev = this.timeOffRequestsViewFacade.TimeOffRequestSubject.getValue();
    // const result = prev.filter((x: any) => x.id != Id);
    // this.timeOffRequestsViewFacade.TimeOffRequestSubject.next(result);
    // this.timeOffRequestsViewFacade.TimeOffRequestSubject.subscribe();
  }
  UnapproveTimeOffRequest(Id: any): void {
    this.timeOffRequestsViewFacade.UnapproveTimeOffRequest(Id);
    // const prev = this.timeOffRequestsViewFacade.TimeOffRequestSubject.getValue();
    // const result = prev.filter((x: any) => x.id != Id);
    // this.timeOffRequestsViewFacade.TimeOffRequestSubject.next(result);
    // this.timeOffRequestsViewFacade.TimeOffRequestSubject.subscribe();
  }
  RejectTimeOffRequest(Id: any): void {
    this.timeOffRequestsViewFacade.RejectTimeOffRequest(Id);
    // const prev = this.timeOffRequestsViewFacade.TimeOffRequestSubject.getValue();
    // const result = prev.filter((x: any) => x.id != Id);
    // this.timeOffRequestsViewFacade.TimeOffRequestSubject.next(result);
    // this.timeOffRequestsViewFacade.TimeOffRequestSubject.subscribe();
  }
}
