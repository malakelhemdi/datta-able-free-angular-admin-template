import { AppConfig } from '../../../../config/app-config';
import { Injectable } from '@angular/core';
import { AddNewConnectedServiceData } from './connected-service.interface';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/shared/shared.interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConnectedServiceServices {
  url: string | undefined;
  constructor(private appConfig: AppConfig, private http: HttpClient) {
    this.url = this.appConfig.defaultUrl;

  }
  addConnectedService(connectedService: AddNewConnectedServiceData): Observable<BaseResponse<string>> {
    return this.http.post<BaseResponse<string>>(`${this.url}/api/Employee/AddConnectedService?culture=ar-LY`, connectedService);
  }
}
