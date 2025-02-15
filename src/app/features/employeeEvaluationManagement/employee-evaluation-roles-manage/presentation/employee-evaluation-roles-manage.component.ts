import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrganizationalUnitFacade } from 'src/app/features/administrativeAffairs/organizational-unit/organizational-unit.facade';
import { EmployeeFacade } from 'src/app/features/administrativeAffairs/employee/employee.facade';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeEvaluationRolesManageFacade } from '../employee-evaluation-roles-manage.facade';
import { map, Subscription } from 'rxjs';
import { AllOrganizationalUnitsCommand } from 'src/app/features/administrativeAffairs/organizational-unit/organizational-unit.interface';

@Component({
  selector: 'employee-evaluation-roles-manage',
  templateUrl: './employee-evaluation-roles-manage.component.html',
  styleUrls: ['./employee-evaluation-roles-manage.component.scss']
})
export default class EmployeeEvaluationRolesManageComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
  constructor(
    protected organizationalUnitFacade: OrganizationalUnitFacade,
    private employeeFacade: EmployeeFacade,
    private employeeEvaluationRolesManageFacade: EmployeeEvaluationRolesManageFacade,
    private fb: FormBuilder
  ) {}
  form: FormGroup;

  loadEmployees = (page: number, pageSize: number, searchQuery?: string): void => {
    this.employeeFacade.GetEmployee(page, pageSize, searchQuery);
  };

  loadOrganizationalUnits = (page: number, pageSize: number, searchQuery?: string): void => {
    this.organizationalUnitFacade.GetOrganizationalUnit(page, pageSize, searchQuery);
  };

  onDirectManagerSelect(employee: any) {
    this.form.get('directManager').setValue(employee);
  }

  onHigherLevelManagerSelect(employee: any) {
    this.form.get('higherLevelManager').setValue(employee);
  }

  onDepartmentManagerSelect(employee: any) {
    this.form.get('departmentManager').setValue(employee);
  }

  onOrganizationalUnitsSelected(OrganizationalUnit: any) {
    this.form.get('organizationalUnit').setValue(OrganizationalUnit);
  }

  ngOnInit(): void {
    // this.organizationalUnitFacade.GetOrganizationalUnit();
    // this.employeeFacade.GetEmployee();

    // HERE
    this.loadOrganizationalUnits(1, 10, '');
    this.loadEmployees(1, 10);
    this.form = this.fb.group({
      organizationalUnit: [null, Validators.required],
      directManager: [''],
      higherLevelManager: [''],
      departmentManager: ['']
    });

    this.subscriptions.push(
      this.form.get('organizationalUnit').valueChanges.subscribe((organizationalUnit) => {
        if (organizationalUnit && organizationalUnit.id) {
          this.employeeEvaluationRolesManageFacade.GetManagersForOrganizationalUnit(organizationalUnit.id);
        }
      })
    );

    this.subscriptions.push(
      this.employeeEvaluationRolesManageFacade.employeeSubject$.subscribe((employee) => {
        this.form.patchValue({
          directManager: employee?.directManagerId,
          higherLevelManager: employee?.higherLevelManagerId,
          departmentManager: employee?.departmentManagerId
        });
      })
    );
  }

  public employees = this.employeeFacade.employeeSubject$;

  onSubmit() {
    if (this.form.value.organizationalUnit) {
      this.employeeEvaluationRolesManageFacade.UpdateOrganizationalUnit({
        id: this.form.value.organizationalUnit.id,
        departmentManagerId: this.form.value.departmentManager?.id,
        directManagerId: this.form.value.directManager?.id,
        higherLevelManagerId: this.form.value.higherLevelManager?.id
      });
    }
  }
}
