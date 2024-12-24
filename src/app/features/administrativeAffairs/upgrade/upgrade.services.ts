import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfig } from '../../../../config/app-config';
import { Observable } from 'rxjs';
import { BaseResponse } from '../../../shared/shared.interfaces';
import { Injectable } from '@angular/core';

@Injectable()
export class UpgradeServices {
  url: string | undefined;

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) {
    this.url = this.appConfig.defaultUrl;
  }

  Upgrade(request: any): Observable<BaseResponse<string>> {
    let params = new HttpParams();
    if (request.employeeId != '' && request.employeeId != null) {
      params = params.set('EmployeeId', request.employeeId);
    }
    if (request.jobTitleId != '' && request.jobTitleId != null) {
      params = params.set('JobTitleId', request.jobTitleId);
    }
    if (request.socialStatusSalaries != '' && request.socialStatusSalaries != null) {
      params = params.set('socialStatusSalaries', request.socialStatusSalaries);
    }
    if (request.overtime != '' && request.overtime != null) {
      params = params.set('Overtime', request.overtime);
    }
    if (request.effDate != '' && request.effDate != null) {
      params = params.set('effDate', request.effDate);
    }
    params = params.set('culture', 'ar-LY');
    return this.http.put<BaseResponse<string>>(`${this.url}/api/FunctionalProcedures/Upgrade`, {}, { params: params });
  }
}
