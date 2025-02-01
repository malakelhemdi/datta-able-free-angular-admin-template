import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EmployeeDetailsComponent } from './presentation/employee-details';

const routes: Routes = [
  {
    path: '',
    component: EmployeeDetailsComponent,
    data: {
      breadcrumb: 'المستخدمين'
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeDetailsRouting {}
