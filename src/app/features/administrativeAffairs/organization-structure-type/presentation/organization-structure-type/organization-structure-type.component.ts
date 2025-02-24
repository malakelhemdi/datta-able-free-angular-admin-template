import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedFacade } from '../../../../../shared/shared.facade';
import { MessageType } from '../../../../../shared/shared.interfaces';
import { OrganizationStructureTypeFacade } from '../../organization-structure-type.facade';

@Component({
  selector: 'app-organization-structure-type',
  templateUrl: './organization-structure-type.component.html',
  styleUrl: './organization-structure-type.component.scss'
})
export class OrganizationStructureTypeComponent implements OnInit{
  displayedColumns: string[] = ['name', 'actions'];
  dataSource = new MatTableDataSource<any>();
  totalCount = 0;
  pageSize = 10;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  loadBanks(page: number, pageSize: number) {
    return this.organizationStructureTypeFacade.fetchOrganizationStructureTypes(page, pageSize);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.registerForm.controls.id.setValue('');
    this.loadBanks(this.currentPage + 1, this.pageSize);
    this.organizationStructureTypeFacade.fetchOrganizationStructureTypesSubject$.subscribe((data) => {
      this.dataSource.data = data.items;
      this.totalCount = data.totalCount;
    });
  }

  edit: boolean = false;
  registerForm = this.fb.group({
    id: [''],
    name: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    protected organizationStructureTypeFacade: OrganizationStructureTypeFacade,
    public sharedFacade: SharedFacade
  ) {}

  onDelete(Id: string): void {
    if (confirm('هل أنت متأكد من عملية المسح؟')) {
      this.organizationStructureTypeFacade.deleteOrganizationStructureTypes(Id).subscribe(() => {
        this.onReset();
      });
    }
  }
  onReset() {
    this.edit = false;
    this.registerForm.reset();
    this.registerForm.setErrors(null);
    return this.loadBanks(this.currentPage + 1, this.pageSize);
  }

  onAdd(): void {
    if (this.registerForm.valid) {
      if (this.edit) {
        this.organizationStructureTypeFacade.UpdateOrganizationStructureTypes(this.registerForm?.value).subscribe(() => {
          this.onReset();
        });
      } else {
        this.organizationStructureTypeFacade.AddOrganizationStructureTypes(this.registerForm?.value).subscribe(() => {
          this.onReset().subscribe(() => {
            this.paginator.lastPage();
          });
        });
      }
    } else {
      this.showNotification('عفواً، الرجاء ادخال اسم المصرف', '');
    }
  }

  showNotification(title, text) {
    this.sharedFacade.showMessage(MessageType.warning, title, ['']);
  }

  onEdit(bank: any): void {
    this.registerForm.patchValue(bank);
    this.edit = true;
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex; // MatPaginator uses 0-based index, so add 1
    this.pageSize = event.pageSize;
    this.loadBanks(this.currentPage + 1, this.pageSize);
  }


}
