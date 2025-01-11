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
export class DialogAttendanceDetailsComponent implements OnInit{
  registerForm = this.fb.group({
    year:['2024', Validators.required],
    month:[''],
  });
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogAttendanceDetailsComponent>,
    private sharedFacade: SharedFacade,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    // this.vacationsTypesFacade.GetVacationsType();
   // this.registerForm.controls.date.setValue(this.data.date);
  }
  years: number[] = [];
  months: string[] = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];
  ngOnInit(): void {

    console.log(this.data)
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


}
