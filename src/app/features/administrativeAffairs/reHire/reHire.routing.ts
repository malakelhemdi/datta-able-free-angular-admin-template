import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import ReHireComponent from './presentation/reHire.component';

const routes: Routes = [
    {
        path: '',
        component: ReHireComponent,
        data: {
            breadcrumb: 'إعادة تعيين'
        }
    }

];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReHireRouting {

}
