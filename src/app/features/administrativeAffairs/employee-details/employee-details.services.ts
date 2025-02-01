import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfig } from '../../../../config/app-config';
import { Observable } from 'rxjs';
import { BaseResponse } from '../../../shared/shared.interfaces';
import { Injectable } from '@angular/core';

@Injectable()
export class EmployeeDetailsServices {
  url: string | undefined;

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) {
    this.url = this.appConfig.defaultUrl;
  }

  DeleteEmployee(Id: string): Observable<BaseResponse<boolean>> {
    return this.http.delete<BaseResponse<boolean>>(`${this.url}/api/Employee/DeleteEmployee?Id=${Id}&culture=ar-LY`);
  }
}
