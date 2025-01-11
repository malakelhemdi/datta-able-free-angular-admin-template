import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfig } from '../../../../config/app-config';
import { Observable } from 'rxjs';
import { BaseResponse } from '../../../shared/shared.interfaces';
import { Injectable } from '@angular/core';

@Injectable()
export class ChangeDateOfHireServices {
  url: string | undefined;

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) {
    this.url = this.appConfig.defaultUrl;
  }

  ChangeDateOfHire(request: any): Observable<BaseResponse<string>> {
    let params = new HttpParams();
    if (request.employeeId != '' && request.employeeId != null) {
      params = params.set('EmployeeId', request.employeeId);
    }

    if (request.effDate != '' && request.effDate != null) {
      params = params.set('EffDate', request.effDate);
    }
    if (request.HireDate != '' && request.HireDate != null) {
      params = params.set('HireDate', request.HireDate);
    }
    if (request.Notes != '' && request.Notes != null) {
      params = params.set('Notes', request.Notes);
    }
    params = params.set('culture', 'ar-LY');
    return this.http.put<BaseResponse<string>>(`${this.url}/api/FunctionalProcedures/ChangeDateOfHire`, {}, { params: params });
  }


}
