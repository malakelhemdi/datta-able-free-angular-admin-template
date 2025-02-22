import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../../config/app-config';
import { Observable } from 'rxjs';
import { BaseResponse, BaseResponsePagination } from '../../../shared/shared.interfaces';
import { Injectable } from '@angular/core';
import { AddBankCommand, GetBanksCommand, UpdateBankCommand } from './banks.interface';
@Injectable()
export class BanksServices {
  url: string | undefined;

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) {
    this.url = this.appConfig.defaultUrl;
  }

  AddBank(Bank: AddBankCommand): Observable<BaseResponse<string>> {
    return this.http.post<BaseResponse<string>>(`${this.url}/api/Banks/AddBank?culture=ar-LY`, Bank);
  }
  UpdateBank(Bank: UpdateBankCommand): Observable<BaseResponse<string>> {
    return this.http.put<BaseResponse<string>>(`${this.url}/api/Banks/UpdateBank?culture=ar-LY`, Bank);
  }
  DeleteBank(Id: string): Observable<BaseResponse<boolean>> {
    return this.http.delete<BaseResponse<boolean>>(`${this.url}/api/Banks/DeleteBank?Id=${Id}&culture=ar-LY`);
  }
  GetBanks(Page: number, PageSize: number, IsActive, Name: string): Observable<BaseResponsePagination<GetBanksCommand[]>> {
    return this.http.get<BaseResponsePagination<GetBanksCommand[]>>(
      `${this.url}/api/Banks/GetAllBank?Page=${Page}&PageSize=${PageSize}&IsActive=${IsActive}&culture=ar-LY&Name=${Name}`
    );
  }
  Activate(id: string, IsActive: boolean): Observable<BaseResponse<boolean>> {
    return this.http.put<BaseResponse<boolean>>(`${this.url}/api/Banks/ActiveDeActiveBank?Id=${id}&IsActive=${IsActive}&culture=ar-LY`,null);
  }
}
