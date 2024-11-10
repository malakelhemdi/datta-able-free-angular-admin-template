import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import ShowEmployeeEvaluationTypeComponent from './presentation/show-employee-evaluation-types.component';

const routes: Routes = [
  {
    path: '',
    component: ShowEmployeeEvaluationTypeComponent,
    data: {
      breadcrumb: 'قائمة أنواع التقييمات'
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowEmployeeEvaluationTypeServicesRouting {}
