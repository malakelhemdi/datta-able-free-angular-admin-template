<<<<<<< HEAD
import { BehaviorSubject, shareReplay } from 'rxjs';
import { SharedFacade } from '../../../shared/shared.facade';
import { tap } from 'rxjs/operators';
import { MessageType, PaginatedData, ResponseType } from '../../../shared/shared.interfaces';
import { produce } from 'immer';
import { NationalitiesServices } from './nationalities.services';
import { GetNationalityCommand } from './nationalities.interface';
import { Injectable } from '@angular/core';
import basePaginatedInitialValue from 'src/app/shared/data/basePaginatedInitialValue';

=======
import {BehaviorSubject, shareReplay} from "rxjs";
import {SharedFacade} from "../../../shared/shared.facade";
import {tap} from "rxjs/operators";
import {MessageType, ResponseType} from "../../../shared/shared.interfaces";
import {produce} from "immer";
import {NationalitiesServices} from "./nationalities.services";
import {AddNationalityCommand, GetNationalityCommand, UpdateNationalityCommand} from "./nationalities.interface";
import {Injectable} from "@angular/core";
import { GetBonusesTypeCommand } from '../bonuses-types/bonuses-types.interface';
>>>>>>> 63560ebf8332f0d0cba6a0c04b9970c287b0f03d
@Injectable()
export class NationalitiesFacade {
  public NationalitySubject$ = new BehaviorSubject<PaginatedData<GetNationalityCommand[]>>(basePaginatedInitialValue);
  public Nationality$ = this.NationalitySubject$.asObservable();

<<<<<<< HEAD
  constructor(
    private sharedFacade: SharedFacade,
    private nationalitiesServices: NationalitiesServices
  ) {}
=======
    constructor(
        private sharedFacade: SharedFacade,
        private nationalitiesServices: NationalitiesServices
    ) {
    }
    deleteNationality(id: string): void {
        const deleteNationalityProcess$ = this.nationalitiesServices.DeleteNationality(id).pipe(
            tap(res => {
                if (res.type == ResponseType.Success) {
                    // this.sharedFacade.showMessage(MessageType.success, 'تم حذف بنجاح', res.messages);
                    this.sharedFacade.showMessage(MessageType.success, ' حذف الجنسية', ['تم حذف بنجاح']);
                    const prev = this.NationalitySubject$.getValue();
                    const result = prev.filter((x: any) => x.id != id);
                    this.NationalitySubject$.next(result);
                    this.NationalitySubject$.subscribe();
                } else {
                    this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الحذف', res.messages);
                }
            }),
            shareReplay()
        );
        this.sharedFacade.showLoaderUntilCompleted(deleteNationalityProcess$).pipe().subscribe();
    }
    GetNationality(): any {
        const getNationalityProcess$ = this.nationalitiesServices.GetNationality(1).pipe(
            tap(res => {
                if (res.type == ResponseType.Success) {
                    this.NationalitySubject$.next(res.content);
                } else {
                    this.NationalitySubject$.next([]);
                    this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب الجنسيات', res.messages);
                }
            }),
            shareReplay()
        );
        this.sharedFacade.showLoaderUntilCompleted(getNationalityProcess$).pipe().subscribe();
    }
    AddNationality(nationality: any): void {
        const addNationalityProcess$ = this.nationalitiesServices.AddNationality(nationality).pipe(
            tap(res => {
                if (res.type == ResponseType.Success) {
                    this.sharedFacade.showMessage(MessageType.success, 'تمت الإضافة بنجاح', res.messages);
                    const prev = this.NationalitySubject$.getValue();
                    this.NationalitySubject$.next(
                        produce(prev, (draft: GetNationalityCommand[]) => {
                            nationality.id = res.content;
                            draft.unshift(nationality);
>>>>>>> 63560ebf8332f0d0cba6a0c04b9970c287b0f03d

  deleteNationality(id: string): void {
    const deleteNationalityProcess$ = this.nationalitiesServices.DeleteNationality(id).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, ' حذف الجنسية', ['تم حذف بنجاح']);
          const prev = this.NationalitySubject$.getValue();
          const result = prev.items.filter((x: any) => x.id != id);
          this.NationalitySubject$.next({ ...prev, items: result });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الحذف', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(deleteNationalityProcess$).pipe().subscribe();
  }

  GetNationality(page: number, pageSize: number): any {
    const getNationalityProcess$ = this.nationalitiesServices.GetNationality(page, pageSize).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.NationalitySubject$.next(res.content);
        } else {
          this.NationalitySubject$.next(basePaginatedInitialValue);
          this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب الجنسيات', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(getNationalityProcess$).pipe().subscribe();
  }

<<<<<<< HEAD
  AddNationality(nationality: any): void {
    const addNationalityProcess$ = this.nationalitiesServices.AddNationality(nationality).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تمت الإضافة بنجاح', res.messages);
          const prev = this.NationalitySubject$.getValue();
          this.NationalitySubject$.next({
            ...prev,
            items: produce(prev.items, (draft: GetNationalityCommand[]) => {
              nationality.id = res.content;
              draft.unshift(nationality);
            })
          });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الإضافة', res.messages);
=======
            shareReplay()
        );
        this.sharedFacade.showLoaderUntilCompleted(updateNationalityProcess$).pipe().subscribe();
    }

  activate(id: string,IsActive: boolean): void {
    const Process$ = this.nationalitiesServices.Activate(id, IsActive).pipe(
      tap(res => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, ' تغيير حالة الجنسية', ['تم تغيير حالة بنجاح']);
          const prev = this.NationalitySubject$.getValue();
          this.NationalitySubject$.next(
            produce(prev, (draft: GetNationalityCommand[]) => {
              const index = draft.findIndex(x => x.id === id);
              draft[index].isActive = IsActive;
            }));
          this.NationalitySubject$.subscribe();
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية بنجاح', res.messages);
>>>>>>> 63560ebf8332f0d0cba6a0c04b9970c287b0f03d
        }
      }),
      shareReplay()
    );
<<<<<<< HEAD
    this.sharedFacade.showLoaderUntilCompleted(addNationalityProcess$).pipe().subscribe();
  }

  UpdateNationality(nationality: any): void {
    const updateNationalityProcess$ = this.nationalitiesServices.UpdateNationality(nationality).pipe(
      tap((res) => {
        if (res.type == ResponseType.Success) {
          this.sharedFacade.showMessage(MessageType.success, 'تم تعديل بنجاح', res.messages);
          const prev = this.NationalitySubject$.getValue();
          this.NationalitySubject$.next({
            ...prev,
            items: produce(prev.items, (draft: GetNationalityCommand[]) => {
              const index = draft.findIndex((x) => x.id === nationality.id);
              draft[index] = nationality;
            })
          });
        } else {
          this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية تعديل', res.messages);
        }
      }),
      shareReplay()
    );
    this.sharedFacade.showLoaderUntilCompleted(updateNationalityProcess$).pipe().subscribe();
  }
=======
    this.sharedFacade.showLoaderUntilCompleted(Process$).pipe().subscribe();
  }

>>>>>>> 63560ebf8332f0d0cba6a0c04b9970c287b0f03d
}
