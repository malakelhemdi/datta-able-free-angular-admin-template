import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../../config/app-config';
import { Observable } from 'rxjs';
import { BaseResponse, BaseResponsePagination } from '../../../shared/shared.interfaces';
import { AddCourtsCommand, CourtsCommand } from './courts.interface';

@Injectable()
export class CourtsServices {
  url: string | undefined;

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) {
    this.url = this.appConfig.defaultUrl;
  }

  AddCourts(Courts: AddCourtsCommand): Observable<BaseResponse<string>> {
    return this.http.post<BaseResponse<string>>(`${this.url}/api/Courts/AddCourt?culture=ar-LY`, Courts);
  }
  UpdateCourts(Courts: CourtsCommand): Observable<BaseResponse<string>> {
    return this.http.put<BaseResponse<string>>(`${this.url}/api/Courts/UpdateCourt?culture=ar-LY`, Courts);
  }
  DeleteCourts(Id: string): Observable<BaseResponse<boolean>> {
    return this.http.delete<BaseResponse<boolean>>(`${this.url}/api/Courts/DeleteCourt?Id=${Id}&culture=ar-LY`);
  }
  GetCourts(Page: number, PageSize: number, IsActive = 1): Observable<BaseResponsePagination<CourtsCommand[]>> {
    return this.http.get<BaseResponsePagination<CourtsCommand[]>>(
      `${this.url}/api/Courts/GetCourts?IsActive=${IsActive}&culture=ar-LY&Page=${Page}&PageSize=${PageSize}`
    );
  }
}
<<<<<<< HEAD
=======
UpdateCourts(Courts: CourtsCommand): Observable<BaseResponse<string>> {
return this.http.put<BaseResponse<string>>(`${this.url}/api/Courts/UpdateCourt?culture=ar-LY`, Courts);
}
DeleteCourts(Id: string): Observable<BaseResponse<boolean>> {
return this.http.delete<BaseResponse<boolean>>(`${this.url}/api/Courts/DeleteCourt?Id=${Id}&culture=ar-LY`);
}
GetCourts(IsActive: 1): Observable<BaseResponse<CourtsCommand[]>> {
        return this.http.get<BaseResponse<CourtsCommand[]>>(`${this.url}/api/Courts/GetCourts?IsActive=${IsActive}&culture=ar-LY`);
    }
  Activate(id: string, IsActive: boolean): Observable<BaseResponse<boolean>> {
    return this.http.put<BaseResponse<boolean>>(`${this.url}/api/Courts/ActiveDeActiveCourts?Id=${id}&IsActive=${IsActive}&culture=ar-LY`,null);
  }
}
>>>>>>> 63560ebf8332f0d0cba6a0c04b9970c287b0f03d
