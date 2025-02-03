import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { SharedFacade } from '../../../shared/shared.facade';
import { tap } from 'rxjs/operators';
import { MessageType, PaginatedData, ResponseType } from '../../../shared/shared.interfaces';
import { produce } from 'immer';
import { BonusesTypesServices } from './bonuses-types.services';
import { AddBonusesTypeCommand, GetBonusesTypeCommand } from './bonuses-types.interface';
import basePaginatedInitialValue from 'src/app/shared/data/basePaginatedInitialValue';
import { GetBanksCommand } from '../bank/banks.interface';
import { CourtsCommand } from '../courts/courts.interface';

@Injectable()
export class BonusesTypesFacade {
  private BonusesTypeSubject$ = new BehaviorSubject<PaginatedData<GetBonusesTypeCommand[]>>(basePaginatedInitialValue);
  public BonusesType$ = this.BonusesTypeSubject$.asObservable();

  constructor(
    private sharedFacade: SharedFacade,
    private bonusesTypesServices: BonusesTypesServices
  ) {}

  deleteBonusesType(id: string) {
    const deleteBonusesTypeProcess$ = this.bonusesTypesServices.DeleteBonusesTypes(id).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, ' حذف نوع علاوة', ['تم حذف بنجاح']);
          // const prev = this.BonusesTypeSubject$.getValue();
          // const result = prev.items.filter((x: any) => x.id != id);
          // this.BonusesTypeSubject$.next({ ...prev, items: result });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الحذف', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(deleteBonusesTypeProcess$).pipe().subscribe();
    return deleteBonusesTypeProcess$;
  }

  activateBonusesTypes(id: string, IsActive: boolean) {
    const activateBonusesTypeProcess$ = this.bonusesTypesServices.ActivateBonusesTypes(id, IsActive).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, ' تغيير حالة علاوة', ['تم تغيير حالة بنجاح']);
          // const prev = this.BonusesTypeSubject$.getValue();
          // this.BonusesTypeSubject$.next({
          //   ...prev,
          //   items: produce(prev.items, (draft: GetBonusesTypeCommand[]) => {
          //     const index = draft.findIndex((x) => x.id === id);
          //     draft[index].isActive = IsActive;
          //   })
          // });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية بنجاح', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(activateBonusesTypeProcess$).pipe().subscribe();
    return activateBonusesTypeProcess$;
  }

  GetBonusesType(page: number, pageSize: number) {
    const getBonusesTypeProcess$ = this.bonusesTypesServices.GetBonusesTypes(page, pageSize, 0).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.BonusesTypeSubject$.next(res.content);
        } else {
          this.BonusesTypeSubject$.next(basePaginatedInitialValue);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب العلاوات', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getBonusesTypeProcess$).pipe().subscribe();
    return getBonusesTypeProcess$;
  }

  AddBonusesType(bonusesType: any) {
    const addBonusesTypeProcess$ = this.bonusesTypesServices.AddBonusesTypes(bonusesType).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تمت الإضافة بنجاح', res.messages);
          // const prev = this.BonusesTypeSubject$.getValue();
          // this.BonusesTypeSubject$.next({
          //   ...prev,
          //   items: produce(prev.items, (draft: GetBonusesTypeCommand[]) => {
          //     bonusesType.id = res.content;
          //     bonusesType.isActive = true;
          //     draft.unshift(bonusesType);
          //   })
          // });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الإضافة', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(addBonusesTypeProcess$).pipe().subscribe();
    return addBonusesTypeProcess$;
  }

  UpdateBonusesType(bonusesType: any) {
    const updateBonusesTypeProcess$ = this.bonusesTypesServices.UpdateBonusesTypes(bonusesType).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تم تعديل بنجاح', res.messages);
          // const prev = this.BonusesTypeSubject$.getValue();
          // this.BonusesTypeSubject$.next({
          //   ...prev,
          //   items: produce(prev.items, (draft: GetBonusesTypeCommand[]) => {
          //     const index = draft.findIndex((x) => x.id === bonusesType.id);
          //     draft[index] = bonusesType;
          //   })
          // });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية تعديل', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(updateBonusesTypeProcess$).pipe().subscribe();
    return updateBonusesTypeProcess$;
  }
}
