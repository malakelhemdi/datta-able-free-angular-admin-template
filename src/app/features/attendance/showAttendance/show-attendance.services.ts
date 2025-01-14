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
    console.log(request);
    if (request.OrganizationStructureId != '' && request.OrganizationStructureId != null) {
      params = params.set('OrganizationStructureId', request.OrganizationStructureId);
    }
    params = params.set('culture', 'ar-LY');

    return this.http.get<BaseResponse<GetEmployeesDetailsCommand[]>>(`${this.url}/api/AttendanceManagement/GetEmployeesDetails?culture=ar-LY`,  { params: params });
  }
  GetAttendances(request): Observable<BaseResponse<GetAttendancesCommand[]>> {
    let params = new HttpParams();
    console.log(request);
    if (request.EmployeeCode != '' && request.EmployeeCode != null) {
      params = params.set('EmployeeCode', request.EmployeeCode);
    } if (request.Year != '' && request.Year != null) {
      params = params.set('Year', request.Year);
    } if (request.Month != '' && request.Month != null) {
      params = params.set('Month', request.Month);
    }
    params = params.set('culture', 'ar-LY');

    return this.http.get<BaseResponse<GetAttendancesCommand[]>>(`${this.url}/api/AttendanceManagement/GetAttendances?culture=ar-LY`,  { params: params });
  }
}
