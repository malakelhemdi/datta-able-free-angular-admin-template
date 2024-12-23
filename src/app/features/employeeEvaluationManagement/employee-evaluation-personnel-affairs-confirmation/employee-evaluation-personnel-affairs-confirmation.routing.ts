import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import EmployeeEvaluationPersonnelAffairsConfirmationComponent from './presentation/employee-evaluation-personnel-affairs-confirmation.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeEvaluationPersonnelAffairsConfirmationComponent,
    data: {
      breadcrumb: 'إدارة مسئولين الجهات التنظيمية'
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeEvaluationPersonnelAffairsConfirmationRouting {}
