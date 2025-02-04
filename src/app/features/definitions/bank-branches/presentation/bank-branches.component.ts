import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BanksFacade } from '../../bank/banks.facade';
import { BankBranchesFacade } from '../bank-branches.facade';
import { ClassificationBankBranchesFacade } from '../../classification-bankBranches/classification-bankBranches.facade';
import { SharedFacade } from '../../../../shared/shared.facade';
import { MessageType } from 'src/app/shared/shared.interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import getSingleItemFromPaginatedObject from 'src/app/shared/utils/getSingleItemFromPaginatedObject';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rewards-types',
  templateUrl: './bank-branches.component.html',
  styleUrl: './bank-branches.component.scss'
})
export class BankBranchesComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['name', 'prefix', 'bankName', 'bankClasscificationName', 'actions'];
  dataSource = new MatTableDataSource<any>();
  totalCount = 0;
  pageSize = 10;
  currentPage = 0;

  ngOnDestroy(): void {
    this.subscriptions.map((item, index) => {
      console.log(index);
      item.unsubscribe();
    });
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  subscriptions: Subscription[] = [];

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex; // MatPaginator uses 0-based index, so add 1
    this.pageSize = event.pageSize;
    // if (this.registerFormSearch.value.bankId && this.registerFormSearch.value.classcificationId) {
    this.loadBankBranchesFacade(
      this.currentPage + 1,
      this.pageSize,
      this.registerFormSearch.value.bankId,
      this.registerFormSearch.value.classcificationId
    );
    // }
  }

  loadBankBranchesFacade(page: number, pageSize: number, bankId: string, classcificationId: string) {
    return this.bankBranchesFacade.GetBranch(page, pageSize, bankId, classcificationId);
  }

  fetchBanks = (page: number, pageSize: number, searchQuery?: string): void => {
    this.banksFacade.GetBanks(page, pageSize, 0);
  };

  fetchClassificationBankBranches = (page: number, pageSize: number, searchQuery?: string): void => {
    this.classificationBankBranchesFacade.GetClassificationBranch(page, pageSize, 1);
  };

  // onBankSelectedRegisterForm(bank: any): void {
  // this.registerForm.get('bankId')?.setValue(bank.id);
  // }
  // onClassificationBankBrancheSelected(classification: any): void {
  //   this.registerForm.get('bankClasscificationId')?.setValue(classification.id);
  // }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.edit = false;
    this.registerForm.controls.id.setValue('');
    this.fetchBanks(1, 10);
    this.fetchClassificationBankBranches(1, 10);
    this.loadBankBranchesFacade(this.currentPage + 1, this.pageSize, '', '');
    this.bankBranchesFacade.BankBranches$.subscribe((data) => {
      this.dataSource.data = data.items;
      this.totalCount = data.totalCount;
    });
  }

  edit: boolean = false;
  registerForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    prefix: [null, [Validators.required, Validators.maxLength(3)]],
    // bankId: ['', Validators.required],
    // bankName: [],
    bank: [null as any, Validators.required],
    bankClasscification: [null as any, Validators.required]

    // bankClasscificationId: ['', Validators.required],
    // bankClasscificationName: []
  });
  registerFormSearch = this.fb.group({
    bankId: ['', Validators.required],
    classcificationId: ['', Validators.required]
  });
  constructor(
    private fb: FormBuilder,
    protected bankBranchesFacade: BankBranchesFacade,
    protected banksFacade: BanksFacade,
    protected classificationBankBranchesFacade: ClassificationBankBranchesFacade,
    protected sharedFacade: SharedFacade
  ) {}

  onSearch(): void {
    this.registerForm.controls.id.setValue('');
    this.loadBankBranchesFacade(
      this.currentPage + 1,
      this.pageSize,
      this.registerFormSearch.value.bankId,
      this.registerFormSearch.value.classcificationId
    );
  }

  onDelete(Id: string): void {
    if (confirm('هل أنت متأكد من عملية المسح؟')) {
      this.subscriptions.push(
        this.bankBranchesFacade.deleteBranch(Id).subscribe(() => {
          // this.edit = false;
          // this.registerForm.reset();
          this.onReset();
        })
      );
    }
  }
  onReset() {
    this.edit = false;
    this.registerForm.reset();
    this.registerForm.setErrors(null);
    this.registerFormSearch.reset();
    this.registerFormSearch.setErrors(null);
    return this.loadBankBranchesFacade(
      this.currentPage + 1,
      this.pageSize,
      this.registerFormSearch.value.bankId || '',
      this.registerFormSearch.value.classcificationId || ''
    );
  }
  onAdd() {
    if (this.registerForm.valid) {
      // const optionClass = this.classificationBankBranchesFacade.ClassificationBranchSubject$.getValue();
      // const optionBankName = this.banksFacade.BanksSubject$.getValue().items.find(
      //   (x: { id: string | null | undefined }) => x.id == this.registerForm.value.bankId
      // );

      // const className = optionClass.items.find((x) => x.id == this.registerForm.value.bankClasscificationId);
      // const nameToSet = className.name ?? null;
      // const BankNameToSet = optionBankName?.name ?? null;

      // this.registerForm.controls.bankClasscificationName.setValue(nameToSet);
      // this.registerForm.controls.bankName.setValue(BankNameToSet);

      const objectToBeSent = {
        ...this.registerForm.value,
        bankId: this.registerForm.value.bank.id ?? null,
        bankName: this.registerForm.value.bank.name ?? null,
        bankClasscificationId: this.registerForm.value.bankClasscification.id ?? null,
        bankClasscificationName: this.registerForm.value.bankClasscification.name ?? null
      };

      if (this.edit) {
        this.subscriptions.push(
          this.bankBranchesFacade.UpdateBranch(objectToBeSent).subscribe(() => {
            this.onReset();
          })
        );
      } else {
        this.subscriptions.push(
          this.bankBranchesFacade.AddBranch(objectToBeSent).subscribe(() => {
            this.onReset();
          })
        );
      }
    } else {
      if (this.registerForm.value.name == '' || this.registerForm.controls.name.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال اسم الفرع', ['']);
        return;
      } else if (this.registerForm.value.prefix == null || this.registerForm.controls.prefix.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال الرمز ', ['']);
        return;
      } else if (this.registerForm.controls.bank.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء اختر المصرف', ['']);
        return;
      } else if (this.registerForm.controls.bankClasscification.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء اختر تصنيف فرع المصرف', ['']);
        return;
      }
    }
  }
  onEdit(branch: any): void {
    const bank = getSingleItemFromPaginatedObject(this.banksFacade.BanksSubject$.getValue(), branch.bankId);
    const bankClasscification = getSingleItemFromPaginatedObject(
      this.classificationBankBranchesFacade.ClassificationBranchSubject$.getValue(),
      branch.bankClasscificationId
    );
    this.registerForm.patchValue({
      ...branch,
      bank,
      bankClasscification
    });
    this.edit = true;
  }
  onInput(event: any) {
    const input = event.target;
    if (input.value.length > 3) {
      input.value = input.value.slice(0, 3);
    }
  }
  activate(item): void {
    this.subscriptions.push(
      this.bankBranchesFacade.activate(item.id, !item.isActive).subscribe(() => {
        // this.registerForm.reset();
        this.onReset();
      })
    );
  }
}
