import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEmployeeEvaluationTypeServicesRouting } from './add-employee-evaluation-type.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { AddEmployeeEvaluationTypeServices } from './add-employee-evaluation-type.services';
import { SharedModule } from '../../../shared/shared.module';
import AddEmployeeEvaluationTypeComponent from './presentation/add-employee-evaluation-type.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { AddEmployeeEvaluationTypeFacade } from './add-employee-evaluation-type.facade';

@NgModule({
  declarations: [AddEmployeeEvaluationTypeComponent],
  imports: [CommonModule, AddEmployeeEvaluationTypeServicesRouting, ReactiveFormsModule, SharedModule, CardComponent],
  providers: [AddEmployeeEvaluationTypeServices, AddEmployeeEvaluationTypeFacade]
})
export class AddEmployeeEvaluationTypeModule {}
