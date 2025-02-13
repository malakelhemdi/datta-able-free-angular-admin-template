import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClassificationBranchesFacade } from '../classification-branches.facade';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { optionsFunctionalCategory } from '../../../../core/core.interface';
import { MessageType } from '../../../../shared/shared.interfaces';
import { SharedFacade } from '../../../../shared/shared.facade';

@Component({
  selector: 'app-classification-bankBranches',
  templateUrl: './classification-branches.component.html',
  styleUrl: './classification-branches.component.scss'
})
export class ClassificationBranchesComponent implements OnInit {
  // displayedColumns: string[] = ['name', 'classSalary','maximumWage', 'minimumWage', 'actions'];
  displayedColumns: string[] = ['name','maximumWage', 'minimumWage', 'actions'];
  dataSource = new MatTableDataSource<any>();
  totalCount = 0;
  pageSize = 10;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex; // MatPaginator uses 0-based index, so add 1
    this.pageSize = event.pageSize;
    this.loadJobClassification(this.currentPage + 1, this.pageSize);
  }

  loadJobClassification(page: number, pageSize: number) {
    return this.classificationBranchesFacade.GetJobClassification(page, pageSize);
  }

  edit: boolean = false;
  registerForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    functionalCategory: ['', Validators.required],
    classSalary: [null],
    maximumWage: [null],
    minimumWage: [null]
  });
  constructor(
    private fb: FormBuilder,
    protected sharedFacade: SharedFacade,
    protected classificationBranchesFacade: ClassificationBranchesFacade
  ) {}
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.edit = false;
    this.registerForm.controls.id.setValue('');
    this.loadJobClassification(this.currentPage + 1, this.pageSize);
    this.classificationBranchesFacade.JobClassificationSubject$.subscribe((res) => {
      this.dataSource.data = res.items;
      this.totalCount = res.totalCount;
    });
  }

  onDelete(Id: string): void {
    if (confirm('هل أنت متأكد من عملية المسح؟')) {
      this.classificationBranchesFacade.deleteClassification(Id).subscribe(() => {
        this.edit = false;
        this.registerForm.reset();
        this.loadJobClassification(this.currentPage + 1, this.pageSize);
      });
    }
  }
  onReset() {
    this.edit = false;
    this.registerForm.reset();
    this.registerForm.setErrors(null);
    return this.loadJobClassification(this.currentPage + 1, this.pageSize);
  }
  onAdd(): void {
    if (this.registerForm.valid) {
      if (this.edit) {
        this.classificationBranchesFacade.UpdateClassification(this.registerForm?.value).subscribe(() => {
          this.onReset();
        });
      } else {
        this.classificationBranchesFacade.AddClassification(this.registerForm?.value).subscribe(() => {
          this.onReset();
        });
      }
    } else{
      if (this.registerForm.value.name == '' || this.registerForm.value.name == null) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال رمز التصنيف  ', ['']);
        return;
      } else if (this.registerForm.value.functionalCategory == '' || this.registerForm.value.functionalCategory == null || this.registerForm.controls.functionalCategory.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء اختر تصنيف الوظيفة  ', ['']);
        return;
      }
    }
  }
  onEdit(classBranch: any): void {
    this.registerForm.patchValue(classBranch);
    this.edit = true;
  }
  filteredJobClassifications = [];
  filterJobClassification(value: string) {
    const data = this.classificationBranchesFacade.JobClassificationSubject$.getValue();
    this.filteredJobClassifications =
      value !== 'C'
        ? data.items.filter((item) => item.name.includes(value))
        : data.items.filter((item) => item.name.includes('C') || item.name.includes('D'));

    // Manually trigger change detection
    this.registerForm.get('jobClassification')?.updateValueAndValidity();
  }
  protected readonly optionsFunctionalCategory = optionsFunctionalCategory;
}
