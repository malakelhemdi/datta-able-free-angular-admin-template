import { Injectable } from '@angular/core';
import { SharedFacade } from 'src/app/shared/shared.facade';
import { AddEmployeeEvaluationTypeServices } from './add-employee-evaluation-type.services';
import { BaseResponse, MessageType, PaginatedData, ResponseType } from 'src/app/shared/shared.interfaces';
import { BehaviorSubject, shareReplay, Subject, tap } from 'rxjs';
import { AddEvaluationTypeCommand, UpdateEvaluationTypeCommand } from './add-employee-evaluation-type.interface';
import { GetEmployeeEvaluationTypeCommand } from '../show-employee-evaluation-types/show-employee-evaluation-types.interface';
import basePaginatedInitialValue from 'src/app/shared/data/basePaginatedInitialValue';

@Injectable()
export class AddEmployeeEvaluationTypeFacade {
  constructor(
    private sharedFacade: SharedFacade,
    private addEmployeeEvaluationTypeServices: AddEmployeeEvaluationTypeServices
  ) {}

  private AddEmployeeEvaluationSubject$ = new Subject<BaseResponse<string>>();
  public AddEmployeeEvaluation$ = this.AddEmployeeEvaluationSubject$.asObservable();

  employeeEvaluationTypesSubject$ = new BehaviorSubject<PaginatedData<GetEmployeeEvaluationTypeCommand[]>>(basePaginatedInitialValue);

  AddEmployeeEvaluationType(addEvaluationType: AddEvaluationTypeCommand): void {
    const AddEmployeeEvaluationTypeProcess$ = this.addEmployeeEvaluationTypeServices.AddEmployeeEvaluationType(addEvaluationType).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تمت الإضافة بنجاح', res.messages);
          this.AddEmployeeEvaluationSubject$.next(res);
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الإضافة', res.messages);
          this.AddEmployeeEvaluationSubject$.next(res);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(AddEmployeeEvaluationTypeProcess$).pipe().subscribe();
  }

  fetchEmployeeEvaluationType(Page: number, PageSize: number, id: string): void {
    const employeeEvaluationTypesProcess$ = this.addEmployeeEvaluationTypeServices.getEmployeeEvaluationType(Page, PageSize, id).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.employeeEvaluationTypesSubject$.next(res.content);
        } else {
          this.employeeEvaluationTypesSubject$.next(basePaginatedInitialValue);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية تعديل التقييم', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(employeeEvaluationTypesProcess$).pipe().subscribe();
  }

  UpdateEmployeeEvaluationType(updateEvaluationType: UpdateEvaluationTypeCommand): void {
    const UpdateEmployeeEvaluationTypeProcess$ = this.addEmployeeEvaluationTypeServices
      .updateEmployeeEvaluationType(updateEvaluationType)
      .pipe(
        tap((res) => {
          if (res.type == ResponseType.Success) {
            this.sharedFacade.showMessage(MessageType.success, 'تمت التعديل بنجاح', res.messages);
            this.AddEmployeeEvaluationSubject$.next(res);
          } else {
            this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية التعديل', res.messages);
            this.AddEmployeeEvaluationSubject$.next(res);
          }
        }),
        shareReplay()
      );
    this.sharedFacade.showLoaderUntilCompleted(UpdateEmployeeEvaluationTypeProcess$).pipe().subscribe();
  }
}
