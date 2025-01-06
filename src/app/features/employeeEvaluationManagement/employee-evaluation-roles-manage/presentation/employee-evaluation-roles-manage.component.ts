import { Component, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, map, merge, Observable, OperatorFunction, Subject, switchMap } from 'rxjs';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { OrganizationalUnitFacade } from 'src/app/features/administrativeAffairs/organizational-unit/organizational-unit.facade';
import { EmployeeFacade } from 'src/app/features/administrativeAffairs/employee/employee.facade';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AllOrganizationalUnitsCommand } from 'src/app/features/administrativeAffairs/organizational-unit/organizational-unit.interface';
import { EmployeeEvaluationRolesManageFacade } from '../employee-evaluation-roles-manage.facade';

@Component({
  selector: 'employee-evaluation-roles-manage',
  templateUrl: './employee-evaluation-roles-manage.component.html',
  styleUrls: ['./employee-evaluation-roles-manage.component.scss']
})
export default class EmployeeEvaluationRolesManageComponent implements OnInit {
  constructor(
    private organizationalUnitFacade: OrganizationalUnitFacade,
    private employeeFacade: EmployeeFacade,
    private employeeEvaluationRolesManageFacade: EmployeeEvaluationRolesManageFacade,
    private fb: FormBuilder
  ) {}
  @ViewChild('instance', { static: true }) instance: NgbTypeahead;
  form: FormGroup;

  ngOnInit(): void {
    this.organizationalUnitFacade.GetOrganizationalUnit();
    this.employeeFacade.GetEmployee();
    this.form = this.fb.group({
      organizationalUnit: [null, Validators.required],
      directManager: [''],
      higherLevelManager: [''],
      departmentManager: ['']
    });

    this.form.get('organizationalUnit').valueChanges.subscribe((organizationalUnit) => {
      if (organizationalUnit && organizationalUnit.id) {
        this.employeeEvaluationRolesManageFacade.GetManagersForOrganizationalUnit(organizationalUnit.id);
      }
    });

    this.employeeEvaluationRolesManageFacade.employeeSubject$.subscribe((employee) => {
      this.form.patchValue({
        directManager: employee?.directManagerId,
        higherLevelManager: employee?.higherLevelManagerId,
        departmentManager: employee?.departmentManagerId
      });
    });
  }

  compareById = (option: any, value: any): boolean => {
    return option && value ? option.id === value.id : option === value;
  };

  public employees = this.employeeFacade.employee$;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  search: OperatorFunction<string, readonly AllOrganizationalUnitsCommand[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;
    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      switchMap((term) =>
        this.organizationalUnitFacade.OrganizationalUnit$.pipe(
          map((organizationalUnits) =>
            term === ''
              ? organizationalUnits
              : organizationalUnits.filter((organizationalUnit) => organizationalUnit.name.toLowerCase().includes(term.toLowerCase()))
          )
        )
      )
    );
  };
  formatter = (organizationalUnit: AllOrganizationalUnitsCommand) => organizationalUnit.name;
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
