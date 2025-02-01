import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDetailsRouting } from './employee-details.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { EmployeeDetailsServices } from './employee-details.services';
import { SharedModule } from '../../../shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EmployeeDetailsComponent } from './presentation/employee-details';
import { CardComponent } from '../../../shared/components/card/card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { EmployeeDetailsFacade } from './employee-details.facade';

@NgModule({
  declarations: [EmployeeDetailsComponent],
  imports: [
    CommonModule,
    EmployeeDetailsRouting,
    ReactiveFormsModule,
    SharedModule,
    MatFormFieldModule,
    CardComponent,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatOptionModule,
    MatSelectModule
  ],
  providers: [EmployeeDetailsFacade]
})
export class EmployeeDetailsModule {}
