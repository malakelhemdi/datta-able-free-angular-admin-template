import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfig } from '../../../../config/app-config';
import { Observable } from 'rxjs';
import { BaseResponse, BaseResponsePagination } from '../../../shared/shared.interfaces';
import {
  AddOrganizationalUnitCommand,
  UnitsCommand,
  UnitTypeCommand,
  UpdateOrganizationalUnitCommand
} from './typeOrganizationalUnit.interface';
@Injectable()
export class TypeOrganizationalUnitServices {
  url: string | undefined;

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) {
    this.url = this.appConfig.defaultUrl;
  }

  AddOrganizationalUnit(Bank: AddOrganizationalUnitCommand): Observable<BaseResponse<UnitTypeCommand>> {
    return this.http.post<BaseResponse<UnitTypeCommand>>(
      `${this.url}/api/AdministrativeAffairs/AddOrganizationStructureType?culture=ar-LY`,
      Bank
    );
  }
  UpdateOrganizationalUnit(Bank: UpdateOrganizationalUnitCommand): Observable<BaseResponse<UnitTypeCommand>> {
    return this.http.post<BaseResponse<UnitTypeCommand>>(
      `${this.url}/api/AdministrativeAffairs/UpdateOrganizationStructureType?culture=ar-LY`,
      Bank
    );
  }
  DeleteOrganizationalUnit(Id: string): Observable<BaseResponse<boolean>> {
    return this.http.delete<BaseResponse<boolean>>(`${this.url}/api/AdministrativeAffairs/DeleteOrganizationStructureType?Id=${Id}&culture=ar-LY`);
  }
  GetUnitType(Page: number, PageSize: number): Observable<BaseResponsePagination<UnitTypeCommand[]>> {
    return this.http.get<BaseResponsePagination<UnitTypeCommand[]>>(
      `${this.url}/api/AdministrativeAffairs/DeleteOrganizationStructureType?culture=ar-LY?Page=${Page}&PageSize=${PageSize}`
    );
  }

  // FilterOrganizationalUnits(
  //   Page: number,
  //   PageSize: number,
  //   ParentId: string,
  //   Name: string,
  //   Number: string,
  //   CostCenter: string
  // ): Observable<BaseResponsePagination<AllOrganizationalUnitsCommand[]>> {
  //   let params = new HttpParams().set('culture', 'ar-LY');
  //
  //   if (Name != '' && Name != null) {
  //     params = params.set('Name', Name);
  //   }
  //
  //   if (Number != '' && Number != null) {
  //     params = params.set('Number', Number);
  //   }
  //
  //   if (ParentId != '' && ParentId != null) {
  //     params = params.set('ParentId', ParentId);
  //   }
  //
  //   if (CostCenter != '' && CostCenter != null) {
  //     params = params.set('CostCenter', CostCenter);
  //   }
  //
  //   params = params.set('Page', Page);
  //   params = params.set('PageSize', PageSize);
  //
  //   return this.http.get<BaseResponsePagination<AllOrganizationalUnitsCommand[]>>(
  //     `${this.url}/api/AdministrativeAffairs/FilterOrganizationalUnits?culture=ar-LY`,
  //     { params }
  //   );
  // }
}
