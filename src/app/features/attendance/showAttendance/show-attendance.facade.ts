import { Injectable } from '@angular/core';
import { ShowAttendanceServices } from './show-attendance.services';
import { tap, shareReplay, BehaviorSubject } from 'rxjs';
import { ResponseType, MessageType } from 'src/app/shared/shared.interfaces';
import { SharedFacade } from 'src/app/shared/shared.facade';
import { EmployeeGlobalServices } from 'src/app/shared/employees/employee.service';
import { GetEmployeeSmallCommand } from 'src/app/shared/employees/employee.interface';
import { GetAttendancesCommand, GetEmployeesDetailsCommand } from './show-attendance.interface';

@Injectable()
export class ShowAttendanceFacade {
  constructor(
    private employeeGlobalServices: EmployeeGlobalServices,
    private showAttendanceServices: ShowAttendanceServices,
    private sharedFacade: SharedFacade
  ) {}
  employeeSubject$ = new BehaviorSubject<GetEmployeeSmallCommand[]>([]);
  public employee$ = this.employeeSubject$.asObservable();
  GetEmployeesDetailsSubject$ = new BehaviorSubject<GetEmployeesDetailsCommand[]>([]);
  public GetEmployeesDetails$ = this.GetEmployeesDetailsSubject$.asObservable();
  GetAttendancesSubject$ = new BehaviorSubject<GetAttendancesCommand[]>([]);
  public GetAttendances$ = this.GetAttendancesSubject$.asObservable();
  UploadAttendancesSubject$ = new BehaviorSubject<string>('');
  public UploadAttendances$ = this.UploadAttendancesSubject$.asObservable();

  GetEmployee(): any {
    const getEmployeesProcess$ = this.employeeGlobalServices.GetEmployeeSmallObject().pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.employeeSubject$.next(res.content);
        } else {
          this.employeeSubject$.next([]);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب مستخدمين', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getEmployeesProcess$).pipe().subscribe();
  }
  GetEmployeesDetails(request): any {
    const getEmployeesProcess$ = this.showAttendanceServices.GetEmployeesDetails(request).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.GetEmployeesDetailsSubject$.next(res.content);
        } else {
          this.GetEmployeesDetailsSubject$.next([]);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب حضور وأنصراف', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getEmployeesProcess$).pipe().subscribe();
  }
  GetAttendances(request): any {
    const getEmployeesProcess$ = this.showAttendanceServices.GetAttendances(request).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.GetAttendancesSubject$.next(res.content);
        } else {
          this.GetAttendancesSubject$.next([]);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب حضور وأنصراف مستخدمين', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getEmployeesProcess$).pipe().subscribe();
  }
  UploadAttendances(AttendanceFile): any {
    const getEmployeesProcess$ = this.showAttendanceServices.UploadAttendances(AttendanceFile).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, ' تحميل جدول الحضور والانصراف مستخدمين', ['تم تحميل جدول الحضور والانصراف مستخدمين بنجاح']);
          this.UploadAttendancesSubject$.next(res.messages[0]);
          return;
        } else {
          this.UploadAttendancesSubject$.next(res.messages[0]);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في تحميل جدول الحضور والانصراف مستخدمين', res.messages);
       return;
        }
      }),
    shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getEmployeesProcess$).pipe().subscribe();
  }
}
