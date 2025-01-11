import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChangeDateOfHireRouting} from "./changeDateOfHire.routing";
import {ReactiveFormsModule} from "@angular/forms";
import {ChangeDateOfHireFacade} from "./changeDateOfHire.facade";
import {ChangeDateOfHireServices} from "./changeDateOfHire.services";
import {SharedModule} from "../../../shared/shared.module";
import ChangeDateOfHireComponent from './presentation/changeDateOfHire.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MessagesComponent } from '../../../shared/messages/messages.component';
import { EmployeeFacade } from '../employee/employee.facade';
import { EmployeeServices } from '../employee/employee.services';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    ChangeDateOfHireComponent,
  ],
  imports: [
    CommonModule,
    ChangeDateOfHireRouting,
    ReactiveFormsModule,
    SharedModule,
    CardComponent,
    MatTooltipModule,
    MatInputModule,
    MatButtonModule,
    NgbTypeahead
  ],
  providers:[ChangeDateOfHireFacade,ChangeDateOfHireServices, EmployeeFacade,
    EmployeeServices]
})
export class ChangeDateOfHireModule { }
