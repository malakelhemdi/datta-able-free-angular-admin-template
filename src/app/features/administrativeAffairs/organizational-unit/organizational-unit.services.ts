import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfig } from '../../../../config/app-config';
import { Observable } from 'rxjs';
import { BaseResponse, BaseResponsePagination } from '../../../shared/shared.interfaces';
import {
  AddOrganizationalUnitCommand,
  AllOrganizationalUnitsCommand,
  UnitsCommand,
  UnitTypeCommand,
  UpdateOrganizationalUnitCommand
} from './organizational-unit.interface';
@Injectable()
export class OrganizationalUnitServices {
  url: string | undefined;

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) {
    this.url = this.appConfig.defaultUrl;
  }

  AddOrganizationalUnit(Bank: AddOrganizationalUnitCommand): Observable<BaseResponse<AllOrganizationalUnitsCommand>> {
    return this.http.post<BaseResponse<AllOrganizationalUnitsCommand>>(
      `${this.url}/api/AdministrativeAffairs/AddOrganizationalUnit?culture=ar-LY`,
      Bank
    );
  }
  UpdateOrganizationalUnit(Bank: UpdateOrganizationalUnitCommand): Observable<BaseResponse<AllOrganizationalUnitsCommand>> {
    return this.http.post<BaseResponse<AllOrganizationalUnitsCommand>>(
      `${this.url}/api/AdministrativeAffairs/UpdateOrganizationalUnit?culture=ar-LY`,
      Bank
    );
  }
  DeleteOrganizationalUnit(Id: string): Observable<BaseResponse<boolean>> {
    return this.http.delete<BaseResponse<boolean>>(`${this.url}/api/AdministrativeAffairs/DeleteOrganizationalUnit?Id=${Id}&culture=ar-LY`);
  }
  GetUnitsByDirectManager(directManager: string | null | undefined): Observable<BaseResponse<UnitsCommand[]>> {
    return this.http.get<BaseResponse<UnitsCommand[]>>(
      `${this.url}/api/AdministrativeAffairs/GetUnitsByDirectManager?DirectManager=${directManager}&culture=ar-LY`
    );
  }
  GetAllOrganizationalUnits(
    Page: number,
    PageSize: number,
    Name: string,
    IsActive: 1
  ): Observable<BaseResponsePagination<AllOrganizationalUnitsCommand[]>> {
    return this.http.get<BaseResponsePagination<AllOrganizationalUnitsCommand[]>>(
      `${this.url}/api/AdministrativeAffairs/GetAllOrganizationalUnits?IsActive=${IsActive}&culture=ar-LY&Name=${Name}&Page=${Page}&PageSize=${PageSize}`
    );
  }
  GetUnitType(Page: number, PageSize: number): Observable<BaseResponsePagination<UnitTypeCommand[]>> {
    return this.http.get<BaseResponsePagination<UnitTypeCommand[]>>(
      `${this.url}/api/AdministrativeAffairs/GetAllOrganizationStructureTypes?culture=ar-LY?Page=${Page}&PageSize=${PageSize}`
    );
  }

  FilterOrganizationalUnits(
    Page: number,
    PageSize: number,
    ParentId: string,
    Name: string,
    Number: string,
    CostCenter: string
  ): Observable<BaseResponsePagination<AllOrganizationalUnitsCommand[]>> {
    let params = new HttpParams().set('culture', 'ar-LY');

    if (Name != '' && Name != null) {
      params = params.set('Name', Name);
    }

    if (Number != '' && Number != null) {
      params = params.set('Number', Number);
    }

    if (ParentId != '' && ParentId != null) {
      params = params.set('ParentId', ParentId);
    }

    if (CostCenter != '' && CostCenter != null) {
      params = params.set('CostCenter', CostCenter);
    }

    params = params.set('Page', Page);
    params = params.set('PageSize', PageSize);

    return this.http.get<BaseResponsePagination<AllOrganizationalUnitsCommand[]>>(
      `${this.url}/api/AdministrativeAffairs/FilterOrganizationalUnits?culture=ar-LY`,
      { params }
    );
  }
  GetOrganizationalUnitIdNextQuery(parentId: string | null | undefined): Observable<BaseResponse<string>> {
    return this.http.get<BaseResponse<string>>(
      `${this.url}/api/AdministrativeAffairs/GetOrganizationalUnitIdNextQuery?ParentId=${parentId}&culture=ar-LY`
    );
  }
  GetAllUnitsBranchingFromSpecificUnit(
    Page: number,
    PageSize: number,
    organizationalUnitNumber: string | null | undefined,
    departmentOnly: boolean = false
  ): Observable<BaseResponsePagination<UnitsCommand[]>> {
    return this.http.get<BaseResponsePagination<UnitsCommand[]>>(
      `${this.url}/api/AdministrativeAffairs/FetchAllUnitsBranchingFromSpecificUnit?OrganizationalUnitNumber=${organizationalUnitNumber}&departmentOnly=${departmentOnly}&culture=ar-LY&Page=${Page}&PageSize=${PageSize}`
    );
  }
  GetOrganizationalUnitsByLevel(
    Page: number,
    PageSize: number,
    Level: number,
    IsActive: 1
  ): Observable<BaseResponsePagination<UnitsCommand[]>> {
    return this.http.get<BaseResponsePagination<UnitsCommand[]>>(
      `${this.url}/api/AdministrativeAffairs/OrganizationalUnitsByLevel?IsActive=${IsActive}&Level=${Level}&culture=ar-LY&Page=${Page}&PageSize=${PageSize}`
    );
  }
}
