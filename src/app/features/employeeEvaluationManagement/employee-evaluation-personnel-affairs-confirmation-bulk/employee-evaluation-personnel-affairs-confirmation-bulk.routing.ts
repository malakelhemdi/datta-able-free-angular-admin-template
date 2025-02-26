import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import EmployeeEvaluationDepartmentManagerConfirmationComponent from './presentation/employee-evaluation-personnel-affairs-confirmation-bulk.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeEvaluationDepartmentManagerConfirmationComponent,
    data: {
      breadcrumb: 'إدارة مسئولين الجهات التنظيمية'
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeEvaluationDepartmentManagerConfirmationRouting {}
