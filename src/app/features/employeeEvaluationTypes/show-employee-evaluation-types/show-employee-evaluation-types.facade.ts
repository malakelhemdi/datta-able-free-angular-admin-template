import { Injectable } from '@angular/core';
import { SharedFacade } from 'src/app/shared/shared.facade';
import { ShowEmployeeEvaluationTypeServices } from './show-employee-evaluation-types.services';
import { MessageType, ResponseType } from 'src/app/shared/shared.interfaces';
import { BehaviorSubject, shareReplay, tap } from 'rxjs';
import { GetEmployeeEvaluationTypeCommand } from './show-employee-evaluation-types.interface';

@Injectable({ providedIn: 'root' })
export class ShowEmployeeEvaluationTypeFacade {
  constructor(
    private sharedFacade: SharedFacade,
    private showEmployeeEvaluationTypeServices: ShowEmployeeEvaluationTypeServices
  ) {}

  private employeeEvaluationTypesSubject$ = new BehaviorSubject<GetEmployeeEvaluationTypeCommand[]>([]);
  public employeeEvaluationTypes$ = this.employeeEvaluationTypesSubject$.asObservable();

  fetchEmployeeEvaluationTypes(): void {
    const employeeEvaluationTypesProcess$ = this.showEmployeeEvaluationTypeServices.getEmployeeEvaluationType().pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.employeeEvaluationTypesSubject$.next(res.content);
        } else {
          this.employeeEvaluationTypesSubject$.next([]);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب أنواع التقييمات', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(employeeEvaluationTypesProcess$).pipe().subscribe();
  }

  deleteEmployeeEvaluationTypes(id: string): void {
    const employeeEvaluationTypesProcess$ = this.showEmployeeEvaluationTypeServices.deleteEmployeeEvaluationType(id).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.fetchEmployeeEvaluationTypes();
          // this.employeeEvaluationTypesSubject$.next(res.content);
        } else {
          // this.employeeEvaluationTypesSubject$.next([]);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية حذف أنواع التقييمات', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(employeeEvaluationTypesProcess$).pipe().subscribe();
  }
}
