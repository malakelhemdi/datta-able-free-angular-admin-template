import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { SharedFacade } from '../../../shared/shared.facade';
import { tap } from 'rxjs/operators';
import { MessageType, PaginatedData, ResponseType } from '../../../shared/shared.interfaces';
import { AddBankCommand, GetBanksCommand, UpdateBankCommand } from './banks.interface';
import { BanksServices } from './banks.services';
import basePaginatedInitialValue from 'src/app/shared/data/basePaginatedInitialValue';

@Injectable()
export class BanksFacade {
  public BanksSubject$ = new BehaviorSubject<PaginatedData<GetBanksCommand[]>>(basePaginatedInitialValue);

  constructor(
    private sharedFacade: SharedFacade,
    private banksServices: BanksServices
  ) {}

  deleteBank(id: string) {
    const deleteBankProcess$ = this.banksServices.DeleteBank(id).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, ' تم حذف بنجاح', res.messages);
          // const prev = this.BanksSubject$.getValue();
          // const result = prev.items.filter((x: any) => x.id != id);
          // this.BanksSubject$.next({ ...prev, items: result });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الحذف', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(deleteBankProcess$).pipe().subscribe();
    return deleteBankProcess$;
  }

  GetBanks(page: number, pageSize: number, IsActive: number, Name = "") {
    const getBanksProcess$ = this.banksServices.GetBanks(page, pageSize, IsActive, Name).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.BanksSubject$.next(res.content);
        } else {
          this.BanksSubject$.next(basePaginatedInitialValue);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب مصارف', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getBanksProcess$).pipe().subscribe();
    return getBanksProcess$;
  }

  AddBank(Bank: any) {
    const addBankProcess$ = this.banksServices.AddBank(Bank).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تمت الإضافة بنجاح', res.messages);
          // const prev = this.BanksSubject$.getValue();
          // this.BanksSubject$.next({
          //   ...prev,
          //   items: produce(prev.items, (draft: GetBanksCommand[]) => {
          //     Bank.id = res.content;
          //     draft.unshift(Bank);
          //   })
          // });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الإضافة', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(addBankProcess$).pipe().subscribe();
    return addBankProcess$;
  }

  UpdateBank(Bank: any) {
    const updateBankProcess$ = this.banksServices.UpdateBank(Bank).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تم تعديل بنجاح', res.messages);
          // const prev = this.BanksSubject$.getValue();
          // this.BanksSubject$.next({
          //   ...prev,
          //   items: produce(prev.items, (draft: GetBanksCommand[]) => {
          //     const index = draft.findIndex((x) => x.id === Bank.id);
          //     draft[index] = Bank;
          //   })
          // });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية تعديل', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(updateBankProcess$).pipe().subscribe();
    return updateBankProcess$;
  }

  activate(id: string, IsActive: boolean) {
    const activateProcess$ = this.banksServices.Activate(id, IsActive).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, ' تغيير حالة المصرف', ['تم تغيير حالة بنجاح']);
          // const prev = this.BanksSubject$.getValue();
          // this.BanksSubject$.next({
          //   ...prev,
          //   items: produce(prev.items, (draft: GetBanksCommand[]) => {
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
    this.sharedFacade.showLoaderUntilCompleted(activateProcess$).pipe().subscribe();
    return activateProcess$;
  }
}
