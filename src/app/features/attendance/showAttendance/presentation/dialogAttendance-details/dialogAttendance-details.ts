import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VacationsTypesFacade } from '../../../../definitions/vacations-types/vacations-types.facade';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageType } from '../../../../../shared/shared.interfaces';
import { SharedFacade } from '../../../../../shared/shared.facade';
import { TimeOffRequestFacade } from '../../../../timeOffManagement/timeOffRequest/timeOffRequest.facade';
import { ShowAttendanceFacade } from '../../show-attendance.facade';

@Component({
  selector: 'app-dialogAttendance-details',
  templateUrl: './dialogAttendance-details.html',
  styleUrls: ['./dialogAttendance-details.scss']
})
export class DialogAttendanceDetailsComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogAttendanceDetailsComponent>,
    protected showAttendanceFacade: ShowAttendanceFacade,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.registerForm.controls.EmployeeCode.setValue(this.data.EmployeeCode);
    this.showAttendanceFacade.GetAttendances(this.registerForm.value);
  }

  registerForm = this.fb.group({
    year: [''],
    month: [''],
    EmployeeCode: ['']
  });
  years: number[] = [];
  months: { id: number; name: string }[] = [
    {
      id: 1,
      name: 'يناير'
    },
    {
      id: 2,
      name: 'فبراير'
    },
    {
      id: 3,
      name: 'مارس'
    },
    {
      id: 4,
      name: 'أبريل'
    },
    {
      id: 5,
      name: 'مايو'
    },
    {
      id: 6,
      name: 'يونيو'
    },
    {
      id: 7,
      name: 'يوليو'
    },
    {
      id: 8,
      name: 'أغسطس'
    },
    {
      id: 9,
      name: 'سبتمبر'
    },
    {
      id: 10,
      name: 'أكتوبر'
    },
    {
      id: 11,
      name: 'نوفمبر'
    },
    {
      id: 12,
      name: 'ديسمبر'
    },
  ];

  ngOnInit(): void {

    const currentYear = new Date().getFullYear();

    for (let year = currentYear; year >= 1900; year--) {
      this.years.push(year);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  add(): void {
    //  this.data.date= new Date(this.registerForm.controls.date.value)
    // this.data.timeOffs= this.registerForm.controls.vacationsType.value
    // if (this.registerForm.controls.vacationsType.value == '' || this.registerForm.controls.vacationsType.value == null){
    //   this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء اختر نوع الإجازة', ['']);
    //   return;
    //
    // }else {
    this.dialogRef.close(this.data);

    // }

  }

  onSearch(){
    this.showAttendanceFacade.GetAttendances(this.registerForm.value);

  }

}
