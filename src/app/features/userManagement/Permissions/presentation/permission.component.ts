import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PermissionFacade } from '../permission.facade';
import { MessageType } from '../../../../shared/shared.interfaces';
import { SharedFacade } from '../../../../shared/shared.facade';
import { async, Subscription } from 'rxjs';
import { Permission } from '../permission.interface';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-evaluations-types',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit, OnDestroy {
  edit: boolean = false;
  selectedPermissionIds: string[] = [];
  registerForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    permissions: [this.selectedPermissionIds, Validators.required]
  });
  // permissionsData: any;
  permissionsData: {} = {};
  private subscription: Subscription;
  constructor(
    private fb: FormBuilder,
    protected permissionFacade: PermissionFacade,
    protected sharedFacade: SharedFacade,
    private cdr: ChangeDetectorRef
  ) {}

  displayedColumns: string[] = ['name', 'actions'];
  dataSource = new MatTableDataSource<any>();
  totalCount = 0;
  pageSize = 10;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex; // MatPaginator uses 0-based index, so add 1
    this.pageSize = event.pageSize;
    this.loadAllGroups(this.currentPage + 1, this.pageSize);
  }

  loadAllGroups(Page: number, PageSize: number, searchQuery?: string) {
    this.permissionFacade.GetAllGroup(Page, PageSize);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.loadAllGroups(1, 10);
    this.registerForm.controls.id.setValue('');
    this.permissionFacade.GetAllPermission();

    this.permissionFacade.AllGroupSubject$.subscribe((data) => {
      this.dataSource.data = data.items;
      this.totalCount = data.totalCount;
    });

    this.edit = false;
    this.subscription = this.permissionFacade.permission$.subscribe((data: Permission) => {
      this.permissionsData = data;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  // onSubmit(): void {
  // this.permissionFacade.GetAllGroup();

  //  this.permissionsData  = this.permissionFacade.permissionSubject$.getValue() ;
  // }
  onDelete(Id: string): void {
    if (confirm('هل أنت متأكد من عملية المسح؟')) {
      this.edit = false;
      this.selectedPermissionIds = [];
      this.permissionFacade.deleteGroup(Id);
      this.registerForm.reset();
    }
  }
  onReset(): void {
    this.edit = false;
    this.selectedPermissionIds = [];
    this.registerForm.reset();
    this.registerForm.setErrors(null);
  }
  onAdd(): void {
    if (this.registerForm.value.permissions?.length == 0 || this.selectedPermissionIds.length == 0) {
      this.sharedFacade.showMessage(MessageType.warning, 'اضافة مجموعة', ['رجاء اختيار صلاحية للمجموعة']);
      return;
    }
    if (this.registerForm.valid) {
      if (this.edit) {
        this.permissionFacade.UpdateGroup(this.registerForm?.value);
        this.onReset();
        return;
      } else {
        this.permissionFacade.AddGroup(this.registerForm?.value);
        this.onReset();
        return;
      }
    } else {
      this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال اسم المجموعة', ['']);
    }
  }
  isSelected(permissionId: string): boolean {
    return this.selectedPermissionIds.includes(permissionId);
  }

  onCheckboxChange(event: any, permissionId: string) {
    if (event.target.checked) {
      this.selectedPermissionIds.push(permissionId);
    } else {
      const index = this.selectedPermissionIds.indexOf(permissionId);
      if (index !== -1) {
        this.selectedPermissionIds.splice(index, 1);
      }
    }
    this.registerForm.controls.permissions.setValue(this.selectedPermissionIds);
  }

  onSelectAll(event: any) {
    if (event.target.checked) {
      // Collect all permission IDs
      const allPermissionIds = Object.values(this.permissionsData)
        .flat()
        .map((permission: Permission) => permission.id);
      this.selectedPermissionIds = allPermissionIds;
    } else {
      this.selectedPermissionIds = [];
    }
    this.registerForm.controls.permissions.setValue(this.selectedPermissionIds);
  }

  onEdit(group: any): void {
    this.selectedPermissionIds = [];
    Object.keys(group.permissions).forEach((key) => {
      group.permissions[key].forEach((item: { id: string }) => {
        this.selectedPermissionIds.push(item.id);
      });
    });
    // group.permissions.push(this.selectedPermissionIds)
    this.registerForm.patchValue(group);
    this.registerForm.controls.permissions.setValue(this.selectedPermissionIds);
    this.edit = true;
  }
  protected readonly Object = Object;
}
