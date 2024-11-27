import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TimeOffRequestServices} from "./timeOffRequest.services";
import { TimeOffRequestRouting} from "./timeOffRequest.routing";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {SharedModule} from "../../../shared/shared.module";
import {TimeOffRequestFacade} from "./timeOffRequest.facade";
import {EmployeeFacade} from "../../administrativeAffairs/employee/employee.facade";
import {EmployeeServices} from "../../administrativeAffairs/employee/employee.services";
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CardComponent } from '../../../shared/components/card/card.component';
import { TimeOffRequestComponent } from './presentation/timeOffRequest.component';
import {  DialogAddRequestComponent } from './presentation/dialogAdd-request/dialogAdd-request';
import { NgbNav, NgbNavContent, NgbNavItem, NgbNavLink, NgbNavOutlet } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { VacationsTypesFacade } from '../../definitions/vacations-types/vacations-types.facade';
import { VacationsTypesServices } from '../../definitions/vacations-types/vacations-types.services';



@NgModule({
  declarations: [
    TimeOffRequestComponent,
    DialogAddRequestComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule,
    TimeOffRequestRouting,
    MatProgressSpinnerModule,
    SharedModule,
    FormsModule,
    MatSelectModule,
    MatCheckboxModule,
    CardComponent,
    NgbNav,
    NgbNavContent,
    NgbNavLink,
    NgbNavItem,
    NgbNavOutlet,
    MatDialogModule
  ],
  providers:[TimeOffRequestFacade,TimeOffRequestServices, EmployeeFacade,EmployeeServices,VacationsTypesFacade, VacationsTypesServices]
})

export class TimeOffRequestModule { }
