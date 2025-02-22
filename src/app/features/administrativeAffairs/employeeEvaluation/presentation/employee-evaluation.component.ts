import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { optionsEvaluation } from '../../../../core/core.interface';
import { EmployeeEvaluationFacade } from '../employee-evaluation.facade';
import { EmployeeFacade } from '../../employee/employee.facade';

@Component({
  selector: 'app-rewards-types',
  templateUrl: './employee-evaluation.component.html',
  styleUrl: './employee-evaluation.component.scss'
})
export class EmployeeEvaluationComponent implements OnInit {
  edit: boolean = false;
  registerForm = this.fb.group({
    id: [''],
    employeeId: ['', Validators.required],
    year: [0, Validators.required],
    evaluationId: [0, Validators.required],
    evaluationName: [''],
    employeeName: ['']
  });
  registerFormSearch = this.fb.group({
    employeeId: ['', Validators.required]
  });

  loadEmployees = (page: number, pageSize: number, searchQuery?: string): void => {
    this.employeeFacade.GetEmployee(page, pageSize, searchQuery);
  };


  onEmployeeSelect(employee: any) {
    this.registerForm.controls.employeeId.setValue(employee.id);
  }

  onEmployeeSelectRegisterFormSearch(employee: any) {
    this.registerFormSearch.controls.employeeId.setValue(employee.id);
  }

  constructor(
    private fb: FormBuilder,
    protected employeeFacade: EmployeeFacade,
    protected employeeEvaluationFacade: EmployeeEvaluationFacade,
    private cdr: ChangeDetectorRef
  ) {
    this.employeeEvaluationFacade.GetEmployeeEvaluation(null);
  }
  ngOnInit() {
    this.edit = false;
    this.loadEmployees(1, 10);
  }

  onSearch(): void {
    this.registerForm.controls.id.setValue('');
    if (this.registerFormSearch.valid) {
      this.employeeEvaluationFacade.GetEmployeeEvaluation(this.registerFormSearch.value.employeeId);
    }
  }

  onDelete(Id: string): void {
    if (confirm('هل أنت متأكد من عملية المسح؟')) {
      this.edit = false;
      this.employeeEvaluationFacade.deleteEmployeeEvaluation(Id);
      this.registerForm.reset();
    }
  }
  onReset(): void {
    this.edit = false;
    this.registerForm.reset();
    this.registerForm.setErrors(null);
    this.registerFormSearch.reset();
    this.registerFormSearch.setErrors(null);
  }
  onAdd(): void {
    this.registerForm.value.evaluationName = this.optionsEvaluation.find(
      (option) => option.value == this.registerForm.value.evaluationId
    )?.label;
    const optionEmployee = this.employeeFacade.employeeSubject$.getValue().items.find((x) => x.id == this.registerForm.value.employeeId);
    this.registerForm.value.employeeName =
      this.registerForm.value.employeeId != '' && this.registerForm.value.employeeId != null ? optionEmployee.name : '';
    if (this.registerForm.valid) {
      if (this.edit) {
        this.employeeEvaluationFacade.UpdateEmployeeEvaluation(this.registerForm?.value);
        this.onReset();
      } else {
        this.employeeEvaluationFacade.AddEmployeeEvaluation(this.registerForm?.value);
        this.onReset();
      }
    }
  }
  onEdit(jobTitle: any): void {
    this.registerForm.patchValue(jobTitle);
    this.registerForm.value.evaluationName = this.optionsEvaluation.find(
      (option) => option.value == this.registerForm.value.evaluationId
    )?.label;
    this.edit = true;
  }

  protected readonly optionsEvaluation = optionsEvaluation;
}
