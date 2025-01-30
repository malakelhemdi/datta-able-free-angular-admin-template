import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { SharedFacade } from '../../../shared/shared.facade';
import { tap } from 'rxjs/operators';
import { MessageType, PaginatedData, ResponseType } from '../../../shared/shared.interfaces';
import { produce } from 'immer';
import { OrganizationalUnitServices } from './organizational-unit.services';
import {
  AddOrganizationalUnitCommand,
  AllOrganizationalUnitsCommand,
  UnitsCommand,
  UnitTypeCommand
} from './organizational-unit.interface';
import basePaginatedInitialValue from 'src/app/shared/data/basePaginatedInitialValue';

@Injectable()
export class OrganizationalUnitFacade {
  public OrganizationalUnitSubject$ = new BehaviorSubject<PaginatedData<AllOrganizationalUnitsCommand[]>>(basePaginatedInitialValue);

  UnitsByDirectManagerSubject$ = new BehaviorSubject<UnitsCommand[]>([]);
  public UnitsByDirectManager$ = this.UnitsByDirectManagerSubject$.asObservable();

  public ContentIdNextQuerySubject$ = new BehaviorSubject<string>('');
  public ContentIdNextQuery$ = this.ContentIdNextQuerySubject$.asObservable();

  AllUnitsBranchingFromSpecificUnitSubject$ = new BehaviorSubject<UnitsCommand[]>([]);
  public AllSpecificUnit$ = this.AllUnitsBranchingFromSpecificUnitSubject$.asObservable();

  AllUnitsDepartmentSubject$ = new BehaviorSubject<UnitsCommand[]>([]);
  public AllDepartmentUnit$ = this.AllUnitsDepartmentSubject$.asObservable();

  public OrganizationalUnitsByLevelSubject$ = new BehaviorSubject<PaginatedData<UnitsCommand[]>>(basePaginatedInitialValue);
  public OrganizationalUnitsByLevel2Subject$ = new BehaviorSubject<PaginatedData<UnitsCommand[]>>(basePaginatedInitialValue);

  UnitTypeSubject$ = new BehaviorSubject<PaginatedData<UnitTypeCommand[]>>(basePaginatedInitialValue);

  constructor(
    private sharedFacade: SharedFacade,
    private organizationalUnitServices: OrganizationalUnitServices
  ) {}

  deleteOrganizationalUnit(id: string): void {
    const deleteOrganizationalUnitProcess$ = this.organizationalUnitServices.DeleteOrganizationalUnit(id).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, ' حذف ', ['تم حذف بنجاح']);
          const prev = this.OrganizationalUnitSubject$.getValue();
          const result = prev.items.filter((x: any) => x.id != id);
          this.OrganizationalUnitSubject$.next({
            ...prev,
            items: result
          });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الحذف', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(deleteOrganizationalUnitProcess$).pipe().subscribe();
  }

  GetOrganizationalUnit(Page: number, PageSize: number, name: string): any {
    const getOrganizationalUnitProcess$ = this.organizationalUnitServices.GetAllOrganizationalUnits(Page, PageSize, name, 1).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.OrganizationalUnitSubject$.next(res.content);
        } else {
          this.OrganizationalUnitSubject$.next(basePaginatedInitialValue);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب البيانات', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getOrganizationalUnitProcess$).pipe().subscribe();
  }
  GetUnitType(Page: number, PageSize: number): any {
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
  }

  GetOrganizationalUnitsByLevel(Page: number, PageSize: number, level: number): any {
    const getOrganizationalUnitsByLevelProcess$ = this.organizationalUnitServices
      .GetOrganizationalUnitsByLevel(Page, PageSize, level, 1)
      .pipe(
        tap((res) => {
          if (res.type == ResponseType.Success) {
            if (level == 2) {
              this.OrganizationalUnitsByLevel2Subject$.next(res.content);
            } else {
              this.OrganizationalUnitsByLevelSubject$.next(res.content);
            }
          } else {
            this.OrganizationalUnitsByLevelSubject$.next(basePaginatedInitialValue);
            this.OrganizationalUnitsByLevel2Subject$.next(basePaginatedInitialValue);

            if (res.messages[0] == 'لا يوجدة وحدات تنظيمة') {
              this.sharedFacade.showMessage(MessageType.warning, '', res.messages);
            } else {
              this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب البيانات', res.messages);
            }
          }
        }),
        shareReplay()
      );
    this.sharedFacade.showLoaderUntilCompleted(getOrganizationalUnitsByLevelProcess$).pipe().subscribe();
  }

  GetUnitsByDirectManager(directManager: string): any {
    const getUnitsByDirectManagerProcess$ = this.organizationalUnitServices.GetUnitsByDirectManager(directManager).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.UnitsByDirectManagerSubject$.next(res.content);
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
  }

  GetOrganizationalUnitIdNextQuery(parentId: string | null | undefined): any {
    const getOrganizationalUnitIdNextQueryProcess$ = this.organizationalUnitServices.GetOrganizationalUnitIdNextQuery(parentId).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.ContentIdNextQuerySubject$.next(res.content);
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب البيانات', res.messages);
        }
      }),

      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getOrganizationalUnitIdNextQueryProcess$).pipe().subscribe();
  }

  GetAllUnitsBranchingFromSpecificUnit(organizationalUnitNumber: string | null | undefined): any {
    this.AllUnitsBranchingFromSpecificUnitSubject$.next([]);
    const getAllUnitsBranchingFromSpecificUnitProcess$ = this.organizationalUnitServices
      .GetAllUnitsBranchingFromSpecificUnit(organizationalUnitNumber)
      .pipe(
        tap((res) => {
          if (res.type == ResponseType.Success) {
            this.AllUnitsBranchingFromSpecificUnitSubject$.next(res.content);
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
    this.sharedFacade.showLoaderUntilCompleted(getAllUnitsBranchingFromSpecificUnitProcess$).pipe().subscribe();
  }
  GetAllUnitsDepartment(organizationalUnitNumber: string | null | undefined): any {
    this.AllUnitsDepartmentSubject$.next([]);
    this.AllUnitsBranchingFromSpecificUnitSubject$.next([]);
    const getDepartmentProcess$ = this.organizationalUnitServices.GetAllUnitsBranchingFromSpecificUnit(organizationalUnitNumber, true).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.AllUnitsDepartmentSubject$.next(res.content);
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
    this.sharedFacade.showLoaderUntilCompleted(getDepartmentProcess$).pipe().subscribe();
  }

  AddOrganizationalUnit(organizationalUnit: any): void {
    const addOrganizationalUnitProcess$ = this.organizationalUnitServices.AddOrganizationalUnit(organizationalUnit).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تمت الإضافة بنجاح', res.messages);
          const prev = this.OrganizationalUnitSubject$.getValue();
          this.OrganizationalUnitSubject$.next(
            produce(prev, (draft: AddOrganizationalUnitCommand[]) => {
              organizationalUnit.id = res.content.id;
              organizationalUnit.number = res.content.number;
              draft.unshift(organizationalUnit);
            })
          );
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الإضافة', res.messages);
        }
      }),

      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(addOrganizationalUnitProcess$).pipe().subscribe();
  }

  UpdateOrganizationalUnit(organizationalUnit: any): void {
    const updateOrganizationalUnitProcess$ = this.organizationalUnitServices.UpdateOrganizationalUnit(organizationalUnit).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تم تعديل بنجاح', res.messages);
          const prev = this.OrganizationalUnitSubject$.getValue();
          this.OrganizationalUnitSubject$.next(
            produce(prev, (draft: AllOrganizationalUnitsCommand[]) => {
              const index = draft.findIndex((x) => x.id === organizationalUnit.id);
              draft[index] = organizationalUnit;
              draft[index].number = res.content.number;
            })
          );
          this.OrganizationalUnitSubject$.subscribe();
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية تعديل', res.messages);
        }
      }),

      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(updateOrganizationalUnitProcess$).pipe().subscribe();
  }

  filterOrganizationalUnits(Page: number, PageSize: number, parentId: any, Name: any, Number: any, CostCenter): any {
    const getOrganizationalUnitProcess$ = this.organizationalUnitServices
      .FilterOrganizationalUnits(Page, PageSize, parentId, Name, Number, CostCenter)
      .pipe(
        tap((res) => {
          if (res.type == ResponseType.Success) {
            this.OrganizationalUnitSubject$.next(res.content);
          } else {
            this.OrganizationalUnitSubject$.next(basePaginatedInitialValue);
            this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب البيانات', res.messages);
          }
        }),
        shareReplay()
      );
    this.sharedFacade.showLoaderUntilCompleted(getOrganizationalUnitProcess$).pipe().subscribe();
  }
}
