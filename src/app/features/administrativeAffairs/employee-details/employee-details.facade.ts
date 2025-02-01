import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { SharedFacade } from '../../../shared/shared.facade';
import { tap } from 'rxjs/operators';
import { MessageType, PaginatedData, ResponseType } from '../../../shared/shared.interfaces';
import { EmployeeGlobalServices } from 'src/app/shared/employees/employee.service';
import { GetEmployeeCommand } from 'src/app/shared/employees/employee.interface';
import basePaginatedInitialValue from 'src/app/shared/data/basePaginatedInitialValue';

@Injectable()
export class EmployeeDetailsFacade {
  public employeePageSubject$ = new BehaviorSubject<PaginatedData<GetEmployeeCommand[]>>(basePaginatedInitialValue);

  constructor(
    private sharedFacade: SharedFacade,
    private employeeGlobalServices: EmployeeGlobalServices
  ) {}
  GetEmployeePage(Page: number, PageSize: number, SearchType?: string, Value?: any): any {
    const getEmployeesProcess$ = this.employeeGlobalServices.GetEmployee(Page, PageSize, SearchType, Value).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.employeePageSubject$.next(res.content);
        } else {
          this.employeePageSubject$.next(basePaginatedInitialValue);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب مستخدمين', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getEmployeesProcess$).pipe().subscribe();
  }
}
