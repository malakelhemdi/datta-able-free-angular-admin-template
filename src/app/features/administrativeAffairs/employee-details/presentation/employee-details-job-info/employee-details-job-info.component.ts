import { Component, Input } from '@angular/core';
import { GetEmployeeCommand } from 'src/app/shared/employees/employee.interface';

@Component({
  selector: 'app-employee-details-job-info',
  templateUrl: './employee-details-job-info.component.html',
  styleUrl: './employee-details-job-info.component.scss'
})
export class EmployeeDetailsJobInfoComponent {
  @Input({
    required: true
  })
  employee!: GetEmployeeCommand;
}
