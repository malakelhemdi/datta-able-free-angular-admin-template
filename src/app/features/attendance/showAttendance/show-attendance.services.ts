import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/shared/shared.interfaces';
import { AppConfig } from '../../../../config/app-config';
import { Injectable } from '@angular/core';
import { GetEmployeeCommand } from '../../administrativeAffairs/add-employee/add-employee.interface';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ShowAttendanceServices {
  url: string | undefined;

  constructor(
    private appConfig: AppConfig,
    private http: HttpClient
  ) {
    this.url = this.appConfig.defaultUrl;
  }

  GetEmployee(): Observable<BaseResponse<GetEmployeeCommand[]>> {
    return this.http.get<BaseResponse<GetEmployeeCommand[]>>(`${this.url}/api/Employee/GetEmployees?culture=ar-LY`);
  }
}
