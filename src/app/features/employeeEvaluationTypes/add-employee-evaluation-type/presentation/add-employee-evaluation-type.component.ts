import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AddEmployeeEvaluationTypeFacade } from '../add-employee-evaluation-type.facade';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetEmployeeEvaluationTypeCommand } from '../../show-employee-evaluation-types/show-employee-evaluation-types.interface';
import { Element, ElementType, EvaluationItem } from '../../employee-evaluation-types.interface';

@Component({
  selector: 'add-employee-evaluation-type',
  templateUrl: './add-employee-evaluation-type.component.html',
  styleUrls: ['./add-employee-evaluation-type.component.scss']
})
export default class AddEmployeeEvaluationTypeComponent implements OnDestroy, OnInit {
  evaluationForm: FormGroup;
  private subscriptions: Subscription[] = [];
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  id: boolean;
  elementTypes = Object.values(ElementType);

  constructor(
    private fb: FormBuilder,
    private addEmployeeEvaluationTypeFacade: AddEmployeeEvaluationTypeFacade,
    private ActivatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // self closing subscription
    this.ActivatedRoute.queryParams.subscribe((params) => {
      if (params['id']) {
        this.addEmployeeEvaluationTypeFacade.fetchEmployeeEvaluationType(1, 1, params['id']);
        this.id = params['id'];
      } else {
        this.id = undefined;
      }
    });

    this.subscriptions.push(
      this.addEmployeeEvaluationTypeFacade.employeeEvaluationTypesSubject$.subscribe((employeeEvaluation) => {
        if (employeeEvaluation && employeeEvaluation.items.length > 0) {
          this.evaluationForm = this.createEvaluationForm(employeeEvaluation.items[0]);
        } else {
          this.evaluationForm = this.createEvaluationForm();
        }
      })
    );
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
      ItemName: [item.ItemName || '', Validators.required],
      disabled: [item.disabled || false],
      type: [item.type || ElementType.Number, Validators.required],
      Elements: this.fb.array(
        item.Elements.map((element) => this.createElementGroup(element, item.type)),
        Validators.required
      )
    });
  }

  private createElementGroup(element: Element, type: ElementType): FormGroup {
    let validators = [Validators.required];
    switch (type) {
      case ElementType.Number:
        validators.push(Validators.pattern(/^\d+$/));
        break;
      case ElementType.Range:
        validators.push(Validators.pattern(/^\d+\s*-\s*\d+$/)); // Validates "0 - 20" format
        break;
      case ElementType.Boolean:
        // No additional validator for boolean; assumes a checkbox or similar
        break;
      case ElementType.Text:
        // Text requires no extra validators
        break;
    }
    return this.fb.group({
      ElementName: [element.ElementName, Validators.required],
      Value: [element.Value, validators]
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
        type: [ElementType.Number, Validators.required], // Default value and required validator
        disabled: [false], // Default value without validators
        Elements: this.fb.array([], Validators.required)
      },
      { validators: this.atLeastOneItemValidator('Elements') }
    );
    this.evaluationItems.push(evaluationItem);
  }

  addElementToItem(itemIndex: number, type: ElementType) {
    const elements = this.getElements(itemIndex);
    elements.push(
      this.fb.group({
        ElementName: ['', Validators.required],
        Value: ['', [Validators.required, this.getValidator(type)]] // Adjust default as needed
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
      this.subscriptions.push(
        this.addEmployeeEvaluationTypeFacade.AddEmployeeEvaluation$.subscribe((res: any) => {
          if (res.type == 1) {
            // this.evaluationForm.reset();
            this.router.navigate(['ShowEmployeeEvaluationType']);
          }
        })
      );
    } else {
      console.log('Form is invalid');
    }
  }

  private getValidator(type: ElementType) {
    switch (type) {
      case ElementType.Number:
        return Validators.pattern(/^\d+$/);
      case ElementType.Range:
        return Validators.pattern(/^\d+\s*-\s*\d+$/);
      default:
        return Validators.required;
    }
  }
}
