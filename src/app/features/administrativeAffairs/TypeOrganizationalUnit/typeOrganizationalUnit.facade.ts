import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { SharedFacade } from '../../../shared/shared.facade';
import { tap } from 'rxjs/operators';
import { MessageType, PaginatedData, ResponseType } from '../../../shared/shared.interfaces';
import { produce } from 'immer';
import { TypeOrganizationalUnitServices } from './typeOrganizationalUnit.services';
import {
  AddOrganizationalUnitCommand,
  UnitsCommand,
  UnitTypeCommand
} from './typeOrganizationalUnit.interface';
import basePaginatedInitialValue from 'src/app/shared/data/basePaginatedInitialValue';

@Injectable()
export class TypeOrganizationalUnitFacade {

  UnitTypeSubject$ = new BehaviorSubject<PaginatedData<UnitTypeCommand[]>>(basePaginatedInitialValue);

  constructor(
    private sharedFacade: SharedFacade,
    private organizationalUnitServices: TypeOrganizationalUnitServices
  ) {}

  deleteOrganizationalUnit(id: string) {
    const deleteOrganizationalUnitProcess$ = this.organizationalUnitServices.DeleteOrganizationalUnit(id).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, ' حذف ', ['تم حذف بنجاح']);
          // const prev = this.OrganizationalUnitSubject$.getValue();
          // const result = prev.items.filter((x: any) => x.id != id);
          // this.OrganizationalUnitSubject$.next({
          //   ...prev,
          //   items: result
          // });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الحذف', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(deleteOrganizationalUnitProcess$).pipe().subscribe();
    return deleteOrganizationalUnitProcess$;
  }

  GetUnitType(Page: number, PageSize: number) {
    const getUnitTypeProcess$ = this.organizationalUnitServices.GetUnitType(Page, PageSize).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.UnitTypeSubject$.next(res.content);
        } else {
          this.UnitTypeSubject$.next(basePaginatedInitialValue);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب البيانات', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getUnitTypeProcess$).pipe().subscribe();
    return getUnitTypeProcess$;
  }

  AddOrganizationalUnit(organizationalUnit: any) {
    const addOrganizationalUnitProcess$ = this.organizationalUnitServices.AddOrganizationalUnit(organizationalUnit).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تمت الإضافة بنجاح', res.messages);
          // const prev = this.OrganizationalUnitSubject$.getValue();
          // this.OrganizationalUnitSubject$.next(
          //   produce(prev, (draft: AddOrganizationalUnitCommand[]) => {
          //     organizationalUnit.id = res.content.id;
          //     organizationalUnit.number = res.content.number;
          //     draft.unshift(organizationalUnit);
          //   })
          // );
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الإضافة', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(addOrganizationalUnitProcess$).pipe().subscribe();
    return addOrganizationalUnitProcess$;
  }

  UpdateOrganizationalUnit(organizationalUnit: any) {
    const updateOrganizationalUnitProcess$ = this.organizationalUnitServices.UpdateOrganizationalUnit(organizationalUnit).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تم تعديل بنجاح', res.messages);
          // const prev = this.OrganizationalUnitSubject$.getValue();
          // this.OrganizationalUnitSubject$.next(
          //   produce(prev, (draft: AllOrganizationalUnitsCommand[]) => {
          //     const index = draft.findIndex((x) => x.id === organizationalUnit.id);
          //     draft[index] = organizationalUnit;
          //     draft[index].number = res.content.number;
          //   })
          // );
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية تعديل', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(updateOrganizationalUnitProcess$).pipe().subscribe();
    return updateOrganizationalUnitProcess$;
  }

  }
