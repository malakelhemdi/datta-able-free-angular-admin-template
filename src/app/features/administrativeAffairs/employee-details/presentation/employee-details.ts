import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeDetailsFacade } from '../employee-details.facade';

@Component({
  selector: 'app-employee',
  templateUrl: './employee-details.html',
  styleUrls: ['./employee-details.scss']
})
export class EmployeeDetailsComponent implements OnInit {
  tabs = ['بيانات شخصية', 'بيانات الوظيفة'];
  activeTab = 0;
  constructor(
    private ActivatedRoute: ActivatedRoute,
    private employeeDetailsFacade: EmployeeDetailsFacade
  ) {}

  ngOnInit(): void {
    this.ActivatedRoute.queryParams.subscribe((params) => {
      if (params['id']) {
        this.employeeDetailsFacade.GetEmployeePage(1, 1, '1', params['id']);
        // this.id = params['id'];
      }
    });

    this.employeeDetailsFacade.employeePageSubject$.subscribe((data) => {
      console.log(data);
    });
  }

  get employee() {
    return this.employeeDetailsFacade.employeePageSubject$.getValue().items[0];
  }
}
