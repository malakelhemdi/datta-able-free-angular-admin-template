import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/config/app-config';
import { BaseResponse } from '../shared.interfaces';
import { GetEmployeeCommand, GetEmployeeSmallCommand } from './employee.interface';

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
  GetEmployee(SearchType?: string, Value?: string, culture = 'ar-LY'): Observable<BaseResponse<GetEmployeeCommand[]>> {
    const params: any = { culture };
    if (SearchType) {
      params.SearchType = SearchType;
    }
    if (Value) {
      params.Value = Value;
    }
    return this.http.get<BaseResponse<GetEmployeeCommand[]>>(`${this.url}/api/Employee/GetAllEmployee`, { params });
  }

  GetEmployeeSmallObject(Name?, culture = 'ar-LY'): Observable<BaseResponse<GetEmployeeSmallCommand[]>> {
    const params: any = { culture };
    if (Name) {
      params.Name = Name;
    }
    return this.http.get<BaseResponse<GetEmployeeSmallCommand[]>>(`${this.url}/api/Employee/GetEmployees`, { params });
  }

  // DeleteEmployee(Id: string, culture = 'ar-LY'): Observable<BaseResponse<boolean>> {
  //   return this.http.delete<BaseResponse<boolean>>(`${this.url}/api/Employee/DeleteEmployee`, {
  //     params: {
  //       Id,
  //       culture
  //     }
  //   });
  // }

  // UpdateEmployee(Employee: UpdateEmployeeCommand): Observable<BaseResponse<string>> {
  //   return this.http.put<BaseResponse<string>>(`${this.url}/api/Employee/UpdateEmployee?culture=ar-LY`, Employee);
  // }
}
