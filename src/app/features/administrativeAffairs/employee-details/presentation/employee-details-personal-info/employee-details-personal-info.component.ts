import { Component, Input } from '@angular/core';
import { GetEmployeeCommand } from 'src/app/shared/employees/employee.interface';

@Component({
  selector: 'app-employee-details-personal-info',
  templateUrl: './employee-details-personal-info.component.html',
  styleUrl: './employee-details-personal-info.component.scss'
})
export class EmployeeDetailsPersonalInfoComponent {
  @Input({
    required: true
  })
  employee!: GetEmployeeCommand;
}
