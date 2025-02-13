import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeOrganizationalUnitFacade } from '../typeOrganizationalUnit.facade';
import { ClassificationBranchesFacade } from '../../classification/classification-branches.facade';
import { optionsBooleanGeneral, optionsJobClassification } from '../../../../core/core.interface';
import { MessageType } from '../../../../shared/shared.interfaces';
import { SharedFacade } from '../../../../shared/shared.facade';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import getSingleItemFromPaginatedObject from 'src/app/shared/utils/getSingleItemFromPaginatedObject';
import { format } from 'date-fns';

@Component({
  selector: 'app-rewards-types',
  templateUrl: './typeOrganizationalUnit.component.html',
  styleUrl: './typeOrganizationalUnit.component.scss'
})
export class TypeOrganizationalUnitComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];
  dataSource = new MatTableDataSource<any>();
  totalCount = 0;
  pageSize = 10;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex; // MatPaginator uses 0-based index, so add 1
    this.pageSize = event.pageSize;
    // this.loadOrganizationalUnits(this.currentPage + 1, this.pageSize);
    this.loadUnitType(this.currentPage + 1, this.pageSize);
  }
  loadUnitType(page: number, pageSize: number): void {
    this.organizationalUnitFacade.GetUnitType(page, pageSize);
  }


  ngOnInit() {
    this.edit = false;
    this.dataSource.paginator = this.paginator;
    this.loadUnitType(1, 10);
    this.organizationalUnitFacade.UnitTypeSubject$.subscribe((data) => {
      this.dataSource.data = data.items;
      this.totalCount = data.totalCount;
    });
  }

  edit: boolean = false;
  registerForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
      });

  constructor(
    private fb: FormBuilder,
    protected organizationalUnitFacade: TypeOrganizationalUnitFacade,
    protected classificationBranchesFacade: ClassificationBranchesFacade,
    protected sharedFacade: SharedFacade
  ) {
    this.registerForm.controls.id.setValue('');
  }


  onSubmit() {
    this.registerForm.controls.id.setValue('');
    this.loadUnitType(1, 10);
  }
x

  onDelete(Id: string): void {
    if (confirm('هل أنت متأكد من عملية المسح؟')) {
      this.organizationalUnitFacade.deleteOrganizationalUnit(Id).subscribe(() => {
        this.edit = false;
        this.registerForm.reset();
        this.loadUnitType(this.currentPage + 1, this.pageSize);
      });
    }
  }
  onReset() {
    this.edit = false;
    this.registerForm.reset();
    this.registerForm.setErrors(null);
    return this.onSubmit();
  }
  onAdd(): void {
    if (this.registerForm.valid) {
      const objectToBeSent = {
        ...this.registerForm?.value,
        name: this.registerForm.value?.name || '',
        id: this.registerForm.value?.id || ''
      };

      if (this.edit) {
        this.organizationalUnitFacade.UpdateOrganizationalUnit(objectToBeSent).subscribe(() => {
          this.onReset();
        });
      } else {
        this.organizationalUnitFacade.AddOrganizationalUnit(objectToBeSent).subscribe(() => {
          this.onReset();
        });
      }
    } else {
      if (this.registerForm.value.name == '' || this.registerForm.controls.name.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال اسم نوع الوحدة التنظيمية', ['']);
        return;
      }
    }
  }
  onEdit(unit: any): void {
   this.registerForm.patchValue({
      ...unit,
      classification: {
        id: unit?.id || null,
        name: unit?.name || null
      },
    });
    this.edit = true;
  }

  getControl(control: AbstractControl, controlName: string): AbstractControl | null {
    return control.get(controlName);
  }
  protected readonly optionsJobClassification = optionsJobClassification;
  protected readonly optionsBooleanGeneral = optionsBooleanGeneral;
  protected readonly length = length;
}
