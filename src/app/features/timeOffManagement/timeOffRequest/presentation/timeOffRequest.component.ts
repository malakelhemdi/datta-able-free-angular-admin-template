import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { TimeOffRequestFacade } from '../timeOffRequest.facade';
import { SharedFacade } from '../../../../shared/shared.facade';
import { MatDialog } from '@angular/material/dialog';
import {  DialogAddRequestComponent } from './dialogAdd-request/dialogAdd-request';
import { EmployeeFacade } from '../../../administrativeAffairs/employee/employee.facade';
import { MessageType } from '../../../../shared/shared.interfaces';

declare var $: any;

@Component({
  selector: 'app-rewards-types',
  templateUrl: './timeOffRequest.component.html',
  styleUrl: './timeOffRequest.component.scss'
})
export class TimeOffRequestComponent implements OnInit {

  constructor(private dialog: MatDialog,
              protected employeeFacade: EmployeeFacade,
              private sharedFacade: SharedFacade,
              private cdr: ChangeDetectorRef) {
    this.employeeFacade.GetEmployeePage('','');
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
        show:day.timeOffs != '',

      },
      panelClass: 'custom-dialog-container', // Custom CSS class for styling

    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {

        // // Add new time-off to timeOffData
        // const [day, month, year] = result.date.split('/').map(Number);
        // const date = new Date(year, month - 1, day);

        this.timeOffData.push({ date: result.date, label: result.timeOffs })
        //
        // this.timeOffData.push({
        //   date: new Date(result.date),
        //   label: result.label,
        // });
        // Re-generate calendar to reflect changes
        this.generateCalendar();
        this.cdr.detectChanges();
        this.sharedFacade.showMessage(MessageType.success, 'تم طلب الإجازة بنجاح', ['']);

      }
    });
}

  leaveBalances = [
    {
      type: 'إجازات مرحلة من العام 2023',
      used: 2.5,
      total: 26,
      taken: 23.5,
      expiry: '03/31/2024',
    },
    {
      type: 'إجازة سنوية 2024',
      used: 10,
      total: 30,
      taken: 20,
      expiry: '12/31/2024',
    },
    {
      type: 'إجازة مرضية عارضة 2024',
      used: 3,
      total: 8,
      taken: 5,
      expiry: '12/31/2024',
    },
    {
      type: 'إجازة الطارئة',
      used: 9,
      total: 9,
      taken: 0,
      expiry: '12/31/2024',
    },
    {
      type: 'راحة طبية',
      used: 0,
      total: 7,
      taken: 7,
      expiry: '',
    },
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
    'December',
  ];

  // Sample time-off data
  timeOffData = [
    { date: new Date(this.currentYear, this.currentMonth, 6), label: 'إجازة طارئة' },
    { date: new Date(this.currentYear, this.currentMonth, 14), label: 'إجازة سنوية' },
    { date: new Date(this.currentYear, this.currentMonth, 15), label: 'إجازة سنوية' },
  ];

  ngOnInit() {
    this.generateCalendar();
  }

  // generateCalendar() {
  //   const firstDayOfMonth = new Date(this.currentYear, this.currentMonth, 1).getDay();
  //   const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
  //   const daysInPrevMonth = new Date(this.currentYear, this.currentMonth, 0).getDate();
  //
  //   this.calendarDays = [];
  //
  //   // Fill blank days from the previous month
  //   for (let i = firstDayOfMonth - 1; i >= 0; i--) {
  //     this.calendarDays.push({ date: null, timeOffs: [] });
  //   }
  //
  //   // Fill current month days
  //   for (let date = 1; date <= daysInMonth; date++) {
  //     const currentDate = new Date(this.currentYear, this.currentMonth, date);
  //     const timeOffs = this.timeOffData
  //       .filter((timeOff) => timeOff.date.toDateString() === currentDate.toDateString())
  //       .map((timeOff) => ({ label: timeOff.label }));
  //
  //     this.calendarDays.push({ date, timeOffs });
  //   }
  //
  //   // Fill blank days to complete the week
  //   while (this.calendarDays.length % 7 !== 0) {
  //     this.calendarDays.push({ date: null, timeOffs: [] });
  //   }
  // }
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
            timeOffDate.getFullYear() === this.currentYear &&
            timeOffDate.getMonth() === this.currentMonth &&
            timeOffDate.getDate() === date
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
    const prev = this.employeeFacade.employeePageSubject$.getValue();
    const result = prev.filter((x: any) => x.id != Id);
    this.employeeFacade.employeePageSubject$.next(result);
    this.employeeFacade.employeePageSubject$.subscribe();
    this.sharedFacade.showMessage(MessageType.success, 'تم إلغاء طلب الإجازة بنجاح', ['']);

  }

}
