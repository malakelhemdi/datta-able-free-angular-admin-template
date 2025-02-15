import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClassificationBranchesFacade } from '../classification-branches.facade';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-classification-bankBranches',
  templateUrl: './classification-branches.component.html',
  styleUrl: './classification-branches.component.scss'
})
export class ClassificationBranchesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'maximumWage', 'minimumWage', 'actions'];
  dataSource = new MatTableDataSource<any>();
  totalCount = 0;
  pageSize = 10;
  currentPage = 0;
  private subscriptions: Subscription[] = [];
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

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
    maximumWage: [null],
    minimumWage: [null]
  });
  constructor(
    private fb: FormBuilder,
    protected classificationBranchesFacade: ClassificationBranchesFacade
  ) {}
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.edit = false;
    this.registerForm.controls.id.setValue('');
    this.loadJobClassification(this.currentPage + 1, this.pageSize);
    this.subscriptions.push(
      this.classificationBranchesFacade.JobClassificationSubject$.subscribe((res) => {
        this.dataSource.data = res.items;
        this.totalCount = res.totalCount;
      })
    );
  }

  onDelete(Id: string): void {
    if (confirm('هل أنت متأكد من عملية المسح؟')) {
      this.subscriptions.push(
        this.classificationBranchesFacade.deleteClassification(Id).subscribe(() => {
          this.edit = false;
          this.registerForm.reset();
          this.loadJobClassification(this.currentPage + 1, this.pageSize);
        })
      );
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
        this.subscriptions.push(
          this.classificationBranchesFacade.UpdateClassification(this.registerForm?.value).subscribe(() => {
            this.onReset();
          })
        );
      } else {
        this.subscriptions.push(
          this.classificationBranchesFacade.AddClassification(this.registerForm?.value).subscribe(() => {
            this.onReset();
          })
        );
      }
    }
  }
  onEdit(classBranch: any): void {
    this.registerForm.patchValue(classBranch);
    this.edit = true;
  }
}
