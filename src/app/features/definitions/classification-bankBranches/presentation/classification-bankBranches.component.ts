import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ClassificationBankBranchesFacade } from '../classification-bankBranches.facade';
import { MessageType } from '../../../../shared/shared.interfaces';
import { SharedFacade } from '../../../../shared/shared.facade';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-classification-bankBranches',
  templateUrl: './classification-bankBranches.component.html',
  styleUrl: './classification-bankBranches.component.scss'
})
export class ClassificationBankBranchesComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  displayedColumns: string[] = ['name', 'actions'];
  dataSource = new MatTableDataSource<any>();
  totalCount = 0;
  pageSize = 10;
  currentPage = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    this.registerForm.controls.id.setValue('');
    this.edit = false;

    this.dataSource.paginator = this.paginator;
    this.loadClassificationBankBranches(this.currentPage + 1, this.pageSize);
    this.subscriptions.push(
      this.classificationBankBranchesFacade.ClassificationBranchSubject$.subscribe((data) => {
        this.dataSource.data = data.items;
        this.totalCount = data.totalCount;
      })
    );
  }

  loadClassificationBankBranches(page: number, pageSize: number) {
    return this.classificationBankBranchesFacade.GetClassificationBranch(page, pageSize, 0);
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadClassificationBankBranches(this.currentPage + 1, this.pageSize);
  }

  edit: boolean = false;
  registerForm = this.fb.group({
    id: [''],
    name: ['', Validators.required]
  });
  constructor(
    private fb: FormBuilder,
    protected classificationBankBranchesFacade: ClassificationBankBranchesFacade,
    private sharedFacade: SharedFacade
  ) {}

  onDelete(Id: string): void {
    if (confirm('هل أنت متأكد من عملية المسح؟')) {
      this.edit = false;
      this.subscriptions.push(
        this.classificationBankBranchesFacade.deleteClassificationBranch(Id).subscribe(() => {
          this.onReset();
        })
      );
    }
  }
  onReset() {
    this.edit = false;
    this.registerForm.reset();
    this.registerForm.setErrors(null);
    return this.loadClassificationBankBranches(this.currentPage + 1, this.pageSize);
  }
  onAdd(): void {
    if (this.registerForm.valid) {
      if (this.edit) {
        this.subscriptions.push(
          this.classificationBankBranchesFacade.UpdateClassificationBranch(this.registerForm?.value).subscribe(() => {
            this.onReset();
          })
        );
      } else {
        this.subscriptions.push(
          this.classificationBankBranchesFacade.AddClassificationBranch(this.registerForm?.value).subscribe(() => {
            this.subscriptions.push(
              this.onReset().subscribe(() => {
                this.paginator.lastPage();
              })
            );
          })
        );
      }
    } else {
      if (this.registerForm.value.name == '' || this.registerForm.controls.name.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخل اسم تصنيف فرع المصرف ', ['']);
        return;
      }
    }
  }
  onEdit(bank: any): void {
    this.registerForm.patchValue(bank);
    this.edit = true;
  }
  activate(item): void {
    this.subscriptions.push(
      this.classificationBankBranchesFacade.activate(item.id, !item.isActive).subscribe(() => {
        this.onReset();
      })
    );
  }
}
