import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import ChangeDateOfHireComponent from './presentation/changeDateOfHire.component';

const routes: Routes = [
    {
        path: '',
        component: ChangeDateOfHireComponent,
        data: {
            breadcrumb: 'تغيير تاريخ تعيين'
        }
    }

];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChangeDateOfHireRouting {

}
