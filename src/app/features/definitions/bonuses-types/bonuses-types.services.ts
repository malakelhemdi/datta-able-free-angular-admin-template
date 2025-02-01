import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../../config/app-config';
import { Observable } from 'rxjs';
import { BaseResponse, BaseResponsePagination } from '../../../shared/shared.interfaces';
import { AddBonusesTypeCommand, GetBonusesTypeCommand } from './bonuses-types.interface';
import { Injectable } from '@angular/core';
@Injectable()
export class BonusesTypesServices {
  url: string | undefined;

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) {
    this.url = this.appConfig.defaultUrl;
  }

  AddBonusesTypes(documentType: AddBonusesTypeCommand): Observable<BaseResponse<string>> {
    return this.http.post<BaseResponse<string>>(`${this.url}/api/BonusTypes/AddBonusType?culture=ar-LY`, documentType);
  }
  UpdateBonusesTypes(documentType: AddBonusesTypeCommand): Observable<BaseResponse<string>> {
    return this.http.put<BaseResponse<string>>(`${this.url}/api/BonusTypes/UpdateBonusType?culture=ar-LY`, documentType);
  }
  DeleteBonusesTypes(Id: string): Observable<BaseResponse<boolean>> {
    return this.http.delete<BaseResponse<boolean>>(`${this.url}/api/BonusTypes/DeleteBonusType?Id=${Id}&culture=ar-LY`);
  }
  GetBonusesTypes(Page: number, PageSize: number, IsActive): Observable<BaseResponsePagination<GetBonusesTypeCommand[]>> {
    return this.http.get<BaseResponsePagination<GetBonusesTypeCommand[]>>(
      `${this.url}/api/BonusTypes/GetBonusTypes?IsActive=${IsActive}&culture=ar-LY&Page=${Page}&PageSize=${PageSize}`
    );
  }
  ActivateBonusesTypes(id: string, IsActive: boolean): Observable<BaseResponse<boolean>> {
    return this.http.put<BaseResponse<boolean>>(
      `${this.url}/api/BonusTypes/ActiveDeActiveBonusType?Id=${id}&IsActive=${IsActive}&culture=ar-LY`,
      null
    );
  }
}
