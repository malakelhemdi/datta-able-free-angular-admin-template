import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfig } from '../../../../config/app-config';
import { Observable } from 'rxjs';
import { BaseResponse } from '../../../shared/shared.interfaces';
import { Injectable } from '@angular/core';

@Injectable()
export class FunctionalProceduresServices {
  url: string | undefined;

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) {
    this.url = this.appConfig.defaultUrl;
  }

  RehireToRetiredEmployee(request: any): Observable<BaseResponse<string>> {
    let params = new HttpParams();
    if (request.employeeId != '' && request.employeeId != null) {
      params = params.set('EmployeeId', request.employeeId);
    }
    if (request.Notes != '' && request.Notes != null) {
      params = params.set('Notes', request.Notes);
    }
    if (request.HireDate != '' && request.HireDate != null) {
      params = params.set('HireDate', request.HireDate);
    }
    if (request.effDate != '' && request.effDate != null) {
      params = params.set('EffDate', request.effDate);
    }
    params = params.set('culture', 'ar-LY');
    return this.http.put<BaseResponse<string>>(`${this.url}/api/FunctionalProcedures/RehireToRetiredEmployee`, {}, { params: params });
  }
  ChangeDateOfHire(request: any): Observable<BaseResponse<string>> {
    let params = new HttpParams();
    if (request.employeeId != '' && request.employeeId != null) {
      params = params.set('EmployeeId', request.employeeId);
    }

    if (request.effDate != '' && request.effDate != null) {
      params = params.set('EffDate', request.effDate);
    }
    if (request.HireDate != '' && request.HireDate != null) {
      params = params.set('HireDate', request.HireDate);
    }
    if (request.Notes != '' && request.Notes != null) {
      params = params.set('Notes', request.Notes);
    }
    params = params.set('culture', 'ar-LY');
    return this.http.put<BaseResponse<string>>(`${this.url}/api/FunctionalProcedures/ChangeDateOfHire`, {}, { params: params });
  }
  SalaryAdjustment(request: any): Observable<BaseResponse<string>> {
    let params = new HttpParams();
    if (request.employeeId != '' && request.employeeId != null) {
      params = params.set('EmployeeId', request.employeeId);
    }

    if (request.effDate != '' && request.effDate != null) {
      params = params.set('EffDate', request.effDate);
    }
    if (request.basicSalary != '' && request.basicSalary != null) {
      params = params.set('BasicSalary', request.basicSalary);
    }
    if (request.Notes != '' && request.Notes != null) {
      params = params.set('Notes', request.Notes);
    }
    params = params.set('culture', 'ar-LY');
    return this.http.put<BaseResponse<string>>(`${this.url}/api/FunctionalProcedures/SalaryAdjustment`, {}, { params: params });
  }
  ReHire(request: any): Observable<BaseResponse<string>> {
    let params = new HttpParams();
    if (request.employeeId != '' && request.employeeId != null) {
      params = params.set('EmployeeId', request.employeeId);
    }

    if (request.effDate != '' && request.effDate != null) {
      params = params.set('EffDate', request.effDate);
    }

    if (request.Notes != '' && request.Notes != null) {
      params = params.set('Notes', request.Notes);
    }
    params = params.set('culture', 'ar-LY');
    return this.http.put<BaseResponse<string>>(`${this.url}/api/FunctionalProcedures/ReHire`, {}, { params: params });
  }

  terminationOfService(request: any): Observable<BaseResponse<string>> {
    let params = new HttpParams();
    if (request.employeeId != '' && request.employeeId != null) {
      params = params.set('EmployeeId', request.employeeId);
    }
    if (request.procedureCode != '' && request.procedureCode != null) {
      params = params.set('procedureCode', request.procedureCode);
    }
    if (request.effDate != '' && request.effDate != null) {
      params = params.set('EffDate', request.effDate);
    }
    params = params.set('culture', 'ar-LY');
    return this.http.put<BaseResponse<string>>(`${this.url}/api/FunctionalProcedures/TerminationOfService`, {}, { params: params });
  }
  upgradeWithoutIncreaseService(request: any): Observable<BaseResponse<string>> {
    let params = new HttpParams();
    if (request.employeeId != '' && request.employeeId != null) {
      params = params.set('EmployeeId', request.employeeId);
    }
    if (request.jobTitleId != '' && request.jobTitleId != null) {
      params = params.set('JobTitleId', request.jobTitleId);
    }
    if (request.socialStatusSalaries != '' && request.socialStatusSalaries != null) {
      params = params.set('socialStatusSalaries', request.socialStatusSalaries);
    }
    if (request.overtime != '' && request.overtime != null) {
      params = params.set('Overtime', request.overtime);
    }
    if (request.effDate != '' && request.effDate != null) {
      params = params.set('effDate', request.effDate);
    }
    params = params.set('culture', 'ar-LY');
    return this.http.put<BaseResponse<string>>(`${this.url}/api/FunctionalProcedures/UpgradeWithoutIncrease`, {}, { params: params });
  }
  ReClassification(request: any): Observable<BaseResponse<string>> {
    let params = new HttpParams();
    if (request.employeeId != '' && request.employeeId != null) {
      params = params.set('EmployeeId', request.employeeId);
    }
    if (request.jobTitleId != '' && request.jobTitleId != null) {
      params = params.set('JobTitleId', request.jobTitleId);
    }
    if (request.basicSalary != '' && request.basicSalary != null) {
      params = params.set('basicSalary', request.basicSalary);
    }
    if (request.socialStatusSalaries != '' && request.socialStatusSalaries != null) {
      params = params.set('socialStatusSalaries', request.socialStatusSalaries);
    }
    if (request.overtime != '' && request.overtime != null) {
      params = params.set('Overtime', request.overtime);
    }
    if (request.effDate != '' && request.effDate != null) {
      params = params.set('EffDate', request.effDate);
    }
    params = params.set('culture', 'ar-LY');
    return this.http.put<BaseResponse<string>>(`${this.url}/api/FunctionalProcedures/ReClassification`, {}, { params: params });
  }
  Upgrade(request: any): Observable<BaseResponse<string>> {
    let params = new HttpParams();
    if (request.employeeId != '' && request.employeeId != null) {
      params = params.set('EmployeeId', request.employeeId);
    }
    if (request.jobTitleId != '' && request.jobTitleId != null) {
      params = params.set('JobTitleId', request.jobTitleId);
    }
    if (request.socialStatusSalaries != '' && request.socialStatusSalaries != null) {
      params = params.set('socialStatusSalaries', request.socialStatusSalaries);
    }
    if (request.overtime != '' && request.overtime != null) {
      params = params.set('Overtime', request.overtime);
    }
    if (request.effDate != '' && request.effDate != null) {
      params = params.set('effDate', request.effDate);
    }
    params = params.set('culture', 'ar-LY');
    return this.http.put<BaseResponse<string>>(`${this.url}/api/FunctionalProcedures/Upgrade`, {}, { params: params });
  }
  SecondmentToOtherPostion(request: any): Observable<BaseResponse<string>> {
    let params = new HttpParams();
    if (request.employeeId != '' && request.employeeId != null) {
      params = params.set('EmployeeId', request.employeeId);
    }
    if (request.SecondmentPositionId != '' && request.SecondmentPositionId != null) {
      params = params.set('SecondmentPositionId', request.SecondmentPositionId);
    }
    if (request.basicSalary != '' && request.basicSalary != null) {
      params = params.set('basicSalary', request.basicSalary);
    }
    if (request.socialStatusSalaries != '' && request.socialStatusSalaries != null) {
      params = params.set('socialStatusSalaries', request.socialStatusSalaries);
    }
    if (request.overtime != '' && request.overtime != null) {
      params = params.set('overtime', request.overtime);
    }
    if (request.effDate != '' && request.effDate != null) {
      params = params.set('effDate', request.effDate);
    }
    if (request.SecondmentDateStart != '' && request.SecondmentDateStart != null) {
      params = params.set('SecondmentDateStart', request.SecondmentDateStart);
    }
    if (request.SecondmentDateEnd != '' && request.SecondmentDateEnd != null) {
      params = params.set('SecondmentDateEnd', request.SecondmentDateEnd);
    }

    params = params.set('culture', 'ar-LY');
    return this.http.put<BaseResponse<string>>(`${this.url}/api/FunctionalProcedures/SecondmentToOtherPostion`, {}, { params: params });
  }

}
