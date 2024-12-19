import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { CardComponent } from '../../../shared/components/card/card.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeEvaluationRolesManageServices } from './employee-evaluation-roles-manage.services';
import { EmployeeEvaluationRolesManageFacade } from './employee-evaluation-roles-manage.facade';
import { EmployeeEvaluationRolesManageRouting } from './employee-evaluation-roles-manage.routing';
import EmployeeEvaluationRolesManageComponent from './presentation/employee-evaluation-roles-manage.component';
import { OrganizationalUnitFacade } from '../../administrativeAffairs/organizational-unit/organizational-unit.facade';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { OrganizationalUnitServices } from '../../administrativeAffairs/organizational-unit/organizational-unit.services';
import { EmployeeServices } from '../../administrativeAffairs/employee/employee.services';
import { EmployeeFacade } from '../../administrativeAffairs/employee/employee.facade';

@NgModule({
  declarations: [EmployeeEvaluationRolesManageComponent],
  imports: [
    CommonModule,
    EmployeeEvaluationRolesManageRouting,
    ReactiveFormsModule,
    SharedModule,
    CardComponent,
    MatTooltipModule,
    MatInputModule,
    MatButtonModule,
    NgbTypeaheadModule
  ],
  providers: [
    EmployeeEvaluationRolesManageServices,
    EmployeeEvaluationRolesManageFacade,
    OrganizationalUnitFacade,
    OrganizationalUnitServices,
    EmployeeFacade,
    EmployeeServices
  ]
})
export class EmployeeEvaluationRolesManageModule {}
