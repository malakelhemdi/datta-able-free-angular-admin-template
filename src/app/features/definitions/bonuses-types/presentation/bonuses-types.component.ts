import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { optionsBooleanGeneral } from 'src/app/core/core.interface';
import { BonusesTypesFacade } from '../bonuses-types.facade';
import { MessageType } from '../../../../shared/shared.interfaces';
import { SharedFacade } from '../../../../shared/shared.facade';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rewards-types',
  templateUrl: './bonuses-types.component.html',
  styleUrl: './bonuses-types.component.scss'
})
export class BonusesTypesComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  displayedColumns: string[] = ['name', 'isFamilyBonuse', 'actions'];
  dataSource = new MatTableDataSource<any>();
  totalCount = 0;
  pageSize = 10;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  loadBonusesTypes(page: number, pageSize: number) {
    return this.bonusesTypesFacade.GetBonusesType(page, pageSize);
  }

  ngOnInit() {
    this.edit = false;
    this.dataSource.paginator = this.paginator;
    this.loadBonusesTypes(this.currentPage + 1, this.pageSize);
    this.subscriptions.push(
      this.bonusesTypesFacade.BonusesType$.subscribe((data) => {
        this.dataSource.data = data.items;
        this.totalCount = data.totalCount;
      })
    );
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

  onSubmit(): void {
    this.registerForm.controls.id.setValue('');
  }
  onDelete(Id: string): void {
    if (confirm('هل أنت متأكد من حذف هده العلاوة؟')) {
      this.subscriptions.push(
        this.bonusesTypesFacade.deleteBonusesType(Id).subscribe(() => {
          this.onReset();
        })
      );
      this.edit = false;
      this.registerForm.reset();
    }
  }
  activateBonusesType(bonuse): void {
    this.subscriptions.push(
      this.bonusesTypesFacade.activateBonusesTypes(bonuse.id, !bonuse.isActive).subscribe(() => {
        this.onReset();
      })
    );
    // this.registerForm.reset();
  }
  onReset(): void {
    this.edit = false;
    this.registerForm.reset();
    this.registerForm.setErrors(null);
    this.loadBonusesTypes(this.currentPage + 1, this.pageSize);
  }
  onAdd(): void {
    if (this.registerForm.valid) {
      if (this.edit) {
        this.subscriptions.push(
          this.bonusesTypesFacade.UpdateBonusesType(this.registerForm?.value).subscribe(() => {
            this.onReset();
          })
        );
      } else {
        this.subscriptions.push(
          this.bonusesTypesFacade.AddBonusesType(this.registerForm?.value).subscribe(() => {
            this.onReset();
          })
        );
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
