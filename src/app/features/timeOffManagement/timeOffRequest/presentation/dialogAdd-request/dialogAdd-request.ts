import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VacationsTypesFacade } from '../../../../definitions/vacations-types/vacations-types.facade';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageType, PaginatedData } from '../../../../../shared/shared.interfaces';
import { SharedFacade } from '../../../../../shared/shared.facade';
import { EmployeeFacade } from '../../../../administrativeAffairs/employee/employee.facade';
import { GetVacationsTypeCommand } from '../../../../definitions/vacations-types/vacations-types.interface';
import basePaginatedInitialValue from '../../../../../shared/data/basePaginatedInitialValue';

@Component({
  selector: 'app-dialogAdd-request',
  templateUrl: './dialogAdd-request.html',
  styleUrls: ['./dialogAdd-request.scss']
})
export class DialogAddRequestComponent {
  onVacationsTypesSelect(event: any): void {
    this.registerForm.controls.vacationType.setValue(event);
  }
  onEmployeeSelect(event: any): void {
    // this.vacationsTypesFacade.VacationsTypeSubject$.next(null);
    // this.vacationsTypesFacade.VacationsTypeSubject$.next({ ...basePaginatedInitialValue, items: [] });
    this.loadvacationsTypes(1, 10, event.id);

    this.registerForm.controls.employeeId.setValue(event);
  }
  loadEmployees = (page: number, pageSize: number, searchQuery?: string): void => {
    this.employeeFacade.GetEmployee(page, pageSize, searchQuery);
  };

  loadvacationsTypes(page: number, pageSize: number, EmployeeId): void {
    // HERE
    this.vacationsTypesFacade.GetAvailableVacationTypes(EmployeeId);
  }

  registerForm = this.fb.group({
    vacationsType: [null, Validators.required],
    employeeId: [null],
    totalday: [null, Validators.required],
    date: [null, Validators.required],
    vacationType: [null, Validators.required],
    startDate: [null, Validators.required],
    endDate: [null, Validators.required],
    description: [null, Validators.required]
  });
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddRequestComponent>,
    private sharedFacade: SharedFacade,
    protected employeeFacade: EmployeeFacade,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected vacationsTypesFacade: VacationsTypesFacade
  ) {
    // this.vacationsTypesFacade.GetAvailableVacationTypes();
    // this.registerForm.controls.date.setValue(this.data.date);

    this.loadvacationsTypes(1, 10, '');
    this.loadEmployees(1, 10);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  add(): void {
    this.data.date = new Date(this.registerForm.controls.startDate.value);

    // this.data.timeOffs = this.vacationsTypesFacade.VacationsTypeSubject$.getValue().find(
    //   (x: { id: string | null | undefined }) => x.id == this.registerForm.controls.vacationTypeId.value
    // ).name;

    if (this.registerForm.value.vacationType) {
      this.data.timeOffs = (<any>this.registerForm.value.vacationType).name;
    }
    // if (this.registerForm.value.employeeId) {
    //   this.data.timeOffs = (<any>this.registerForm.value.employeeId);
    // }

    // if (this.registerForm.controls.vacationTypeId.value == '' || this.registerForm.controls.vacationTypeId.value == null) {
    //   this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء اختر نوع الإجازة', ['']);
    //   return;
    // }

    if (this.registerForm.controls.vacationType.value == '' || this.registerForm.controls.vacationType.value == null) {
      this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء اختر نوع الإجازة', ['']);
      return;
    } else if (this.registerForm.controls.startDate.value == '' || this.registerForm.controls.startDate.value == null) {
      this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال تاريخ بداية الإجازة ', ['']);
      return;
    } else if (this.registerForm.controls.endDate.value == '' || this.registerForm.controls.endDate.value == null) {
      this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال تاريخ نهاية الإجازة ', ['']);
      return;
    } else if (this.registerForm.controls.description.value == '' || this.registerForm.controls.description.value == null) {
      this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال وصف الإجازة ', ['']);
      return;
    } else {
      this.data.extra = {
        vacationTypeId: (<any>this.registerForm.controls.vacationType.value).id,
        employeeId: this.registerForm.value.employeeId ? (<any>this.registerForm.controls.employeeId.value).id : '',
        // employeeId: this.registerForm.controls.employeeId.value,
        startDate: this.registerForm.controls.startDate.value,
        endDate: this.registerForm.controls.endDate.value,
        description: this.registerForm.controls.description.value
      };
      this.dialogRef.close(this.data);
    }
  }
}
