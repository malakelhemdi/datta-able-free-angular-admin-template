import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedFacade } from '../../../../shared/shared.facade';
import { EmployeeFacade } from '../employee.facade';
import { MessageType } from '../../../../shared/shared.interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  displayedColumns: string[] = ['employeeCode', 'positionCode', 'name', 'nameEn', 'phoneNumber', 'financialNumber', 'actions'];
  dataSource = new MatTableDataSource<any>();
  totalCount = 0;
  pageSize = 10;
  currentPage = 0;

  currentText = '';
  currentSearchType = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex; // MatPaginator uses 0-based index, so add 1
    this.pageSize = event.pageSize;
    this.loadEmployeesPage(this.currentPage + 1, this.pageSize, this.currentSearchType, this.currentText);
  }

  edit: boolean = false;
  phoneNumberPattern = '[0][9]{1}[1,2,4,3,5]{1}[0-9]{7}';

  loadEmployees = (page: number, pageSize: number, searchQuery?: string): void => {
    this.employeeFacade.GetEmployee(page, pageSize);
  };

  loadEmployeesPage = (page: number, pageSize: number, searchType: string, searchQuery?: string): void => {
    this.employeeFacade.GetEmployeePage(page, pageSize, searchType, searchQuery);
  };
  registerForm: FormGroup;

  constructor(
    protected employeeFacade: EmployeeFacade,
    private fb: FormBuilder,
    protected sharedFacade: SharedFacade
  ) {
    this.registerForm = this.fb.group({
      searchType: [null, Validators.required],
      value: [null, Validators.required],
      code: [null],
      phoneNumber: [null, [Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.phoneNumberPattern)]],
      employeeName: [null]
    });
  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.edit = false;
    this.loadEmployees(1, 10);
    // this.loadEmployeesPage(1, 10, '', '');
    this.employeeFacade.employeePageSubject$.subscribe((data) => {
      console.log(data);

      this.dataSource.data = data.items;
      this.totalCount = data.totalCount;
    });
  }

  onDelete(Id: string): void {
    if (confirm('هل أنت متأكد من عملية المسح؟')) {
      this.edit = false;
      this.employeeFacade.deleteEmployee(Id);
      this.registerForm.reset();
    }
  }
  onReset(): void {
    this.registerForm.reset();
    this.registerForm.setErrors(null);
    // this.loadEmployeesPage(1, 10, '', '');
  }
  onSearch(): void {
    if (
      (this.registerForm.value.code == '' || this.registerForm.value.code == null) &&
      (this.registerForm.value.employeeName == '' || this.registerForm.value.employeeName == null) &&
      (this.registerForm.value.phoneNumber == '' || this.registerForm.value.phoneNumber == null)
    ) {
      this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخل بيانات للبحث   ', ['']);
      return;
    } else if (
      this.registerForm.get('phoneNumber').invalid &&
      this.registerForm.value.phoneNumber != '' &&
      this.registerForm.value.phoneNumber != null
    ) {
      this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال  رقم هاتف المستخدم بصيغة صحيحة  ', ['']);
      return;
    }

    const text =
      this.registerForm.get('employeeName').value != '' && this.registerForm.get('employeeName').value != null
        ? this.registerForm.value.employeeName
        : this.registerForm.get('code').value != '' && this.registerForm.get('code').value != null
          ? this.registerForm.value.code
          : this.registerForm.value.phoneNumber;
    const searchType =
      this.registerForm.get('employeeName').value != '' && this.registerForm.get('employeeName').value != null
        ? '2'
        : this.registerForm.get('code').value != '' && this.registerForm.get('code').value != null
          ? '1'
          : '3';

    this.currentSearchType = searchType;
    this.currentText = text;

    this.loadEmployeesPage(1, 10, searchType, text);
  }
}
