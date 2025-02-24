import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {
  OrganizationStructureTypeComponent
} from './presentation/organization-structure-type/organization-structure-type.component';

const routes: Routes = [
    {
        path: '',
        component: OrganizationStructureTypeComponent,
        data: {
            breadcrumb: 'OrganizationalUnit'
        }
    }

];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrganizationStructureTypeRouting {

}
