import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClassificationBranchesFacade } from '../classification-branches.facade';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-classification-bankBranches',
  templateUrl: './classification-branches.component.html',
  styleUrl: './classification-branches.component.scss'
})
export class ClassificationBranchesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'maximumWage', 'minimumWage', 'actions'];
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

  loadJobClassification(page: number, pageSize: number): void {
    this.classificationBranchesFacade.GetJobClassification(page, pageSize);
  }

  edit: boolean = false;
  registerForm = this.fb.group({
    id: [''],
    name: ['', Validators.required]
  });
  constructor(
    private fb: FormBuilder,
    protected classificationBranchesFacade: ClassificationBranchesFacade
  ) {}
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.edit = false;
    this.registerForm.controls.id.setValue('');
    this.loadJobClassification(1, 10);
    this.classificationBranchesFacade.JobClassificationSubject$.subscribe((res) => {
      this.dataSource.data = res.items;
      this.totalCount = res.totalCount;
    });
  }

  onDelete(Id: string): void {
    if (confirm('هل أنت متأكد من عملية المسح؟')) {
      this.edit = false;
      this.classificationBranchesFacade.deleteClassification(Id);
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
      if (this.edit) {
        this.classificationBranchesFacade.UpdateClassification(this.registerForm?.value);
        this.onReset();
      } else {
        this.classificationBranchesFacade.AddClassification(this.registerForm?.value);
        this.onReset();
      }
    }
  }
  onEdit(classBranch: any): void {
    this.registerForm.patchValue(classBranch);
    this.edit = true;
  }
}
