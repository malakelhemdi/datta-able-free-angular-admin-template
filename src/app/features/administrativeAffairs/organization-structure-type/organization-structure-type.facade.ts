import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { SharedFacade } from '../../../shared/shared.facade';
import { MessageType, PaginatedData, ResponseType } from '../../../shared/shared.interfaces';
import { OrganizationStructureTypeServices } from './organization-structure-type.services';
import basePaginatedInitialValue from 'src/app/shared/data/basePaginatedInitialValue';
import { OrganizationStructureTypes } from './organization-structure-type.interface';
import { tap } from 'rxjs/operators';

@Injectable()
export class OrganizationStructureTypeFacade {
  public fetchOrganizationStructureTypesSubject$ = new BehaviorSubject<PaginatedData<OrganizationStructureTypes[]>>(basePaginatedInitialValue);

  constructor(
    private sharedFacade: SharedFacade,
    private organizationalUnitServices: OrganizationStructureTypeServices
  ) {
  }

  fetchOrganizationStructureTypes(page: number, pageSize: number) {
    const getBanksProcess$ = this.organizationalUnitServices.GetOrganizationStructureTypes(page, pageSize).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.fetchOrganizationStructureTypesSubject$.next(res.content);
        } else {
          this.fetchOrganizationStructureTypesSubject$.next(basePaginatedInitialValue);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية الجلب', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getBanksProcess$).pipe().subscribe();
    return getBanksProcess$;
  }

  deleteOrganizationStructureTypes(id: string) {
    const deleteBankProcess$ = this.organizationalUnitServices.DeleteBank(id).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, ' تم حذف بنجاح', res.messages);
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الحذف', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(deleteBankProcess$).pipe().subscribe();
    return deleteBankProcess$;
  }


  AddOrganizationStructureTypes(OrganizationStructureType: any) {
    const addBankProcess$ = this.organizationalUnitServices.AddOrganizationStructureTypes(OrganizationStructureType).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تمت الإضافة بنجاح', res.messages);
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الإضافة', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(addBankProcess$).pipe().subscribe();
    return addBankProcess$;
  }

  UpdateOrganizationStructureTypes(OrganizationStructureType: any) {
    const updateBankProcess$ = this.organizationalUnitServices.UpdateOrganizationStructureTypes(OrganizationStructureType).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تم تعديل بنجاح', res.messages);
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية تعديل', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(updateBankProcess$).pipe().subscribe();
    return updateBankProcess$;
  }


}
