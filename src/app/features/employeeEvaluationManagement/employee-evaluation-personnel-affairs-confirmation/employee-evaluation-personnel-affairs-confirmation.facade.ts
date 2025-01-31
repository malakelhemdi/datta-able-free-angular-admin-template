import { Injectable } from '@angular/core';
import { shareReplay, Subject, tap } from 'rxjs';
import { GetEmployeeCommand } from 'src/app/shared/employees/employee.interface';
import { EmployeeGlobalServices } from 'src/app/shared/employees/employee.service';
import { SharedFacade } from 'src/app/shared/shared.facade';
import { MessageType, ResponseType } from 'src/app/shared/shared.interfaces';

@Injectable()
export class EmployeeEvaluationPersonnelAffairsConfirmationFacade {
  constructor(
    private sharedFacade: SharedFacade,
    private employeeGlobalServices: EmployeeGlobalServices
  ) {}

  selectedEmployeeSubject$ = new Subject<GetEmployeeCommand>();

  GetEmployeeByCode(employeeCode: string): void {
    const getEmployeeEvaluationProcess$ = this.employeeGlobalServices.GetEmployee(1, 1, '1', employeeCode).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.selectedEmployeeSubject$.next(res.content.items[0]);
        } else {
          this.selectedEmployeeSubject$.next(null);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب الموظف', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getEmployeeEvaluationProcess$).pipe().subscribe();
  }
}
