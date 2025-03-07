import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BanksFacade } from '../banks.facade';
import { MessageType } from '../../../../shared/shared.interfaces';
import { SharedFacade } from '../../../../shared/shared.facade';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

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
  displayedColumns: string[] = ['name', 'actions'];
  dataSource = new MatTableDataSource<any>();
  totalCount = 0;
  pageSize = 10;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  loadBanks(page: number, pageSize: number) {
    return this.banksFacade.GetBanks(page, pageSize, 0);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.registerForm.controls.id.setValue('');
    this.loadBanks(this.currentPage + 1, this.pageSize);
    this.banksFacade.BanksSubject$.subscribe((data) => {
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
    public sharedFacade: SharedFacade
  ) {}

  onDelete(Id: string): void {
    if (confirm('هل أنت متأكد من عملية المسح؟')) {
      this.banksFacade.deleteBank(Id).subscribe(() => {
        this.onReset();
      });
    }
  }
  onReset() {
    this.edit = false;
    this.registerForm.reset();
    this.registerForm.setErrors(null);
    return this.loadBanks(this.currentPage + 1, this.pageSize);
  }

  onAdd(): void {
    if (this.registerForm.valid) {
      if (this.edit) {
        this.banksFacade.UpdateBank(this.registerForm?.value).subscribe(() => {
          this.onReset();
        });
      } else {
        this.banksFacade.AddBank(this.registerForm?.value).subscribe(() => {
          this.onReset().subscribe(() => {
            this.paginator.lastPage();
          });
        });
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
  activate(item): void {
    this.banksFacade.activate(item.id, !item.isActive).subscribe(() => {
      this.onReset();
    });
    // this.registerForm.reset();
  }
}
