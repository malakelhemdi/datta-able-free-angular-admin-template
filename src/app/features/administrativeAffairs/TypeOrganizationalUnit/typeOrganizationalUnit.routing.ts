import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {TypeOrganizationalUnitComponent} from "./presentation/typeOrganizationalUnit.component";

const routes: Routes = [
    {
        path: '',
        component: TypeOrganizationalUnitComponent,
        data: {
            breadcrumb: 'OrganizationalUnit'
        }
    }

];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TypeOrganizationalUnitRouting {

}
