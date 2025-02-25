import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/config/app-config';

@Injectable()
export class EmployeeEvaluationDepartmentManagerConfirmationServices {
  url: string;
  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) {
    this.url = this.appConfig.defaultUrl;
  }
}
