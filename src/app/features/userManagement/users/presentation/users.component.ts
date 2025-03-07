import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsersFacade } from '../users.facade';
import { EmployeeFacade } from '../../../administrativeAffairs/employee/employee.facade';
import { PermissionFacade } from '../../Permissions/permission.facade';
import { MessageType } from '../../../../shared/shared.interfaces';
import { SharedFacade } from '../../../../shared/shared.facade';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { GetEmployeeSmallCommand } from 'src/app/shared/employees/employee.interface';

@Component({
  selector: 'app-rewards-types',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['name', 'userName', 'roleName', 'employeeName', 'isActive', 'actions'];
  dataSource = new MatTableDataSource<any>();
  totalCount = 0;
  pageSize = 10;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  loadUsers(page: number, pageSize: number) {
    return this.usersFacade.GetUser(page, pageSize);
  }

  loadEmployees = (page: number, pageSize: number, searchQuery?: string): void => {
    this.employeeFacade.GetEmployee(page, pageSize, searchQuery);
  };


  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex; // MatPaginator uses 0-based index, so add 1
    this.pageSize = event.pageSize;
    this.loadUsers(this.currentPage + 1, this.pageSize);
  }

  loadGroupsMenu(Page: number, PageSize: number) {
    this.permissionFacade.GetGroupsMenu(Page, PageSize);
  }

  ngOnInit() {
    this.changePass();
    this.edit = false;
    this.dataSource.paginator = this.paginator;
    this.registerForm.controls.id.setValue('');
    this.loadEmployees(1, 10);
    this.loadGroupsMenu(1, 10);
    // this.permissionFacade.GetGroupsMenu();
    this.loadUsers(this.currentPage + 1, this.pageSize);
    this.usersFacade.Users$.subscribe((data) => {
      this.dataSource.data = data.items;
      this.totalCount = data.totalCount;
    });
  }

  edit: boolean = false;
  registerForm = this.fb.group({
    id: [''],
    employee: [null as any],
    // employeeId: [''],
    // employeeName: [''],

    role: [null as any, Validators.required],
    // roleId: ['', Validators.required],
    // roleName: [''],

    name: ['', Validators.required],
    userName: ['', Validators.required],
    password: [
      null,
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,16}$/)
      ]
    ],
    // password: [''],
    confirmPassword: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,16}$/)
      ]
    ],

    isActive: [false],
    changePassword: [true]
  });

  constructor(
    private fb: FormBuilder,
    protected usersFacade: UsersFacade,
    protected employeeFacade: EmployeeFacade,
    protected permissionFacade: PermissionFacade,
    public sharedFacade: SharedFacade
  ) {
    // this.employeeFacade.GetEmployee();
  }

  get f() {
    return this.registerForm.controls;
  }

  changePass() {
    if (this.registerForm.value.changePassword) {
      this.registerForm.controls.password.setValidators([
        Validators.minLength(6),
        Validators.maxLength(16),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,16}$/)
      ]);
      this.registerForm.controls.confirmPassword.setValidators([
        Validators.minLength(6),
        Validators.maxLength(16),
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,16}$/)
      ]);
    } else {
      this.registerForm.controls.password.clearValidators();
      this.registerForm.controls.confirmPassword.clearValidators();
    }
  }

  onDelete(Id: string): void {
    if (confirm('هل أنت متأكد من عملية المسح؟')) {
      this.usersFacade.deleteUser(Id).subscribe(() => {
        this.onReset();
      });
    }
  }

  onReset() {
    this.edit = false;
    this.registerForm.reset();
    this.registerForm.setErrors(null);
    this.registerForm.controls.isActive.setValue(false);
    return this.loadUsers(this.currentPage + 1, this.pageSize);
  }

  onAdd(): void {
    // const optionEmployee = this.employeeFacade.employeeSubject$.getValue().items.find((x) => x.id == this.registerForm.value.employeeId);
    // const optionGroup = this.permissionFacade.GroupsMenuSubject$.getValue().items.find(
    //   (x: { id: string | null | undefined }) => x.id == this.registerForm.value.roleId
    // );

    // this.registerForm.value.roleName = this.registerForm.value.roleId != '' ? optionGroup.name : '';
    // this.registerForm.value.employeeName =
    //   this.registerForm.value.employeeId != '' && this.registerForm.value.employeeId != null ? optionEmployee.name : '';

    const objectToBeSent = {
      ...this.registerForm.value,
      roleId: this.registerForm.value.role.id,
      roleName: this.registerForm.value.role.name,
      employeeId: this.registerForm.value?.employee?.id || '',
      employeeName: this.registerForm.value?.employee?.name || '',
      employee: undefined,
      role: undefined
    };

    if (this.registerForm.valid) {
      if (this.edit) {
        this.usersFacade.UpdateUser(objectToBeSent).subscribe(() => {
          this.onReset();
        });
      } else {
        this.usersFacade.AddUser(objectToBeSent).subscribe(() => {
          this.onReset().subscribe(() => {
            this.paginator.lastPage();
          });
        });
      }
    } else {
      if (this.registerForm.value.name == '') {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال اسم المستخدم  ', ['']);
        return;
      } else if (this.registerForm.controls.role.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، رجاء اختر المجموعة', ['']);
        return;
      } else if (this.registerForm.controls.userName.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، رجاء ادخال اسم الدخول', ['']);
        return;
      } else if (
        this.registerForm.value.password == '' ||
        this.registerForm.value.confirmPassword == ' ' ||
        (this.registerForm.controls.password.invalid && this.registerForm.value.changePassword)
      ) {
        this.sharedFacade.showMessage(
          MessageType.warning,
          'عفواً، الرجاء ادخال كلمة المرور بطول يتراوح بين 6 إلى 16حرف وتتضمن على الأقل حرف صغير واحد وحرف كبير واحد ورقم واحد وحرف خاص واحد',
          ['']
        );
        return;
      } else if (
        this.registerForm.value.password != this.registerForm.value.confirmPassword &&
        (this.registerForm.value.changePassword || this.edit)
      ) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً،  كلمة المرور غير متطابقة', ['']);
        return;
      }
    }
  }

  onEdit(user: any): void {
    this.registerForm.patchValue({
      ...user,
      employee: {
        id: user.employeeId,
        name: user.employeeName
      },
      role: {
        id: user.roleId,
        name: user.roleName
      }
    });
    this.registerForm.controls.password.clearValidators();
    this.registerForm.controls.confirmPassword.clearValidators();
    this.registerForm.controls.password.setValue(null);
    this.registerForm.controls.confirmPassword.setValue('');
    this.registerForm.controls.changePassword.setValue(false);
    this.edit = true;
  }
}
