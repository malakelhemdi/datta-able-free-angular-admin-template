import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { CardComponent } from '../../../shared/components/card/card.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeEvaluationManagementFacade } from '../employee-evaluation-management/employee-evaluation-management.facade';
import { EmployeeEvaluationManagementServices } from '../employee-evaluation-management/employee-evaluation-management.services';
import EmployeeEvaluationDepartmentManagerConfirmationComponent from './presentation/employee-evaluation-personnel-affairs-confirmation-bulk.component';
import { EmployeeEvaluationDepartmentManagerConfirmationRouting } from './employee-evaluation-personnel-affairs-confirmation-bulk.routing';
import { EmployeeEvaluationDepartmentManagerConfirmationServices } from './employee-evaluation-personnel-affairs-confirmation-bulk.services';
import { EmployeeEvaluationDepartmentManagerConfirmationFacade } from './employee-evaluation-personnel-affairs-confirmation-bulk.facade';

@NgModule({
  declarations: [EmployeeEvaluationDepartmentManagerConfirmationComponent],
  imports: [
    CommonModule,
    EmployeeEvaluationDepartmentManagerConfirmationRouting,
    ReactiveFormsModule,
    SharedModule,
    CardComponent,
    MatTooltipModule,
    MatInputModule,
    MatButtonModule,
    NgbTypeaheadModule
  ],
  providers: [
    EmployeeEvaluationDepartmentManagerConfirmationServices,
    EmployeeEvaluationDepartmentManagerConfirmationFacade,
    EmployeeEvaluationManagementServices,
    EmployeeEvaluationManagementFacade
  ]
})
export class EmployeeEvaluationDepartmentManagerConfirmationModule {}
