import { Injectable } from '@angular/core';
import { ShowAttendanceServices } from './show-attendance.services';
import { tap, shareReplay, BehaviorSubject } from 'rxjs';
import { ResponseType, MessageType } from 'src/app/shared/shared.interfaces';
import { SharedFacade } from 'src/app/shared/shared.facade';
import { EmployeeGlobalServices } from 'src/app/shared/employees/employee.service';
import { GetEmployeeSmallCommand } from 'src/app/shared/employees/employee.interface';

@Injectable()
export class ShowAttendanceFacade {
  constructor(
    private employeeGlobalServices: EmployeeGlobalServices,
    private sharedFacade: SharedFacade
  ) {}
  employeeSubject$ = new BehaviorSubject<GetEmployeeSmallCommand[]>([]);
  public employee$ = this.employeeSubject$.asObservable();

  GetEmployee(): any {
    const getEmployeesProcess$ = this.employeeGlobalServices.GetEmployeeSmallObject().pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.employeeSubject$.next(res.content);
        } else {
          this.employeeSubject$.next([]);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب مستخدمين', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getEmployeesProcess$).pipe().subscribe();
  }
}
