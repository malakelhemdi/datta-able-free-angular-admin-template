import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { RewardsTypesFacade } from '../rewards-types.facade';
import { optionsCalculatingReward, optionsRewardType } from '../rewards-types.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SharedFacade } from '../../../../shared/shared.facade';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rewards-types',
  templateUrl: './rewards-types.component.html',
  styleUrl: './rewards-types.component.scss'
})
export class RewardsTypesComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  displayedColumns: string[] = ['name', 'rewardTypeName', 'calculatingRewardValueName', 'percentage', 'actions'];
  dataSource = new MatTableDataSource<any>();
  totalCount = 0;
  pageSize = 10;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  edit: boolean = false;
  registerForm = this.fb.group({
    id: [''],
    calculatingRewardValueName: [''],
    rewardTypeName: [''],
    name: ['', Validators.required],
    rewardTypeId: [0, Validators.required],
    calculatingRewardValueId: [0, Validators.required],
    value: [0, Validators.required],
    percentage: [0, Validators.required]
  });

  loadRewards(page: number, pageSize: number) {
    return this.rewardsTypesFacade.GetRewards(page, pageSize);
  }
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex; // MatPaginator uses 0-based index, so add 1
    this.pageSize = event.pageSize;
    this.loadRewards(this.currentPage + 1, this.pageSize);
  }

  constructor(
    private fb: FormBuilder,
    protected rewardsTypesFacade: RewardsTypesFacade,
    protected sharedFacade: SharedFacade
  ) {}

  ngOnInit() {
    this.edit = false;
    this.registerForm.controls.id.setValue('');
    this.loadRewards(this.currentPage + 1, this.pageSize);
    this.subscriptions.push(
      this.rewardsTypesFacade.Rewards$.subscribe((data) => {
        this.dataSource.data = data.items;
        this.totalCount = data.totalCount;
      })
    );
  }

  onDelete(Id: string): void {
    if (confirm('هل أنت متأكد من عملية المسح؟')) {
      this.subscriptions.push(
        this.rewardsTypesFacade.deleteReward(Id).subscribe(() => {
          this.onReset();
        })
      );
    }
  }
  onReset() {
    this.edit = false;
    this.registerForm.reset();
    this.registerForm.setErrors(null);
    return this.loadRewards(this.currentPage + 1, this.pageSize);
  }
  resetCalculatingReward(): void {
    this.registerForm.controls.value.setValue(0);
    this.registerForm.controls.percentage.setValue(0);
  }
  onAdd(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.registerForm.value.calculatingRewardValueId == 2
      ? this.registerForm.controls.value.setValidators(Validators.required)
      : this.registerForm.controls.value.setValidators(null);
    this.registerForm.value.calculatingRewardValueId == 3
      ? this.registerForm.controls.percentage.setValidators(Validators.required)
      : this.registerForm.controls.percentage.setValidators(null);
    this.registerForm.value.rewardTypeName = this.optionsRewardType.find(
      (option) => option.value == this.registerForm.value.rewardTypeId
    )?.label;
    this.registerForm.value.calculatingRewardValueName = this.optionsCalculatingReward.find(
      (option) => option.value == this.registerForm.value.calculatingRewardValueId
    )?.label;
    if (this.registerForm.valid) {
      if (this.edit) {
        this.subscriptions.push(
          this.rewardsTypesFacade.UpdateReward(this.registerForm?.value).subscribe(() => {
            this.onReset();
          })
        );
      } else {
        this.subscriptions.push(
          this.rewardsTypesFacade.AddReward(this.registerForm?.value).subscribe(() => {
            this.subscriptions.push(
              this.onReset().subscribe(() => {
                this.paginator.lastPage();
              })
            );
          })
        );
      }
    }
  }
  onEdit(Reward: any): void {
    this.registerForm.patchValue(Reward);
    this.registerForm.value.rewardTypeName = this.optionsRewardType.find(
      (option) => option.value == this.registerForm.value.rewardTypeId
    )?.label;
    this.registerForm.value.calculatingRewardValueName = this.optionsCalculatingReward.find(
      (option) => option.value == this.registerForm.value.calculatingRewardValueId
    )?.label;
    this.edit = true;
  }

  activate(item): void {
    this.subscriptions.push(
      this.rewardsTypesFacade.activate(item.id, !item.isActive).subscribe(() => {
        this.onReset();
      })
    );
  }
  protected readonly optionsRewardType = optionsRewardType;
  protected readonly optionsCalculatingReward = optionsCalculatingReward;
}
