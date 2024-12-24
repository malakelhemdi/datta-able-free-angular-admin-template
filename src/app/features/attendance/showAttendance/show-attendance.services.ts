import { AppConfig } from '../../../../config/app-config';
import { Injectable } from '@angular/core';
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
}
