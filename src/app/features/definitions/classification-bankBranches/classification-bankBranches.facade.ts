import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { SharedFacade } from '../../../shared/shared.facade';
import { tap } from 'rxjs/operators';
import { MessageType, PaginatedData, ResponseType } from '../../../shared/shared.interfaces';
import { ClassificationBankBranchesService } from './classification-bankBranches.services';
import { GetClassificationBranchCommand } from './classification-bankBranches.interface';
import basePaginatedInitialValue from 'src/app/shared/data/basePaginatedInitialValue';

@Injectable()
export class ClassificationBankBranchesFacade {
  public ClassificationBranchSubject$ = new BehaviorSubject<PaginatedData<GetClassificationBranchCommand[]>>(basePaginatedInitialValue);

  constructor(
    private sharedFacade: SharedFacade,
    private classificationBankBranchesService: ClassificationBankBranchesService
  ) {}

  deleteClassificationBranch(id: string) {
    const deleteClassificationBranchProcess$ = this.classificationBankBranchesService.DeleteClassificationBranch(id).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, ' حذف تصنيف فرع المصرف', ['تم حذف بنجاح']);
          // const prev = this.ClassificationBranchSubject$.getValue();
          // const result = prev.items.filter((x: any) => x.id != id);
          // this.ClassificationBranchSubject$.next({ ...prev, items: result });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الحذف', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(deleteClassificationBranchProcess$).pipe().subscribe();
    return deleteClassificationBranchProcess$;
  }

  GetClassificationBranch(page: number, pageSize: number, IsActive) {
    const getClassificationBranchProcess$ = this.classificationBankBranchesService.GetClassificationBranch(page, pageSize, IsActive).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.ClassificationBranchSubject$.next(res.content);
        } else {
          this.ClassificationBranchSubject$.next(basePaginatedInitialValue);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب تصنيفات فروع المصارف', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getClassificationBranchProcess$).pipe().subscribe();
    return getClassificationBranchProcess$;
  }

  AddClassificationBranch(ClassificationBranch: any) {
    const addClassificationBranchProcess$ = this.classificationBankBranchesService.AddClassificationBranch(ClassificationBranch).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تمت الإضافة بنجاح', res.messages);
          // const prev = this.ClassificationBranchSubject$.getValue();
          // this.ClassificationBranchSubject$.next({
          //   ...prev,
          //   items: produce(prev.items, (draft: GetClassificationBranchCommand[]) => {
          //     ClassificationBranch.id = res.content;
          //     draft.unshift(ClassificationBranch);
          //   })
          // });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الإضافة', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(addClassificationBranchProcess$).pipe().subscribe();
    return addClassificationBranchProcess$;
  }

  UpdateClassificationBranch(ClassificationBranch: any) {
    const updateClassificationBranchProcess$ = this.classificationBankBranchesService.UpdateClassificationBranch(ClassificationBranch).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تم تعديل بنجاح', res.messages);
          // const prev = this.ClassificationBranchSubject$.getValue();
          // this.ClassificationBranchSubject$.next({
          //   ...prev,
          //   items: produce(prev.items, (draft: GetClassificationBranchCommand[]) => {
          //     const index = draft.findIndex((x) => x.id === ClassificationBranch.id);
          //     draft[index] = ClassificationBranch;
          //   })
          // });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية تعديل', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(updateClassificationBranchProcess$).pipe().subscribe();
    return updateClassificationBranchProcess$;
  }

  activate(id: string, IsActive: boolean) {
    const Process$ = this.classificationBankBranchesService.Activate(id, IsActive).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, ' تغيير حالة تصنيفات فروع المصارف', ['تم تغيير حالة بنجاح']);
          // const prev = this.ClassificationBranchSubject$.getValue();
          // this.ClassificationBranchSubject$.next(
          //   produce(prev, (draft: GetClassificationBranchCommand[]) => {
          //     const index = draft.findIndex((x) => x.id === id);
          //     draft[index].isActive = IsActive;
          //   })
          // );
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم العملية بنجاح', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(Process$).pipe().subscribe();
    return Process$;
  }
}
