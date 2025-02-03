import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfig } from '../../../../config/app-config';
import { Observable } from 'rxjs';
import { BaseResponse, BaseResponsePagination } from '../../../shared/shared.interfaces';
import { AddVacationsTypeCommand, GetVacationsTypeCommand } from './vacations-types.interface';
import { GetJobTitleCommand } from '../../administrativeAffairs/job-title/job-title.interface';
import { GetTimeOffRequestCommand } from '../../timeOffManagement/timeOffRequest/timeOffRequest.interface';

@Injectable()
export class VacationsTypesServices {
  url: string | undefined;

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) {
    this.url = this.appConfig.defaultUrl;
  }

  AddVacationsTypes(vacationsType: AddVacationsTypeCommand): Observable<BaseResponse<string>> {
    return this.http.post<BaseResponse<string>>(`${this.url}/api/VacationType/AddVacationType?culture=ar-LY`, vacationsType);
  }
  UpdateVacationsTypes(vacationsType: AddVacationsTypeCommand): Observable<BaseResponse<string>> {
    return this.http.put<BaseResponse<string>>(`${this.url}/api/VacationType/UpdateVacationType?culture=ar-LY`, vacationsType);
  }
  DeleteVacationsTypes(Id: string): Observable<BaseResponse<boolean>> {
    return this.http.delete<BaseResponse<boolean>>(`${this.url}/api/VacationType/DeleteVacationType?Id=${Id}&culture=ar-LY`);
  }
  GetVacationsTypes(Page: number, PageSize: number, IsActive): Observable<BaseResponsePagination<GetVacationsTypeCommand[]>> {
    return this.http.get<BaseResponsePagination<GetVacationsTypeCommand[]>>(
      `${this.url}/api/VacationType/GetVacationsTypes?IsActive=${IsActive}&culture=ar-LY&Page=${Page}&PageSize=${PageSize}`
    );
  }
  GetAvailableVacationTypes(EmployeeId): Observable<BaseResponse<GetVacationsTypeCommand[]>> {
    let params = new HttpParams();
    if (EmployeeId != '' && EmployeeId != null) {
      params = params.set('EmployeeId', EmployeeId);
    }

    params = params.set('culture', 'ar-LY');
    return this.http.get<BaseResponse<GetVacationsTypeCommand[]>>(`${this.url}/api/TimeOffRequest/GetAvailableVacationTypes`, { params: params });


  }
  Activate(id: string, IsActive: boolean): Observable<BaseResponse<boolean>> {
    return this.http.put<BaseResponse<boolean>>(`${this.url}/api/VacationType/ActiveDeActiveVactionType?Id=${id}&IsActive=${IsActive}&culture=ar-LY`,null);
  }
}
