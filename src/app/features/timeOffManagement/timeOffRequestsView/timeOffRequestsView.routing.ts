import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import { TimeOffRequestsViewComponent } from './presentation/timeOffRequestsView.component';

const routes: Routes = [
    {
        path: '',
        component: TimeOffRequestsViewComponent,
        data: {
            breadcrumb: 'عرض طلبات الإجازة '
        }
    }

];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TimeOffRequestsViewRouting {

}
