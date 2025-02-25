import { Injectable } from '@angular/core';
import { shareReplay, Subject, tap } from 'rxjs';
import { GetEmployeeEvaluationCommand } from 'src/app/shared/evaluations/evaluations.interface';
import { EvaluationsGlobalServices } from 'src/app/shared/evaluations/evaluations.service';
import { GetEmployeeEvaluationTypeCommand } from 'src/app/shared/evaluationsTypes/evaluations-types.interface';
import { EvaluationTypesGlobalServices } from 'src/app/shared/evaluationsTypes/evaluations-types.service';
import { SharedFacade } from 'src/app/shared/shared.facade';
import { MessageType, PaginatedData, ResponseType } from 'src/app/shared/shared.interfaces';

@Injectable()
export class EmployeeEvaluationDepartmentManagerConfirmationFacade {
  constructor(
    private sharedFacade: SharedFacade,
    private evaluationsGlobalServices: EvaluationsGlobalServices,
    private evaluationTypesGlobalServices: EvaluationTypesGlobalServices
  ) {

  }

  public employeeEvaluations$ = new Subject<PaginatedData<GetEmployeeEvaluationCommand[]>>();
  GetEmployeeEvaluation(page: number, pageSize: number, employeeId?: string | number, year?: number): void {
    const getEmployeeEvaluationProcess$ = this.evaluationsGlobalServices.GetEmployeeEvaluation(page, pageSize, employeeId, year).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.employeeEvaluations$.next(res.content);
        } else {
          this.employeeEvaluations$.next(null);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب التقييم', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getEmployeeEvaluationProcess$).pipe().subscribe();
  }

  public employeeEvaluationTypes$ = new Subject<PaginatedData<GetEmployeeEvaluationTypeCommand[]>>();
  GetEmployeeEvaluationTypes(page: number, pageSize: number, id?: string | number): void {
    const getEmployeeEvaluationProcess$ = this.evaluationTypesGlobalServices.getEmployeeEvaluationType(page, pageSize, id).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.employeeEvaluationTypes$.next(res.content);
        } else {
          this.employeeEvaluationTypes$.next(null);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب نوع التقييم', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getEmployeeEvaluationProcess$).pipe().subscribe();
  }
}