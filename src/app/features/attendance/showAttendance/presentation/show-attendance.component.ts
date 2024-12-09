import { Component, OnInit, ViewChild } from '@angular/core';
import { OperatorFunction, Observable, debounceTime, distinctUntilChanged, filter, merge, switchMap, map, Subject } from 'rxjs';
import { ShowAttendanceFacade } from '../show-attendance.facade';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'show-attendance',
  templateUrl: './show-attendance.component.html',
  styleUrls: ['./show-attendance.component.scss']
})
export default class ShowAttendanceComponent implements OnInit {
  constructor(protected employeeFacade: ShowAttendanceFacade) {}
  ngOnInit(): void {
    this.employeeFacade.GetEmployee();
  }

  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  @ViewChild('instance', { static: true }) instance: NgbTypeahead;

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      switchMap((term) =>
        this.employeeFacade.employee$.pipe(
          map((emp) => emp.map((e) => e.name)),
          map((employees) =>
            term === ''
              ? employees // Show all employees if term is empty
              : employees.filter((employee) => employee.toLowerCase().includes(term.toLowerCase()))
          )
        )
      )
    );
  };
}
