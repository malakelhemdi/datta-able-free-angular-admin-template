import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay, Subject } from 'rxjs';
import { SharedFacade } from '../../../shared/shared.facade';
import { tap } from 'rxjs/operators';
import { EmployeeEvaluationManagementServices } from './employee-evaluation-management.services';
import { EmployeesCommand, GetEmployeeCommand } from './employee-evaluation-management.interface';
import { MessageType, ResponseType } from 'src/app/shared/shared.interfaces';

@Injectable()
export class EmployeeEvaluationManagementFacade {
  selectedEmployeeSubject$ = new Subject<GetEmployeeCommand>();
  public selectedEmployee$ = this.selectedEmployeeSubject$.asObservable();


  constructor(
    private sharedFacade: SharedFacade,
    private employeeEvaluationManagementServices: EmployeeEvaluationManagementServices
  ) {}

  getEmployee(employeeId: string | number): any {
    const getEmployeeProcess$ = this.employeeEvaluationManagementServices.GetEmployee(employeeId).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.selectedEmployeeSubject$.next(res.content[0]);
        } else {
          this.selectedEmployeeSubject$.next(null);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب الموظف', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getEmployeeProcess$).pipe().subscribe();
  }

  public groupedEmployeesByManager$ = new Subject<EmployeesCommand>();
  GetEmployeesGroupedByManagerType(): any {
    const getEmployeesGroupedByManagerTypeProcess$ = this.employeeEvaluationManagementServices.GetEmployeesGroupedByManagerType().pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.groupedEmployeesByManager$.next(res.content);
        } else {
          this.groupedEmployeesByManager$.next(null);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب الموظف', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getEmployeesGroupedByManagerTypeProcess$).pipe().subscribe();
  }
}
