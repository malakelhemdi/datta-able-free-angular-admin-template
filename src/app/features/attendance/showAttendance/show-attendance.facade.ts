import { Injectable } from '@angular/core';
import { ShowAttendanceServices } from './show-attendance.services';
import { tap, shareReplay, BehaviorSubject } from 'rxjs';
import { ResponseType, MessageType } from 'src/app/shared/shared.interfaces';
import { GetEmployeeCommand } from '../../administrativeAffairs/add-employee/add-employee.interface';
import { SharedFacade } from 'src/app/shared/shared.facade';

@Injectable()
export class ShowAttendanceFacade {
  constructor(
    private EmployeesServices: ShowAttendanceServices,
    private sharedFacade: SharedFacade
  ) {}
  employeeSubject$ = new BehaviorSubject<GetEmployeeCommand[]>([]);
  public employee$ = this.employeeSubject$.asObservable();

  GetEmployee(): any {
    const getEmployeesProcess$ = this.EmployeesServices.GetEmployee().pipe(
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
