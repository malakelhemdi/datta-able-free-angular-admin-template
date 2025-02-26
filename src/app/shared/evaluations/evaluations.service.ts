import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/config/app-config';
import { BaseResponse, BaseResponsePagination, PaginatedData } from '../shared.interfaces';
import { GetEmployeeEvaluationCommand } from './evaluations.interface';

@Injectable({
  providedIn: 'root'
})
export class EvaluationsGlobalServices {
  url: string | undefined;

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) {
    this.url = this.appConfig.defaultUrl;
  }

  GetEmployeeEvaluation(Page: number, PageSize: number, employeeId?: string | number, year?: number, EvaluationStatus?: number, evaluationTypeId?: string): Observable<BaseResponse<PaginatedData<GetEmployeeEvaluationCommand[]>>> {
    const params = {
      Page,
      PageSize
    };
    if (!!year) {
      params['Year'] = year;
    }
    if (employeeId) {
      params['EmployeeId'] = employeeId;
    }

    if (EvaluationStatus) {
      params['EvaluationStatus'] = EvaluationStatus;
    }

    if (evaluationTypeId) {
      params['EvaluationTypeId'] = evaluationTypeId;
    }

    return this.http.get<BaseResponse<PaginatedData<GetEmployeeEvaluationCommand[]>>>(`${this.url}/api/EmployeeEvaluation/GetEmployeeEvaluations?culture=ar-LY`, { params });
  }

  GetEmployeeEvaluationForManager(Page: number, PageSize: number, employeeId?: string | number, year?: number, EvaluationTypeId?: string | number): Observable<BaseResponse<PaginatedData<GetEmployeeEvaluationCommand[]>>> {
    const params = {
      Page,
      PageSize
    };
    if (year) {
      params['Year'] = year;
    }
    if (employeeId) {
      params['EmployeeId'] = employeeId;
    }
    if (employeeId) {
      params['EvaluationTypeId'] = EvaluationTypeId;
    }
    return this.http.get<BaseResponse<PaginatedData<GetEmployeeEvaluationCommand[]>>>(`${this.url}/api/EmployeeEvaluation/GetEmployeeEvaluationsForManager?culture=ar-LY`, { params });
  }
}