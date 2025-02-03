import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { SharedFacade } from '../../../shared/shared.facade';
import { tap } from 'rxjs/operators';
import { MessageType, PaginatedData, ResponseType } from '../../../shared/shared.interfaces';
import { produce } from 'immer';
import { PenaltiesServices } from './Penalties.services';
import { AddPenaltiesCommand, GetPenaltiesCommand, UpdatePenaltiesCommand } from './Penalties.interface';
import basePaginatedInitialValue from 'src/app/shared/data/basePaginatedInitialValue';
import { GetVacationsTypeCommand } from '../vacations-types/vacations-types.interface';

@Injectable()
export class PenaltiesFacade {
  public PenaltiesSubject$ = new BehaviorSubject<PaginatedData<GetPenaltiesCommand[]>>(basePaginatedInitialValue);

  constructor(
    private sharedFacade: SharedFacade,
    private penaltiesServices: PenaltiesServices
  ) {}
  deletePenalties(id: string) {
    const deletePenaltiesProcess$ = this.penaltiesServices.DeletePenalties(id).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          // this.sharedFacade.showMessage(MessageType.success, 'تم حذف بنجاح', res.messages);
          this.sharedFacade.showMessage(MessageType.success, ' حذف مكافأة', ['تم حذف بنجاح']);
          // const prev = this.PenaltiesSubject$.getValue();
          // const result = prev.items.filter((x: any) => x.id != id);
          // this.PenaltiesSubject$.next({ ...prev, items: result });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الحذف', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(deletePenaltiesProcess$).pipe().subscribe();
    return deletePenaltiesProcess$;
  }
  GetPenalties(Page: number, PageSize: number): any {
    const getPenaltiesProcess$ = this.penaltiesServices.GetPenalties(Page, PageSize, 0).pipe(
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
    return getPenaltiesProcess$;
  }
  AddPenalties(Penalties: any) {
    const addPenaltiesProcess$ = this.penaltiesServices.AddPenalties(Penalties).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تمت الإضافة بنجاح', res.messages);
          // const prev = this.PenaltiesSubject$.getValue();
          // this.PenaltiesSubject$.next({
          //   ...prev,
          //   items: produce(prev.items, (draft: AddPenaltiesCommand[]) => {
          //     Penalties.id = res.content;
          //     draft.unshift(Penalties);
          //   })
          // });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الإضافة', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(addPenaltiesProcess$).pipe().subscribe();
    return addPenaltiesProcess$;
  }
  UpdatePenalties(Penalties: any) {
    const updatePenaltiesProcess$ = this.penaltiesServices.UpdatePenalties(Penalties).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تم تعديل بنجاح', res.messages);
          // const prev = this.PenaltiesSubject$.getValue();
          // this.PenaltiesSubject$.next({
          //   ...prev,
          //   items: produce(prev.items, (draft: UpdatePenaltiesCommand[]) => {
          //     const index = draft.findIndex((x) => x.id === Penalties.id);
          //     draft[index] = Penalties;
          //   })
          // });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية تعديل', res.messages);
        }
      }),

      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(updatePenaltiesProcess$).pipe().subscribe();
    return updatePenaltiesProcess$;
  }

  activate(id: string, IsActive: boolean) {
    const Process$ = this.penaltiesServices.Activate(id, IsActive).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          // this.sharedFacade.showMessage(MessageType.success, 'تم حذف بنجاح', res.messages);
          this.sharedFacade.showMessage(MessageType.success, ' تغيير حالة الجزاء', ['تم تغيير حالة بنجاح']);
          // const prev = this.PenaltiesSubject$.getValue();
          // this.PenaltiesSubject$.next({
          //   ...prev,
          //   items: produce(prev.items, (draft: GetPenaltiesCommand[]) => {
          //     const index = draft.findIndex((x) => x.id === id);
          //     draft[index].isActive = IsActive;
          //   })
          // });
          this.PenaltiesSubject$.subscribe();
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية بنجاح', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(Process$).pipe().subscribe();
    return Process$;
  }
}
