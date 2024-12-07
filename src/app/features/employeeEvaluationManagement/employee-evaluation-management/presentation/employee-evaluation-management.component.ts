import { Component, OnDestroy, OnInit } from '@angular/core';
import { EvaluationItem } from 'src/app/features/employeeEvaluationTypes/employee-evaluation-types.interface';
import { ShowEmployeeEvaluationTypeFacade } from 'src/app/features/employeeEvaluationTypes/show-employee-evaluation-types/show-employee-evaluation-types.facade';
import { GetEmployeeEvaluationTypeCommand } from 'src/app/features/employeeEvaluationTypes/show-employee-evaluation-types/show-employee-evaluation-types.interface';
import { EmployeeEvaluationManagementFacade } from '../employee-evaluation-management.facade';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeesCommand, FinalFormTypes, FormEvaluationItem, Score, UnderEmployee } from '../employee-evaluation-management.interface';

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
      year: [null, Validators.required],
      evaluationScores: this.fb.array([]),
      approvals: this.fb.group({
        DirectManager: this.fb.group({
          status: [{ value: false, disabled: true }, Validators.required],
          approvedDate: [null]
        }),
        higherLevelSupervisor: this.fb.group({
          status: [{ value: false, disabled: true }, Validators.required],
          approvedDate: [null]
        }),
        departmentManager: this.fb.group({
          status: [{ value: false, disabled: true }, Validators.required],
          approvedDate: [null]
        }),
        personnelAffairs: this.fb.group({
          status: [{ value: false, disabled: true }, Validators.required],
          approvedDate: [null]
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
    if (this.evaluationForm.valid) {
      this.evaluationForm.enable();
      const formValue = this.evaluationForm.value as FinalFormTypes;

      if (this.evaluationForm.get('evaluationScores').untouched) {
        if (confirm('لم تقم بتغير اي قيمة في اي حقل, متابعة؟')) {
          this.addNewEvaluation(formValue);
        } else {
          return;
        }
      } else {
        this.addNewEvaluation(formValue);
      }
    } else {
      alert('تأكد من القيم المطلوبة');
    }

    // if (this.evaluationForm.valid) {
    // const currentEmployeeRelationshipToSignInUserTypeController = this.evaluationForm
    //   .get('approvals')
    //   .get(this.currentEmployeeRelationshipToSignInUserType);

    // if (currentEmployeeRelationshipToSignInUserTypeController.get('status').value) {
    //   currentEmployeeRelationshipToSignInUserTypeController.get('approvedDate').setValue(new Date());
    // }

    // this.evaluationForm.disable();
    // }
  }

  private addNewEvaluation(formValue: FinalFormTypes) {
    const result = {
      employeeId: formValue.employee.id,
      evaluationTypeId: formValue.evaluationType.id,
      year: formValue.year,
      evaluationDate: new Date().toISOString(),
      evaluationScores: formValue,
      totalScore: this.calculateTotalLargerScore(formValue),
      // totalScore from larger score of eather directManagerScore or higherLevelSupervisorScore
      isApproved: this.getIsApprovedValue(formValue),
      percentage: +((this.calculateTotalLargerScore(formValue) / this.sumEvaluationScores(formValue, 'maxScore')) * 100).toFixed(3)
    };
    this.employeeEvaluationManagementFacade.AddEmployeeEvaluation(result);
  }

  getFormArray(control: AbstractControl): FormArray {
    return control as FormArray;
  }
  ngOnDestroy(): void {}

  private setActiveFields() {
    if (this.currentEmployeeRelationshipToSignInUserType === 'DirectManager') {
      if (this.selectedEvaluationFormGroup) {
        this.getFormArray(this.selectedEvaluationFormGroup.get('scores')).controls.forEach((control) => {
          control.get('directManagerScore').enable();
        });
      }
      this.evaluationForm.get('approvals').get('DirectManager').enable();
    }
  }

  private calculateTotalLargerScore(formValue: FinalFormTypes): number {
    return formValue.evaluationScores
      .filter((scoreGroup) => scoreGroup.evaluationItemType === 'Number') // Only process items with type 'Number'
      .reduce((total, scoreGroup) => {
        const groupTotal = scoreGroup.scores.reduce((sum, score) => {
          const largerScore = Math.max(score.directManagerScore, score.higherLevelSupervisorScore);
          return sum + largerScore;
        }, 0);
        return total + groupTotal;
      }, 0);
  }

  private getIsApprovedValue(formValue: FinalFormTypes) {
    if (formValue.approvals.DirectManager.status) {
      return 1;
    } else if (formValue.approvals.higherLevelSupervisor.status) {
      return 2;
    } else if (formValue.approvals.departmentManager.status) {
      return 3;
    } else if (formValue.approvals.personnelAffairs.status) {
      return 4;
    } else {
      return 0;
    }
  }

  private sumEvaluationScores(
    formValue: FinalFormTypes,
    attribute: 'directManagerScore' | 'higherLevelSupervisorScore' | 'maxScore'
  ): number {
    if (!formValue || !formValue.evaluationScores) {
      return 0;
    }

    return formValue.evaluationScores
      .filter((scoreGroup) => scoreGroup.evaluationItemType === 'Number') // Filter items with type 'Number'
      .reduce((total, scoreGroup) => {
        return (
          total +
          scoreGroup.scores.reduce((sum, score) => {
            return sum + (score[attribute] || 0); // Add the specified attribute, fallback to 0 if undefined
          }, 0)
        );
      }, 0);
  }
}
