import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../../config/app-config';
import { Observable } from 'rxjs';
import { BaseResponse, BaseResponsePagination } from '../../../shared/shared.interfaces';
import {
  AddSequenceCommand,
  SequenceVm
} from './sequence-management.interface';

@Injectable()
export class SequenceManagementServices {
  url: string | undefined;

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) {
    this.url = this.appConfig.defaultUrl;
  }

  AddJobSequence(addSequenceCommand: AddSequenceCommand): Observable<BaseResponse<any>> {
    return this.http.post<BaseResponse<any>>(
      `${this.url}/api/Position/AddJobSequence?culture=ar-LY`,
      addSequenceCommand
    );
  }

  GetJobSequence(
    Page: number,
    PageSize: number
  ): Observable<BaseResponsePagination<SequenceVm[]>> {
    return this.http.get<BaseResponsePagination<SequenceVm[]>>(
      `${this.url}/api/Position/GetJobSequence?Page=${Page}&PageSize=${PageSize}`
    );
  }

  GetSequenceNext(id: string): Observable<BaseResponse<string>> {
    return this.http.get<BaseResponse<string>>(
      `${this.url}/api/Position/GetSequenceNext?OrganizationStructureId=${id}`
    );
  }

}
