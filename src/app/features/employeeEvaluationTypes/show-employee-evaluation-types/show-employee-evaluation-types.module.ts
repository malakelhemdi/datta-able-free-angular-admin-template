import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowEmployeeEvaluationTypeServicesRouting } from './show-employee-evaluation-types.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { ShowEmployeeEvaluationTypeServices } from './show-employee-evaluation-types.services';
import { SharedModule } from '../../../shared/shared.module';
import ShowEmployeeEvaluationTypeComponent from './presentation/show-employee-evaluation-types.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ShowEmployeeEvaluationTypeFacade } from './show-employee-evaluation-types.facade';

@NgModule({
  declarations: [ShowEmployeeEvaluationTypeComponent],
  imports: [
    CommonModule,
    ShowEmployeeEvaluationTypeServicesRouting,
    ReactiveFormsModule,
    SharedModule,
    CardComponent,
    MatTooltipModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [ShowEmployeeEvaluationTypeServices, ShowEmployeeEvaluationTypeFacade]
})
export class ShowEmployeeEvaluationTypeModule {}
