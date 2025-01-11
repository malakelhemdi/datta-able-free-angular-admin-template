import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ShowAttendanceComponent } from './presentation/show-attendance.component';


const routes: Routes = [
  {
    path: '',
    component: ShowAttendanceComponent,
    data: {
      breadcrumb: 'ShowAttendance'
    }
  }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShowAttendanceRouting {}
