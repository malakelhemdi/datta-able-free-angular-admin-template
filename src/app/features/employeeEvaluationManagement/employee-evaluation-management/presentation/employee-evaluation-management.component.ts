import { Component, OnDestroy, OnInit } from '@angular/core';
import { EvaluationItem } from 'src/app/features/employeeEvaluationTypes/employee-evaluation-types.interface';
import { ShowEmployeeEvaluationTypeFacade } from 'src/app/features/employeeEvaluationTypes/show-employee-evaluation-types/show-employee-evaluation-types.facade';
import { GetEmployeeEvaluationTypeCommand } from 'src/app/features/employeeEvaluationTypes/show-employee-evaluation-types/show-employee-evaluation-types.interface';
import { EmployeeEvaluationManagementFacade } from '../employee-evaluation-management.facade';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeesCommand, FormEvaluationItem, UnderEmployee } from '../employee-evaluation-management.interface';

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
  selectedEvaluationFormGroup: FormGroup;
  currentEmployeeRelationshipToSignInUserType: 'DirectManager' | 'higherLevelSupervisor' | 'departmentManager' | 'personnelAffairs';
  groupedEmployeesByManager: EmployeesCommand;
  onSelectedEvalutionItemChange(evaluation: AbstractControl) {
    this.selectedEvaluationFormGroup = <FormGroup>evaluation;
    this.setActiveFields();
  }

  ngOnInit(): void {
    this.showEmployeeEvaluationTypeFacade.fetchEmployeeEvaluationTypes();
    this.employeeEvaluationManagementFacade.GetEmployeesGroupedByManagerType();

    this.evaluationForm = this.fb.group({
      employee: ['', Validators.required],
      evaluationType: ['', Validators.required],
      year: [new Date().getFullYear(), Validators.required],
      evaluationScores: this.fb.array([]),
      approvals: this.fb.group({
        DirectManager: this.fb.group({
          status: [{ value: false, disabled: true }, Validators.required],
          approvedDate: [null, Validators.required]
        }),
        higherLevelSupervisor: this.fb.group({
          status: [{ value: false, disabled: true }, Validators.required],
          approvedDate: [null, Validators.required]
        }),
        departmentManager: this.fb.group({
          status: [{ value: false, disabled: true }, Validators.required],
          approvedDate: [null, Validators.required]
        }),
        personnelAffairs: this.fb.group({
          status: [{ value: false, disabled: true }, Validators.required],
          approvedDate: [null, Validators.required]
        })
      })
    });

    this.employeeEvaluationManagementFacade.groupedEmployeesByManager$.subscribe((data) => (this.groupedEmployeesByManager = data));
  }

  // Types
  get employeeEvaluationTypes() {
    return this.showEmployeeEvaluationTypeFacade.employeeEvaluationTypes$;
  }
  //

  // Grouped Employees By Manager
  // get groupedEmployeesByManager() {
  //   return this.employeeEvaluationManagementFacade.groupedEmployeesByManager$;
  // }
  //

  get selectedEvalutionType() {
    return this.evaluationForm.get('evaluationType')?.value as GetEmployeeEvaluationTypeCommand;
  }

  onEmployeeTypeSelect() {
    const employee = this.evaluationForm.get('employee')?.value as UnderEmployee;
    if (this.groupedEmployeesByManager) {
      if (this.groupedEmployeesByManager.employees.DirectManager.find((emp) => emp.id === employee.id)) {
        this.currentEmployeeRelationshipToSignInUserType = 'DirectManager';
      }
      // else
      this.setActiveFields();
    }
  }

  // Populate evaluationScores dynamically based on selected evaluation type
  onEvaluationTypeSelect(): void {
    const selectedEvaluationType = this.evaluationForm.get('evaluationType')?.value as GetEmployeeEvaluationTypeCommand;
    if (!selectedEvaluationType) return;
    this.selectedEvaluationFormGroup = null;

    const evaluationScores = selectedEvaluationType.evaluationData.EvaluationItems.map((evaluationItem) =>
      this.fb.group({
        evaluationItemName: [evaluationItem.ItemName, Validators.required],
        evaluationItemType: [evaluationItem.type, Validators.required],
        scores: this.fb.array(
          evaluationItem.Elements.map((evaluationItemElement) =>
            this.fb.group({
              elementName: [evaluationItemElement.ElementName, Validators.required],
              directManagerScore: [
                {
                  value: 0,
                  disabled: true
                },
                this.getValidation(evaluationItem.type, evaluationItemElement.Value)
              ],
              higherLevelSupervisorScore: [
                {
                  value: 0,
                  disabled: true
                },
                this.getValidation(evaluationItem.type, evaluationItemElement.Value)
              ],
              maxScore: [
                {
                  value: evaluationItemElement.Value,
                  disabled: true
                }
              ]
            })
          )
        )
      })
    );
    this.evaluationForm.setControl('evaluationScores', this.fb.array(evaluationScores || []));
  }

  getValidation(type: string, maxValue = Infinity): Validators[] {
    if (type === 'Number') return [Validators.required, Validators.max(maxValue), Validators.min(0)];
    if (type === 'Text') return [Validators.required];
    if (type === 'Range') return [Validators.required, Validators.pattern(/^\d+\s*-\s*\d+$/)]; // Handled as single-selection
    return [];
  }

  onSubmit() {
    const evaluationData = this.evaluationForm.value;
    console.log(evaluationData);
  }

  getFormArray(control: AbstractControl): FormArray {
    return control as FormArray;
  }
  ngOnDestroy(): void {}

  setActiveFields() {
    if (this.currentEmployeeRelationshipToSignInUserType === 'DirectManager') {
      if (this.selectedEvaluationFormGroup) {
        this.getFormArray(this.selectedEvaluationFormGroup.get('scores')).controls.forEach((control) => {
          control.get('directManagerScore').enable();
        });
      }
      this.evaluationForm.get('approvals').get('DirectManager').enable();
    }
  }
}
