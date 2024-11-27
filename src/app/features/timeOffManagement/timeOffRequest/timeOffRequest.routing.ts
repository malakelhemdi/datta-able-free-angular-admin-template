import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import { TimeOffRequestComponent } from './presentation/timeOffRequest.component';

const routes: Routes = [
    {
        path: '',
        component: TimeOffRequestComponent,
        data: {
            breadcrumb: 'طلب إجازة'
        }
    }

];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TimeOffRequestRouting {

}
