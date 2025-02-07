import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { GetEmployeeCommand } from 'src/app/shared/employees/employee.interface';

@Component({
  selector: 'app-employee-details-financial-info',
  templateUrl: './employee-details-financial-info.component.html',
  styleUrl: './employee-details-financial-info.component.scss'
})
export class EmployeeDetailsFinancialInfoComponent implements OnInit {
  @Input({
    required: true
  })
  employee!: GetEmployeeCommand;
  ngOnInit(): void {}
}
