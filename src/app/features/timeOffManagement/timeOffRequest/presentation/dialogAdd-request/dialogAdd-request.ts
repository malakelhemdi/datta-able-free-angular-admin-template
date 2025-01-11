import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VacationsTypesFacade } from '../../../../definitions/vacations-types/vacations-types.facade';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageType } from '../../../../../shared/shared.interfaces';
import { SharedFacade } from '../../../../../shared/shared.facade';

@Component({
  selector: 'app-dialogAdd-request',
  templateUrl: './dialogAdd-request.html',
  styleUrls: ['./dialogAdd-request.scss']
})
export class DialogAddRequestComponent {
  registerForm = this.fb.group({
    vacationsType : ['', Validators.required],
    totalday : ['', Validators.required],
    date: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddRequestComponent>,
    private sharedFacade: SharedFacade,
    @Inject(MAT_DIALOG_DATA) public data: any,  protected vacationsTypesFacade: VacationsTypesFacade) {
    this.vacationsTypesFacade.GetVacationsType();
   // this.registerForm.controls.date.setValue(this.data.date);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  add(): void {
     this.data.date= new Date(this.registerForm.controls.date.value)
    this.data.timeOffs= this.registerForm.controls.vacationsType.value
    if (this.registerForm.controls.vacationsType.value == '' || this.registerForm.controls.vacationsType.value == null){
      this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء اختر نوع الإجازة', ['']);
      return;

    }else {
      this.dialogRef.close(this.data);

    }

  }
}
