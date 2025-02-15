import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShowEmployeeEvaluationTypeFacade } from '../show-employee-evaluation-types.facade';
import { GetEmployeeEvaluationTypeCommand } from '../show-employee-evaluation-types.interface';
import { ElementType } from '../../employee-evaluation-types.interface';
import { SharedFacade } from '../../../../shared/shared.facade';
import { Subscription } from 'rxjs';

@Component({
  selector: 'show-employee-evaluation-types',
  templateUrl: './show-employee-evaluation-types.component.html',
  styleUrls: ['./show-employee-evaluation-types.component.scss']
})
export default class ShowEmployeeEvaluationTypeComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
  constructor(
    private showEmployeeEvaluationTypeFacade: ShowEmployeeEvaluationTypeFacade,
    protected sharedFacade: SharedFacade
  ) {}

  loadEmployeeEvaluationTypes(Page: number, PageSize: number, searchQuery?: string) {
    return this.showEmployeeEvaluationTypeFacade.fetchEmployeeEvaluationTypes(Page, PageSize);
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
      this.subscriptions.push(
        this.showEmployeeEvaluationTypeFacade.deleteEmployeeEvaluationTypes(id).subscribe(() => {
          this.loadEmployeeEvaluationTypes(1, 10);
        })
      );
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
