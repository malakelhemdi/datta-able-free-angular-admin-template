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
    vacationTypeId : ['', Validators.required],
    startDate : ['', Validators.required],
    endDate : ['', Validators.required],
    description: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogAddRequestComponent>,
    private sharedFacade: SharedFacade,
    @Inject(MAT_DIALOG_DATA) public data: any,  protected vacationsTypesFacade: VacationsTypesFacade) {
    this.vacationsTypesFacade.GetAvailableVacationTypes();
   // this.registerForm.controls.date.setValue(this.data.date);
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  add(): void {
     this.data.date= new Date(this.registerForm.controls.startDate.value)
    this.data.timeOffs= this.vacationsTypesFacade.VacationsTypeSubject$.getValue().find((x: {
      id: string | null | undefined;
    }) => x.id == this.registerForm.controls.vacationTypeId.value).name
    if (this.registerForm.controls.vacationTypeId.value == '' || this.registerForm.controls.vacationTypeId.value == null) {
      this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء اختر نوع الإجازة', ['']);
      return;
    }else  if (this.registerForm.controls.startDate.value == '' || this.registerForm.controls.startDate.value == null){
      this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال تاريخ بداية الإجازة ', ['']);
      return;
    }else  if (this.registerForm.controls.endDate.value == '' || this.registerForm.controls.endDate.value == null){
      this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال تاريخ نهاية الإجازة ', ['']);
      return;
    }else  if (this.registerForm.controls.description.value == '' || this.registerForm.controls.description.value == null){
      this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال وصف الإجازة ', ['']);
      return;
    }else {
      this.data.extra=
        {
          vacationTypeId : this.registerForm.controls.vacationTypeId.value,
          startDate : this.registerForm.controls.startDate.value,
          endDate :  this.registerForm.controls.endDate.value,
          description: this.registerForm.controls.description.value,
        }
      this.dialogRef.close(this.data);

    }

  }
}
