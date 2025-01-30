import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PenaltiesFacade } from '../Penalties.facade';
import { optionsPenaltyType } from '../Penalties.interface';
import { MessageType } from '../../../../shared/shared.interfaces';
import { SharedFacade } from '../../../../shared/shared.facade';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-rewards-types',
  templateUrl: './Penalties.component.html',
  styleUrl: './Penalties.component.scss'
})
export class PenaltiesComponent implements OnInit {
  displayedColumns: string[] = ['penaltyTypeName', 'discount', 'actions'];
  dataSource = new MatTableDataSource<any>();
  totalCount = 0;
  pageSize = 10;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex; // MatPaginator uses 0-based index, so add 1
    this.pageSize = event.pageSize;
    this.loadPenalties(this.currentPage + 1, this.pageSize);
  }

  loadPenalties(page: number, pageSize: number): void {
    this.penaltiesFacade.GetPenalties(page, pageSize);
  }

  edit: boolean = false;
  registerForm = this.fb.group({
    id: [''],
    penaltyTypeId: [null, Validators.required],
    discount: [null, Validators.required],
    penaltyTypeName: ['']
  });
  constructor(
    private fb: FormBuilder,
    protected penaltiesFacade: PenaltiesFacade,
    private sharedFacade: SharedFacade
  ) {}

  ngOnInit() {
    this.edit = false;
    this.registerForm.controls.id.setValue('');
    this.loadPenalties(1, 10);
    this.penaltiesFacade.PenaltiesSubject$.subscribe((res) => {
      this.dataSource.data = res.items;
      this.totalCount = res.totalCount;
    });
  }

  onDelete(Id: string): void {
    if (confirm('هل أنت متأكد من عملية المسح؟')) {
      this.edit = false;
      this.penaltiesFacade.deletePenalties(Id);
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
      this.registerForm.value.penaltyTypeName = optionsPenaltyType.find(
        (option) => option.value == this.registerForm.value.penaltyTypeId
      )?.label;

      if (this.edit) {
        this.penaltiesFacade.UpdatePenalties(this.registerForm?.value);
        this.onReset();
      } else {
        this.penaltiesFacade.AddPenalties(this.registerForm?.value);
        this.onReset();
      }
    } else {
      if (this.registerForm.value.penaltyTypeId == 0 || this.registerForm.controls.penaltyTypeId.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء اختر نوع الجزاء  ', ['']);
        return;
      } else if (this.registerForm.controls.discount.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال الخصم', ['']);
        return;
      }
    }
  }
  onEdit(penalties: any): void {
    this.registerForm.patchValue(penalties);
    this.registerForm.value.penaltyTypeName = optionsPenaltyType.find(
      (option) => option.value == this.registerForm.value.penaltyTypeId
    )?.label;
    this.edit = true;
  }

  protected readonly optionsPenaltyType = optionsPenaltyType;
}
