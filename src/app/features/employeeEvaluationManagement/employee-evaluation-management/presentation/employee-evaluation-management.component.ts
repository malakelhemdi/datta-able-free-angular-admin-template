import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShowEmployeeEvaluationTypeFacade } from 'src/app/features/employeeEvaluationTypes/show-employee-evaluation-types/show-employee-evaluation-types.facade';
import { GetEmployeeEvaluationTypeCommand } from 'src/app/features/employeeEvaluationTypes/show-employee-evaluation-types/show-employee-evaluation-types.interface';
import { EmployeeEvaluationManagementFacade } from '../employee-evaluation-management.facade';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeesCommand, FinalFormTypes, FormEvaluationItem, Score, UnderEmployee } from '../employee-evaluation-management.interface';
import { combineLatest, Subscription } from 'rxjs';
import getLastFourYears from 'src/app/shared/utils/getLastFourYears';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-evaluation-management',
  templateUrl: './employee-evaluation-management.component.html',
  styleUrls: ['./employee-evaluation-management.component.scss']
})
export default class EmployeeEvaluationManagementComponent implements OnInit, OnDestroy {
  constructor(
    private showEmployeeEvaluationTypeFacade: ShowEmployeeEvaluationTypeFacade,
    private employeeEvaluationManagementFacade: EmployeeEvaluationManagementFacade,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute
  ) { }

  evaluationForm: FormGroup;
  selectedEvaluationFormGroup: FormGroup;
  currentEmployeeRelationshipToSignInUserType: 'DirectManager' | 'HigherLevelManager' | 'DepartmentManager';
  groupedEmployeesByManager: EmployeesCommand;
  allEmployees: UnderEmployee[] = [];
  evaluationId: string;

  subscriptions: Subscription[] = [];

  onSelectedEvalutionItemChange(evaluation: AbstractControl) {
    this.selectedEvaluationFormGroup = <FormGroup>evaluation;
    this.setActiveFields();
  }

  loadEmployeeEvaluationTypes(Page: number, PageSize: number, searchQuery?: string) {
    this.showEmployeeEvaluationTypeFacade.fetchEmployeeEvaluationTypes(Page, PageSize);
  }

  ngOnInit(): void {
    this.loadEmployeeEvaluationTypes(1, 10);
    // this.showEmployeeEvaluationTypeFacade.fetchEmployeeEvaluationTypes();
    this.employeeEvaluationManagementFacade.GetEmployeesGroupedByManagerType();

    this.evaluationForm = this.fb.group({
      employee: [null, Validators.required],
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
          status: [{ value: false, disabled: true }, Validators.required],
          approvedDate: [null]
        })
      })
    });



    combineLatest([this.employeeEvaluationManagementFacade.groupedEmployeesByManager$, this.activeRoute.queryParams]).subscribe(([groupedEmployees, params]) => {
      this.groupedEmployeesByManager = groupedEmployees;
      this.allEmployees = [
        ...(groupedEmployees?.employees?.DepartmentManager ? groupedEmployees?.employees?.DepartmentManager : []),
        ...(groupedEmployees?.employees?.HigherLevelManager ? groupedEmployees?.employees?.HigherLevelManager : []),
        ...(groupedEmployees?.employees?.DirectManager ? groupedEmployees?.employees?.DirectManager : [])
      ];

      if (params['employeeId'] && params['year']) {
        this.evaluationForm.get('employee').setValue(this.allEmployees.find((emp) => emp.id === params['employeeId']));
        this.evaluationForm.get('year').setValue(params['year']);
        this.employeeEvaluationManagementFacade.GetEmployeeEvaluation(params['employeeId'], params['year']);
      }
    });

    // this.employeeEvaluationManagementFacade.groupedEmployeesByManager$.subscribe((data) => {
    //   this.groupedEmployeesByManager = data;
    //   this.allEmployees = [
    //     ...(data?.employees?.DepartmentManager ? data?.employees?.DepartmentManager : []),
    //     ...(data?.employees?.HigherLevelManager ? data?.employees?.HigherLevelManager : []),
    //     ...(data?.employees?.DirectManager ? data?.employees?.DirectManager : [])
    //   ];
    // });

    // this.activeRoute.queryParams.subscribe((params) => {
    //   if (params['employeeId'] && params['year']) {
    //     console.log(this.allEmployees);

    //     this.evaluationForm.get('employee').setValue( this.allEmployees.find((emp) => emp.id === params['employeeId']));
    //     this.evaluationForm.get('year').setValue(params['year']);
    //     this.employeeEvaluationManagementFacade.GetEmployeeEvaluation(params['employeeId'], params['year']);
    //   }
    // });

    // this.subscriptions.push(
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
        this.setActiveFields();
      }
    );
  }

  // Types
  get employeeEvaluationTypes() {
    return this.showEmployeeEvaluationTypeFacade.employeeEvaluationTypes$;
  }
  //

  get last4Years() {
    return getLastFourYears();
  }

  get selectedEvalutionType() {
    return this.evaluationForm.get('evaluationType')?.value as GetEmployeeEvaluationTypeCommand;
  }

  onEmployeeTypeSelect() {
    const employee = this.evaluationForm.get('employee')?.value as UnderEmployee;
    const year = this.evaluationForm.get('year')?.value as number;

    if (this.groupedEmployeesByManager) {
      if (
        this.groupedEmployeesByManager?.employees?.DirectManager &&
        this.groupedEmployeesByManager.employees.DirectManager.find((emp) => emp.id === employee.id)
      ) {
        this.currentEmployeeRelationshipToSignInUserType = 'DirectManager';
      } else if (
        this.groupedEmployeesByManager?.employees?.DepartmentManager &&
        this.groupedEmployeesByManager.employees.DepartmentManager.find((emp) => emp.id === employee.id)
      ) {
        this.currentEmployeeRelationshipToSignInUserType = 'DepartmentManager';
      } else if (
        this.groupedEmployeesByManager?.employees?.HigherLevelManager &&
        this.groupedEmployeesByManager.employees.HigherLevelManager.find((emp) => emp.id === employee.id)
      ) {
        this.currentEmployeeRelationshipToSignInUserType = 'HigherLevelManager';
      }
      this.setActiveFields();
    }
    if (year && employee) {
      this.employeeEvaluationManagementFacade.GetEmployeeEvaluation(employee.id, year);
    }
  }

  onYearSelect() {
    const year = this.evaluationForm.get('year')?.value as number;
    const employee = this.evaluationForm.get('employee')?.value as UnderEmployee;

    if (year && employee) {
      this.employeeEvaluationManagementFacade.GetEmployeeEvaluation(employee.id, year);
    }
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
      this.evaluationForm.get('approvals').get(this.currentEmployeeRelationshipToSignInUserType).get('approvedDate').setValue(new Date());

      const formValue = this.evaluationForm.getRawValue() as FinalFormTypes;

      if (this.evaluationForm.get('evaluationScores').untouched) {
        if (confirm('لم تقم بتغير اي قيمة في اي حقل, متابعة؟')) {
          this.addUpdateNewEvaluation(formValue);
        } else {
          return;
        }
      } else {
        this.addUpdateNewEvaluation(formValue);
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
    if (this.evaluationId) {
      this.employeeEvaluationManagementFacade.updateEmployeeEvaluation({
        ...result,
        id: this.evaluationId
      });
    } else {
      this.employeeEvaluationManagementFacade.AddEmployeeEvaluation(result);
    }
  }

  getFormArray(control: AbstractControl): FormArray {
    return control as FormArray;
  }

  isDisabledField: boolean = true;

  private setActiveFields() {
    const approvals = this.evaluationForm.get('approvals').getRawValue();

    const isOtherManagerActive = () =>
      approvals.HigherLevelManager.status || approvals.DepartmentManager.status || approvals.PersonnelAffairs.status;

    const toggleField = (managerType: string, condition: boolean) => {
      const managerControl = this.evaluationForm.get('approvals').get(managerType);
      if (condition) {
        managerControl.disable({ onlySelf: true, emitEvent: false });
      } else {
        managerControl.enable({ onlySelf: true, emitEvent: false });
      }
      this.isDisabledField = condition;
    };

    switch (this.currentEmployeeRelationshipToSignInUserType) {
      case 'DirectManager':
        toggleField('DirectManager', isOtherManagerActive());
        break;
      case 'HigherLevelManager':
        toggleField('HigherLevelManager', isOtherManagerActive());
        break;
      case 'DepartmentManager':
        toggleField('DepartmentManager', isOtherManagerActive());
        break;
      default:
        console.warn('Unknown manager type:', this.currentEmployeeRelationshipToSignInUserType);
    }
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

  // private getIsApprovedValue(formValue: FinalFormTypes) {
  //   if (formValue.approvals.DirectManager.status) {
  //     return 1;
  //   } else if (formValue.approvals.HigherLevelManager.status) {
  //     return 2;
  //   } else if (formValue.approvals.DepartmentManager.status) {
  //     return 3;
  //   } else if (formValue.approvals.PersonnelAffairs.status) {
  //     return 4;
  //   } else {
  //     return 0;
  //   }
  // }

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

  isFieldAvailable(position: 'DirectManager' | 'DepartmentManager' | 'HigherLevelManager'): boolean {
    const availablePositions = {
      DirectManager: ['DirectManager', 'DepartmentManager'],
      HigherLevelManager: ['HigherLevelManager', 'DepartmentManager'],
      DepartmentManager: ['DirectManager', 'HigherLevelManager', 'DepartmentManager']
    };

    return availablePositions[position]?.includes(this.currentEmployeeRelationshipToSignInUserType) || false;
  }

  ngOnDestroy(): void { }
}
// •	أكبر من 90%: ممتاز
//     •	من 75% إلى 90%: جيد جدًا
//     •	من 60% إلى 75%: جيد
//     •	من 45% إلى 60%: متوسط
//     •	أقل من 45%: ضعيف

// private setActiveFields() {
//   const approvals = this.evaluationForm.get('approvals').getRawValue();

//   if (this.currentEmployeeRelationshipToSignInUserType === 'DirectManager') {
//     if (approvals.HigherLevelManager.status || approvals.DepartmentManager.status || approvals.PersonnelAffairs.status) {
//       this.evaluationForm.get('approvals').get('DirectManager').disable();
//       this.isDisabledField = true;
//     } else {
//       this.evaluationForm.get('approvals').get('DirectManager').enable();
//       this.isDisabledField = false;
//     }
//   } else if (this.currentEmployeeRelationshipToSignInUserType === 'HigherLevelManager') {
//     if (approvals.HigherLevelManager.status || approvals.DepartmentManager.status || approvals.PersonnelAffairs.status) {
//       this.evaluationForm.get('approvals').get('HigherLevelManager').disable();
//       this.isDisabledField = true;
//     } else {
//       this.evaluationForm.get('approvals').get('HigherLevelManager').enable();
//       this.isDisabledField = false;
//     }
//   } else if (this.currentEmployeeRelationshipToSignInUserType === 'DepartmentManager') {

//     if (approvals.HigherLevelManager.status || approvals.DepartmentManager.status || approvals.PersonnelAffairs.status) {
//       this.evaluationForm.get('approvals').get('DepartmentManager').disable();
//       this.isDisabledField = true;
//     } else {
//       this.evaluationForm.get('approvals').get('DepartmentManager').enable();
//       this.isDisabledField = false;
//     }

//   }
// }

// isFieldAvailable(position: 'DirectManager' | 'DepartmentManager' | 'HigherLevelManager') {
//   switch (position) {
//     case 'DirectManager':
//       return (
//         this.currentEmployeeRelationshipToSignInUserType === 'DirectManager' ||
//         this.currentEmployeeRelationshipToSignInUserType === 'DepartmentManager'
//       );
//     case 'HigherLevelManager':
//       return (
//         this.currentEmployeeRelationshipToSignInUserType === 'HigherLevelManager' ||
//         this.currentEmployeeRelationshipToSignInUserType === 'DepartmentManager'
//       );
//     case 'DepartmentManager':
//       return true;
//     default:
//       return false;
//   }
// }
