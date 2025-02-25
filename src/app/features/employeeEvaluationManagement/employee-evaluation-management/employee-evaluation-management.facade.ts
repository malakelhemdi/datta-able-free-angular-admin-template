import { Injectable } from '@angular/core';
import { shareReplay, Subject } from 'rxjs';
import { SharedFacade } from '../../../shared/shared.facade';
import { tap } from 'rxjs/operators';
import { EmployeeEvaluationManagementServices } from './employee-evaluation-management.services';
import  {
  AddEmployeeEvaluationDTO,
  EmployeesCommand,
  UpdateEmployeeEvaluationDTO
} from './employee-evaluation-management.interface';
import { MessageType, ResponseType } from 'src/app/shared/shared.interfaces';
import { GetEmployeeCommand } from 'src/app/shared/employees/employee.interface';
import { EvaluationsGlobalServices } from 'src/app/shared/evaluations/evaluations.service';
import { GetEmployeeEvaluationCommand } from 'src/app/shared/evaluations/evaluations.interface';

@Injectable()
export class EmployeeEvaluationManagementFacade {
  selectedEmployeeSubject$ = new Subject<GetEmployeeCommand>();
  public selectedEmployee$ = this.selectedEmployeeSubject$.asObservable();

  constructor(
    private sharedFacade: SharedFacade,
    private employeeEvaluationManagementServices: EmployeeEvaluationManagementServices,
    private evaluationsGlobalServices: EvaluationsGlobalServices
  ) { }

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

  AddEmployeeEvaluation(EmployeeEvaluation: AddEmployeeEvaluationDTO): void {
    const addEmployeeEvaluationProcess$ = this.employeeEvaluationManagementServices.AddEmployeeEvaluation(EmployeeEvaluation).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تمت الإضافة بنجاح', res.messages);
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الإضافة', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(addEmployeeEvaluationProcess$).pipe().subscribe();
  }

  updateEmployeeEvaluation(EmployeeEvaluation: UpdateEmployeeEvaluationDTO): void {
    const updateEmployeeEvaluationProcess$ = this.employeeEvaluationManagementServices.UpdateEmployeeEvaluation(EmployeeEvaluation).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تمت التحديث بنجاح', res.messages);
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية التحديث', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(updateEmployeeEvaluationProcess$).pipe().subscribe();
  }

  public selectedEmployeeEvaluation$ = new Subject<GetEmployeeEvaluationCommand>();
  GetEmployeeEvaluation(employeeId: string | number, year: number): void {
    const getEmployeeEvaluationProcess$ = this.evaluationsGlobalServices.GetEmployeeEvaluation(1, 1, employeeId, year).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.selectedEmployeeEvaluation$.next(res.content.items[0]);
        } else {
          this.selectedEmployeeEvaluation$.next(null);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب الموظف', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getEmployeeEvaluationProcess$).pipe().subscribe();
  }
}
