import {Injectable} from "@angular/core";
import {BehaviorSubject, shareReplay} from "rxjs";
import {SharedFacade} from "../../../shared/shared.facade";
import {tap} from "rxjs/operators";
import {MessageType, ResponseType} from "../../../shared/shared.interfaces";
import {produce} from "immer";
import {AddEmployeeServices} from "./add-employee.services";
import { AddJobTitleCommand, GetJobTitleCommand,UpdateJobTitleCommand} from "./add-employee.interface";

    @Injectable()
    export class AddEmployeeFacade {

    private JobTitleSubject$ = new BehaviorSubject<GetJobTitleCommand[]>([]);
    public JobTitles$ = this.JobTitleSubject$.asObservable();

    constructor(
        private sharedFacade: SharedFacade,
        private jobTitleServices: AddEmployeeServices
    ) {
    }
    deleteJobTitle(id: string): void {
        const deleteJobTitleProcess$ = this.jobTitleServices.DeleteJobTitle(id).pipe(
            tap(res => {
                if (res.type == ResponseType.Success) {
                    // this.sharedFacade.showMessage(MessageType.success, 'تم حذف بنجاح', res.messages);
                    this.sharedFacade.showMessage(MessageType.success, ' حذف وصف الوظيفي', ['تم حذف بنجاح']);
                    const prev = this.JobTitleSubject$.getValue();
                    const result = prev.filter((x: any) => x.id != id);
                    this.JobTitleSubject$.next(result);
                    this.JobTitleSubject$.subscribe();
                } else {
                    this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الحذف', res.messages);
                }
            }),
            shareReplay()
        );
        this.sharedFacade.showLoaderUntilCompleted(deleteJobTitleProcess$).pipe().subscribe();
    }
    GetJobTitle(data : any): any {
        const getJobTitleProcess$ = this.jobTitleServices.GetJobTitle(data).pipe(
            tap(res => {
                if (res.type == ResponseType.Success) {
                    this.JobTitleSubject$.next(res.content);
                } else {
                    this.JobTitleSubject$.next([]);
                    this.sharedFacade.showMessage(MessageType.error, 'خطأ في عملية جلب البيانات', res.messages);
                }
            }),
            shareReplay()
        );
        this.sharedFacade.showLoaderUntilCompleted(getJobTitleProcess$).pipe().subscribe();
    }
    AddJobTitle(JobTitle: any): void {
        const addJobTitleProcess$ = this.jobTitleServices.AddJobTitle(JobTitle).pipe(
            tap(res => {
                if (res.type == ResponseType.Success) {
                    this.sharedFacade.showMessage(MessageType.success, 'تمت الإضافة بنجاح',res.messages);
                    const prev = this.JobTitleSubject$.getValue();
                    this.JobTitleSubject$.next(
                        produce(prev, (draft: GetJobTitleCommand[]) => {
                            JobTitle.id = res.content;
                            draft.unshift(JobTitle);
                        }));
                } else {
                    this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية الإضافة', res.messages);
                }
            }),

            shareReplay()
        );
        this.sharedFacade.showLoaderUntilCompleted(addJobTitleProcess$).pipe().subscribe();
    }
    UpdateJobTitle(JobTitle: any): void {
        const updateJobTitleProcess$ = this.jobTitleServices.UpdateJobTitle(JobTitle).pipe(
            tap(res => {
                if (res.type == ResponseType.Success) {
                    this.sharedFacade.showMessage(MessageType.success, 'تم تعديل بنجاح', res.messages);
                    const prev = this.JobTitleSubject$.getValue();
                    this.JobTitleSubject$.next(
                        produce(prev, (draft: GetJobTitleCommand[]) => {
                            const index = draft.findIndex(x => x.id === JobTitle.id);
                            draft[index] = JobTitle;
                        }));
                    this.JobTitleSubject$.subscribe();
                } else {
                    this.sharedFacade.showMessage(MessageType.error, 'لم تتم عملية تعديل', res.messages);
                }
            }),

            shareReplay()
        );
        this.sharedFacade.showLoaderUntilCompleted(updateJobTitleProcess$).pipe().subscribe();
    }
}
