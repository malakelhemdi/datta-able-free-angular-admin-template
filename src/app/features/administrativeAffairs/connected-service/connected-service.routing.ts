import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import ConnectedServiceComponent from './presentation/connected-service.component';

const routes: Routes = [
  {
    path: '',
    component: ConnectedServiceComponent,
    data: {
      breadcrumb: 'السجل الصحي'
    }
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConnectedServiceRouting {}
