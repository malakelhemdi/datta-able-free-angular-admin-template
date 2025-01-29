import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { SharedFacade } from '../../../shared/shared.facade';
import { tap } from 'rxjs/operators';
import { MessageType, PaginatedData, ResponseType } from '../../../shared/shared.interfaces';
import { produce } from 'immer';
import { UsersServices } from './users.services';
import { GetUsersCommand } from './users.interface';
import basePaginatedInitialValue from 'src/app/shared/data/basePaginatedInitialValue';

@Injectable()
export class UsersFacade {
  private UserSubject$ = new BehaviorSubject<PaginatedData<GetUsersCommand[]>>(basePaginatedInitialValue);
  public Users$ = this.UserSubject$.asObservable();

  constructor(
    private sharedFacade: SharedFacade,
    private UserServices: UsersServices
  ) {}

  deleteUser(id: string): void {
    const deleteUserProcess$ = this.UserServices.DeleteUser(id).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, ' حذف مستخدم', ['تم حذف بنجاح']);
          const prev = this.UserSubject$.getValue();
          const result = prev.items.filter((x: any) => x.id != id);
          this.UserSubject$.next({ ...prev, items: result });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الحذف', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(deleteUserProcess$).pipe().subscribe();
  }

  GetUser(page: number, pageSize: number): any {
    const getUserProcess$ = this.UserServices.GetUsers(page, pageSize).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.UserSubject$.next(res.content);
        } else {
          this.UserSubject$.next(basePaginatedInitialValue);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب البيانات', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getUserProcess$).pipe().subscribe();
  }

  AddUser(User: any): void {
    const addUserProcess$ = this.UserServices.AddUser(User).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تمت الإضافة بنجاح', res.messages);
          const prev = this.UserSubject$.getValue();
          this.UserSubject$.next({
            ...prev,
            items: produce(prev.items, (draft: GetUsersCommand[]) => {
              User.id = res.content;
              User.password = '';
              User.confirmpassword = '';
              draft.unshift(User);
            })
          });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الإضافة', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(addUserProcess$).pipe().subscribe();
  }

  UpdateUser(User: any): void {
    const updateUserProcess$ = this.UserServices.UpdateUser(User).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تم تعديل بنجاح', res.messages);
          const prev = this.UserSubject$.getValue();
          this.UserSubject$.next({
            ...prev,
            items: produce(prev.items, (draft: GetUsersCommand[]) => {
              const index = draft.findIndex((x) => x.id === User.id);
              User.password = '';
              User.confirmpassword = '';
              draft[index] = User;
            })
          });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية تعديل', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(updateUserProcess$).pipe().subscribe();
  }
}
