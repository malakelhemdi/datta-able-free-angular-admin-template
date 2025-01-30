import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { TimeOffRequestFacade } from '../timeOffRequest.facade';
import { SharedFacade } from '../../../../shared/shared.facade';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddRequestComponent } from './dialogAdd-request/dialogAdd-request';
import { EmployeeFacade } from '../../../administrativeAffairs/employee/employee.facade';
import { MessageType } from '../../../../shared/shared.interfaces';

@Component({
  selector: 'app-rewards-types',
  templateUrl: './timeOffRequest.component.html',
  styleUrl: './timeOffRequest.component.scss'
})
export class TimeOffRequestComponent implements OnInit {
  activeTab: number = 1;
  constructor(
    private dialog: MatDialog,
    protected employeeFacade: EmployeeFacade,
    private sharedFacade: SharedFacade,
    protected timeOffRequestFacade: TimeOffRequestFacade,
    private cdr: ChangeDetectorRef
  ) {
    // this.employeeFacade.GetEmployeePage('', '');
    this.timeOffRequestFacade.GetMyTimeOffRequests(0);
    this.switchToTab(1, 0);
  }

  loadEmployeesPage = (page: number, pageSize: number, searchType: string, searchQuery?: string): void => {
    this.employeeFacade.GetEmployeePage(page, pageSize, searchType, searchQuery);
  };

  ngOnInit() {
    this.generateCalendar();
    this.loadEmployeesPage(1, 10, '', '');
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
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // // Add new time-off to timeOffData
        // const [day, month, year] = result.date.split('/').map(Number);
        // const date = new Date(year, month - 1, day);
        this.timeOffRequestFacade.AddTimeOffRequest(result.extra);
        this.timeOffData.push({ date: result.date, label: result.timeOffs });
        this.switchToTab(1, 0);
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
        });
        // this.timeOffData.push({
        //   date: new Date(result.date),
        //   label: result.label,
        // });
        // Re-generate calendar to reflect changes
        this.generateCalendar();
        this.cdr.detectChanges();

        // this.sharedFacade.showMessage(MessageType.success, 'تم طلب الإجازة بنجاح', ['']);
      }
    });
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

  switchToTab(activeTab: number, tabNumber: number): void {
    this.activeTab = activeTab;
    this.timeOffRequestFacade.TimeOffRequest$.subscribe(null);
    this.timeOffRequestFacade.TimeOffRequestSubject.next([]);
    this.timeOffRequestFacade.GetMyTimeOffRequests(tabNumber);
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
      const prev = this.employeeFacade.employeePageSubject$.getValue();
      const result = prev.items.filter((x: any) => x.id != Id);
      this.employeeFacade.employeePageSubject$.next({ ...prev, items: result });
      this.sharedFacade.showMessage(MessageType.success, 'تم إلغاء طلب الإجازة بنجاح', ['']);
    }
  }
}
