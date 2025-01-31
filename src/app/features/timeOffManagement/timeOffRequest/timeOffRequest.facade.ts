import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { SharedFacade } from '../../../shared/shared.facade';
import { tap } from 'rxjs/operators';
import { MessageType, PaginatedData, ResponseType } from '../../../shared/shared.interfaces';
import { produce } from 'immer';
import { TimeOffRequestServices } from './timeOffRequest.services';
import { GetTimeOffRequestCommand, updateUserCommand } from './timeOffRequest.interface';
import basePaginatedInitialValue from 'src/app/shared/data/basePaginatedInitialValue';

@Injectable()
export class TimeOffRequestFacade {
  public TimeOffRequestSubject = new BehaviorSubject<PaginatedData<GetTimeOffRequestCommand[]>>(basePaginatedInitialValue);

  private TimeOffAddRequestSubject = new BehaviorSubject<number>(0);
  public TimeOffAddRequest$ = this.TimeOffAddRequestSubject.asObservable();
  constructor(
    private sharedFacade: SharedFacade,
    private timeOffRequestServices: TimeOffRequestServices
  ) {}
  // deleteUser(id: string): void {
  //   const deleteUserProcess$ = this.timeOffRequestServices.DeleteUser(id).pipe(
  //     tap((res) => {
  //       if (res.type == ResponseType.Success) {
  //         // this.sharedFacade.showMessage(MessageType.success, 'تم حذف بنجاح', res.messages);
  //         this.sharedFacade.showMessage(MessageType.success, ' حذف مستخدم', ['تم حذف بنجاح']);
  //         const prev = this.TimeOffRequestSubject.getValue();
  //         const result = prev.filter((x: any) => x.id != id);
  //         this.TimeOffRequestSubject.next(result);
  //         this.TimeOffRequestSubject.subscribe();
  //       } else {
  //         this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الحذف', res.messages);
  //       }
  //     }),
  //     shareReplay()
  //   );
  //   this.sharedFacade.showLoaderUntilCompleted(deleteUserProcess$).pipe().subscribe();
  // }
  // GetUser(): any {
  //   const getUserProcess$ = this.timeOffRequestServices.GetUsers().pipe(
  //     tap((res) => {
  //       if (res.type == ResponseType.Success) {
  //         this.TimeOffRequestSubject.next(res.content);
  //       } else {
  //         this.TimeOffRequestSubject.next([]);
  //         this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب البيانات', res.messages);
  //       }
  //     }),
  //     shareReplay()
  //   );
  //   this.sharedFacade.showLoaderUntilCompleted(getUserProcess$).pipe().subscribe();
  // }
  AddTimeOffRequest(User: any): void {
    const addUserProcess$ = this.timeOffRequestServices.AddTimeOffRequest(User).pipe(
      tap((res) => {
        this.TimeOffAddRequestSubject.next(res.type);
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تم طلب الإجازة بنجاح', res.messages);
          // const prev = this.TimeOffRequestSubject.getValue();
          // this.TimeOffRequestSubject.next(
          //     produce(prev, (draft: GetUsersCommand[]) => {
          //         User.id = res.content;
          //         User.password = '';
          //         User.confirmpassword = '';
          //         draft.unshift(User);
          //     }));
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية طلب', res.messages);
        }
      }),

      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(addUserProcess$).pipe().subscribe();
  }
  // UpdateUser(User: any): void {
  //   const updateUserProcess$ = this.timeOffRequestServices.UpdateUser(User).pipe(
  //     tap((res) => {
  //       if (res.type == ResponseType.Success) {
  //         this.sharedFacade.showMessage(MessageType.success, 'تم تعديل بنجاح', res.messages);
  //         // const prev = this.TimeOffRequestSubject.getValue();
  //         // this.TimeOffRequestSubject.next(
  //         //     produce(prev, (draft: GetUsersCommand[]) => {
  //         //         const index = draft.findIndex(x => x.id === User.id);
  //         //         User.password = '';
  //         //         User.confirmpassword = '';
  //         //         draft[index] = User;
  //         //     }));
  //         this.TimeOffRequestSubject.subscribe();
  //       } else {
  //         this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية تعديل', res.messages);
  //       }
  //     }),

  //     shareReplay()
  //   );
  //   this.sharedFacade.showLoaderUntilCompleted(updateUserProcess$).pipe().subscribe();
  // }
  GetMyTimeOffRequests(Page: number, PageSize: number, IsApproved: number): any {
    const getUserProcess$ = this.timeOffRequestServices.GetMyTimeOffRequests(Page, PageSize, IsApproved).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.TimeOffRequestSubject.next(res.content);
        } else {
          this.TimeOffRequestSubject.next(basePaginatedInitialValue);
          this.sharedFacade.showMessage(MessageType.warning, ' عملية جلب البيانات', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getUserProcess$).pipe().subscribe();
  }
  DeleteTimeOffRequest(id): void {
    const deleteUserProcess$ = this.timeOffRequestServices.DeleteTimeOffRequest(id).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          // this.sharedFacade.showMessage(MessageType.success, 'تم حذف بنجاح', res.messages);
          this.sharedFacade.showMessage(MessageType.success, ' إلغاء الإجازة', ['تم إلغاء بنجاح']);
          const prev = this.TimeOffRequestSubject.getValue();
          const result = prev.items.filter((x: any) => x.id != id);
          this.TimeOffRequestSubject.next({ ...prev, items: result });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم يتم إلغاء الإجازة', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(deleteUserProcess$).pipe().subscribe();
  }
}
