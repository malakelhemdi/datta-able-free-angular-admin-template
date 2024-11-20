import { Component, OnDestroy, OnInit } from '@angular/core';
import { EvaluationItem } from 'src/app/features/employeeEvaluationTypes/employee-evaluation-types.interface';
import { ShowEmployeeEvaluationTypeFacade } from 'src/app/features/employeeEvaluationTypes/show-employee-evaluation-types/show-employee-evaluation-types.facade';
import { GetEmployeeEvaluationTypeCommand } from 'src/app/features/employeeEvaluationTypes/show-employee-evaluation-types/show-employee-evaluation-types.interface';
import { EmployeeEvaluationManagementFacade } from '../employee-evaluation-management.facade';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee-evaluation-management',
  templateUrl: './employee-evaluation-management.component.html',
  styleUrls: ['./employee-evaluation-management.component.scss']
})
export default class EmployeeEvaluationManagementComponent implements OnInit, OnDestroy {
  constructor(
    private showEmployeeEvaluationTypeFacade: ShowEmployeeEvaluationTypeFacade,
    private employeeEvaluationManagementFacade: EmployeeEvaluationManagementFacade,
    private fb: FormBuilder
  ) {}

  evaluationForm: FormGroup;

  ngOnInit(): void {
    this.showEmployeeEvaluationTypeFacade.fetchEmployeeEvaluationTypes();
    this.employeeEvaluationManagementFacade.GetEmployeesGroupedByManagerType();

    this.evaluationForm = this.fb.group({
      employeeId: ['', Validators.required],
      evaluationTypeId: ['', Validators.required],
      year: [new Date().getFullYear(), Validators.required],
      evaluationScores: this.fb.array([])
    });
  }

  get evaluationScores(): FormArray {
    return this.evaluationForm.get('evaluationScores') as FormArray;
  }

  // Types
  selectedEmployeeEvaluationType?: GetEmployeeEvaluationTypeCommand;
  selectedElementItem?: EvaluationItem;
  get employeeEvaluationTypes() {
    return this.showEmployeeEvaluationTypeFacade.employeeEvaluationTypes$;
  }
  //

  // Grouped Employees By Manager
  get groupedEmployeesByManager() {
    return this.employeeEvaluationManagementFacade.groupedEmployeesByManager$;
  }
  //

  onChangeElementItem(evaluationItem: EvaluationItem) {
    this.selectedElementItem = evaluationItem;
  }

  onSelectedEmployeeEvaluationTypeChange() {
    this.selectedElementItem = undefined;
  }

  onSubmit() {
    if (this.evaluationForm.valid) {
      const evaluationData = this.evaluationForm.value;
      console.log('Submitting:', evaluationData);
      // Send `evaluationData` to backend
    }
  }

  metric1 = [
    { name: 'معرفة العمل و الإلمام بالجوانب الفنية المتعلقة بها', score: 80, randomValue1: 75, randomValue2: 62 },
    { name: 'المقدرة على وضع الاولويات في العمل', score: 70, randomValue1: 59, randomValue2: 42 },
    { name: 'الدقة والسرعة في إنجاز الاعمال بانقل نسبة ممكنة من الأخطاء', score: 70, randomValue1: 68, randomValue2: 52 },
    { name: 'المقدرة على أداء العمل بدون رقابة أو متابعة', score: 70, randomValue1: 63, randomValue2: 60 },
    { name: 'درجة الاعتماد عليه', score: 60, randomValue1: 54, randomValue2: 53 },
    { name: 'تقييم الأفكار والمقترحات', score: 60, randomValue1: 48, randomValue2: 29 },
    { name: 'المحافظة على معدات و أدوات العمل', score: 50, randomValue1: 44, randomValue2: 30 },
    { name: 'التعامل مع صعوبات العمل', score: 50, randomValue1: 38, randomValue2: 25 },
    { name: 'إتباع قواعد الأمن والسلامة', score: 50, randomValue1: 41, randomValue2: 32 },
    { name: 'نقل آراء الآخرين ومناقشتها', score: 50, randomValue1: 50, randomValue2: 45 },
    { name: 'المواظبة والمحافظة على مواعيد العمل', score: 50, randomValue1: 43, randomValue2: 37 },
    { name: 'القابلية للتدريب والالتزام بحضور الدورات التدريبية', score: 40, randomValue1: 31, randomValue2: 28 }
  ];

  ngOnDestroy(): void {}
}
