import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { SharedFacade } from '../../../shared/shared.facade';
import { tap } from 'rxjs/operators';
import { MessageType, PaginatedData, ResponseType } from '../../../shared/shared.interfaces';
import { SequenceManagementServices } from './sequence-management.services';
import {
  SequenceVm
} from './sequence-management.interface';
import basePaginatedInitialValue from 'src/app/shared/data/basePaginatedInitialValue';

@Injectable()
export class SequenceManagementFacade {
  public getJobSequenceSubject$ = new BehaviorSubject<PaginatedData<SequenceVm[]>>(basePaginatedInitialValue);
  public getJobSequenceNextSubject$ = new BehaviorSubject<string>('');


  constructor(
    private sharedFacade: SharedFacade,
    private sequenceManagementServices: SequenceManagementServices
  ) {
  }

  getJobSequence(page: number, pageSize: number) {
    const getUnitsByDirectManagerProcess$ = this.sequenceManagementServices.GetJobSequence(page, pageSize).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.getJobSequenceSubject$.next(res.content);
        } else {
          if (res.messages[0] == 'لا يوجدة وحدات تنظيمة تتبع هذه الوحدة') {
            this.sharedFacade.showMessage(MessageType.warning, '', res.messages);
          } else {
            this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب البيانات', res.messages);
          }
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getUnitsByDirectManagerProcess$).pipe().subscribe();
    return getUnitsByDirectManagerProcess$;
  }

  getJobSequenceNext(id: string) {
    const getUnitsByDirectManagerProcess$ = this.sequenceManagementServices.GetSequenceNext(id).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success ) {
          this.getJobSequenceNextSubject$.next(res.content);
        } else {
          if (res.messages[0] == "لا يوجد تسلسل للوحدة التنظيمية لاختياره كرقم وظيفة") {
            this.sharedFacade.showMessage(MessageType.warning, '', res.messages);
          } else {
            this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب البيانات', res.messages);
          }
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getUnitsByDirectManagerProcess$).pipe().subscribe();
    return getUnitsByDirectManagerProcess$;
  }

  addJobSequence(addJobSequence: any) {
    const addOrganizationalUnitProcess$ = this.sequenceManagementServices.AddJobSequence(addJobSequence).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تمت الإضافة بنجاح', res.messages);
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الإضافة', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(addOrganizationalUnitProcess$).pipe().subscribe();
    return addOrganizationalUnitProcess$;
  }

}
