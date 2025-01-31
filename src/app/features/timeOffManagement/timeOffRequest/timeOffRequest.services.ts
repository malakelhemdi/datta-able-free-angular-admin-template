import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfig } from '../../../../config/app-config';
import { Observable } from 'rxjs';
import { BaseResponse, BaseResponsePagination } from '../../../shared/shared.interfaces';
import { addUserCommand, GetTimeOffRequestCommand, updateUserCommand } from './timeOffRequest.interface';

@Injectable()
export class TimeOffRequestServices {
  url: string | undefined;

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) {
    this.url = this.appConfig.defaultUrl;
  }

  AddTimeOffRequest(request: any): Observable<BaseResponse<string>> {
    return this.http.post<BaseResponse<string>>(`${this.url}/api/TimeOffRequest/AddTimeOffRequest?culture=ar-LY`, request);
  }
  UpdateUser(user: updateUserCommand): Observable<BaseResponse<string>> {
    return this.http.put<BaseResponse<string>>(`${this.url}/api/UserMangament/UpdateUser?culture=ar-LY`, user);
  }
  DeleteUser(Id: string): Observable<BaseResponse<boolean>> {
    return this.http.delete<BaseResponse<boolean>>(`${this.url}/api/UserMangament/DeleteUser?Id=${Id}&culture=ar-LY`);
  }
  GetUsers(): Observable<BaseResponse<GetTimeOffRequestCommand[]>> {
    return this.http.get<BaseResponse<GetTimeOffRequestCommand[]>>(`${this.url}/api/UserMangament/GetUsers?culture=ar-LY`);
  }
  GetMyTimeOffRequests(Page: number, PageSize: number, IsApproved: any): Observable<BaseResponsePagination<GetTimeOffRequestCommand[]>> {
    return this.http.get<BaseResponsePagination<GetTimeOffRequestCommand[]>>(`${this.url}/api/TimeOffRequest/GetMyTimeOffRequests`, {
      params: {
        IsApproved,
        Page,
        PageSize,
        culture: 'ar-LY'
      }
    });
  }
  DeleteTimeOffRequest(Ids): Observable<BaseResponse<string>> {
    return this.http.put<BaseResponse<string>>(`${this.url}/api/TimeOffRequest/DeleteTimeOffRequest?Ids=${Ids}&culture=ar-LY`, null);
  }
}
