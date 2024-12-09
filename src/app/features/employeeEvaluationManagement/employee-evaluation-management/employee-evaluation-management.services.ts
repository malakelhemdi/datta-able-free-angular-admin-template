import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../../config/app-config';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/shared/shared.interfaces';
import { AddEmployeeEvaluationDTO, EmployeesCommand, GetEmployeeCommand } from './employee-evaluation-management.interface';

@Injectable()
export class EmployeeEvaluationManagementServices {
  url: string | undefined;

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) {
    this.url = this.appConfig.defaultUrl;
  }

  GetEmployee(employeeId: string | number): Observable<BaseResponse<GetEmployeeCommand>> {
    return this.http.get<BaseResponse<GetEmployeeCommand>>(
      `${this.url}/api/Employee/GetAllEmployee?SearchType=${1}&Value=${employeeId}&culture=ar-LY'`
    );
  }

  GetEmployeesGroupedByManagerType(): Observable<BaseResponse<EmployeesCommand>> {
    return this.http.get<BaseResponse<EmployeesCommand>>(
      `${this.url}/api/EmployeeEvaluation/GetEmployeesGroupedByManagerType?culture=ar-LY'`
    );
  }

  AddEmployeeEvaluation(data: AddEmployeeEvaluationDTO): Observable<BaseResponse<string>> {
    return this.http.post<BaseResponse<string>>(`${this.url}/api/EmployeeEvaluation/AddEmployeeEvaluation?culture=ar-LY`, data);
  }

  GetEmployeeEvaluation(employeeId: string | number, Year: number): Observable<BaseResponse<any[]>> {
    return this.http.get<BaseResponse<any[]>>(
      `${this.url}/api/EmployeeEvaluation/GetEmployeeEvaluations?EmployeeId=${employeeId}&Year=${Year}&culture=ar-LY`
    );
  }
}
