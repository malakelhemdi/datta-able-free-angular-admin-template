import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShowEmployeeEvaluationTypeFacade } from 'src/app/features/employeeEvaluationTypes/show-employee-evaluation-types/show-employee-evaluation-types.facade';
import { GetEmployeeEvaluationTypeCommand } from 'src/app/features/employeeEvaluationTypes/show-employee-evaluation-types/show-employee-evaluation-types.interface';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { EmployeeEvaluationManagementFacade } from '../../employee-evaluation-management/employee-evaluation-management.facade';
import { FinalFormTypes } from '../../employee-evaluation-management/employee-evaluation-management.interface';
import { EmployeeEvaluationPersonnelAffairsConfirmationFacade } from '../employee-evaluation-personnel-affairs-confirmation.facade';

@Component({
  selector: 'employee-evaluation-personnel-affairs-confirmation',
  templateUrl: './employee-evaluation-personnel-affairs-confirmation.component.html',
  styleUrls: ['./employee-evaluation-personnel-affairs-confirmation.component.scss']
})
export default class EmployeeEvaluationManagementComponent implements OnInit, OnDestroy {
  constructor(
    private showEmployeeEvaluationTypeFacade: ShowEmployeeEvaluationTypeFacade,
    private employeeEvaluationManagementFacade: EmployeeEvaluationManagementFacade,
    private employeeEvaluationPersonnelAffairsConfirmationFacade: EmployeeEvaluationPersonnelAffairsConfirmationFacade,
    private fb: FormBuilder
  ) {}

  evaluationForm: FormGroup;
  selectedEvaluationFormGroup: FormGroup;
  evaluationId: string;
  employeeCode: string;

  searchEmployeeByCode(code: string) {
    const year = this.evaluationForm.get('year')?.value as number;

    if (year && code) {
      this.employeeEvaluationPersonnelAffairsConfirmationFacade.GetEmployeeByCode(code);
    } else {
      alert('الرجاء إدخال السنة ورقم الموظف');
    }
  }

  loadEmployeeEvaluationTypes(Page: number, PageSize: number, searchQuery?: string) {
    this.showEmployeeEvaluationTypeFacade.fetchEmployeeEvaluationTypes(Page, PageSize);
  }

  ngOnInit(): void {
    // this.showEmployeeEvaluationTypeFacade.fetchEmployeeEvaluationTypes();

    //
    this.loadEmployeeEvaluationTypes(1, 10000);

    this.employeeEvaluationPersonnelAffairsConfirmationFacade.selectedEmployee$.subscribe((employee) => {
      const year = this.evaluationForm.get('year')?.value as number;
      if (employee && year) {
        this.evaluationForm.get('employee').setValue({
          name: employee.name,
          id: employee.id
        });
        this.employeeEvaluationManagementFacade.GetEmployeeEvaluation(employee.id, year);
      }
    });

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
        HigherLevelManager: this.fb.group({
          status: [{ value: false, disabled: true }, Validators.required],
          approvedDate: [null]
        }),
        DepartmentManager: this.fb.group({
          status: [{ value: false, disabled: true }, Validators.required],
          approvedDate: [null]
        }),
        PersonnelAffairs: this.fb.group({
          status: [{ value: false }, Validators.required],
          approvedDate: [null]
        })
      })
    });

    // I used this pro-longed approuch of also fetching the evaluation types, while the the evaluationType that I need is already avaiable.
    // in the employee object (this.employeeEvaluationManagementFacade.selectedEmployeeEvaluation$), becouse If angular forms deep copying problem.
    // where even if you used patchValue, setValue, or whatever, angular will not populate the values of the forms, even if the objects are identical in shape.
    // those the object must be from the same type for it to work.
    combineLatest([this.employeeEvaluationManagementFacade.selectedEmployeeEvaluation$, this.employeeEvaluationTypes]).subscribe(
      ([data, employeeEvaluationTypes]) => {
        let evaluationScores = [];
        if (data && employeeEvaluationTypes) {
          const matchingOption = employeeEvaluationTypes.items.find((type) => type.id === data.evaluationScores.evaluationType.id);
          this.evaluationForm.get('evaluationType').setValue(matchingOption);
          evaluationScores = data.evaluationScores.evaluationScores.map((evaluationItem) =>
            this.fb.group({
              evaluationItemName: [evaluationItem.evaluationItemName, Validators.required],
              evaluationItemType: [evaluationItem.evaluationItemType, Validators.required],
              scores: this.fb.array(
                evaluationItem.scores.map((evaluationItemElement) =>
                  this.fb.group({
                    elementName: [evaluationItemElement.elementName, Validators.required],
                    DirectManagerScore: [
                      evaluationItemElement.DirectManagerScore,
                      this.getValidation(evaluationItem.evaluationItemType, evaluationItemElement.maxScore)
                    ],
                    HigherLevelManagerScore: [
                      evaluationItemElement.HigherLevelManagerScore,
                      this.getValidation(evaluationItem.evaluationItemType, evaluationItemElement.maxScore)
                    ],
                    maxScore: [evaluationItemElement.maxScore]
                  })
                )
              )
            })
          );
          this.evaluationForm.get('approvals').patchValue(data.evaluationScores.approvals);
          this.evaluationId = data.id;
        } else {
          this.evaluationId = undefined;
          this.evaluationForm.get('evaluationType').setValue(undefined);
          this.evaluationForm.get('approvals').patchValue({
            DirectManager: { status: false, approvedDate: null },
            HigherLevelManager: { status: false, approvedDate: null },
            DepartmentManager: { status: false, approvedDate: null },
            PersonnelAffairs: { status: false, approvedDate: null }
          });
        }
        this.selectedEvaluationFormGroup = undefined;
        this.evaluationForm.setControl('evaluationScores', this.fb.array(evaluationScores));
      }
    );
  }

  get employeeEvaluationTypes() {
    return this.showEmployeeEvaluationTypeFacade.employeeEvaluationTypes$;
  }

  get selectedEvalutionType() {
    return this.evaluationForm.get('evaluationType')?.value as GetEmployeeEvaluationTypeCommand;
  }

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
              DirectManagerScore: [0, this.getValidation(evaluationItem.type, evaluationItemElement.Value)],
              HigherLevelManagerScore: [0, this.getValidation(evaluationItem.type, evaluationItemElement.Value)],
              maxScore: [evaluationItemElement.Value]
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
      this.evaluationForm.get('approvals').get('PersonnelAffairs').get('approvedDate').setValue(new Date());
      const formValue = this.evaluationForm.getRawValue() as FinalFormTypes;

      if (
        formValue.approvals.DirectManager.status &&
        formValue.approvals.DepartmentManager.status &&
        formValue.approvals.HigherLevelManager.status
      ) {
        this.addUpdateNewEvaluation(formValue);
      } else {
        alert('تأكد من موافقة جميع الأطراف');
      }
    } else {
      alert('تأكد من القيم المطلوبة');
    }
  }

  private addUpdateNewEvaluation(formValue: FinalFormTypes) {
    const percentage = (this.calculateTotalLargerScore(formValue) / this.sumEvaluationScores(formValue, 'maxScore')) * 100;
    const result = {
      employeeId: formValue.employee.id,
      year: formValue.year,
      isApproved: this.getIsApprovedValue(formValue),
      totalScore: this.calculateTotalLargerScore(formValue),
      percentage: +percentage.toFixed(3),
      evaluationId: this.calculateEvaluationId(percentage),
      evaluationTypeId: formValue.evaluationType.id,
      evaluationDate: new Date().toISOString(),
      evaluationScores: formValue
      // totalScore from larger score of eather DirectManagerScore or HigherLevelManagerScore
    };
    // console.log(result);

    if (this.evaluationId) {
      this.employeeEvaluationManagementFacade.updateEmployeeEvaluation({
        ...result,
        id: this.evaluationId
      });
    }
  }

  getFormArray(control: AbstractControl): FormArray {
    return control as FormArray;
  }

  private calculateTotalLargerScore(formValue: FinalFormTypes): number {
    return formValue.evaluationScores
      .filter((scoreGroup) => scoreGroup.evaluationItemType === 'Number') // Only process items with type 'Number'
      .reduce((total, scoreGroup) => {
        const groupTotal = scoreGroup.scores.reduce((sum, score) => {
          const largerScore = Math.max(score.DirectManagerScore, score.HigherLevelManagerScore);
          return sum + largerScore;
        }, 0);
        return total + groupTotal;
      }, 0);
  }

  private getIsApprovedValue(formValue: FinalFormTypes) {
    if (formValue.approvals.PersonnelAffairs.status) {
      return 4;
    } else if (formValue.approvals.DepartmentManager.status) {
      return 3;
    } else if (formValue.approvals.HigherLevelManager.status) {
      return 2;
    } else if (formValue.approvals.DirectManager.status) {
      return 1;
    } else {
      return 0;
    }
  }

  private sumEvaluationScores(formValue: FinalFormTypes, attribute: 'DirectManagerScore' | 'HigherLevelManagerScore' | 'maxScore'): number {
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

  private calculateEvaluationId(percentage: number) {
    if (percentage > 90) {
      return 1;
    } else if (percentage > 75) {
      return 2;
    } else if (percentage > 60) {
      return 3;
    } else if (percentage > 45) {
      return 4;
    } else {
      return 5;
    }
  }

  ngOnDestroy(): void {}
}
