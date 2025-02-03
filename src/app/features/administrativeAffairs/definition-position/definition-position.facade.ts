import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { SharedFacade } from '../../../shared/shared.facade';
import { tap } from 'rxjs/operators';
import { MessageType, PaginatedData, ResponseType } from '../../../shared/shared.interfaces';
import { produce } from 'immer';
import { DefinitionPositionServices } from './definition-position.services';
import { GetPositionCommand, GetLocationsCommand } from './definition-position.interface';
import basePaginatedInitialValue from 'src/app/shared/data/basePaginatedInitialValue';

@Injectable()
export class DefinitionPositionFacade {
  public PositionSubject$ = new BehaviorSubject<PaginatedData<GetPositionCommand[]>>(basePaginatedInitialValue);
  public locationsSubject$ = new BehaviorSubject<PaginatedData<GetLocationsCommand[]>>(basePaginatedInitialValue);

  constructor(
    private sharedFacade: SharedFacade,
    private definitionPositionService: DefinitionPositionServices
  ) {}
  deletePosition(id: string) {
    const deleteJobTitleProcess$ = this.definitionPositionService.DeletePosition(id).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          // this.sharedFacade.showMessage(MessageType.success, 'تم حذف بنجاح', res.messages);
          this.sharedFacade.showMessage(MessageType.success, ' حذف وصف الوظيفي', ['تم حذف بنجاح']);
          // const prev = this.PositionSubject$.getValue();
          // const result = prev.items.filter((x: any) => x.id != id);
          // this.PositionSubject$.next({
          //   ...prev,
          //   items: result
          // });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الحذف', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(deleteJobTitleProcess$).pipe().subscribe();
    return deleteJobTitleProcess$;
  }
  GetPosition(Page: number, PageSize: number, PositionCode: string, JobTitleId: string): any {
    const getJobTitleProcess$ = this.definitionPositionService.GetPosition(Page, PageSize, PositionCode, JobTitleId).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          if (res.content.items.length == 0) {
            this.PositionSubject$.next(basePaginatedInitialValue);
            this.sharedFacade.showMessage(MessageType.warning, 'لايوجد نتائج', res.messages);
          } else {
            this.PositionSubject$.next(res.content);
          }
        } else {
          this.PositionSubject$.next(basePaginatedInitialValue);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب البيانات', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getJobTitleProcess$).pipe().subscribe();
    return getJobTitleProcess$;
  }
  GetLocations(Page: number, PageSize: number): any {
    const getLocationsProcess$ = this.definitionPositionService.GetLocations(Page, PageSize).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.locationsSubject$.next(res.content);
        } else {
          this.locationsSubject$.next(basePaginatedInitialValue);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب البيانات', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getLocationsProcess$).pipe().subscribe();
    return getLocationsProcess$;
  }
  AddPosition(Position: any) {
    const addPositionProcess$ = this.definitionPositionService.AddPosition(Position).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تمت الإضافة بنجاح', res.messages);
          // const prev = this.PositionSubject$.getValue();
          // this.PositionSubject$.next({
          //   ...prev,
          //   items: produce(prev.items, (draft: GetPositionCommand[]) => {
          //     Position.id = res.content;
          //     draft.unshift(Position);
          //   })
          // });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الإضافة', res.messages);
        }
      }),

      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(addPositionProcess$).pipe().subscribe();
    return addPositionProcess$;
  }
  UpdatePosition(Position: any) {
    const updatePositionProcess$ = this.definitionPositionService.UpdatePosition(Position).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تم تعديل بنجاح', res.messages);
          // const prev = this.PositionSubject$.getValue();
          // this.PositionSubject$.next({
          //   ...prev,
          //   items: produce(prev.items, (draft: GetPositionCommand[]) => {
          //     const index = draft.findIndex((x) => x.id === Position.id);
          //     draft[index] = Position;
          //   })
          // });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية تعديل', res.messages);
        }
      }),

      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(updatePositionProcess$).pipe().subscribe();
    return updatePositionProcess$;
  }
}
