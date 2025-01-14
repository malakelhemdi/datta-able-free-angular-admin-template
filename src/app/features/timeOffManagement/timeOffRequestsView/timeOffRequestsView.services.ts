import {Injectable} from "@angular/core";
import { HttpClient, HttpParams } from '@angular/common/http';
import {AppConfig} from "../../../../config/app-config";
import {Observable} from "rxjs";
import {BaseResponse} from "../../../shared/shared.interfaces";
import {addUserCommand, GetUsersCommand, updateUserCommand} from "./timeOffRequestsView.interface";
import { GetTimeOffRequestCommand } from '../timeOffRequest/timeOffRequest.interface';

@Injectable()
export class TimeOffRequestsViewServices {
    url: string | undefined;

    constructor(
        private http: HttpClient,
        private appConfig: AppConfig) {
        this.url = this.appConfig.defaultUrl;

    }

    AddUser(user: addUserCommand): Observable<BaseResponse<string>> {
        return this.http.post<BaseResponse<string>>(`${this.url}/api/UserMangament/AddUser?culture=ar-LY`,user);
    }
    UpdateUser(user: updateUserCommand): Observable<BaseResponse<string>> {
        return this.http.put<BaseResponse<string>>(`${this.url}/api/UserMangament/UpdateUser?culture=ar-LY`,user);
    }
    DeleteUser(Id: string): Observable<BaseResponse<boolean>> {
        return this.http.delete<BaseResponse<boolean>>(`${this.url}/api/UserMangament/DeleteUser?Id=${Id}&culture=ar-LY`);
    }
  ApproveTimeOffRequest(Ids): Observable<BaseResponse<string>> {
        return this.http.put<BaseResponse<string>>(`${this.url}/api/TimeOffRequest/ApproveTimeOffRequest?Ids=${Ids}&culture=ar-LY`, null);
    }
  UnapproveTimeOffRequest(Ids): Observable<BaseResponse<string>> {
        return this.http.put<BaseResponse<string>>(`${this.url}/api/TimeOffRequest/UnapproveTimeOffRequest?Ids=${Ids}&culture=ar-LY`, null);
    }
  RejectTimeOffRequest(Ids): Observable<BaseResponse<string>> {
    return this.http.put<BaseResponse<string>>(`${this.url}/api/TimeOffRequest/RejectTimeOffRequest?Ids=${Ids}&culture=ar-LY`, null);
  }
  GetTimeOffRequestsByManager(request: any): Observable<BaseResponse<GetTimeOffRequestCommand[]>> {
    let params = new HttpParams();
      params = params.set('IsApproved', request.IsApproved);

    if (request.FromDate != '' && request.FromDate != null) {
      params = params.set('FromDate', request.FromDate);
    }
    if (request.ToDate != '' && request.ToDate != null) {
      params = params.set('ToDate', request.ToDate);
    }
    if (request.EmployeeId != '' && request.EmployeeId != null) {
      params = params.set('EmployeeId', request.EmployeeId);
    }
    params = params.set('culture', 'ar-LY');
    return this.http.get<BaseResponse<GetTimeOffRequestCommand[]>>(`${this.url}/api/TimeOffRequest/GetTimeOffRequestsByManager`,  { params: params });
  }

}
