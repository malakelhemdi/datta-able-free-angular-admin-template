import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../../config/app-config';
import { Observable } from 'rxjs';
import { BaseResponse, BaseResponsePagination } from '../../../shared/shared.interfaces';
import { AddPenaltiesCommand, GetPenaltiesCommand, UpdatePenaltiesCommand } from './Penalties.interface';

@Injectable()
export class PenaltiesServices {
  url: string | undefined;

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) {
    this.url = this.appConfig.defaultUrl;
  }

  AddPenalties(Penalties: AddPenaltiesCommand): Observable<BaseResponse<string>> {
    return this.http.post<BaseResponse<string>>(`${this.url}/api/Penalty/AddPenalty?culture=ar-LY`, Penalties);
  }
  UpdatePenalties(Penalties: UpdatePenaltiesCommand): Observable<BaseResponse<string>> {
    return this.http.put<BaseResponse<string>>(`${this.url}/api/Penalty/UpdatePenalty?culture=ar-LY`, Penalties);
  }
  DeletePenalties(Id: string): Observable<BaseResponse<boolean>> {
    return this.http.delete<BaseResponse<boolean>>(`${this.url}/api/Penalty/DeletePenalty?Id=${Id}&culture=ar-LY`);
  }
  GetPenalties(Page: number, PageSize: number, IsActive: 1): Observable<BaseResponsePagination<GetPenaltiesCommand[]>> {
    return this.http.get<BaseResponsePagination<GetPenaltiesCommand[]>>(
      `${this.url}/api/Penalty/GetPenalties?IsActive=${IsActive}&culture=ar-LY&Page=${Page}&PageSize=${PageSize}`
    );
  }
}
<<<<<<< HEAD
=======
GetPenalties(IsActive: 1): Observable<BaseResponse<GetPenaltiesCommand[]>> {
    return this.http.get<BaseResponse<GetPenaltiesCommand[]>>(`${this.url}/api/Penalty/GetPenalties?IsActive=${IsActive}&culture=ar-LY`);
}
  Activate(id: string, IsActive: boolean): Observable<BaseResponse<boolean>> {
    return this.http.put<BaseResponse<boolean>>(`${this.url}/api/Penalty/ActiveDeActivePenalty?Id=${id}&IsActive=${IsActive}&culture=ar-LY`,null);
  }
}
>>>>>>> 63560ebf8332f0d0cba6a0c04b9970c287b0f03d
