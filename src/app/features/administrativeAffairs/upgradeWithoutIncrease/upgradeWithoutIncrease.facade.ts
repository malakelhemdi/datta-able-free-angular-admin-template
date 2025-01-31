import { Injectable } from '@angular/core';
import { BehaviorSubject, map, shareReplay } from 'rxjs';
import { SharedFacade } from '../../../shared/shared.facade';
import { tap } from 'rxjs/operators';
import { MessageType, ResponseType } from '../../../shared/shared.interfaces';
import { UpgradeWithoutIncreaseServices } from './upgradeWithoutIncrease.services';
import { EmployeeGlobalServices } from 'src/app/shared/employees/employee.service';
import { GetEmployeeCommand } from 'src/app/shared/employees/employee.interface';

@Injectable()
export class UpgradeWithoutIncreaseFacade {
  EmployeeSubject$ = new BehaviorSubject<GetEmployeeCommand>(null);
  public Employee$ = this.EmployeeSubject$.asObservable();

  constructor(
    private sharedFacade: SharedFacade,
    private upgradeWithoutIncreaseServices: UpgradeWithoutIncreaseServices,
    private employeeGlobalServices: EmployeeGlobalServices
  ) {}

  upgradeWithoutIncrease(request: any): void {
    const reClassificationProcess$ = this.upgradeWithoutIncreaseServices.UpgradeWithoutIncrease(request).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تمت عملية ترقية بنجاح', res.messages);
          this.EmployeeSubject$.next(null);
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية ترقية ', res.messages);
        }
      }),

      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(reClassificationProcess$).pipe().subscribe();
  }

  GetEmployee(SearchType, Value): any {
    const getEmployeeProcess$ = this.employeeGlobalServices.GetEmployee(1, 1, SearchType, Value).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.EmployeeSubject$.next(res.content.items[0]);
        } else {
          this.EmployeeSubject$.next(null);

          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب بيانات المستخدم', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getEmployeeProcess$).pipe().subscribe();
    return getEmployeeProcess$.pipe(map((res) => (res.type === ResponseType.Success ? res.content.items[0] : null)));
  }
}
