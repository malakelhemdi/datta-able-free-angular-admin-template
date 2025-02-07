import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GetEmployeeCommand } from 'src/app/shared/employees/employee.interface';

@Component({
  selector: 'app-employee-details-job-status',
  templateUrl: './employee-details-job-status.component.html',
  styleUrl: './employee-details-job-status.component.scss'
})
export class EmployeeDetailsJobStatusComponent {
  @Input({
    required: true
  })
  employee!: GetEmployeeCommand;

  dataSource = new MatTableDataSource<any>([
    {
      jobStatus: 'إيقاف',
      fromDate: '2024-8-1',
      toDate: '31-10-2024',
      status: ''
    },
    {
      jobStatus: 'إيقاف',
      fromDate: '2024-8-1',
      toDate: '31-10-2024',
      status: ''
    }
  ]);

  displayedColumns: string[] = ['jobStatus', 'fromDate', 'toDate', 'status', 'actions'];
  totalCount = 1;
  pageSize = 10;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onPageChange(event: PageEvent): void {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
