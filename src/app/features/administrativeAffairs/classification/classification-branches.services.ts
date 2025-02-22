import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../../config/app-config';
import { Observable } from 'rxjs';
import { BaseResponse, BaseResponsePagination } from '../../../shared/shared.interfaces';
import { AddClassificationBranchCommand, ClassificationBranchCommand, JobClassificationCommand } from './classification-branches.interface';

@Injectable()
export class ClassificationBranchesService {
  url: string | undefined;

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) {
    this.url = this.appConfig.defaultUrl;
  }

  AddClassificationBranch(Bank: AddClassificationBranchCommand): Observable<BaseResponse<string>> {
    return this.http.post<BaseResponse<string>>(`${this.url}/api/JobTitle/AddJobClassification?culture=ar-LY`, Bank);
  }
  UpdateClassificationBranch(Bank: ClassificationBranchCommand): Observable<BaseResponse<string>> {
    return this.http.put<BaseResponse<string>>(`${this.url}/api/JobTitle/UpdateJobClassification?culture=ar-LY`, Bank);
  }
  DeleteClassificationBranch(Id: string): Observable<BaseResponse<boolean>> {
    return this.http.delete<BaseResponse<boolean>>(`${this.url}/api/JobTitle/DeleteJobClassification?Id=${Id}&culture=ar-LY`);
  }
  GetClassificationBranch(Page: number, PageSize: number, IsActive): Observable<BaseResponsePagination<ClassificationBranchCommand[]>> {
    return this.http.get<BaseResponsePagination<ClassificationBranchCommand[]>>(
      `${this.url}/api/AdministrativeAffairs/GetAllClassifications?IsActive=${IsActive}&culture=ar-LY&Page=${Page}&PageSize=${PageSize}` //NAME needed
    );
  }
  GetJobClassification(Page: number, PageSize: number): Observable<BaseResponsePagination<JobClassificationCommand[]>> {
    return this.http.get<BaseResponsePagination<JobClassificationCommand[]>>(
      `${this.url}/api/JobTitle/GetJobClassification?culture=ar-LY&Page=${Page}&PageSize=${PageSize}`
    );
  }
}
