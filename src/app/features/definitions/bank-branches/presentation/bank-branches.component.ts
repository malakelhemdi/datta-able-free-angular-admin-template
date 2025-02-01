import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BanksFacade } from '../../bank/banks.facade';
import { BankBranchesFacade } from '../bank-branches.facade';
import { ClassificationBankBranchesFacade } from '../../classification-bankBranches/classification-bankBranches.facade';
import { SharedFacade } from '../../../../shared/shared.facade';
import { MessageType } from 'src/app/shared/shared.interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-rewards-types',
  templateUrl: './bank-branches.component.html',
  styleUrl: './bank-branches.component.scss'
})
export class BankBranchesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'prefix', 'bankName', 'bankClasscificationName', 'actions'];
  dataSource = new MatTableDataSource<any>();
  totalCount = 0;
  pageSize = 10;
  currentPage = 0;

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex; // MatPaginator uses 0-based index, so add 1
    this.pageSize = event.pageSize;
    if (this.registerFormSearch.value.bankId && this.registerFormSearch.value.classcificationId) {
      this.loadBankBranchesFacade(
        this.currentPage + 1,
        this.pageSize,
        this.registerFormSearch.value.bankId,
        this.registerFormSearch.value.classcificationId
      );
    }
  }

  loadBankBranchesFacade(page: number, pageSize: number, bankId: string, classcificationId: string): void {
    this.bankBranchesFacade.GetBranch(page, pageSize, bankId, classcificationId);
  }

  fetchBanks = (page: number, pageSize: number, searchQuery?: string): void => {
    this.banksFacade.GetBanks(page, pageSize,1);
  };

  fetchClassificationBankBranches = (page: number, pageSize: number, searchQuery?: string): void => {
    this.classificationBankBranchesFacade.GetClassificationBranch(page, pageSize, 1);
  };

  onBankSelectedRegisterForm(bank: any): void {
    this.registerForm.get('bankId')?.setValue(bank.id);
  }
  onClassificationBankBrancheSelected(classification: any): void {
    this.registerForm.get('bankClasscificationId')?.setValue(classification.id);
  }

  onBankSelectedRegisterFormSearch(bank: any): void {
    this.registerFormSearch.get('bankId')?.setValue(bank.id);
  }
  onClassificationBankBrancheSelectedRegisterFormSearch(classification: any): void {
    this.registerFormSearch.get('classcificationId')?.setValue(classification.id);
  }

  ngOnInit() {
    this.edit = false;
    this.registerForm.controls.id.setValue('');
    this.fetchBanks(1, 10);
    this.fetchClassificationBankBranches(1, 10);
    this.loadBankBranchesFacade(
      this.currentPage + 1,
      this.pageSize,'','');
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
    bankId: ['', Validators.required],
    bankName: [],
    bankClasscificationId: ['', Validators.required],
    bankClasscificationName: []
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
    private sharedFacade: SharedFacade
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
      this.edit = false;
      this.bankBranchesFacade.deleteBranch(Id);
      this.registerForm.reset();
    }
  }
  onReset(): void {
    this.edit = false;
    this.registerForm.reset();
    this.registerForm.setErrors(null);
    this.registerFormSearch.reset();
    this.registerFormSearch.setErrors(null);
  }
  onAdd() {
    if (this.registerForm.valid) {
      const optionClass = this.classificationBankBranchesFacade.ClassificationBranchSubject$.getValue();
      const optionBankName = this.banksFacade.BanksSubject$.getValue().items.find(
        (x: { id: string | null | undefined }) => x.id == this.registerForm.value.bankId
      );
      const className = optionClass.items.find((x) => x.id == this.registerForm.value.bankClasscificationId);
      const nameToSet = className.name ?? null; // Using nullish coalescing operator to handle undefined
      const BankNameToSet = optionBankName?.name ?? null; // Using nullish coalescing operator to handle undefined
      this.registerForm.controls.bankClasscificationName.setValue(nameToSet);
      this.registerForm.controls.bankName.setValue(BankNameToSet);
      if (this.edit) {
        this.bankBranchesFacade.UpdateBranch(this.registerForm?.value);
        this.onReset();
      } else {
        this.bankBranchesFacade.AddBranch(this.registerForm?.value);
        this.onReset();
      }
    } else {
      if (this.registerForm.value.name == '' || this.registerForm.controls.name.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال اسم الفرع', ['']);
        return;
      } else if (this.registerForm.value.prefix == null || this.registerForm.controls.prefix.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال الرمز ', ['']);
        return;
      } else if (this.registerForm.controls.bankId.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء اختر المصرف', ['']);
        return;
      } else if (this.registerForm.controls.bankClasscificationId.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء اختر تصنيف فرع المصرف', ['']);
        return;
      }
    }
  }
  onEdit(branch: any): void {
    this.registerForm.patchValue(branch);
    this.edit = true;
  }
  onInput(event: any) {
    const input = event.target;
    if (input.value.length > 3) {
      input.value = input.value.slice(0, 3);
    }
  }
  activate(item): void {
    this.bankBranchesFacade.activate(item.id,!item.isActive);
    this.registerForm.reset();
  }
}
