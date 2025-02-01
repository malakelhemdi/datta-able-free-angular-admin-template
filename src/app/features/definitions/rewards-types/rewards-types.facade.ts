import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { SharedFacade } from '../../../shared/shared.facade';
import { tap } from 'rxjs/operators';
import { MessageType, PaginatedData, ResponseType } from '../../../shared/shared.interfaces';
import { produce } from 'immer';
import { RewardsTypesServices } from './rewards-types.services';
import { GetRewardsCommand } from './rewards-types.interface';
import basePaginatedInitialValue from 'src/app/shared/data/basePaginatedInitialValue';
import { ScientificQualificationsCommand } from '../scientific-qualifications/scientific-qualifications.interface';

@Injectable()
export class RewardsTypesFacade {
  private RewardsSubject$ = new BehaviorSubject<PaginatedData<GetRewardsCommand[]>>(basePaginatedInitialValue);
  public Rewards$ = this.RewardsSubject$.asObservable();

  constructor(
    private sharedFacade: SharedFacade,
    private rewardsTypesServices: RewardsTypesServices
  ) {}

  deleteReward(id: string): void {
    const deleteRewardProcess$ = this.rewardsTypesServices.DeleteReward(id).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, ' حذف مكافأة', ['تم حذف بنجاح']);
          const prev = this.RewardsSubject$.getValue();
          this.RewardsSubject$.next({
            ...prev,
            items: prev.items.filter((x: any) => x.id != id)
          });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الحذف', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(deleteRewardProcess$).pipe().subscribe();
  }

  GetRewards(page: number, pageSize: number): any {
    const getRewardsProcess$ = this.rewardsTypesServices.GetRewards(page, pageSize, 0).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.RewardsSubject$.next(res.content);
        } else {
          this.RewardsSubject$.next(basePaginatedInitialValue);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب مكافآت', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getRewardsProcess$).pipe().subscribe();
  }

  AddReward(Rewards: any): void {
    const addRewardProcess$ = this.rewardsTypesServices.AddReward(Rewards).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تمت الإضافة بنجاح', res.messages);
          const prev = this.RewardsSubject$.getValue();
          this.RewardsSubject$.next({
            ...prev,
            items: produce(prev.items, (draft: GetRewardsCommand[]) => {
              Rewards.id = res.content;
              draft.unshift(Rewards);
            })
          });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الإضافة', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(addRewardProcess$).pipe().subscribe();
  }

  UpdateReward(Rewards: any): void {
    const updateRewardProcess$ = this.rewardsTypesServices.UpdateReward(Rewards).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تم تعديل بنجاح', res.messages);
          const prev = this.RewardsSubject$.getValue();
          this.RewardsSubject$.next({
            ...prev,
            items: produce(prev.items, (draft: GetRewardsCommand[]) => {
              const index = draft.findIndex((x) => x.id === Rewards.id);
              draft[index] = Rewards;
            })
          });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية تعديل', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(updateRewardProcess$).pipe().subscribe();
  }
  activate(id: string,IsActive: boolean): void {
    const Process$ = this.rewardsTypesServices.Activate(id, IsActive).pipe(
      tap(res => {
        if (res.type == ResponseType.Success) {
          // this.sharedFacade.showMessage(MessageType.success, 'تم حذف بنجاح', res.messages);
          this.sharedFacade.showMessage(MessageType.success, ' تغيير حالة مكافأة', ['تم تغيير حالة بنجاح']);
          const prev = this.RewardsSubject$.getValue();
          this.RewardsSubject$.next({
            ...prev,
            items: produce(prev.items, (draft: GetRewardsCommand[]) => {
              const index = draft.findIndex((x) => x.id === id);
              draft[index].isActive = IsActive;
            })
          });
          this.RewardsSubject$.subscribe();
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية بنجاح', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(Process$).pipe().subscribe();
  }
}
