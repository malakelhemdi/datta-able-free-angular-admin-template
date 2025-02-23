import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay, tap } from 'rxjs';
import basePaginatedInitialValue from 'src/app/shared/data/basePaginatedInitialValue';
import { GetEmployeeCommand } from 'src/app/shared/employees/employee.interface';
import { EmployeeGlobalServices } from 'src/app/shared/employees/employee.service';
import { SharedFacade } from 'src/app/shared/shared.facade';
import { MessageType, PaginatedData, ResponseType } from 'src/app/shared/shared.interfaces';
import { AddNewConnectedServiceData } from './connected-service.interface';
import { ConnectedServiceServices } from './connected-service.services';

@Injectable()
export class ConnectedServiceFacade {
  constructor(
    private employeeGlobalServices: EmployeeGlobalServices,
    private sharedFacade: SharedFacade,
    private connectedServiceServices: ConnectedServiceServices
  ) {}
  employeeSubject$ = new BehaviorSubject<PaginatedData<GetEmployeeCommand[]>>(basePaginatedInitialValue);

  GetEmployee(page: number, pageSize: number, type: string, name: string): any {
    const getEmployeesProcess$ = this.employeeGlobalServices.GetEmployee(page, pageSize, type, name).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.employeeSubject$.next(res.content);
        } else {
          this.employeeSubject$.next(basePaginatedInitialValue);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب مستخدمين', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getEmployeesProcess$).pipe().subscribe();
  }

  AddConnectedService(connectedService: AddNewConnectedServiceData) {
    const addConnectedService$ = this.connectedServiceServices.addConnectedService(connectedService).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تمت الإضافة بنجاح', res.messages);
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الإضافة', res.messages);
        }
      }),

      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(addConnectedService$).pipe().subscribe();
    return addConnectedService$;
  }
}
