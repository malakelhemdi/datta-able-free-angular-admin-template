import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/config/app-config';
import { BaseResponse, BaseResponsePagination, PaginatedData } from '../shared.interfaces';
import { GetEmployeeEvaluationTypeCommand } from './evaluations-types.interface';

@Injectable({
  providedIn: 'root'
})
export class EvaluationTypesGlobalServices {
  url: string | undefined;

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) {
    this.url = this.appConfig.defaultUrl;
  }

  getEmployeeEvaluationType(
    Page: number,
    PageSize: number,
    id?: string | number
  ): Observable<BaseResponsePagination<GetEmployeeEvaluationTypeCommand[]>> {
    const params = {
      Page,
      PageSize,
      
    };
    if(id) {
      params['Id'] = id;
    }
    return this.http.get<BaseResponsePagination<GetEmployeeEvaluationTypeCommand[]>>(
      `${this.url}/api/EvaluationsTypes/GetEvaluationsTypes?culture=ar-LY`, { params }
    );
  }
}