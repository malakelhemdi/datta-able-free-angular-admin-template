import { Injectable } from '@angular/core';
import { SharedFacade } from 'src/app/shared/shared.facade';
import { ShowEmployeeEvaluationTypeServices } from './show-employee-evaluation-types.services';
import { MessageType, PaginatedData, ResponseType } from 'src/app/shared/shared.interfaces';
import { BehaviorSubject, shareReplay, tap } from 'rxjs';
import { GetEmployeeEvaluationTypeCommand } from './show-employee-evaluation-types.interface';
import basePaginatedInitialValue from 'src/app/shared/data/basePaginatedInitialValue';

@Injectable({ providedIn: 'root' })
export class ShowEmployeeEvaluationTypeFacade {
  constructor(
    private sharedFacade: SharedFacade,
    private showEmployeeEvaluationTypeServices: ShowEmployeeEvaluationTypeServices
  ) {}

  private employeeEvaluationTypesSubject$ = new BehaviorSubject<PaginatedData<GetEmployeeEvaluationTypeCommand[]>>(
    basePaginatedInitialValue
  );
  public employeeEvaluationTypes$ = this.employeeEvaluationTypesSubject$.asObservable();

  fetchEmployeeEvaluationTypes(Page: number, PageSize: number) {
    const employeeEvaluationTypesProcess$ = this.showEmployeeEvaluationTypeServices.getEmployeeEvaluationType(Page, PageSize).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.employeeEvaluationTypesSubject$.next(res.content);
        } else {
          this.employeeEvaluationTypesSubject$.next(basePaginatedInitialValue);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب أنواع التقييمات', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(employeeEvaluationTypesProcess$).pipe().subscribe();
    return employeeEvaluationTypesProcess$;
  }

  deleteEmployeeEvaluationTypes(id: string) {
    const employeeEvaluationTypesProcess$ = this.showEmployeeEvaluationTypeServices.deleteEmployeeEvaluationType(id).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.error, 'تمت عملية الحذف', res.messages);
          // this.fetchEmployeeEvaluationTypes();
          // this.employeeEvaluationTypesSubject$.next(res.content);
        } else {
          // this.employeeEvaluationTypesSubject$.next([]);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية حذف أنواع التقييمات', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(employeeEvaluationTypesProcess$).pipe().subscribe();
    return employeeEvaluationTypesProcess$;
  }
}
