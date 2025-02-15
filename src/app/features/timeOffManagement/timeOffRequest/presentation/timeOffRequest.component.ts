import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
// import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { TimeOffRequestFacade } from '../timeOffRequest.facade';
import { SharedFacade } from '../../../../shared/shared.facade';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddRequestComponent } from './dialogAdd-request/dialogAdd-request';
import { EmployeeFacade } from '../../../administrativeAffairs/employee/employee.facade';
// import { MessageType } from '../../../../shared/shared.interfaces';
import basePaginatedInitialValue from 'src/app/shared/data/basePaginatedInitialValue';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rewards-types',
  templateUrl: './timeOffRequest.component.html',
  styleUrl: './timeOffRequest.component.scss'
})
export class TimeOffRequestComponent implements OnInit, AfterViewInit, OnDestroy {
  activeTab: number = 1;
  currentTabNumber: number = 0;

  private subscriptions: Subscription[] = [];
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  constructor(
    private dialog: MatDialog,
    protected employeeFacade: EmployeeFacade,
    protected sharedFacade: SharedFacade,
    protected timeOffRequestFacade: TimeOffRequestFacade,
    private cdr: ChangeDetectorRef
  ) {
    // this.employeeFacade.GetEmployeePage('', '');
    // this.timeOffRequestFacade.GetMyTimeOffRequests(0);
    // this.loadTimeOffRequests(1,10)
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.generateCalendar();
    // this.loadEmployeesPage(1, 10, '', '');
    this.subscriptions.push(
      this.timeOffRequestFacade.TimeOffRequestSubject.subscribe((data) => {
        this.dataSource.data = data.items;
        this.totalCount = data.totalCount;
      })
    );
  }

  ngAfterViewInit(): void {
    this.switchToTab(1, 0);
  }

  openDayDialog(day: any): void {
    if (!day.date) return; // Skip blank cells
    if (this.dialog.openDialogs.length > 0) {
      this.dialog.closeAll();
    }
    const dialogRef = this.dialog.open(DialogAddRequestComponent, {
      width: '600px',
      height: '450px',
      data: {
        date: `${day.date}/${this.currentMonth + 1}/${this.currentYear}`,
        timeOffs: day.timeOffs,
        extra: null
      },
      panelClass: 'custom-dialog-container' // Custom CSS class for styling
    });

    // dialogRef.backdropClick().subscribe(() => {
    //   // You can log or handle other behavior here if needed
    //   dialogRef.close();
    // });
    this.subscriptions.push(
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          // // Add new time-off to timeOffData
          // const [day, month, year] = result.date.split('/').map(Number);
          // const date = new Date(year, month - 1, day);
          this.timeOffRequestFacade.AddTimeOffRequest(result.extra);
          this.timeOffData.push({ date: result.date, label: result.timeOffs });
          this.switchToTab(1, 0);
          this.subscriptions.push(
            this.timeOffRequestFacade.TimeOffAddRequest$.subscribe((res) => {
              if (res != null) {
                setTimeout(() => {
                  if (res == 1) {
                    this.switchToTab(1, 0);
                  }
                  return;
                });
              } else {
                return;
              }
            })
          );
          // this.timeOffData.push({
          //   date: new Date(result.date),
          //   label: result.label,
          // });
          // Re-generate calendar to reflect changes
          this.generateCalendar();
          this.cdr.detectChanges();

          // this.sharedFacade.showMessage(MessageType.success, 'تم طلب الإجازة بنجاح', ['']);
        }
      })
    );
  }

  leaveBalances = [
    {
      type: 'إجازات مرحلة من العام 2023',
      used: 2.5,
      total: 26,
      taken: 23.5,
      expiry: '03/31/2024'
    },
    {
      type: 'إجازة سنوية 2024',
      used: 10,
      total: 30,
      taken: 20,
      expiry: '12/31/2024'
    },
    {
      type: 'إجازة مرضية عارضة 2024',
      used: 3,
      total: 8,
      taken: 5,
      expiry: '12/31/2024'
    },
    {
      type: 'إجازة الطارئة',
      used: 9,
      total: 9,
      taken: 0,
      expiry: '12/31/2024'
    },
    {
      type: 'راحة طبية',
      used: 0,
      total: 7,
      taken: 7,
      expiry: ''
    }
  ];
  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth();
  calendarDays: { date: number | null; timeOffs: { label: string }[] }[] = [];
  weekDays: string[] = ['الأحد', 'الإثنين', 'الثلاثاء', 'الإربعاء', 'الخميس', 'الجمعة', 'السبت'];
  monthNames: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  // Sample time-off data
  timeOffData = [
    // { date: new Date(this.currentYear, this.currentMonth, 6), label: 'إجازة طارئة' },
    // { date: new Date(this.currentYear, this.currentMonth, 14), label: 'إجازة سنوية' },
    // { date: new Date(this.currentYear, this.currentMonth, 15), label: 'إجازة سنوية' }
  ];

  displayColumns = [
    // 'employeeId',
    'employeeName',
    'vacationTypeName',
    'startDate',
    'endDate',
    'createdDate',
    'directSupervisorName',
    'departmentManagerName',
    'personnelAffairsName',
    'actions',
    'personnelAffairsApprovedDate'
  ];

  getDisplayColumns(index: number) {
    return this.tabs[index].displayColumns.map(({ name }) => name);
  }

  tabs = [
    {
      title: 'طلبات قيد الإنتظار',
      activeTab: 1,
      tabNumber: 0,
      displayColumns: [
        // { name: 'employeeId', title: 'رمز المستخدم' },
        { name: 'employeeName', title: 'المستخدم' },
        { name: 'vacationTypeName', title: 'نوع الإجازة' },
        { name: 'startDate', title: 'تاريخ بداية الإجازة', pipe: 'date' },
        { name: 'endDate', title: 'تاريخ نهاية الإجازة', pipe: 'date' },
        { name: 'createdDate', title: 'تاريخ الطلب', pipe: 'datetime' }
      ]
    },
    {
      title: 'طلبات مقبولة',
      activeTab: 2,
      tabNumber: 1,
      displayColumns: [
        // { name: 'employeeId', title: 'رمز المستخدم' },
        { name: 'employeeName', title: 'المستخدم' },
        { name: 'vacationTypeName', title: 'نوع الإجازة' },
        { name: 'startDate', title: 'تاريخ بداية الإجازة', pipe: 'date' },
        { name: 'endDate', title: 'تاريخ نهاية الإجازة', pipe: 'date' },
        { name: 'createdDate', title: 'تاريخ الطلب', pipe: 'datetime' },
        { name: 'directSupervisorName', title: 'موافقة مدير المباشر' },
        { name: 'departmentManagerName', title: 'موافقة مدير الإدارة' }
      ]
    },
    {
      title: 'طلبات مرفوضة',
      activeTab: 3,
      tabNumber: 3,
      displayColumns: [
        // { name: 'employeeId', title: 'رمز المستخدم' },
        { name: 'employeeName', title: 'المستخدم' },
        { name: 'vacationTypeName', title: 'نوع الإجازة' },
        { name: 'startDate', title: 'تاريخ بداية الإجازة', pipe: 'date' },
        { name: 'endDate', title: 'تاريخ نهاية الإجازة', pipe: 'date' },
        { name: 'createdDate', title: 'تاريخ الطلب', pipe: 'datetime' },
        { name: 'directSupervisorName', title: 'رفض مدير المباشر' },
        { name: 'departmentManagerName', title: 'رفض مدير الإدارة' },
        { name: 'personnelAffairsName', title: 'رفض شؤون الإدارية' }
      ]
    },
    {
      title: 'طلبات معتمدة من شؤون العاملين',
      activeTab: 4,
      tabNumber: 2,
      displayColumns: [
        // { name: 'employeeId', title: 'رمز المستخدم' },
        { name: 'employeeName', title: 'المستخدم' },
        { name: 'vacationTypeName', title: 'نوع الإجازة' },
        { name: 'startDate', title: 'تاريخ بداية الإجازة', pipe: 'date' },
        { name: 'endDate', title: 'تاريخ نهاية الإجازة', pipe: 'date' },
        { name: 'createdDate', title: 'تاريخ الطلب', pipe: 'datetime' },
        { name: 'directSupervisorName', title: 'قبول مدير المباشر' },
        { name: 'departmentManagerName', title: 'قبول مدير الإدارة' },
        { name: 'personnelAffairsName', title: 'اعتماد شؤون الإدارية' },
        { name: 'personnelAffairsApprovedDate', title: 'تاريخ اعتماد شؤون الإدارية', pipe: 'datetime' }
      ]
    }
  ];

  //  <ng-template ngbNavContent>
  //  <div *ngIf="(timeOffRequestFacade.TimeOffRequest$ | async).length == 0">لا توجد طلبات</div>
  //  <div class="table-responsive">
  //    <table *ngIf="(timeOffRequestFacade.TimeOffRequest$ | async).length != 0" class="table table-striped table-hover">
  //      <thead>
  //        <th>المستخدم</th>
  //        <th>نوع الإجازة</th>
  //        <th>تاريخ بداية الإجازة</th>
  //        <th>تاريخ نهاية الإجازة</th>
  //        <th>تاريخ الطلب</th>
  //        <!--                <th> أعتماد الإجازة</th>-->
  //        <th>إلغاء</th>
  //      </thead>
  //      <tbody>
  //        <tr *ngFor="let item of timeOffRequestFacade.TimeOffRequest$ | async; let i = index">
  //          <td>{{ item.employeeName }}</td>
  //          <td>{{ item.vacationTypeName }}</td>
  //          <td>{{ item.startDate | date }}</td>
  //          <td>{{ item.endDate | date }}</td>
  //          <td>{{ item.createdDate | date: 'yyyy/MM/dd hh:mm a' }}</td>
  //          <!--                  <td class="td-actions ">-->
  //          <!--                    <a mat-button (click)="ApproveTimeOffRequest(item.id)" type="button"-->
  //          <!--                       aria-hidden="true" class="edit mat-button " data-notify="dismiss"> <i-->
  //          <!--                      class="material-icons text-success">done</i></a>-->
  //          <!--                  </td>-->
  //          <td class="td-actions">
  //            <a
  //              mat-button
  //              (click)="DeleteTimeOffRequest(item.id)"
  //              type="button"
  //              aria-hidden="true"
  //              class="close mat-button"
  //              data-notify="dismiss"
  //            >
  //              <i class="material-icons text-danger">close</i>
  //            </a>
  //          </td>
  //        </tr>
  //      </tbody>
  //    </table>
  //  </div>
  // </ng-template>
  // <ng-template ngbNavContent>
  //  <div *ngIf="(timeOffRequestFacade.TimeOffRequest$ | async).length == 0">لا توجد طلبات</div>
  //  <div class="table-responsive">
  //    <table *ngIf="(timeOffRequestFacade.TimeOffRequest$ | async).length != 0" class="table table-striped table-hover">
  //      <thead>
  //        <th>المستخدم</th>
  //        <th>نوع الإجازة</th>
  //        <th>تاريخ بداية الإجازة</th>
  //        <th>تاريخ نهاية الإجازة</th>
  //        <th>تاريخ الطلب</th>
  //        <th>موافقة مدير المباشر</th>
  //        <th>موافقة مدير الإدارة</th>
  //        <!--                <th>أعتماد شؤون الإجتماعية</th>-->
  //      </thead>
  //      <tbody>
  //        <tr *ngFor="let item of timeOffRequestFacade.TimeOffRequest$ | async; let i = index">
  //          <td>{{ item.employeeName }}</td>
  //          <td>{{ item.vacationTypeName }}</td>
  //          <td>{{ item.startDate | date }}</td>
  //          <td>{{ item.endDate | date }}</td>
  //          <td>{{ item.createdDate | date: 'yyyy/MM/dd hh:mm a' }}</td>
  //          <td>{{ item.directSupervisorName }}</td>
  //          <td>{{ item.departmentManagerName }}</td>
  //          <!--                  <td class="td-actions ">-->
  //          <!--                    <a mat-button (click)="ApproveTimeOffRequest(item.id)" type="button" aria-hidden="true" class="close mat-button"-->
  //          <!--                       data-notify="dismiss"> <i class="material-icons text-success">done</i></a>-->
  //          <!--                  </td>-->
  //        </tr>
  //      </tbody>
  //    </table>
  //  </div>
  // </ng-template>
  // <ng-template ngbNavContent>
  //  <div *ngIf="(timeOffRequestFacade.TimeOffRequest$ | async).length == 0">لا توجد طلبات</div>
  //  <div class="table-responsive">
  //    <table *ngIf="(timeOffRequestFacade.TimeOffRequest$ | async).length != 0" class="table table-striped table-hover">
  //      <thead>
  //        <th>المستخدم</th>
  //        <th>نوع الإجازة</th>
  //        <th>تاريخ بداية الإجازة</th>
  //        <th>تاريخ نهاية الإجازة</th>
  //        <th>تاريخ الطلب</th>
  //        <th>رفض مدير المباشر</th>
  //        <th>رفض مدير الإدارة</th>
  //        <th>رفض شؤون الإدارية</th>
  //      </thead>
  //      <tbody>
  //        <tr *ngFor="let item of timeOffRequestFacade.TimeOffRequest$ | async; let i = index">
  //          <td>{{ item.employeeName }}</td>
  //          <td>{{ item.vacationTypeName }}</td>
  //          <td>{{ item.startDate | date }}</td>
  //          <td>{{ item.endDate | date }}</td>
  //          <td>{{ item.createdDate | date: 'yyyy/MM/dd hh:mm a' }}</td>
  //          <td>{{ item.directSupervisorName }}</td>
  //          <td>{{ item.departmentManagerName }}</td>
  //          <td>{{ item.personnelAffairsName }}</td>
  //        </tr>
  //      </tbody>
  //    </table>
  //  </div>
  // </ng-template>
  // <ng-template ngbNavContent>
  //  <div *ngIf="(timeOffRequestFacade.TimeOffRequest$ | async).length == 0">لا توجد طلبات</div>
  //  <div class="table-responsive">
  //    <table *ngIf="(timeOffRequestFacade.TimeOffRequest$ | async).length != 0" class="table table-striped table-hover">
  //      <thead>
  //        <th>المستخدم</th>
  //        <th>نوع الإجازة</th>
  //        <th>تاريخ بداية الإجازة</th>
  //        <th>تاريخ نهاية الإجازة</th>
  //        <th>تاريخ الطلب</th>
  //        <th>قبول مدير المباشر</th>
  //        <th>قبول مدير الإدارة</th>
  //        <th>أعتماد شؤون الإدارية</th>
  //        <th>تاريخ أعتماد شؤون الإدارية</th>
  //        <!--                <th>إلغاء أعتماد شؤون الإدارية</th>-->
  //      </thead>
  //      <tbody>
  //        <tr *ngFor="let item of timeOffRequestFacade.TimeOffRequest$ | async; let i = index">
  //          <td>{{ item.employeeName }}</td>
  //          <td>{{ item.vacationTypeName }}</td>
  //          <td>{{ item.startDate | date }}</td>
  //          <td>{{ item.endDate | date }}</td>
  //          <td>{{ item.createdDate | date: 'yyyy/MM/dd hh:mm a' }}</td>
  //          <td>{{ item.directSupervisorName }}</td>
  //          <td>{{ item.departmentManagerName }}</td>
  //          <td>{{ item.personnelAffairsName }}</td>
  //          <td>{{ item.personnelAffairsApprovedDate | date: 'yyyy/MM/dd hh:mm a' }}</td>
  //          <!--                  <td class="td-actions ">-->
  //          <!--                    <a mat-button (click)="UnapproveTimeOffRequest(item.id)" type="button" aria-hidden="true" class="close mat-button"-->
  //          <!--                       data-notify="dismiss"> <i class="material-icons text-danger">close</i></a>-->
  //          <!--                  </td>-->
  //        </tr>
  //      </tbody>
  //    </table>
  //  </div>
  // </ng-template>

  dataSource = new MatTableDataSource<any>();
  totalCount = 0;
  pageSize = 10;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex; // MatPaginator uses 0-based index, so add 1
    this.pageSize = event.pageSize;
    this.loadTimeOffRequests(this.currentPage + 1, this.pageSize);
  }

  loadTimeOffRequests(Page: number, PageSize: number) {
    this.timeOffRequestFacade.GetMyTimeOffRequests(Page, PageSize, this.currentTabNumber);
  }

  switchToTab(activeTab: number, tabNumber: number): void {
    this.activeTab = activeTab;
    this.currentTabNumber = tabNumber;
    if (this.paginator) {
      this.paginator.firstPage();
    }
    this.timeOffRequestFacade.TimeOffRequestSubject.next(basePaginatedInitialValue);
    this.loadTimeOffRequests(1, 10);
    // this.timeOffRequestFacade.GetMyTimeOffRequests(tabNumber);
  }
  DeleteTimeOffRequest(Id: any): void {
    this.timeOffRequestFacade.DeleteTimeOffRequest(Id);
    // const prev = this.timeOffRequestsViewFacade.TimeOffRequestSubject.getValue();
    // const result = prev.filter((x: any) => x.id != Id);
    // this.timeOffRequestsViewFacade.TimeOffRequestSubject.next(result);
    // this.timeOffRequestsViewFacade.TimeOffRequestSubject.subscribe();
  }

  generateCalendar() {
    const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
    const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

    this.calendarDays = []; // Reset calendar days

    // Fill blank days from the previous month
    for (let i = firstDayOfMonth - 1; i >= 0; i--) {
      this.calendarDays.push({ date: null, timeOffs: [] });
    }

    // Fill current month days
    for (let date = 1; date <= daysInMonth; date++) {
      const currentDate = new Date(this.currentYear, this.currentMonth, date);

      // Match time-offs for the current date
      const timeOffs = this.timeOffData
        .filter((timeOff) => {
          const timeOffDate = new Date(timeOff.date);

          return (
            timeOffDate.getFullYear() === this.currentYear && timeOffDate.getMonth() === this.currentMonth && timeOffDate.getDate() === date
          );
        })
        .map((timeOff) => ({ label: timeOff.label }));

      this.calendarDays.push({ date, timeOffs });
    }

    // Fill blank days to complete the week
    while (this.calendarDays.length % 7 !== 0) {
      this.calendarDays.push({ date: null, timeOffs: [] });
    }
  }

  changeMonth(offset: number) {
    this.currentMonth += offset;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.generateCalendar();
  }

  onDelete(Id: string): void {
    if (confirm('هل أنت متأكد من عملية الإلغاء؟')) {
      // const prev = this.employeeFacade.employeePageSubject$.getValue();
      // const result = prev.items.filter((x: any) => x.id != Id);
      // this.employeeFacade.employeePageSubject$.next({ ...prev, items: result });
      // this.sharedFacade.showMessage(MessageType.success, 'تم إلغاء طلب الإجازة بنجاح', ['']);
    }
  }
}
