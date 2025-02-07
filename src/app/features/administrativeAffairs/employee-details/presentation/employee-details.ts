import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeDetailsFacade } from '../employee-details.facade';

@Component({
  selector: 'app-employee',
  templateUrl: './employee-details.html',
  styleUrls: ['./employee-details.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  tabs = [
    'البيانات الشخصية',
    'البيانات الوظيفية',
    'البيانات المالية',
    'المؤهلات العلمية',
    'أرصدة وخصومات الإجازات السنوية',
    'الحالة الوظيفية',
    'مستحقات الموظف'
  ];
  activeTab = 0;
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private employeeDetailsFacade: EmployeeDetailsFacade,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.ActivatedRoute.queryParams.subscribe((params) => {
      if (params['id']) {
        this.employeeDetailsFacade.GetEmployeePage(1, 1, '1', params['id']);
      }
    });
  }

  get employee() {
    return this.employeeDetailsFacade.employeePageSubject$.getValue().items[0];
  }

  changeTab($index: number) {
    this.activeTab = $index;
    this.cdr.detectChanges();
  }
}
