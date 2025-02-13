import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import { ClassificationBranchesComponent } from './presentation/classification-branches.component';

const routes: Routes = [
    {
        path: '',
        component: ClassificationBranchesComponent,
        data: {
            breadcrumb: 'فئات الوظيفية '
        }
    }

];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClassificationBranchesRouting {

}
