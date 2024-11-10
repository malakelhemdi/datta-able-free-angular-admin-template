import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AddEmployeeEvaluationTypeFacade } from '../add-employee-evaluation-type.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetEmployeeEvaluationTypeCommand } from '../../show-employee-evaluation-types/show-employee-evaluation-types.interface';
import { Element, EvaluationItem } from '../add-employee-evaluation-type.interface';

@Component({
  selector: 'add-employee-evaluation-type',
  templateUrl: './add-employee-evaluation-type.component.html',
  styleUrls: ['./add-employee-evaluation-type.component.scss']
})
export default class AddEmployeeEvaluationTypeComponent implements OnDestroy, OnInit {
  evaluationForm: FormGroup;
  employeeEvaluationTypesSubjectSub: Subscription;
  id: boolean;

  constructor(
    private fb: FormBuilder,
    private addEmployeeEvaluationTypeFacade: AddEmployeeEvaluationTypeFacade,
    private ActivatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ActivatedRoute.queryParams.subscribe((params) => {
      if (params['id']) {
        this.addEmployeeEvaluationTypeFacade.fetchEmployeeEvaluationType(params['id']);
        this.id = params['id'];
      } else {
        this.id = undefined;
      }
    });

    this.employeeEvaluationTypesSubjectSub = this.addEmployeeEvaluationTypeFacade.employeeEvaluationTypesSubject$.subscribe(
      (employeeEvaluation) => {
        if (employeeEvaluation && employeeEvaluation.length > 0) {
          this.evaluationForm = this.createEvaluationForm(employeeEvaluation[0]);
        } else {
          this.evaluationForm = this.createEvaluationForm();
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.employeeEvaluationTypesSubjectSub) {
      this.employeeEvaluationTypesSubjectSub.unsubscribe();
    }
  }

  private createEvaluationForm(initialData?: GetEmployeeEvaluationTypeCommand): FormGroup {
    return this.fb.group({
      name: [initialData?.name || '', [Validators.required, Validators.minLength(4)]],
      isForCitizens: [initialData?.isForCitizens || false],
      evaluationData: this.fb.group(
        {
          EvaluationItems: this.fb.array(
            initialData?.evaluationData?.EvaluationItems?.map((item) => this.createEvaluationItemGroup(item)) || [],
            Validators.required
          )
        },
        { validators: this.atLeastOneItemValidator('EvaluationItems') }
      )
    });
  }

  private createEvaluationItemGroup(item: EvaluationItem): FormGroup {
    return this.fb.group({
      ItemName: [item.ItemName, Validators.required],
      Elements: this.fb.array(
        item.Elements.map((element) => this.createElementGroup(element)),
        Validators.required
      )
    });
  }

  private createElementGroup(element: Element): FormGroup {
    return this.fb.group({
      ElementName: [element.ElementName, Validators.required],
      Value: [element.Value, [Validators.required, Validators.pattern(/^\d+$/)]]
    });
  }

  private atLeastOneItemValidator(controlName: string) {
    return (formGroup: FormGroup) => {
      const formArray = formGroup.get(controlName) as FormArray;
      return formArray && formArray.length > 0 ? null : { required: true };
    };
  }

  get evaluationItems(): FormArray {
    return this.evaluationForm.get('evaluationData.EvaluationItems') as FormArray;
  }

  getElements(itemIndex: number): FormArray {
    return this.evaluationItems.at(itemIndex).get('Elements') as FormArray;
  }

  addEvaluationItem() {
    const evaluationItem = this.fb.group(
      {
        ItemName: ['', Validators.required],
        Elements: this.fb.array([], Validators.required)
      },
      { validators: this.atLeastOneItemValidator('Elements') }
    );
    this.evaluationItems.push(evaluationItem);
  }

  addElementToItem(itemIndex: number) {
    const elements = this.getElements(itemIndex);
    elements.push(
      this.fb.group({
        ElementName: ['', Validators.required],
        Value: ['', [Validators.required, Validators.pattern(/^\d+$/)]]
      })
    );
  }

  removeEvaluationItem(index: number) {
    this.evaluationItems.removeAt(index);
  }

  removeElement(itemIndex: number, elementIndex: number) {
    const elements = this.getElements(itemIndex);
    elements.removeAt(elementIndex);
  }

  onSubmit() {
    if (this.evaluationForm.valid) {
      if (this.id) {
        this.addEmployeeEvaluationTypeFacade.UpdateEmployeeEvaluationType({
          ...this.evaluationForm.value,
          id: this.id
        });
      } else {
        this.addEmployeeEvaluationTypeFacade.AddEmployeeEvaluationType(this.evaluationForm.value);
      }
      const AddEmployeeEvaluationSubscription = this.addEmployeeEvaluationTypeFacade.AddEmployeeEvaluation$.subscribe((res: any) => {
        if (res.type == 1) {
          // this.evaluationForm.reset();
          this.router.navigate(['ShowEmployeeEvaluationType']);
          AddEmployeeEvaluationSubscription.unsubscribe();
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
