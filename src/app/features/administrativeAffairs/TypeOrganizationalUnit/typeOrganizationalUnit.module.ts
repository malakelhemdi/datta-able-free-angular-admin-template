import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ReactiveFormsModule} from "@angular/forms";
import {TypeOrganizationalUnitServices} from "./typeOrganizationalUnit.services";
import { TypeOrganizationalUnitRouting} from "./typeOrganizationalUnit.routing";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {SharedModule} from "../../../shared/shared.module";
import {TypeOrganizationalUnitFacade} from "./typeOrganizationalUnit.facade";
import {TypeOrganizationalUnitComponent} from "./presentation/typeOrganizationalUnit.component";
import {ClassificationBranchesService} from "../classification/classification-branches.services";
import {ClassificationBranchesFacade} from "../classification/classification-branches.facade";
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CardComponent } from '../../../shared/components/card/card.component';
import { ShowAttendanceServices } from '../../attendance/showAttendance/show-attendance.services';
import { ShowAttendanceFacade } from '../../attendance/showAttendance/show-attendance.facade';



@NgModule({
  declarations: [
      TypeOrganizationalUnitComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule,
    TypeOrganizationalUnitRouting,
    MatProgressSpinnerModule,
    SharedModule,
    MatOptionModule,
    MatSelectModule,
    CardComponent
  ],
  providers:[TypeOrganizationalUnitFacade,TypeOrganizationalUnitServices ]
})

export class TypeOrganizationalUnitModule { }
