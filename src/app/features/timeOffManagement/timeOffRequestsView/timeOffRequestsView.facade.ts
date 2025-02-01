import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { SharedFacade } from '../../../shared/shared.facade';
import { tap } from 'rxjs/operators';
import { MessageType, ResponseType } from '../../../shared/shared.interfaces';
import { produce } from 'immer';
import { TimeOffRequestsViewServices } from './timeOffRequestsView.services';
import { addUserCommand, GetUsersCommand, updateUserCommand } from './timeOffRequestsView.interface';
import { GetTimeOffRequestCommand } from '../timeOffRequest/timeOffRequest.interface';

@Injectable()
export class TimeOffRequestsViewFacade {
  public TimeOffRequestSubject = new BehaviorSubject<GetTimeOffRequestCommand[]>([]);
  public TimeOffRequest$ = this.TimeOffRequestSubject.asObservable();

  constructor(
    private sharedFacade: SharedFacade,
    private timeOffRequestsViewServices: TimeOffRequestsViewServices
  ) {}
  ApproveTimeOffRequest(id): void {
    const deleteUserProcess$ = this.timeOffRequestsViewServices.ApproveTimeOffRequest(id).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          // this.sharedFacade.showMessage(MessageType.success, 'تم حذف بنجاح', res.messages);
          this.sharedFacade.showMessage(MessageType.success, ' قبول الإجازة', ['تم قبول بنجاح']);
          const prev = this.TimeOffRequestSubject.getValue();
          const result = prev.filter((x: any) => x.id != id);
          this.TimeOffRequestSubject.next(result);
          this.TimeOffRequestSubject.subscribe();
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم يتم قبول الإجازة', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(deleteUserProcess$).pipe().subscribe();
  }
  UnapproveTimeOffRequest(id): void {
    const deleteUserProcess$ = this.timeOffRequestsViewServices.UnapproveTimeOffRequest(id).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          // this.sharedFacade.showMessage(MessageType.success, 'تم حذف بنجاح', res.messages);
          this.sharedFacade.showMessage(MessageType.success, ' إلغاء أعتماد الإجازة', ['تم إلغاء أعتماد بنجاح']);
          const prev = this.TimeOffRequestSubject.getValue();
          const result = prev.filter((x: any) => x.id != id);
          this.TimeOffRequestSubject.next(result);
          this.TimeOffRequestSubject.subscribe();
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم يتم إلغاء أعتماد الإجازة', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(deleteUserProcess$).pipe().subscribe();
  }
  RejectTimeOffRequest(id): void {
    const deleteUserProcess$ = this.timeOffRequestsViewServices.RejectTimeOffRequest(id).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          // this.sharedFacade.showMessage(MessageType.success, 'تم حذف بنجاح', res.messages);
          this.sharedFacade.showMessage(MessageType.success, ' رفض الإجازة', ['تم رفض بنجاح']);
          const prev = this.TimeOffRequestSubject.getValue();
          const result = prev.filter((x: any) => x.id != id);
          this.TimeOffRequestSubject.next(result);
          this.TimeOffRequestSubject.subscribe();
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم يتم رفض الإجازة', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(deleteUserProcess$).pipe().subscribe();
  }
  GetTimeOffRequestsByManager(request): any {
    const getUserProcess$ = this.timeOffRequestsViewServices.GetTimeOffRequestsByManager(request).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.TimeOffRequestSubject.next(res.content);
        } else {
          this.TimeOffRequestSubject.next([]);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب البيانات', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getUserProcess$).pipe().subscribe();
  }
  // AddUser(User: any): void {
  //     const addUserProcess$ = this.UserServices.AddUser(User).pipe(
  //         tap(res => {
  //             if (res.type == ResponseType.Success) {
  //                 this.sharedFacade.showMessage(MessageType.success, 'تمت الإضافة بنجاح',res.messages);
  //                 const prev = this.UserSubject$.getValue();
  //                 this.UserSubject$.next(
  //                     produce(prev, (draft: GetUsersCommand[]) => {
  //                         User.id = res.content;
  //                         User.password = '';
  //                         User.confirmpassword = '';
  //                         draft.unshift(User);
  //                     }));
  //             } else {
  //                 this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الإضافة', res.messages);
  //             }
  //         }),
  //
  //         shareReplay()
  //     );
  //     this.sharedFacade.showLoaderUntilCompleted(addUserProcess$).pipe().subscribe();
  // }
  // UpdateUser(User: any): void {
  //     const updateUserProcess$ = this.UserServices.UpdateUser(User).pipe(
  //         tap(res => {
  //             if (res.type == ResponseType.Success) {
  //                 this.sharedFacade.showMessage(MessageType.success, 'تم تعديل بنجاح', res.messages);
  //                 const prev = this.UserSubject$.getValue();
  //                 this.UserSubject$.next(
  //                     produce(prev, (draft: GetUsersCommand[]) => {
  //                         const index = draft.findIndex(x => x.id === User.id);
  //                         User.password = '';
  //                         User.confirmpassword = '';
  //                         draft[index] = User;
  //                     }));
  //                 this.UserSubject$.subscribe();
  //             } else {
  //                 this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية تعديل', res.messages);
  //             }
  //         }),
  //
  //         shareReplay()
  //     );
  //     this.sharedFacade.showLoaderUntilCompleted(updateUserProcess$).pipe().subscribe();
  // }
}
