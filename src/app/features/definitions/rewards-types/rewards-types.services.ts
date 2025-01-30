import { Observable } from 'rxjs';
import { BaseResponse, BaseResponsePagination } from '../../../shared/shared.interfaces';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../../../../config/app-config';
import { Injectable } from '@angular/core';
import { AddRewardsCommand, GetRewardsCommand, UpdateRewardsCommand } from './rewards-types.interface';
@Injectable()
export class RewardsTypesServices {
  url: string | undefined;

  constructor(
    private http: HttpClient,
    private appConfig: AppConfig
  ) {
    this.url = this.appConfig.defaultUrl;
  }

  AddReward(Rewards: AddRewardsCommand): Observable<BaseResponse<string>> {
    return this.http.post<BaseResponse<string>>(`${this.url}/api/Reward/AddReward?culture=ar-LY`, Rewards);
  }
  UpdateReward(Rewards: UpdateRewardsCommand): Observable<BaseResponse<string>> {
    return this.http.put<BaseResponse<string>>(`${this.url}/api/Reward/UpdateReward?culture=ar-LY`, Rewards);
  }
  DeleteReward(Id: string): Observable<BaseResponse<boolean>> {
    return this.http.delete<BaseResponse<boolean>>(`${this.url}/api/Reward/DeleteReward?Id=${Id}&culture=ar-LY`);
  }
  GetRewards(Page: number, PageSize: number, IsActive: 1): Observable<BaseResponsePagination<GetRewardsCommand[]>> {
    return this.http.get<BaseResponsePagination<GetRewardsCommand[]>>(
      `${this.url}/api/Reward/GetRewards?IsActive=${IsActive}&culture=ar-LY&page=${Page}&pageSize=${PageSize}`
    );
  }
  Activate(id: string, IsActive: boolean): Observable<BaseResponse<boolean>> {
    return this.http.put<BaseResponse<boolean>>(`${this.url}/api/Reward/ActiveDeActiveReward?Id=${id}&IsActive=${IsActive}&culture=ar-LY`,null);
  }
}
