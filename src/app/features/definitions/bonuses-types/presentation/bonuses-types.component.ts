import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { optionsBooleanGeneral } from 'src/app/core/core.interface';
import { BonusesTypesFacade } from '../bonuses-types.facade';
import { MessageType } from '../../../../shared/shared.interfaces';
import { SharedFacade } from '../../../../shared/shared.facade';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-rewards-types',
  templateUrl: './bonuses-types.component.html',
  styleUrl: './bonuses-types.component.scss'
})
export class BonusesTypesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'isFamilyBonuse', 'actions'];
  dataSource = new MatTableDataSource<any>();
  totalCount = 0;
  pageSize = 10;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  loadBonusesTypes(page: number, pageSize: number): void {
    this.bonusesTypesFacade.GetBonusesType(page, pageSize);
  }

  ngOnInit() {
    this.edit = false;
    this.dataSource.paginator = this.paginator;
    this.loadBonusesTypes(this.currentPage + 1, this.pageSize);
    this.bonusesTypesFacade.BonusesType$.subscribe((data) => {
      this.dataSource.data = data.items;
      this.totalCount = data.totalCount;
    });
  }

  edit: boolean = false;
  registerForm = this.fb.group({
    id: [null],
    name: [null, Validators.required],
    isFamilyBonuse: [null, Validators.required]
  });
  constructor(
    private fb: FormBuilder,
    protected bonusesTypesFacade: BonusesTypesFacade,
    protected sharedFacade: SharedFacade
  ) {
    this.onSubmit();
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex; // MatPaginator uses 0-based index, so add 1
    this.pageSize = event.pageSize;
    this.loadBonusesTypes(this.currentPage + 1, this.pageSize);
  }

  ngOnDestroy(): void {}
  onSubmit(): void {
    this.registerForm.controls.id.setValue('');
  }
  onDelete(Id: string): void {
    if (confirm('هل أنت متأكد من حذف هده العلاوة؟')) {
      this.edit = false;
      this.bonusesTypesFacade.deleteBonusesType(Id);
      this.registerForm.reset();
    }
  }
  activateBonusesType(bonuse): void {
    this.bonusesTypesFacade.activateBonusesTypes(bonuse.id, !bonuse.isActive);
    this.registerForm.reset();
  }
  onReset(): void {
    this.edit = false;
    this.registerForm.reset();
    this.registerForm.setErrors(null);
  }
  onAdd(): void {
    if (this.registerForm.valid) {
      if (this.edit) {
        this.bonusesTypesFacade.UpdateBonusesType(this.registerForm?.value);
        this.onReset();
      } else {
        this.bonusesTypesFacade.AddBonusesType(this.registerForm?.value);
        this.onReset();
      }
    } else {
      if (this.registerForm.value.name == '' || this.registerForm.controls.name.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال اسم العلاوة ', ['']);
        return;
      } else if (this.registerForm.controls.isFamilyBonuse.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال علاوة عائلة', ['']);
        return;
      }
    }
  }
  onEdit(bonusesType: any): void {
    this.registerForm.patchValue(bonusesType);
    this.edit = true;
  }

  protected readonly optionsBooleanGeneral = optionsBooleanGeneral;
}
