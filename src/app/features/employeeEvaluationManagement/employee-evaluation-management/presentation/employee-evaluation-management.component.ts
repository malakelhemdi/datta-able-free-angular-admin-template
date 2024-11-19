import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  EmployeeEvaluationManagementComponentTabs,
  GeneralEvaluationTabs,
  GetEmployeeCommand
} from '../employee-evaluation-management.interface';
import { EmployeeEvaluationManagementFacade } from '../employee-evaluation-management.facade';
import { Observable, Subscription } from 'rxjs';
import { ShowEmployeeEvaluationTypeFacade } from 'src/app/features/employeeEvaluationTypes/show-employee-evaluation-types/show-employee-evaluation-types.facade';
import { GetEmployeeEvaluationTypeCommand } from 'src/app/features/employeeEvaluationTypes/show-employee-evaluation-types/show-employee-evaluation-types.interface';

@Component({
  selector: 'app-employee-evaluation-management',
  templateUrl: './employee-evaluation-management.component.html',
  styleUrls: ['./employee-evaluation-management.component.scss']
})
export default class EmployeeEvaluationManagementComponent implements OnInit, OnDestroy {
  constructor(private showEmployeeEvaluationTypeFacade: ShowEmployeeEvaluationTypeFacade) {}
  ngOnInit(): void {
    this.showEmployeeEvaluationTypeFacade.fetchEmployeeEvaluationTypes();
  }

  // Types
  selectedEmployeeEvaluationType?: GetEmployeeEvaluationTypeCommand;
  get employeeEvaluationTypes() {
    return this.showEmployeeEvaluationTypeFacade.employeeEvaluationTypes$;
  }
  //

  ngOnDestroy(): void {}
}
