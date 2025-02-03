import { Component, OnInit } from '@angular/core';
import { ShowEmployeeEvaluationTypeFacade } from '../show-employee-evaluation-types.facade';
import { GetEmployeeEvaluationTypeCommand } from '../show-employee-evaluation-types.interface';
import { ElementType } from '../../employee-evaluation-types.interface';
import { SharedFacade } from '../../../../shared/shared.facade';

@Component({
  selector: 'show-employee-evaluation-types',
  templateUrl: './show-employee-evaluation-types.component.html',
  styleUrls: ['./show-employee-evaluation-types.component.scss']
})
export default class ShowEmployeeEvaluationTypeComponent implements OnInit {
  constructor(private showEmployeeEvaluationTypeFacade: ShowEmployeeEvaluationTypeFacade,
              protected sharedFacade: SharedFacade) {}

  loadEmployeeEvaluationTypes(Page: number, PageSize: number, searchQuery?: string) {
    this.showEmployeeEvaluationTypeFacade.fetchEmployeeEvaluationTypes(Page, PageSize);
  }

  ngOnInit(): void {
    this.loadEmployeeEvaluationTypes(1, 10);
    // this.showEmployeeEvaluationTypeFacade.fetchEmployeeEvaluationTypes();
  }
  selectedEmployeeEvaluationType?: GetEmployeeEvaluationTypeCommand;

  get employeeEvaluationTypes() {
    return this.showEmployeeEvaluationTypeFacade.employeeEvaluationTypes$;
  }

  onEmployeeEvaluationTypeSelect(employeeEvaluationType) {
    // console.log(event);
    this.selectedEmployeeEvaluationType = employeeEvaluationType;
  }

  onEmployeeEvaluationTypeDelete(id: string) {
    if (confirm(`متأكد من حذف ${this.selectedEmployeeEvaluationType.name}؟`)) {
      this.showEmployeeEvaluationTypeFacade.deleteEmployeeEvaluationTypes(id);
      this.selectedEmployeeEvaluationType = undefined;
    }
  }

  getHtmlTypeBasedOnElmentType(type: ElementType) {
    switch (type) {
      case ElementType.Number:
        return 'number';
      case ElementType.Boolean:
        return 'radio';
      default:
        return 'text';
    }
  }
}
