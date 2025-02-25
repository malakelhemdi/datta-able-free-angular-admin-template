import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { SequenceManagementServices } from './sequence-management.services';
import { SequenceManagementRouting } from './sequence-management.routing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedModule } from '../../../shared/shared.module';
import { SequenceManagementFacade } from './sequence-management.facade';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CardComponent } from '../../../shared/components/card/card.component';
import { SequenceManagementComponent } from './presentation/sequence-management/sequence-management.component';
import { OrganizationalUnitFacade } from '../organizational-unit/organizational-unit.facade';
import { OrganizationalUnitServices } from '../organizational-unit/organizational-unit.services';


@NgModule({
  declarations: [
    SequenceManagementComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule,
    SequenceManagementRouting,
    MatProgressSpinnerModule,
    SharedModule,
    MatOptionModule,
    MatSelectModule,
    CardComponent
  ],
  providers:[SequenceManagementFacade,SequenceManagementServices,OrganizationalUnitFacade,OrganizationalUnitServices,]
})

export class SequenceManagementModule { }
