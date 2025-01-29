import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { SharedFacade } from '../../../shared/shared.facade';
import { tap } from 'rxjs/operators';
import { MessageType, PaginatedData, ResponseType } from '../../../shared/shared.interfaces';
import { produce } from 'immer';
import { EmployeeServices } from './employee.services';
import { EmployeeGlobalServices } from 'src/app/shared/employees/employee.service';
import { GetEmployeeCommand, GetEmployeeSmallCommand } from 'src/app/shared/employees/employee.interface';
import basePaginatedInitialValue from 'src/app/shared/data/basePaginatedInitialValue';

@Injectable()
export class EmployeeFacade {
  public employeeSubject$ = new BehaviorSubject<PaginatedData<GetEmployeeSmallCommand[]>>(basePaginatedInitialValue);
  public employeePageSubject$ = new BehaviorSubject<PaginatedData<GetEmployeeCommand[]>>(basePaginatedInitialValue);

  constructor(
    private sharedFacade: SharedFacade,
    private EmployeesServices: EmployeeServices,
    private employeeGlobalServices: EmployeeGlobalServices
  ) {}

  deleteEmployee(id: string): void {
    const deleteEmployeeProcess$ = this.EmployeesServices.DeleteEmployee(id).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, ' حذف مستخدم', ['تم حذف بنجاح']);
          const prev = this.employeeSubject$.getValue();
          this.employeeSubject$.next({ ...prev, items: prev.items.filter((x: any) => x.id !== id) });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الحذف', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(deleteEmployeeProcess$).pipe().subscribe();
  }

  GetEmployee(Page: number, PageSize: number, name?: string): any {
    const getEmployeesProcess$ = this.employeeGlobalServices.GetEmployeeSmallObject(Page, PageSize, name).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.employeeSubject$.next(res.content);
        } else {
          this.employeeSubject$.next(basePaginatedInitialValue);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب مستخدمين', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getEmployeesProcess$).pipe().subscribe();
  }

  GetEmployeePage(Page: number, PageSize: number, SearchType?: string, Value?: any): any {
    const getEmployeesProcess$ = this.employeeGlobalServices.GetEmployee(Page, PageSize, SearchType, Value).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          // HERE
          this.employeePageSubject$.next(res.content);
        } else {
          this.employeePageSubject$.next(basePaginatedInitialValue);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب مستخدمين', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getEmployeesProcess$).pipe().subscribe();
  }

  UpdateEmployee(Employee: GetEmployeeCommand): void {
    const updateEmployeeProcess$ = this.EmployeesServices.UpdateEmployee(Employee).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تم تعديل بنجاح', res.messages);
          const prev = this.employeePageSubject$.getValue();
          this.employeePageSubject$.next({
            ...prev,
            items: produce(prev.items, (draft: GetEmployeeCommand[]) => {
              const index = draft.findIndex((x) => x.id === Employee.id);
              if (index !== -1) draft[index] = Employee;
            })
          });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية تعديل', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(updateEmployeeProcess$).pipe().subscribe();
  }
}
