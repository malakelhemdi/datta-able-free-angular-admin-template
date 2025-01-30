import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../../config/app-config';
import { AddPenaltiesCommand, GetPenaltiesCommand, UpdatePenaltiesCommand } from '../Penalties/Penalties.interface';
import { Observable } from 'rxjs';
import { BaseResponse, BaseResponsePagination } from '../../../shared/shared.interfaces';
import { AddNationalityCommand, GetNationalityCommand, UpdateNationalityCommand } from './nationalities.interface';
import { Injectable } from '@angular/core';
@Injectable()
export class NationalitiesServices {
  url: string | undefined;
  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) {
    this.url = this.appConfig.defaultUrl;
  }
  AddNationality(nationality: AddNationalityCommand): Observable<BaseResponse<string>> {
    return this.http.post<BaseResponse<string>>(`${this.url}/api/Nationalities/AddNationality?culture=ar-LY`, nationality);
  }
  UpdateNationality(nationality: UpdateNationalityCommand): Observable<BaseResponse<string>> {
    return this.http.put<BaseResponse<string>>(`${this.url}/api/Nationalities/UpdateNationality?culture=ar-LY`, nationality);
  }
  DeleteNationality(Id: string): Observable<BaseResponse<boolean>> {
    return this.http.delete<BaseResponse<boolean>>(`${this.url}/api/Nationalities/DeleteNationality?Id=${Id}&culture=ar-LY`);
  }
  GetNationality(Page: number, PageSize: number, IsActive = 1): Observable<BaseResponsePagination<GetNationalityCommand[]>> {
    return this.http.get<BaseResponsePagination<GetNationalityCommand[]>>(
      `${this.url}/api/Nationalities/GetNationalities?IsActive=${IsActive}&culture=ar-LY&Page=${Page}&PageSize=${PageSize}`
    );
  }
  Activate(id: string, IsActive: boolean): Observable<BaseResponse<boolean>> {
    return this.http.put<BaseResponse<boolean>>(
      `${this.url}/api/Nationalities/ActiveDeActiveNationalities?Id=${id}&IsActive=${IsActive}&culture=ar-LY`,
      null
    );
  }
}
