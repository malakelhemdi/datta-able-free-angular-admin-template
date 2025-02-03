import { BehaviorSubject, shareReplay } from 'rxjs';
import { SharedFacade } from '../../../shared/shared.facade';
import { tap } from 'rxjs/operators';
import { MessageType, PaginatedData, ResponseType } from '../../../shared/shared.interfaces';
import { produce } from 'immer';
import { NationalitiesServices } from './nationalities.services';
import { GetNationalityCommand } from './nationalities.interface';
import { Injectable } from '@angular/core';
import basePaginatedInitialValue from 'src/app/shared/data/basePaginatedInitialValue';
import { GetPenaltiesCommand } from '../Penalties/Penalties.interface';

@Injectable()
export class NationalitiesFacade {
  public NationalitySubject$ = new BehaviorSubject<PaginatedData<GetNationalityCommand[]>>(basePaginatedInitialValue);
  public Nationality$ = this.NationalitySubject$.asObservable();

  constructor(
    private sharedFacade: SharedFacade,
    private nationalitiesServices: NationalitiesServices
  ) {}

  deleteNationality(id: string) {
    const deleteNationalityProcess$ = this.nationalitiesServices.DeleteNationality(id).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, ' حذف الجنسية', ['تم حذف بنجاح']);
          // const prev = this.NationalitySubject$.getValue();
          // const result = prev.items.filter((x: any) => x.id != id);
          // this.NationalitySubject$.next({ ...prev, items: result });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الحذف', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(deleteNationalityProcess$).pipe().subscribe();
    return deleteNationalityProcess$;
  }

  GetNationality(page: number, pageSize: number, IsActive): any {
    const getNationalityProcess$ = this.nationalitiesServices.GetNationality(page, pageSize, IsActive).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.NationalitySubject$.next(res.content);
        } else {
          this.NationalitySubject$.next(basePaginatedInitialValue);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب الجنسيات', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getNationalityProcess$).pipe().subscribe();
    return getNationalityProcess$;
  }

  AddNationality(nationality: any) {
    const addNationalityProcess$ = this.nationalitiesServices.AddNationality(nationality).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تمت الإضافة بنجاح', res.messages);
          // const prev = this.NationalitySubject$.getValue();
          // this.NationalitySubject$.next({
          //   ...prev,
          //   items: produce(prev.items, (draft: GetNationalityCommand[]) => {
          //     nationality.id = res.content;
          //     draft.unshift(nationality);
          //   })
          // });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الإضافة', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(addNationalityProcess$).pipe().subscribe();
    return addNationalityProcess$;
  }

  UpdateNationality(nationality: any) {
    const updateNationalityProcess$ = this.nationalitiesServices.UpdateNationality(nationality).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تم تعديل بنجاح', res.messages);
          // const prev = this.NationalitySubject$.getValue();
          // this.NationalitySubject$.next({
          //   ...prev,
          //   items: produce(prev.items, (draft: GetNationalityCommand[]) => {
          //     const index = draft.findIndex((x) => x.id === nationality.id);
          //     draft[index] = nationality;
          //   })
          // });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية تعديل', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(updateNationalityProcess$).pipe().subscribe();
    return updateNationalityProcess$;
  }
  activate(id: string, IsActive: boolean) {
    const Process$ = this.nationalitiesServices.Activate(id, IsActive).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, ' تغيير حالة الجنسية', ['تم تغيير حالة بنجاح']);
          // const prev = this.NationalitySubject$.getValue();
          // this.NationalitySubject$.next({
          //   ...prev,
          //   items: produce(prev.items, (draft: GetNationalityCommand[]) => {
          //     const index = draft.findIndex((x) => x.id === id);
          //     draft[index].isActive = IsActive;
          //   })
          // });
          // this.NationalitySubject$.subscribe();
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
