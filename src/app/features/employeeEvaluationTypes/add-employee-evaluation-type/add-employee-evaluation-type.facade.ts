import { Injectable } from '@angular/core';
import { SharedFacade } from 'src/app/shared/shared.facade';
import { AddEmployeeEvaluationTypeServices } from './add-employee-evaluation-type.services';
import { BaseResponse, MessageType, ResponseType } from 'src/app/shared/shared.interfaces';
import { shareReplay, Subject, tap } from 'rxjs';
import { AddEvaluationTypeCommand } from './add-employee-evaluation-type.interface';

@Injectable()
export class AddEmployeeEvaluationTypeFacade {
  constructor(
    private sharedFacade: SharedFacade,
    private addEmployeeEvaluationTypeServices: AddEmployeeEvaluationTypeServices
  ) {}

  private AddEmployeeEvaluationSubject$ = new Subject<BaseResponse<string>>();
  public AddEmployeeEvaluation$ = this.AddEmployeeEvaluationSubject$.asObservable();

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
}
