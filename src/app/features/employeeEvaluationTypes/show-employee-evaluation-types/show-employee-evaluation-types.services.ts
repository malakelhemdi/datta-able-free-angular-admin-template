import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../../config/app-config';
import { Injectable } from '@angular/core';
// import { AddEvaluationTypeCommand } from './show-employee-evaluation-types.interface';
import { Observable } from 'rxjs';
import { BaseResponse, BaseResponsePagination } from 'src/app/shared/shared.interfaces';
import { GetEmployeeEvaluationTypeCommand } from './show-employee-evaluation-types.interface';

@Injectable({ providedIn: 'root' })
export class ShowEmployeeEvaluationTypeServices {
  url: string | undefined;

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) {
    this.url = this.appConfig.defaultUrl;
  }

  getEmployeeEvaluationType(Page: number, PageSize: number): Observable<BaseResponsePagination<GetEmployeeEvaluationTypeCommand[]>> {
    return this.http.get<BaseResponsePagination<GetEmployeeEvaluationTypeCommand[]>>(
      `${this.url}/api/EvaluationsTypes/GetEvaluationsTypes?culture=ar-LY?Page=${Page}&PageSize=${PageSize}`
    );
  }

  deleteEmployeeEvaluationType(id: string): Observable<BaseResponse<boolean>> {
    return this.http.delete<BaseResponse<boolean>>(`${this.url}/api/EvaluationsTypes/DeleteEvaluationType?culture=ar-LY&Id=${id}`);
  }
}
