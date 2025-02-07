import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GetEmployeeCommand } from 'src/app/shared/employees/employee.interface';

@Component({
  selector: 'app-employee-details-employee-dues',
  templateUrl: './employee-details-employee-dues.component.html',
  styleUrl: './employee-details-employee-dues.component.scss'
})
export class EmployeeDetailsEmployeeDuesComponent {
  @Input({
    required: true
  })
  employee!: GetEmployeeCommand;
  dataSource = new MatTableDataSource<any>([
    {
      documentType: 'جواز سفر',
      documentNumber: '7',
      documentDescription: '',
      decisionDate: '',
      validityDate: '2027-7-7'
    }
  ]);

  displayedColumns: string[] = ['documentType', 'documentNumber', 'documentDescription', 'decisionDate', 'validityDate', 'actions'];
  totalCount = 1;
  pageSize = 10;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onPageChange(event: PageEvent): void {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
