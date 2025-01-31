import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/config/app-config';
import { BaseResponse, BaseResponsePagination } from '../shared.interfaces';
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
  // SearchType = 2 for employee name
  // SearchType = 3 for employee phone

  GetEmployee(
    Page: number,
    PageSize: number,
    SearchType?: string,
    Value?: string,
    culture = 'ar-LY'
  ): Observable<BaseResponsePagination<GetEmployeeCommand[]>> {
    const params: any = {
      culture,
      Page,
      PageSize
    };
    if (Value) {
      params.Value = Value;
    }
    if (SearchType) {
      params.SearchType = SearchType;
    }
    return this.http.get<BaseResponsePagination<GetEmployeeCommand[]>>(`${this.url}/api/Employee/GetAllEmployee`, {
      params
    });
  }

  GetEmployeeSmallObject(
    Page: number,
    PageSize: number,
    Name?,
    culture = 'ar-LY'
  ): Observable<BaseResponsePagination<GetEmployeeSmallCommand[]>> {
    const params: any = { culture };
    if (Name) {
      params.Name = Name;
    }

    params.Page = Page;
    params.PageSize = PageSize;
    return this.http.get<BaseResponsePagination<GetEmployeeSmallCommand[]>>(`${this.url}/api/Employee/GetEmployees`, { params });
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
