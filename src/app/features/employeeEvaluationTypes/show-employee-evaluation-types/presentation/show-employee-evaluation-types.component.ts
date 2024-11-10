import { Component, OnInit } from '@angular/core';
import { ShowEmployeeEvaluationTypeFacade } from '../show-employee-evaluation-types.facade';
import { GetEmployeeEvaluationTypeCommand } from '../show-employee-evaluation-types.interface';

@Component({
  selector: 'show-employee-evaluation-types',
  templateUrl: './show-employee-evaluation-types.component.html',
  styleUrls: ['./show-employee-evaluation-types.component.scss']
})
export default class ShowEmployeeEvaluationTypeComponent implements OnInit {
  constructor(private showEmployeeEvaluationTypeFacade: ShowEmployeeEvaluationTypeFacade) {}
  ngOnInit(): void {
    this.showEmployeeEvaluationTypeFacade.fetchEmployeeEvaluationTypes();
  }
  selectedEmployeeEvaluationType?: GetEmployeeEvaluationTypeCommand;

  get employeeEvaluationTypes() {
    return this.showEmployeeEvaluationTypeFacade.employeeEvaluationTypes$;
  }

  onEmployeeEvaluationTypeDelete(id: string) {
    if (confirm(`متأكد من حذف ${this.selectedEmployeeEvaluationType.name}؟`)) {
      this.showEmployeeEvaluationTypeFacade.deleteEmployeeEvaluationTypes(id);
      this.selectedEmployeeEvaluationType = undefined;
    }
  }
}
