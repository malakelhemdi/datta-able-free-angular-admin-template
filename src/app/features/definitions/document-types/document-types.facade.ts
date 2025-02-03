import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay } from 'rxjs';
import { SharedFacade } from '../../../shared/shared.facade';
import { tap } from 'rxjs/operators';
import { MessageType, PaginatedData, ResponseType } from '../../../shared/shared.interfaces';
import { DocumentTypesServices } from './document-types.services';
import { GetDocumentTypeCommand } from './document-types.interface';
import basePaginatedInitialValue from 'src/app/shared/data/basePaginatedInitialValue';

@Injectable()
export class DocumentTypesFacade {
  private DocumentTypeSubject$ = new BehaviorSubject<PaginatedData<GetDocumentTypeCommand[]>>(basePaginatedInitialValue);
  public DocumentType$ = this.DocumentTypeSubject$.asObservable();

  constructor(
    private sharedFacade: SharedFacade,
    private documentTypesServices: DocumentTypesServices
  ) {}

  deleteDocumentType(id: string) {
    const deleteDocumentTypeProcess$ = this.documentTypesServices.DeleteDocumentTypes(id).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, ' حذف نوع مستند', ['تم حذف بنجاح']);
          // const prev = this.DocumentTypeSubject$.getValue();
          // const result = prev.items.filter((x: any) => x.id != id);
          // this.DocumentTypeSubject$.next({ ...prev, items: result });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الحذف', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(deleteDocumentTypeProcess$).pipe().subscribe();
    return deleteDocumentTypeProcess$;
  }

  GetDocumentType(page: number, pageSize: number) {
    const getDocumentTypeProcess$ = this.documentTypesServices.GetDocumentTypes(page, pageSize, 0).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.DocumentTypeSubject$.next(res.content);
        } else {
          this.DocumentTypeSubject$.next(basePaginatedInitialValue);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب مستندات', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getDocumentTypeProcess$).pipe().subscribe();
    return getDocumentTypeProcess$;
  }

  AddDocumentType(document: any) {
    const addDocumentTypeProcess$ = this.documentTypesServices.AddDocumentTypes(document).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تمت الإضافة بنجاح', res.messages);
          // const prev = this.DocumentTypeSubject$.getValue();
          // this.DocumentTypeSubject$.next({
          //   ...prev,
          //   items: produce(prev.items, (draft: GetDocumentTypeCommand[]) => {
          //     document.id = res.content;
          //     draft.unshift(document);
          //   })
          // });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الإضافة', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(addDocumentTypeProcess$).pipe().subscribe();
    return addDocumentTypeProcess$;
  }

  UpdateDocumentType(document: any) {
    const updateDocumentTypeProcess$ = this.documentTypesServices.UpdateDocumentTypes(document).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تم تعديل بنجاح', res.messages);
          // const prev = this.DocumentTypeSubject$.getValue();
          // this.DocumentTypeSubject$.next({
          //   ...prev,
          //   items: produce(prev.items, (draft: GetDocumentTypeCommand[]) => {
          //     const index = draft.findIndex((x) => x.id === document.id);
          //     draft[index] = document;
          //   })
          // });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية تعديل', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(updateDocumentTypeProcess$).pipe().subscribe();
    return updateDocumentTypeProcess$;
  }

  activate(id: string, IsActive: boolean) {
    const Process$ = this.documentTypesServices.Activate(id, IsActive).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, ' تغيير حالة مستندات', ['تم تغيير حالة بنجاح']);
          // const prev = this.DocumentTypeSubject$.getValue();
          // this.DocumentTypeSubject$.next({
          //   ...prev,
          //   items: produce(prev.items, (draft: GetDocumentTypeCommand[]) => {
          //     const index = draft.findIndex((x) => x.id === id);
          //     draft[index].isActive = IsActive;
          //   })
          // });
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
