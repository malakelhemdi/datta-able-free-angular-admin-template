import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeDetailsRouting } from './employee-details.routing';
import { ReactiveFormsModule } from '@angular/forms';
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
import { AnnualLeaveCreditsAndDeductionsComponent } from './presentation/emp-details-annual-leave-credits-and-deductions/emp-details-annual-leave-credits-and-deductions';
import { EmployeeDetailsJobStatusComponent } from './presentation/employee-details-job-status/employee-details-job-status.component';
import { EmployeeDetailsPersonalInfoComponent } from './presentation/employee-details-personal-info/employee-details-personal-info.component';
import { EmployeeDetailsJobInfoComponent } from './presentation/employee-details-job-info/employee-details-job-info.component';
import { EmployeeDetailsFinancialInfoComponent } from './presentation/employee-details-financial-info/employee-details-financial-info.component';
import { EmployeeDetailsEducationInfoComponent } from './presentation/employee-details-education-info/employee-details-education-info.component';
import { EmployeeDetailsEmployeeDuesComponent } from './presentation/employee-details-employee-dues/employee-details-employee-dues.component';

@NgModule({
  declarations: [
    EmployeeDetailsComponent,
    AnnualLeaveCreditsAndDeductionsComponent,
    EmployeeDetailsJobStatusComponent,
    EmployeeDetailsPersonalInfoComponent,
    EmployeeDetailsJobInfoComponent,
    EmployeeDetailsFinancialInfoComponent,
    EmployeeDetailsEducationInfoComponent,
    EmployeeDetailsEmployeeDuesComponent
  ],
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
