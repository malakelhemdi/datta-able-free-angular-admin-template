import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { SharedFacade } from '../../../shared/shared.facade';
import { tap } from 'rxjs/operators';
import { MessageType, PaginatedData, ResponseType } from '../../../shared/shared.interfaces';
import { produce } from 'immer';
import { PenaltiesServices } from './Penalties.services';
import { AddPenaltiesCommand, GetPenaltiesCommand, UpdatePenaltiesCommand } from './Penalties.interface';
import basePaginatedInitialValue from 'src/app/shared/data/basePaginatedInitialValue';

@Injectable()
export class PenaltiesFacade {
  public PenaltiesSubject$ = new BehaviorSubject<PaginatedData<GetPenaltiesCommand[]>>(basePaginatedInitialValue);

  constructor(
    private sharedFacade: SharedFacade,
    private penaltiesServices: PenaltiesServices
  ) {}
  deletePenalties(id: string): void {
    const deletePenaltiesProcess$ = this.penaltiesServices.DeletePenalties(id).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          // this.sharedFacade.showMessage(MessageType.success, 'تم حذف بنجاح', res.messages);
          this.sharedFacade.showMessage(MessageType.success, ' حذف مكافأة', ['تم حذف بنجاح']);
          const prev = this.PenaltiesSubject$.getValue();
          const result = prev.items.filter((x: any) => x.id != id);
          this.PenaltiesSubject$.next({ ...prev, items: result });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الحذف', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(deletePenaltiesProcess$).pipe().subscribe();
  }
  GetPenalties(Page: number, PageSize: number): any {
    const getPenaltiesProcess$ = this.penaltiesServices.GetPenalties(Page, PageSize, 1).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.PenaltiesSubject$.next(res.content);
        } else {
          this.PenaltiesSubject$.next(basePaginatedInitialValue);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب الجزاءات', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getPenaltiesProcess$).pipe().subscribe();
  }
  AddPenalties(Penalties: any): void {
    const addPenaltiesProcess$ = this.penaltiesServices.AddPenalties(Penalties).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تمت الإضافة بنجاح', res.messages);
          const prev = this.PenaltiesSubject$.getValue();
          this.PenaltiesSubject$.next({
            ...prev,
            items: produce(prev.items, (draft: AddPenaltiesCommand[]) => {
              Penalties.id = res.content;
              draft.unshift(Penalties);
            })
          });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الإضافة', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(addPenaltiesProcess$).pipe().subscribe();
  }
  UpdatePenalties(Penalties: any): void {
    const updatePenaltiesProcess$ = this.penaltiesServices.UpdatePenalties(Penalties).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تم تعديل بنجاح', res.messages);
          const prev = this.PenaltiesSubject$.getValue();
          this.PenaltiesSubject$.next({
            ...prev,
            items: produce(prev.items, (draft: UpdatePenaltiesCommand[]) => {
              const index = draft.findIndex((x) => x.id === Penalties.id);
              draft[index] = Penalties;
            })
          });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية تعديل', res.messages);
        }
      }),

      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(updatePenaltiesProcess$).pipe().subscribe();
  }

  activate(id: string,IsActive: boolean): void {
    const Process$ = this.penaltiesServices.Activate(id, IsActive).pipe(
      tap(res => {
        if (res.type == ResponseType.Success) {
          // this.sharedFacade.showMessage(MessageType.success, 'تم حذف بنجاح', res.messages);
          this.sharedFacade.showMessage(MessageType.success, ' تغيير حالة الجزاء', ['تم تغيير حالة بنجاح']);
          const prev = this.PenaltiesSubject$.getValue();
          this.PenaltiesSubject$.next(
            produce(prev, (draft: GetPenaltiesCommand[]) => {
              const index = draft.findIndex(x => x.id === id);
              draft[index].isActive = IsActive;
            }));
          this.PenaltiesSubject$.subscribe();
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية بنجاح', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(Process$).pipe().subscribe();
  }
}
