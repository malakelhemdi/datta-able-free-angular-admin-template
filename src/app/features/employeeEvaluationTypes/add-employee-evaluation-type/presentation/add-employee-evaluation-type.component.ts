import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AddEmployeeEvaluationTypeFacade } from '../add-employee-evaluation-type.facade';

@Component({
  selector: 'add-employee-evaluation-type',
  templateUrl: './add-employee-evaluation-type.component.html',
  styleUrls: ['./add-employee-evaluation-type.component.scss']
})
export default class AddEmployeeEvaluationTypeComponent {
  evaluationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private addEmployeeEvaluationTypeFacade: AddEmployeeEvaluationTypeFacade
  ) {
    this.evaluationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      isForCitizens: [false],
      evaluationData: this.fb.group(
        {
          EvaluationItems: this.fb.array([], Validators.required)
        },
        { validators: this.atLeastOneItemValidator('EvaluationItems') }
      )
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
      this.addEmployeeEvaluationTypeFacade.AddEmployeeEvaluationType(this.evaluationForm.value);
      const AddEmployeeEvaluationSubscription = this.addEmployeeEvaluationTypeFacade.AddEmployeeEvaluation$.subscribe((res: any) => {
        if (res.type == 1) {
          this.evaluationForm.reset();
          AddEmployeeEvaluationSubscription.unsubscribe();
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
