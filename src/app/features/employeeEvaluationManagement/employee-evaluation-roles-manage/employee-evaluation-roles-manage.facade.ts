import { Injectable } from '@angular/core';
import {
  DefineManagersForTheOrganizationalUnitDTO,
  ManagersForTheOrganizationalUnitCommand
} from './employee-evaluation-roles-manage.interface';
import { EmployeeEvaluationRolesManageServices } from './employee-evaluation-roles-manage.services';
import { MessageType, ResponseType } from 'src/app/shared/shared.interfaces';
import { shareReplay, Subject, tap } from 'rxjs';
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

  employeeSubject$ = new Subject<ManagersForTheOrganizationalUnitCommand>();
  GetManagersForOrganizationalUnit(OrganizationalUnitId: string): void {
    const getEmployeesProcess$ = this.employeeEvaluationRolesManageServices.GetManagersForOrganizationalUnit(OrganizationalUnitId).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.employeeSubject$.next(res.content[0]);
        } else {
          this.employeeSubject$.next(null);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب مستخدمين', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getEmployeesProcess$).pipe().subscribe();
  }
}
