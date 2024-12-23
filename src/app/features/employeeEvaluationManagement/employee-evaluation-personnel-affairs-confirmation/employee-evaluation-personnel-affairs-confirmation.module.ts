import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { CardComponent } from '../../../shared/components/card/card.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { EmployeeEvaluationPersonnelAffairsConfirmationServices } from './employee-evaluation-personnel-affairs-confirmation.services';
import { EmployeeEvaluationPersonnelAffairsConfirmationFacade } from './employee-evaluation-personnel-affairs-confirmation.facade';
import { EmployeeEvaluationPersonnelAffairsConfirmationRouting } from './employee-evaluation-personnel-affairs-confirmation.routing';
import EmployeeEvaluationPersonnelAffairsConfirmationComponent from './presentation/employee-evaluation-personnel-affairs-confirmation.component';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { TotalScorePipe } from '../employee-evaluation-management/total-score.pipe';
import { SumLargestScoresPipe } from '../employee-evaluation-management/total-larger-score.pipe';
import { SumAllScoresPipe } from '../employee-evaluation-management/sum-scores.pipe';
import { EmployeeEvaluationManagementFacade } from '../employee-evaluation-management/employee-evaluation-management.facade';
import { EmployeeEvaluationManagementServices } from '../employee-evaluation-management/employee-evaluation-management.services';

@NgModule({
  declarations: [EmployeeEvaluationPersonnelAffairsConfirmationComponent, SumAllScoresPipe, SumLargestScoresPipe, TotalScorePipe],
  imports: [
    CommonModule,
    EmployeeEvaluationPersonnelAffairsConfirmationRouting,
    ReactiveFormsModule,
    SharedModule,
    CardComponent,
    MatTooltipModule,
    MatInputModule,
    MatButtonModule,
    NgbTypeaheadModule
  ],
  providers: [
    EmployeeEvaluationPersonnelAffairsConfirmationServices,
    EmployeeEvaluationPersonnelAffairsConfirmationFacade,
    EmployeeEvaluationManagementServices,
    EmployeeEvaluationManagementFacade
  ]
})
export class EmployeeEvaluationPersonnelAffairsConfirmationModule {}
