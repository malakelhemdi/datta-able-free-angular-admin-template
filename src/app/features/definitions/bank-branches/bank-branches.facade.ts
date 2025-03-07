import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { SharedFacade } from '../../../shared/shared.facade';
import { tap } from 'rxjs/operators';
import { MessageType, PaginatedData, ResponseType } from '../../../shared/shared.interfaces';
import { produce } from 'immer';
import { BankBranchesServices } from './bank-branches.services';
import { GetBranchCommand } from './bank-branches.interface';
import basePaginatedInitialValue from 'src/app/shared/data/basePaginatedInitialValue';
import { GetBanksCommand } from '../bank/banks.interface';

@Injectable()
export class BankBranchesFacade {
  private BankBranchesSubject$ = new BehaviorSubject<PaginatedData<GetBranchCommand[]>>(basePaginatedInitialValue);
  public BankBranches$ = this.BankBranchesSubject$.asObservable();

  constructor(
    private sharedFacade: SharedFacade,
    private bankBranchesServices: BankBranchesServices
  ) {}

  deleteBranch(id: string) {
    const deleteBankProcess$ = this.bankBranchesServices.DeleteBranch(id).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, ' حذف فرع المصرف', ['تم حذف بنجاح']);
          // const prev = this.BankBranchesSubject$.getValue();
          // const result = prev.items.filter((x: any) => x.id != id);
          // this.BankBranchesSubject$.next({ ...prev, items: result });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الحذف', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(deleteBankProcess$).pipe().subscribe();
    return deleteBankProcess$;
  }

  GetBranch(page: number, pageSize: number, BankId: string | null | undefined, BankClasscificationId: string | null | undefined) {
    const getBankBranchesProcess$ = this.bankBranchesServices.GetBranch(page, pageSize, 0, BankId, BankClasscificationId).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.BankBranchesSubject$.next(res.content);
        } else {
          this.BankBranchesSubject$.next(basePaginatedInitialValue);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب فروع', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getBankBranchesProcess$).pipe().subscribe();
    return getBankBranchesProcess$;
  }

  AddBranch(Branch: any) {
    const addBankProcess$ = this.bankBranchesServices.AddBranch(Branch).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تمت الإضافة بنجاح', res.messages);
          // const prev = this.BankBranchesSubject$.getValue();
          // this.BankBranchesSubject$.next({
          //   ...prev,
          //   items: produce(prev.items, (draft: GetBranchCommand[]) => {
          //     Branch.id = res.content;
          //     draft.unshift(Branch);
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

  UpdateBranch(Branch: any) {
    const updateBankProcess$ = this.bankBranchesServices.UpdateBranch(Branch).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تم تعديل بنجاح', res.messages);
          // const prev = this.BankBranchesSubject$.getValue();
          // this.BankBranchesSubject$.next({
          //   ...prev,
          //   items: produce(prev.items, (draft: GetBranchCommand[]) => {
          //     const index = draft.findIndex((x) => x.id === Branch.id);
          //     draft[index] = Branch;
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
    const activateProcess$ = this.bankBranchesServices.Activate(id, IsActive).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, ' تغيير حالة الفرع', ['تم تغيير حالة بنجاح']);
          // const prev = this.BankBranchesSubject$.getValue();
          // this.BankBranchesSubject$.next({
          //   ...prev,
          //   items: produce(prev.items, (draft: GetBranchCommand[]) => {
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
