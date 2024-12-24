import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/config/app-config';
import {
  DefineManagersForTheOrganizationalUnitDTO,
  ManagersForTheOrganizationalUnitCommand
} from './employee-evaluation-roles-manage.interface';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/shared/shared.interfaces';

@Injectable()
export class EmployeeEvaluationRolesManageServices {
  url: string;
  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) {
    this.url = this.appConfig.defaultUrl;
  }
  UpdateOrganizationalUnit(data: DefineManagersForTheOrganizationalUnitDTO): Observable<BaseResponse<boolean>> {
    return this.http.put<BaseResponse<boolean>>(`${this.url}/api/Position/DefineManagersForTheOrganizationalUnit?culture=ar-LY`, data);
  }

  GetManagersForOrganizationalUnit(OrganizationalUnitId: string): Observable<BaseResponse<ManagersForTheOrganizationalUnitCommand[]>> {
    return this.http.get<BaseResponse<ManagersForTheOrganizationalUnitCommand[]>>(
      `${this.url}/api/Position/GetManagersForOrganizationalUnitQuery?culture=ar-LY`,
      {
        params: {
          OrganizationalUnitId
        }
      }
    );
  }
}
