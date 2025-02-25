import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../../config/app-config';
import { Observable } from 'rxjs';
import { BaseResponse, BaseResponsePagination, PaginatedData } from '../../../shared/shared.interfaces';
import { GetEmployeeBonusesCommand } from './employee-bonuses.interface';
import { GetBonusesTypeCommand } from '../../definitions/bonuses-types/bonuses-types.interface';

@Injectable()
export class EmployeeBonusesServices {
  url: string | undefined;

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) {
    this.url = this.appConfig.defaultUrl;
  }

  AddEmployeeBonuses(EmployeeBonuses: any): Observable<BaseResponse<string>> {
    return this.http.post<BaseResponse<string>>(`${this.url}/api/Employee/AddBonusEmployee?culture=ar-LY`, EmployeeBonuses);
  }
  CancelEmployeeBonuses(bounse): Observable<BaseResponse<string>> {
    return this.http.delete<BaseResponse<string>>(`${this.url}/api/Employee/CancelBonusEmployee?culture=ar-LY`, { body: bounse });
  }
  // DeleteEmployeeBonuses(bounse): Observable<BaseResponse<boolean>> {
  //     return this.http.delete<BaseResponse<boolean>>(`${this.url}/api/Employee/CancelBonusEmployee?culture=ar-LY`,bounse);
  // }
  GetEmployeeBonuses(
    Page: number,
    PageSize: number,
    SearchType: '',
    Value: ''
  ): Observable<BaseResponsePagination<GetEmployeeBonusesCommand>> {
    return this.http.get<BaseResponsePagination<GetEmployeeBonusesCommand>>(`${this.url}/api/Employee/GetBonusEmployee?culture=ar-LY`, {
      params: {
        Page,
        PageSize,
        SearchType,
        Value
      }
    });
  }
  GetBonusesTypes(IsActive: 1,page: number, pageSize: number): Observable<BaseResponsePagination<GetBonusesTypeCommand[]>> {
    return this.http.get<BaseResponsePagination<GetBonusesTypeCommand[]>>(
      `${this.url}/api/BonusTypes/GetBonusTypes?IsActive=${IsActive}&culture=ar-LY&Page=${page}&PageSize=${pageSize}`
    );
  }
}
