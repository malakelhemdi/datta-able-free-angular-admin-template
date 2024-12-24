import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfig } from '../../../../config/app-config';
import { Observable } from 'rxjs';
import { BaseResponse } from '../../../shared/shared.interfaces';
import { Injectable } from '@angular/core';

@Injectable()
export class SecondmentToOtherPostionServices {
  url: string | undefined;

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) {
    this.url = this.appConfig.defaultUrl;
  }

  ReClassification(request: any): Observable<BaseResponse<string>> {
    let params = new HttpParams();
    if (request.employeeId != '' && request.employeeId != null) {
      params = params.set('EmployeeId', request.employeeId);
    }
    if (request.SecondmentPositionId != '' && request.SecondmentPositionId != null) {
      params = params.set('SecondmentPositionId', request.SecondmentPositionId);
    }
    if (request.basicSalary != '' && request.basicSalary != null) {
      params = params.set('basicSalary', request.basicSalary);
    }
    if (request.socialStatusSalaries != '' && request.socialStatusSalaries != null) {
      params = params.set('socialStatusSalaries', request.socialStatusSalaries);
    }
    if (request.overtime != '' && request.overtime != null) {
      params = params.set('overtime', request.overtime);
    }
    if (request.effDate != '' && request.effDate != null) {
      params = params.set('effDate', request.effDate);
    }
    if (request.SecondmentDateStart != '' && request.SecondmentDateStart != null) {
      params = params.set('SecondmentDateStart', request.SecondmentDateStart);
    }
    if (request.SecondmentDateEnd != '' && request.SecondmentDateEnd != null) {
      params = params.set('SecondmentDateEnd', request.SecondmentDateEnd);
    }

    params = params.set('culture', 'ar-LY');
    return this.http.put<BaseResponse<string>>(`${this.url}/api/FunctionalProcedures/SecondmentToOtherPostion`, {}, { params: params });
  }
}
