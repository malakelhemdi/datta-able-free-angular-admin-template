import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { SharedFacade } from '../../../shared/shared.facade';
import { tap } from 'rxjs/operators';
import { MessageType, PaginatedData, ResponseType } from '../../../shared/shared.interfaces';
import { produce } from 'immer';
import { AddCourtsCommand, CourtsCommand } from './courts.interface';
import { CourtsServices } from './courts.services';
import basePaginatedInitialValue from 'src/app/shared/data/basePaginatedInitialValue';

@Injectable()
export class CourtsFacade {
  private CourtsSubject$ = new BehaviorSubject<PaginatedData<CourtsCommand[]>>(basePaginatedInitialValue);
  public Courts$ = this.CourtsSubject$.asObservable();

  constructor(
    private sharedFacade: SharedFacade,
    private courtsService: CourtsServices
  ) {}

  deleteCourts(id: string): void {
    const deleteCourtsProcess$ = this.courtsService.DeleteCourts(id).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'حذف المحكمة', ['تم حذف بنجاح']);
          const prev = this.CourtsSubject$.getValue();
          const result = prev.items.filter((x: any) => x.id != id);
          this.CourtsSubject$.next({ ...prev, items: result });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الحذف', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(deleteCourtsProcess$).pipe().subscribe();
  }

  GetCourts(page: number, pageSize: number): any {
    const getCourtsProcess$ = this.courtsService.GetCourts(page, pageSize).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.CourtsSubject$.next(res.content);
        } else {
          this.CourtsSubject$.next(basePaginatedInitialValue);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب المحاكم', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getCourtsProcess$).pipe().subscribe();
  }

  AddCourts(Courts: any): void {
    const addCourtsProcess$ = this.courtsService.AddCourts(Courts).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تمت الإضافة بنجاح', res.messages);
          const prev = this.CourtsSubject$.getValue();
          this.CourtsSubject$.next({
            ...prev,
            items: produce(prev.items, (draft: AddCourtsCommand[]) => {
              Courts.id = res.content;
              draft.unshift(Courts);
            })
          });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الإضافة', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(addCourtsProcess$).pipe().subscribe();
  }

  UpdateCourts(Courts: any): void {
    const updateCourtsProcess$ = this.courtsService.UpdateCourts(Courts).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تم تعديل بنجاح', res.messages);
          const prev = this.CourtsSubject$.getValue();
          this.CourtsSubject$.next({
            ...prev,
            items: produce(prev.items, (draft: CourtsCommand[]) => {
              const index = draft.findIndex((x) => x.id === Courts.id);
              draft[index] = Courts;
            })
          });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية تعديل', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(updateCourtsProcess$).pipe().subscribe();
  }

  activate(id: string, IsActive: boolean): void {
    const Process$ = this.courtsService.Activate(id, IsActive).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, ' تغيير حالة المحكمة', ['تم تغيير حالة بنجاح']);
          const prev = this.CourtsSubject$.getValue();
          this.CourtsSubject$.next(
            produce(prev, (draft: CourtsCommand[]) => {
              const index = draft.findIndex((x) => x.id === id);
              draft[index].isActive = IsActive;
            })
          );
          this.CourtsSubject$.subscribe();
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية بنجاح', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(Process$).pipe().subscribe();
  }
}
