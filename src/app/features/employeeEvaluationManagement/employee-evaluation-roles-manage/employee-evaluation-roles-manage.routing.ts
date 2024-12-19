import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import EmployeeEvaluationRolesManageComponent from './presentation/employee-evaluation-roles-manage.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeeEvaluationRolesManageComponent,
    data: {
      breadcrumb: 'إدارة مسئولين الجهات التنظيمية'
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeEvaluationRolesManageRouting {}
