import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GetEmployeeCommand } from 'src/app/shared/employees/employee.interface';

@Component({
  selector: 'employee-details-annual-leave-credits-and-deductions',
  templateUrl: './emp-details-annual-leave-credits-and-deductions.html',
  styleUrls: ['./emp-details-annual-leave-credits-and-deductions.scss']
})
export class AnnualLeaveCreditsAndDeductionsComponent implements OnInit {
  @Input({
    required: true
  })
  employee!: GetEmployeeCommand;
  dataSource = new MatTableDataSource<any>([
    {
      movementType: 'إضافة رصيد',
      leaveType: 'إجازة',
      fromDate: '-',
      toDate: '-',
      numberOfDays: '2',
      note: 'إضافة رصيد إجازة سنوية'
    },
    {
      movementType: 'إضافة رصيد',
      leaveType: 'إجازة',
      fromDate: '-',
      toDate: '-',
      numberOfDays: '4',
      note: 'إضافة رصيد إجازة سنوية'
    },
    {
      movementType: 'إضافة رصيد',
      leaveType: 'إجازة',
      fromDate: '-',
      toDate: '-',
      numberOfDays: '2',
      note: 'إضافة رصيد إجازة سنوية'
    },
    {
      movementType: 'إضافة رصيد',
      leaveType: 'إجازة',
      fromDate: '-',
      toDate: '-',
      numberOfDays: '3',
      note: 'إضافة رصيد إجازة سنوية'
    },
    {
      movementType: 'إضافة رصيد',
      leaveType: 'إجازة',
      fromDate: '-',
      toDate: '-',
      numberOfDays: '7',
      note: 'إضافة رصيد إجازة سنوية'
    }
  ]);

  displayedColumns: string[] = ['movementType', 'leaveType', 'fromDate', 'toDate', 'numberOfDays', 'note', 'actions'];
  totalCount = 1;
  pageSize = 10;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onPageChange(event: PageEvent): void {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
