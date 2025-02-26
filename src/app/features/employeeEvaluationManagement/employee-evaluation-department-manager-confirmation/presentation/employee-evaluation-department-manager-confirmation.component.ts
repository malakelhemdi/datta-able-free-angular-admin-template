import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeEvaluationDepartmentManagerConfirmationFacade } from '../employee-evaluation-department-manager-confirmation.facade';
import { FormControl, FormGroup } from '@angular/forms';
import getLastFourYears from 'src/app/shared/utils/getLastFourYears';
import { Router } from '@angular/router';

@Component({
  selector: 'employee-evaluation-department-manager-confirmation',
  templateUrl: './employee-evaluation-department-manager-confirmation.component.html',
  styleUrls: ['./employee-evaluation-department-manager-confirmation.component.scss']
})
export default class EmployeeEvaluationDepartmentManagerConfirmationComponent implements OnInit {
  constructor(
    protected employeeEvaluationManagementFacade: EmployeeEvaluationDepartmentManagerConfirmationFacade,
    private router: Router
  ) {

  }
  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.loadEvaluations(this.currentPage + 1, this.pageSize);
    this.loadEvaluationsTypes(1, 10);

    this.employeeEvaluationManagementFacade.employeeEvaluations$.subscribe((res) => {
      this.dataSource.data = res.items;
      this.totalCount = res.totalCount;
      console.log(res);
      
    });
  }


  filterForm = new FormGroup({
    evaluationType: new FormControl(null),
    year: new FormControl(null)
  });

  loadEvaluationsTypes(page: number, pageSize: number) {
    return this.employeeEvaluationManagementFacade.GetEmployeeEvaluationTypes(page, pageSize);
  }

  onSubmit() {
    console.log(this.filterForm.value);
    // this.loadEvaluations(this.currentPage + 1, this.pageSize);
  }

  get last4Years() {
    return getLastFourYears();
  }

  onViewEvaluation({ employeeId, year }: any) {
    this.router.navigate([`/EmployeeEvaluationManagement`], {
      queryParams: { employeeId, year }
    });
  }

  loadEvaluations(page: number, pageSize: number) {
    return this.employeeEvaluationManagementFacade.GetEmployeeEvaluation(page, pageSize);
  }


  displayedColumns: string[] = ['select','employeeName', 'evaluationName', 'evaluationTypeName', 'percentage', 'year','isApproved', 'actions'];
  dataSource = new MatTableDataSource<any>([]);

  totalCount = 1;
  pageSize = 10;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;


  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex; // MatPaginator uses 0-based index, so add 1
    this.pageSize = event.pageSize;
    this.loadEvaluations(this.currentPage + 1, this.pageSize);
  }

  selection = new SelectionModel<any>(true, []);

  /** Returns whether the number of selected rows matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise, clears selection. */
  toggleAllRows() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** Log selected rows */
  logSelectedRows() {
    console.log(this.selection.selected);
  }

  protected getManagerName(status: number): string {
    const managerMap: { [key: number]: string } = {
        4: 'شؤون الموظفين',
        3: 'مدير القسم',
        2: 'المدير الأعلى',
        1: 'المدير المباشر',
        0: 'لا يوجد'
    };

    return managerMap[status] || 'غير معروف';
}

}
