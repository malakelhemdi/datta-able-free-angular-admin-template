import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading/loading.component';
import { NgModule } from '@angular/core';
import { AppConfigService } from '../../config/app-config-service';
import { CookieService } from 'ngx-cookie-service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from '../core/interceptors/jwt.interceptor';
import { ErrorInterceptor } from '../core/interceptors/error.interceptor';
import { MaterialModule } from './material.module';
import { SharedFacade } from './shared.facade';
import { SharedService } from './shared.service';
import { ToggleInputComponent } from './toggle-input/toggle-input.component';
import { ValidationFacade } from './validation.facade';
import { NoItemsComponent } from './no-items/no-items.component';
import { FormSeperatorComponent } from './form-seperator/form-seperator.component';
import { NavigationItem } from './navigation/navigation';
import { MatButtonModule } from '@angular/material/button';
import { MessagesComponent } from './messages/messages.component';
import { TotalScorePipe } from './pipes/total-score.pipe';
import { SumAllScoresPipe } from './pipes/sum-scores.pipe';
import { SumLargestScoresPipe } from './pipes/total-larger-score.pipe';
import { NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TypeaheadInputComponent } from 'src/app/shared/components/typeahead-input.component';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CustomMatPaginatorIntl } from './MatTable/CustomMatPaginatorIntl.service';
import { DynamicDropdownComponent } from './components/dynamic-dropdown/dynamic-dropdown.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ScrollingModule } from '@angular/cdk/scrolling'; // <-- Import this
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    LoadingComponent,
    MessagesComponent,
    ToggleInputComponent,
    NoItemsComponent,
    FormSeperatorComponent,
    SumAllScoresPipe,
    SumLargestScoresPipe,
    TotalScorePipe,
    TypeaheadInputComponent,
    DynamicDropdownComponent
  ],

  imports: [
    CommonModule,
    MatButtonModule,
    NgbTypeaheadModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatProgressSpinnerModule,
    ScrollingModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule
  ],
  exports: [
    CommonModule,
    LoadingComponent,
    MaterialModule,
    ToggleInputComponent,
    NoItemsComponent,
    FormSeperatorComponent,
    MessagesComponent,
    SumAllScoresPipe,
    SumLargestScoresPipe,
    TotalScorePipe,
    TypeaheadInputComponent,
    DynamicDropdownComponent,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [
    CookieService,
    AppConfigService,
    SharedFacade,
    SharedService,
    ValidationFacade,
    NavigationItem,
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntl },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ]
})
export class SharedModule {}
