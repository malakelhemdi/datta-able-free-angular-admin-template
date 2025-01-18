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
import { ReactiveFormsModule } from '@angular/forms';
import { TypeaheadInputComponent } from 'src/app/shared/components/typeahead-input.component';

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
    TypeaheadInputComponent
  ],

  imports: [CommonModule, MatButtonModule, NgbTypeaheadModule, ReactiveFormsModule],
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
    TypeaheadInputComponent
  ],
  providers: [
    CookieService,
    AppConfigService,
    SharedFacade,
    SharedService,
    ValidationFacade,
    NavigationItem,

    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ]
})
export class SharedModule {}
