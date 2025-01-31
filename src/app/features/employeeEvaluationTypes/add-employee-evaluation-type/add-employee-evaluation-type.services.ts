import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../../config/app-config';
import { Injectable } from '@angular/core';
import { AddEvaluationTypeCommand, UpdateEvaluationTypeCommand } from './add-employee-evaluation-type.interface';
import { Observable } from 'rxjs';
import { BaseResponse, BaseResponsePagination } from 'src/app/shared/shared.interfaces';
import { GetEmployeeEvaluationTypeCommand } from '../show-employee-evaluation-types/show-employee-evaluation-types.interface';

@Injectable()
export class AddEmployeeEvaluationTypeServices {
  url: string | undefined;

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) {
    this.url = this.appConfig.defaultUrl;
  }

  AddEmployeeEvaluationType(data: AddEvaluationTypeCommand): Observable<BaseResponse<string>> {
    return this.http.post<BaseResponse<string>>(`${this.url}/api/EvaluationsTypes/AddEvaluationType?culture=ar-LY`, data);
  }

  updateEmployeeEvaluationType(data: UpdateEvaluationTypeCommand): Observable<BaseResponse<string>> {
    return this.http.put<BaseResponse<string>>(`${this.url}/api/EvaluationsTypes/UpdateEvaluationType?culture=ar-LY`, data);
  }

  getEmployeeEvaluationType(
    Page: number,
    PageSize: number,
    id: string
  ): Observable<BaseResponsePagination<GetEmployeeEvaluationTypeCommand[]>> {
    return this.http.get<BaseResponsePagination<GetEmployeeEvaluationTypeCommand[]>>(
      `${this.url}/api/EvaluationsTypes/GetEvaluationsTypes?culture=ar-LY&Id=${id}&Page=${Page}&PageSize=${PageSize}`
    );
  }
}
