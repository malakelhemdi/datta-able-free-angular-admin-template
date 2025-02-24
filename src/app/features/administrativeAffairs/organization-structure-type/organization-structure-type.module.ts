import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { OrganizationStructureTypeServices } from './organization-structure-type.services';
import { OrganizationStructureTypeRouting } from './organization-structure-type.routing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '../../../shared/shared.module';
import { OrganizationStructureTypeFacade } from './organization-structure-type.facade';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CardComponent } from '../../../shared/components/card/card.component';
import {
  OrganizationStructureTypeComponent
} from './presentation/organization-structure-type/organization-structure-type.component';


@NgModule({
  declarations: [
    OrganizationStructureTypeComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule,
    OrganizationStructureTypeRouting,
    MatProgressSpinnerModule,
    SharedModule,
    MatOptionModule,
    MatSelectModule,
    CardComponent
  ],
  providers:[OrganizationStructureTypeFacade,OrganizationStructureTypeServices]
})

export class OrganizationStructureTypeModule { }
