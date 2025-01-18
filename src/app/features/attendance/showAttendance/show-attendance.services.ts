import { AppConfig } from '../../../../config/app-config';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseResponse } from '../../../shared/shared.interfaces';
import { GetTimeOffRequestCommand } from '../../timeOffManagement/timeOffRequest/timeOffRequest.interface';
import { GetAttendancesCommand, GetEmployeesDetailsCommand } from './show-attendance.interface';

@Injectable()
export class ShowAttendanceServices {
  url: string | undefined;

  constructor(
    private appConfig: AppConfig,
    private http: HttpClient
  ) {
    this.url = this.appConfig.defaultUrl;
  }
  UploadAttendances(request: File): Observable<BaseResponse<boolean>> {
    const formData = new FormData();
    formData.append('AttendanceFile', request);

    return this.http.post<BaseResponse<boolean>>(`${this.url}/api/AttendanceManagement/UploadAttendances?culture=ar-LY`,formData);
  }
  GetEmployeesDetails(request): Observable<BaseResponse<GetEmployeesDetailsCommand[]>> {
    let params = new HttpParams();
    if (request.organizationStructureId != '' && request.organizationStructureId != null) {
      params = params.set('OrganizationStructureId', request.organizationStructureId);
    }
    params = params.set('culture', 'ar-LY');

    return this.http.get<BaseResponse<GetEmployeesDetailsCommand[]>>(`${this.url}/api/AttendanceManagement/GetEmployeesDetails`,  { params: params });
  }
  GetAttendances(request): Observable<BaseResponse<GetAttendancesCommand[]>> {
    let params = new HttpParams();
    if (request.EmployeeCode != '' && request.EmployeeCode != null) {
      params = params.set('EmployeeCode', request.EmployeeCode);
    } if (request.year != '' && request.year != null) {
      params = params.set('Year', request.year);
    } if (request.month != '' && request.month != null) {
      params = params.set('Month', request.month);
    }
    params = params.set('culture', 'ar-LY');
    return this.http.get<BaseResponse<GetAttendancesCommand[]>>(`${this.url}/api/AttendanceManagement/GetAttendances`,  { params: params });
  }
}
