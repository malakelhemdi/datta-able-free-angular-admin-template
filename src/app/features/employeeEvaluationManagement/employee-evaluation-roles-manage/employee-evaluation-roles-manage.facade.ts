import { Injectable } from '@angular/core';
import { DefineManagersForTheOrganizationalUnitDTO } from './employee-evaluation-roles-manage.interface';
import { EmployeeEvaluationRolesManageServices } from './employee-evaluation-roles-manage.services';
import { MessageType, ResponseType } from 'src/app/shared/shared.interfaces';
import { shareReplay, tap } from 'rxjs';
import { SharedFacade } from 'src/app/shared/shared.facade';

@Injectable()
export class EmployeeEvaluationRolesManageFacade {
  constructor(
    private employeeEvaluationRolesManageServices: EmployeeEvaluationRolesManageServices,
    private sharedFacade: SharedFacade
  ) {}

  UpdateOrganizationalUnit(EmployeeEvaluation: DefineManagersForTheOrganizationalUnitDTO): void {
    const updateEmployeeEvaluationProcess$ = this.employeeEvaluationRolesManageServices.UpdateOrganizationalUnit(EmployeeEvaluation).pipe(
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
}
