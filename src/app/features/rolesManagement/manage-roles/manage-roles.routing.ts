import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import ManageRolesComponent from './presentation/manage-roles.component';

const routes: Routes = [
  {
    path: '',
    component: ManageRolesComponent,
    data: {
      breadcrumb: 'إضافة إعتماد جديد'
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRolesRouting {}
