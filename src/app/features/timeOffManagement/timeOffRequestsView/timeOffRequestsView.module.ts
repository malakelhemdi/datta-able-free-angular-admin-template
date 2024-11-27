import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TimeOffRequestsViewServices} from "./timeOffRequestsView.services";
import { TimeOffRequestsViewRouting} from "./timeOffRequestsView.routing";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {SharedModule} from "../../../shared/shared.module";
import {TimeOffRequestsViewFacade} from "./timeOffRequestsView.facade";
import {EmployeeFacade} from "../../administrativeAffairs/employee/employee.facade";
import {EmployeeServices} from "../../administrativeAffairs/employee/employee.services";
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CardComponent } from '../../../shared/components/card/card.component';
import { TimeOffRequestsViewComponent } from './presentation/timeOffRequestsView.component';
import { NgbNav, NgbNavContent, NgbNavItem, NgbNavLink, NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    TimeOffRequestsViewComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule,
    TimeOffRequestsViewRouting,
    MatProgressSpinnerModule,
    SharedModule,
    FormsModule,
    MatSelectModule,
    MatCheckboxModule,
    CardComponent,
    NgbNavItem,
    NgbNav,
    NgbNavOutlet,
    CommonModule,
    NgbNavContent,
    NgbNavLink
  ],
  providers:[TimeOffRequestsViewFacade,TimeOffRequestsViewServices, EmployeeFacade,EmployeeServices]
})

export class TimeOffRequestsViewModule { }
