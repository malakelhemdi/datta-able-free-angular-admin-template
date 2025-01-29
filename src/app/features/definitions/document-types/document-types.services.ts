import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../../config/app-config';
import { Observable } from 'rxjs';
import { BaseResponse, BaseResponsePagination } from '../../../shared/shared.interfaces';
import { AddDocumentTypeCommand, GetDocumentTypeCommand } from './document-types.interface';
import { Injectable } from '@angular/core';
@Injectable()
export class DocumentTypesServices {
  url: string | undefined;

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) {
    this.url = this.appConfig.defaultUrl;
  }
  AddDocumentTypes(documentType: AddDocumentTypeCommand): Observable<BaseResponse<string>> {
    return this.http.post<BaseResponse<string>>(`${this.url}/api/DocumentsTypes/AddDocumentType?culture=ar-LY`, documentType);
  }
  UpdateDocumentTypes(documentType: AddDocumentTypeCommand): Observable<BaseResponse<string>> {
    return this.http.put<BaseResponse<string>>(`${this.url}/api/DocumentsTypes/UpdateDocumentType?culture=ar-LY`, documentType);
  }
  DeleteDocumentTypes(Id: string): Observable<BaseResponse<boolean>> {
    return this.http.delete<BaseResponse<boolean>>(`${this.url}/api/DocumentsTypes/DeleteDocumentType?Id=${Id}&culture=ar-LY`);
  }
  GetDocumentTypes(Page: number, PageSize: number, IsActive: 1): Observable<BaseResponsePagination<GetDocumentTypeCommand[]>> {
    return this.http.get<BaseResponsePagination<GetDocumentTypeCommand[]>>(
      `${this.url}/api/DocumentsTypes/GetDocumentsTypes?IsActive=${IsActive}&culture=ar-LY&Page=${Page}&PageSize=${PageSize}`
    );
  }
}
