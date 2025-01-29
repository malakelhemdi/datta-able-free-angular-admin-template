import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DocumentTypesFacade } from '../document-types.facade';
import { optionsBooleanGeneral } from 'src/app/core/core.interface';
import { MessageType } from '../../../../shared/shared.interfaces';
import { SharedFacade } from '../../../../shared/shared.facade';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-rewards-types',
  templateUrl: './document-types.component.html',
  styleUrl: './document-types.component.scss'
})
export class DocumentTypesComponent implements OnInit, OnDestroy {
  edit: boolean = false;
  registerForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    isDecision: [null, Validators.required],
    haveExpireDate: [null, Validators.required]
  });

  loadDocumentType(page: number, pageSize: number): void {
    this.documentTypesFacade.GetDocumentType(page, pageSize);
  }

  displayedColumns: string[] = ['name', 'haveExpireDate', 'isDecision', 'actions'];
  dataSource = new MatTableDataSource<any>();
  totalCount = 0;
  pageSize = 10;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex; // MatPaginator uses 0-based index, so add 1
    this.pageSize = event.pageSize;
    this.loadDocumentType(this.currentPage + 1, this.pageSize);
  }

  constructor(
    private fb: FormBuilder,
    protected documentTypesFacade: DocumentTypesFacade,
    private _cdr: ChangeDetectorRef,
    private sharedFacade: SharedFacade
  ) {}
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.registerForm.controls.id.setValue('');
    this.edit = false;
    this.loadDocumentType(1, 10);
    this.documentTypesFacade.DocumentType$.subscribe((data) => {
      this.dataSource.data = data.items;
      this.totalCount = data.totalCount;
    });
  }
  ngOnDestroy(): void {}

  onDelete(Id: string): void {
    if (confirm('هل أنت متأكد من عملية المسح؟')) {
      this.edit = false;
      this.documentTypesFacade.deleteDocumentType(Id);
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
        this.documentTypesFacade.UpdateDocumentType(this.registerForm?.value);
        this.onReset();
      } else {
        this.documentTypesFacade.AddDocumentType(this.registerForm?.value);
        this.onReset();
      }
      this._cdr.markForCheck();
    } else {
      if (this.registerForm.value.name == '' || this.registerForm.controls.name.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال اسم', ['']);
        return;
      } else if (this.registerForm.controls.isDecision.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء اختر هل نوعه قرار؟', ['']);
        return;
      } else if (this.registerForm.controls.haveExpireDate.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء اختر هل له تاريخ صلاحية؟', ['']);
        return;
      }
    }
  }
  onEdit(documentType: any): void {
    this.registerForm.patchValue(documentType);
    this.edit = true;
  }

  protected readonly optionsBooleanGeneral = optionsBooleanGeneral;
}
