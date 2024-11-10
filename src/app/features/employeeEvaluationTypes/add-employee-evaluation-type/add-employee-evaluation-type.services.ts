import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../../config/app-config';
import { Injectable } from '@angular/core';
import { AddEvaluationTypeCommand } from './add-employee-evaluation-type.interface';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/shared/shared.interfaces';

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
}
