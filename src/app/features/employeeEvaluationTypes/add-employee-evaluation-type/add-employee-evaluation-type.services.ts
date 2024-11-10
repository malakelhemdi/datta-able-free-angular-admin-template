import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../../config/app-config';
import { Injectable } from '@angular/core';
import { AddEvaluationTypeCommand, UpdateEvaluationTypeCommand } from './add-employee-evaluation-type.interface';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/shared/shared.interfaces';
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

  getEmployeeEvaluationType(id: string): Observable<BaseResponse<GetEmployeeEvaluationTypeCommand[]>> {
    return this.http.get<BaseResponse<GetEmployeeEvaluationTypeCommand[]>>(
      `${this.url}/api/EvaluationsTypes/GetEvaluationsTypes?culture=ar-LY&Id=${id}`
    );
  }
}
