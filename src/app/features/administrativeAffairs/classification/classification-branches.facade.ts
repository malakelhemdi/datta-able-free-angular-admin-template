import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { SharedFacade } from '../../../shared/shared.facade';
import { tap } from 'rxjs/operators';
import { MessageType, PaginatedData, ResponseType } from '../../../shared/shared.interfaces';
import { produce } from 'immer';
import { ClassificationBranchCommand, JobClassificationCommand } from './classification-branches.interface';
import { ClassificationBranchesService } from './classification-branches.services';
import basePaginatedInitialValue from 'src/app/shared/data/basePaginatedInitialValue';

@Injectable()
export class ClassificationBranchesFacade {
  public ClassificationSubject$ = new BehaviorSubject<PaginatedData<ClassificationBranchCommand[]>>(basePaginatedInitialValue);
  public JobClassificationSubject$ = new BehaviorSubject<PaginatedData<JobClassificationCommand[]>>(basePaginatedInitialValue);

  constructor(
    private sharedFacade: SharedFacade,
    private classificationBranchesService: ClassificationBranchesService
  ) {}

  deleteClassification(id: string) {
    const deleteClassificationProcess$ = this.classificationBranchesService.DeleteClassificationBranch(id).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, ' حذف فئة وظيفية', ['تم حذف بنجاح']);
          const prev = this.ClassificationSubject$.getValue();
          const result = prev.items.filter((x: any) => x.id != id);
          this.ClassificationSubject$.next({ ...prev, items: result });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الحذف', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(deleteClassificationProcess$).pipe().subscribe();
    return deleteClassificationProcess$;
  }

  GetClassification(Page: number, PageSize: number) {
    const getClassificationProcess$ = this.classificationBranchesService.GetClassificationBranch(Page, PageSize, 1).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.ClassificationSubject$.next(res.content);
        } else {
          this.ClassificationSubject$.next(basePaginatedInitialValue);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب فئات الوظيفية', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getClassificationProcess$).pipe().subscribe();
    return getClassificationProcess$;
  }

  GetJobClassification(Page: number, PageSize: number) {
    const getJobClassificationProcess$ = this.classificationBranchesService.GetJobClassification(Page, PageSize).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.JobClassificationSubject$.next(res.content);
        } else {
          this.JobClassificationSubject$.next(basePaginatedInitialValue);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب فئات الوظيفية', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getJobClassificationProcess$).pipe().subscribe();
    return getJobClassificationProcess$;
  }

  AddClassification(Classification: any) {
    const addClassificationProcess$ = this.classificationBranchesService.AddClassificationBranch(Classification).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تمت الإضافة بنجاح', res.messages);
          const prev = this.ClassificationSubject$.getValue();
          this.ClassificationSubject$.next({
            ...prev,
            items: produce(prev.items, (draft: ClassificationBranchCommand[]) => {
              Classification.id = res.content;
              draft.unshift(Classification);
            })
          });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الإضافة', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(addClassificationProcess$).pipe().subscribe();
    return addClassificationProcess$;
  }

  UpdateClassification(Classification: any) {
    const updateClassificationProcess$ = this.classificationBranchesService.UpdateClassificationBranch(Classification).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تم تعديل بنجاح', res.messages);
          const prev = this.ClassificationSubject$.getValue();
          this.ClassificationSubject$.next({
            ...prev,
            items: produce(prev.items, (draft: ClassificationBranchCommand[]) => {
              const index = draft.findIndex((x) => x.id === Classification.id);
              draft[index] = Classification;
            })
          });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية تعديل', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(updateClassificationProcess$).pipe().subscribe();
    return updateClassificationProcess$;
  }
}
