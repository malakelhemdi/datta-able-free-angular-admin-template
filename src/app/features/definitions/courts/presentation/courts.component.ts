import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CourtsFacade } from '../courts.facade';
import { MessageType } from '../../../../shared/shared.interfaces';
import { SharedFacade } from '../../../../shared/shared.facade';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-evaluations-types',
  templateUrl: './courts.component.html',
  styleUrls: ['./courts.component.scss']
})
export class CourtsComponent implements OnInit {
  edit: boolean = false;
  registerForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    courtPlace: ['', Validators.required]
  });
  constructor(
    private fb: FormBuilder,
    protected courtsFacade: CourtsFacade,
    private sharedFacade: SharedFacade
  ) {}

  displayedColumns: string[] = ['name', 'courtPlace', 'actions'];
  dataSource = new MatTableDataSource<any>();
  totalCount = 0;
  pageSize = 10;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex; // MatPaginator uses 0-based index, so add 1
    this.pageSize = event.pageSize;
    this.loadCourts(this.currentPage + 1, this.pageSize);
  }

  loadCourts(page: number, pageSize: number): void {
    this.courtsFacade.GetCourts(page, pageSize);
  }

  ngOnInit() {
    this.edit = false;
    this.registerForm.controls.id.setValue('');
    this.loadCourts(1, 10);
    this.courtsFacade.Courts$.subscribe((res) => {
      this.dataSource.data = res.items;
      this.totalCount = res.totalCount;
    });
  }

  onDelete(Id: string): void {
    if (confirm('هل أنت متأكد من عملية المسح؟')) {
      this.edit = false;
      this.courtsFacade.deleteCourts(Id);
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
        this.courtsFacade.UpdateCourts(this.registerForm?.value);
        this.onReset();
      } else {
        this.courtsFacade.AddCourts(this.registerForm?.value);
        this.onReset();
      }
    } else {
      if (this.registerForm.value.name == '' || this.registerForm.controls.name.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال اسم', ['']);
        return;
      } else if (this.registerForm.value.courtPlace == '' || this.registerForm.controls.courtPlace.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال مكان المحكمة', ['']);
        return;
      }
    }
  }
  onEdit(courts: any): void {
    this.registerForm.patchValue(courts);
    this.edit = true;
  }
}
