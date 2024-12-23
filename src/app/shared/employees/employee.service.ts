import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/config/app-config';
import { BaseResponse } from '../shared.interfaces';
import { GetEmployeeCommand } from './employee.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGlobalServices {
  url: string | undefined;

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) {
    this.url = this.appConfig.defaultUrl;
  }

  // SearchType = 1 for employee code
  // SearchType = 3 for employee phone
  GetEmployee(SearchType = '', Value = '', culture = 'ar-LY'): Observable<BaseResponse<GetEmployeeCommand[]>> {
    return this.http.get<BaseResponse<GetEmployeeCommand[]>>(
      `${this.url}/api/Employee/GetAllEmployee?SearchType=${SearchType}&Value=${Value}&culture=${culture}`
    );
  }
}
