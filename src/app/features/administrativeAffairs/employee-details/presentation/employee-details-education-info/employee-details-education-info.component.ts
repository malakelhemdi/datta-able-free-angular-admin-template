import { Component, Input, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GetEmployeeCommand } from 'src/app/shared/employees/employee.interface';

@Component({
  selector: 'app-employee-details-education-info',
  templateUrl: './employee-details-education-info.component.html',
  styleUrl: './employee-details-education-info.component.scss'
})
export class EmployeeDetailsEducationInfoComponent {
  @Input({
    required: true
  })
  employee!: GetEmployeeCommand;
  dataSource = new MatTableDataSource<any>([
    {
      degree: 'بكالوريس',
      specialty: 'محاسبة',
      date: '2005',
      place: 'جامعة طرابلس'
    }
  ]);

  displayedColumns: string[] = ['degree', 'specialty', 'date', 'place', 'actions'];
  totalCount = 1;
  pageSize = 10;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onPageChange(event: PageEvent): void {}

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
