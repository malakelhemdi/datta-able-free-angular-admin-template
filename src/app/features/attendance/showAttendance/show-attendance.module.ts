import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { CardComponent } from '../../../shared/components/card/card.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ShowAttendanceRouting } from './show-attendance.routing';
import {
  NgbAccordionBody,
  NgbAccordionButton, NgbAccordionCollapse,
  NgbAccordionDirective,
  NgbAccordionHeader,
  NgbAccordionItem, NgbCollapse,
  NgbTypeaheadModule
} from '@ng-bootstrap/ng-bootstrap';
// import { ShowAttendanceServices } from './show-attendance.services';
import { ShowAttendanceFacade } from './show-attendance.facade';
import { ShowAttendanceServices } from './show-attendance.services';
import { ShowAttendanceComponent } from './presentation/show-attendance.component';
import { OrganizationalUnitFacade } from '../../administrativeAffairs/organizational-unit/organizational-unit.facade';
import {
  OrganizationalUnitServices
} from '../../administrativeAffairs/organizational-unit/organizational-unit.services';
import { DialogAttendanceDetailsComponent } from './presentation/dialogAttendance-details/dialogAttendance-details';

@NgModule({
  declarations: [ShowAttendanceComponent,
    DialogAttendanceDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ShowAttendanceRouting,
    ReactiveFormsModule,
    SharedModule,
    CardComponent,
    MatTooltipModule,
    MatInputModule,
    MatButtonModule,
    NgbTypeaheadModule,
    NgbAccordionHeader,
    NgbAccordionItem,
    NgbAccordionDirective,
    NgbAccordionButton,
    NgbAccordionCollapse,
    NgbAccordionBody,
    NgbCollapse
  ],
  providers: [ShowAttendanceFacade, ShowAttendanceServices,
    OrganizationalUnitFacade, OrganizationalUnitServices,]
})
export class ShowAttendanceModule {}
