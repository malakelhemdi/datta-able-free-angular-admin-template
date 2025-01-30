import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NationalitiesFacade } from '../nationalities.facade';
import { optionsNationalityType } from '../nationalities.interface';
import { MessageType } from '../../../../shared/shared.interfaces';
import { SharedFacade } from '../../../../shared/shared.facade';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-rewards-types',
  templateUrl: './nationalities.component.html',
  styleUrl: './nationalities.component.scss'
})
export class NationalitiesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'nationalityTypeName', 'actions'];
  dataSource = new MatTableDataSource<any>();
  totalCount = 0;
  pageSize = 10;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex; // MatPaginator uses 0-based index, so add 1
    this.pageSize = event.pageSize;
    this.loadNationalities(this.currentPage + 1, this.pageSize);
  }

  loadNationalities(page: number, pageSize: number): void {
    this.nationalitiesFacade.GetNationality(page, pageSize);
  }

  ngOnInit() {
    this.registerForm.controls.id.setValue('');
    this.edit = false;
    this.loadNationalities(1, 10);
    this.nationalitiesFacade.Nationality$.subscribe((res) => {
      this.dataSource.data = res.items;
      this.totalCount = res.totalCount;
    });
  }

  edit: boolean = false;
  registerForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    nationalityTypeId: [null, Validators.required],
    nationalityTypeName: ['']
  });
  constructor(
    private fb: FormBuilder,
    protected nationalitiesFacade: NationalitiesFacade,
    private sharedFacade: SharedFacade
  ) {}

  onDelete(Id: string): void {
    if (confirm('هل أنت متأكد من عملية المسح؟')) {
      this.edit = false;
      this.nationalitiesFacade.deleteNationality(Id);
      this.registerForm.reset();
    }
  }
  onReset(): void {
    this.edit = false;
    this.registerForm.reset();
    this.registerForm.setErrors(null);
  }
  onAdd(): void {
    if (this.registerForm.valid) {
      this.registerForm.value.nationalityTypeName = optionsNationalityType.find(
        (option) => option.value == this.registerForm.value.nationalityTypeId
      )?.label;
      if (this.edit) {
        this.nationalitiesFacade.UpdateNationality(this.registerForm?.value);
        this.onReset();
      } else {
        this.nationalitiesFacade.AddNationality(this.registerForm?.value);
        this.onReset();
      }
    } else {
      if (this.registerForm.value.name == '' || this.registerForm.controls.name.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال اسم', ['']);
        return;
      } else if (this.registerForm.controls.nationalityTypeId.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء اختر النوع', ['']);
        return;
      }
    }
  }
  onEdit(nationality: any): void {
    this.registerForm.patchValue(nationality);
    this.registerForm.value.nationalityTypeName = optionsNationalityType.find(
      (option) => option.value == this.registerForm.value.nationalityTypeId
    )?.label;
    this.edit = true;
  }
  activate(item): void {
    this.nationalitiesFacade.activate(item.id, !item.isActive);
    this.registerForm.reset();
  }
  protected readonly optionsNationalityType = optionsNationalityType;
}
