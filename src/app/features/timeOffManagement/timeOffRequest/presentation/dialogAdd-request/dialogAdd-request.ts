import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VacationsTypesFacade } from '../../../../definitions/vacations-types/vacations-types.facade';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageType } from '../../../../../shared/shared.interfaces';

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
    @Inject(MAT_DIALOG_DATA) public data: any,  protected vacationsTypesFacade: VacationsTypesFacade) {
    this.vacationsTypesFacade.GetVacationsType();
    this.registerForm.controls.date.setValue(this.data.date);
  }

  closeDialog(): void {
    this.dialogRef.close(this.data);
  }
  add(): void {
    this.data.timeOffs= this.registerForm.controls.vacationsType.value
    this.dialogRef.close(this.data);

  }
}
