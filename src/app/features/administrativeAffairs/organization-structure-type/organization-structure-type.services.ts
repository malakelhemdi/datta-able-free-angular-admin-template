import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../../config/app-config';
import { AddBankCommand, GetBanksCommand, UpdateBankCommand } from '../../definitions/bank/banks.interface';
import { Observable } from 'rxjs';
import { BaseResponse, BaseResponsePagination } from '../../../shared/shared.interfaces';
import { OrganizationStructureTypes } from './organization-structure-type.interface';

@Injectable()
export class OrganizationStructureTypeServices {
  url: string | undefined;

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) {
    this.url = this.appConfig.defaultUrl;
  }

  AddOrganizationStructureTypes(Bank: AddBankCommand): Observable<BaseResponse<string>> {
    return this.http.post<BaseResponse<string>>(`${this.url}/api/AdministrativeAffairs/AddOrganizationStructureType?culture=ar-LY`, Bank);
  }
  UpdateOrganizationStructureTypes(Bank: UpdateBankCommand): Observable<BaseResponse<string>> {
    return this.http.put<BaseResponse<string>>(`${this.url}/api/AdministrativeAffairs/UpdateOrganizationStructureType?culture=ar-LY`, Bank);
  }
  DeleteBank(Id: string): Observable<BaseResponse<boolean>> {
    return this.http.delete<BaseResponse<boolean>>(`${this.url}/api/AdministrativeAffairs/DeleteOrganizationStructureType?Id=${Id}&culture=ar-LY`);
  }
  GetOrganizationStructureTypes(Page: number, PageSize: number): Observable<BaseResponsePagination<OrganizationStructureTypes[]>> {
    return this.http.get<BaseResponsePagination<OrganizationStructureTypes[]>>(
      `${this.url}/api/AdministrativeAffairs/GetAllOrganizationStructureTypes?Page=${Page}&PageSize=${PageSize}&culture=ar-LY&`
    );
  }
  // Activate(id: string, IsActive: boolean): Observable<BaseResponse<boolean>> {
  //   return this.http.put<BaseResponse<boolean>>(`${this.url}/api/Banks/ActiveDeActiveBank?Id=${id}&IsActive=${IsActive}&culture=ar-LY`,null);
  // }
}
