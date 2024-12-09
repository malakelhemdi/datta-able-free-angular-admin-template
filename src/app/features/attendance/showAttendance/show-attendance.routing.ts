import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import HealthHistoryComponent from './presentation/show-attendance.component';

const routes: Routes = [
  {
    path: '',
    component: HealthHistoryComponent,
    data: {
      breadcrumb: 'السجل الصحي'
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowAttendanceRouting {}
