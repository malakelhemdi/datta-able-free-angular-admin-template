import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { CardComponent } from '../../../shared/components/card/card.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import ShowAttendance from './presentation/show-attendance.component';
import { ShowAttendanceRouting } from './show-attendance.routing';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
// import { ShowAttendanceServices } from './show-attendance.services';
import { ShowAttendanceFacade } from './show-attendance.facade';

@NgModule({
  declarations: [ShowAttendance],
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
    NgbTypeaheadModule
  ],
  providers: [ShowAttendanceFacade]
})
export class ShowAttendanceModule {}
