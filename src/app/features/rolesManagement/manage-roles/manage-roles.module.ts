import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { CardComponent } from '../../../shared/components/card/card.component';
import ManageRolesComponent from './presentation/manage-roles.component';
import { ManageRolesServices } from './manage-roles.services';
import { ManageRolesFacade } from './manage-roles.facade';
import { ManageRolesRouting } from './manage-roles.routing';

@NgModule({
  declarations: [ManageRolesComponent],
  imports: [CommonModule, ManageRolesRouting, ReactiveFormsModule, SharedModule, CardComponent],
  providers: [ManageRolesServices, ManageRolesFacade]
})
export class ManageRolesModule {}
