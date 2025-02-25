import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import { OrganizationalUnitComponent } from '../organizational-unit/presentation/organizational-unit.component';
import { SequenceManagementComponent } from './presentation/sequence-management/sequence-management.component';

const routes: Routes = [
    {
        path: '',
        component: SequenceManagementComponent,
        data: {
            breadcrumb: 'OrganizationalUnit'
        }
    }

];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SequenceManagementRouting {

}
