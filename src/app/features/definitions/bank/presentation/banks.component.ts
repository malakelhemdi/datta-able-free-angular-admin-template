import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BanksFacade } from '../banks.facade';
import { MessageType, PaginatedData } from '../../../../shared/shared.interfaces';
import { SharedFacade } from '../../../../shared/shared.facade';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { GetBanksCommand } from '../banks.interface';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-banks',
  templateUrl: './banks.component.html',
  styleUrls: ['./banks.component.scss']
})

// export default class SecondmentToOtherPostionComponent {}
export default class BanksComponent implements OnInit {
  fetchBanks = (page: number, pageSize: number, searchQuery: string): void => {
    this.banksFacade.GetBanks(page, pageSize);
  };

  onBankSelected(bank: any): void {
    console.log('Selected Bank:', bank);
  }

  displayedColumns: string[] = ['name', 'actions'];
  dataSource = new MatTableDataSource<any>();
  totalCount = 0;
  pageSize = 10;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  loadBanks(page: number, pageSize: number): void {
    this.banksFacade.GetBanks(page, pageSize);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.registerForm.controls.id.setValue('');
    this.loadBanks(this.currentPage + 1, this.pageSize);
    this.banksFacade.Banks$.subscribe((data) => {
      this.dataSource.data = data.items;
      this.totalCount = data.totalCount;
    });
  }

  edit: boolean = false;
  registerForm = this.fb.group({
    id: [''],
    name: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    protected banksFacade: BanksFacade,
    private sharedFacade: SharedFacade
  ) {}

  onDelete(Id: string): void {
    if (confirm('هل أنت متأكد من عملية المسح؟')) {
      this.edit = false;
      this.banksFacade.deleteBank(Id);
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
        this.banksFacade.UpdateBank(this.registerForm?.value);
        this.onReset();
      } else {
        this.banksFacade.AddBank(this.registerForm?.value);
        this.onReset();
      }
    } else {
      this.showNotification('عفواً، الرجاء ادخال اسم المصرف', '');
    }
  }

  showNotification(title, text) {
    this.sharedFacade.showMessage(MessageType.warning, title, ['']);
  }

  onEdit(bank: any): void {
    this.registerForm.patchValue(bank);
    this.edit = true;
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex; // MatPaginator uses 0-based index, so add 1
    this.pageSize = event.pageSize;
    this.loadBanks(this.currentPage + 1, this.pageSize);
  }
}
