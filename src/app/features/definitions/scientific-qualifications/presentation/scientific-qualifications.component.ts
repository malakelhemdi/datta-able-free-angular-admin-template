import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ScientificQualificationsFacade } from '../scientific-qualifications.facade';
import { MessageType } from '../../../../shared/shared.interfaces';
import { SharedFacade } from '../../../../shared/shared.facade';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-evaluations-types',
  templateUrl: './scientific-qualifications.component.html',
  styleUrls: ['./scientific-qualifications.component.scss']
})
export class ScientificQualificationsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'actions'];
  dataSource = new MatTableDataSource<any>();
  totalCount = 0;
  pageSize = 10;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex; // MatPaginator uses 0-based index, so add 1
    this.pageSize = event.pageSize;
    this.loadScientificQualifications(this.currentPage + 1, this.pageSize);
  }

  edit: boolean = false;
  registerForm = this.fb.group({
    id: [null],
    name: [null, Validators.required]
  });
  constructor(
    private fb: FormBuilder,
    protected scientificQualificationsFacade: ScientificQualificationsFacade,
    protected sharedFacade: SharedFacade
  ) {}

  loadScientificQualifications(page: number, pageSize: number) {
    return this.scientificQualificationsFacade.GetScientificQualifications(page, pageSize, 0);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.edit = false;
    this.registerForm.controls.id.setValue('');
    this.loadScientificQualifications(this.currentPage + 1, this.pageSize);
    this.scientificQualificationsFacade.ScientificQualificationsSubject$.subscribe((data) => {
      this.dataSource.data = data.items;
      this.totalCount = data.totalCount;
    });
  }

  onDelete(Id: string): void {
    if (confirm('هل أنت متأكد من عملية المسح؟')) {
      this.edit = false;
      this.scientificQualificationsFacade.deleteScientificQualifications(Id).subscribe(() => {
        this.onReset();
      });
    }
  }
  onReset() {
    this.edit = false;
    this.registerForm.reset();
    this.registerForm.setErrors(null);
    return this.loadScientificQualifications(this.currentPage + 1, this.pageSize);
  }
  onAdd(): void {
    if (this.registerForm.valid) {
      if (this.edit) {
        this.scientificQualificationsFacade.UpdateScientificQualifications(this.registerForm?.value).subscribe(() => {
          this.onReset();
        });
      } else {
        this.scientificQualificationsFacade.AddScientificQualifications(this.registerForm?.value).subscribe(() => {
          this.onReset().subscribe(() => {
            this.paginator.lastPage();
          });
        });
      }
    } else {
      if (this.registerForm.value.name == '' || this.registerForm.controls.name.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال المؤهل العلمي', ['']);
        return;
      }
    }
  }
  onEdit(scientificQualifications: any): void {
    this.registerForm.patchValue(scientificQualifications);
    this.edit = true;
  }
  activate(item): void {
    this.scientificQualificationsFacade.activate(item.id, !item.isActive).subscribe(() => {
      this.onReset();
    });
  }
}
