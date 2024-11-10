import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import AddEmployeeEvaluationTypeServicesComponent from './presentation/add-employee-evaluation-type.component';

const routes: Routes = [
  {
    path: '',
    component: AddEmployeeEvaluationTypeServicesComponent,
    data: {
      breadcrumb: 'إضافة إعتماد جديد'
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddEmployeeEvaluationTypeServicesRouting {}
