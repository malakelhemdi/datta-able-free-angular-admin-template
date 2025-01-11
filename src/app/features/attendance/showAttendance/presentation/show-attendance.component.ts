import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { OperatorFunction, Observable, debounceTime, distinctUntilChanged, filter, merge, switchMap, map, Subject } from 'rxjs';
import { ShowAttendanceFacade } from '../show-attendance.facade';
import { NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import {
  DefinitionPositionFacade
} from '../../../administrativeAffairs/definition-position/definition-position.facade';
import {
  OrganizationalUnitFacade
} from '../../../administrativeAffairs/organizational-unit/organizational-unit.facade';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MessageType } from '../../../../shared/shared.interfaces';
import { DialogAttendanceDetailsComponent } from './dialogAttendance-details/dialogAttendance-details';

@Component({
  selector: 'show-attendance',
  templateUrl: './show-attendance.component.html',
  styleUrls: ['./show-attendance.component.scss']
})
export class ShowAttendanceComponent implements OnInit {
  registerForm = this.fb.group({

    organizationStructureId: [''],
    year:['2024', Validators.required],
    month:[''],
    employee:[''],
    directManager: [''],
    organizationalUnitNumber: [''],
    specificUnit: [''],


  });
  constructor(private dialog: MatDialog,
              protected showAttendanceFacade: ShowAttendanceFacade,
              protected organizationalUnitFacade: OrganizationalUnitFacade,
              private fb: FormBuilder,
              private cdr: ChangeDetectorRef
  ) {
  }
  ngOnInit(): void {

    const currentYear = new Date().getFullYear();

    for (let year = currentYear; year >= 1900; year--) {
      this.years.push(year);
    }
    this.organizationalUnitFacade.UnitsByDirectManagerSubject$.next([]);
    this.organizationalUnitFacade.AllUnitsBranchingFromSpecificUnitSubject$.next([]);
    this.organizationalUnitFacade.AllUnitsDepartmentSubject$.next([]);
    this.onSubmit();
  }

  focus$ = new Subject<string>();
  click$ = new Subject<string>();
  years: number[] = [];
  months: string[] = [
    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
  ];
  multiCollapsed1 = true;
  multiCollapsed2 = true;
  @ViewChild('instance', { static: true }) instance: NgbTypeahead;

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      switchMap((term) =>
        this.showAttendanceFacade.employee$.pipe(
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
  onSubmit(): void {
    this.showAttendanceFacade.GetEmployee();
    this.organizationalUnitFacade.GetOrganizationalUnitsByLevel(0);
    this.organizationalUnitFacade.GetOrganizationalUnitsByLevel(2);
  }

  GetAllUnitsDepartment(event): void {
    this.registerForm.controls.organizationStructureId.setValue(event.target.value);
    const optionOrganization = this.organizationalUnitFacade.OrganizationalUnitsByLevel2Subject$ .getValue().find(x => x.id == this.registerForm.value.organizationStructureId);
    // this.registerForm.controls.organizationStructureName.setValue(
    //   this.registerForm.value.organizationStructureId !== '' && this.registerForm.value.organizationStructureId !== null
    //     ? optionOrganization?.name
    //     : ''
    // );
    // this.costCenter = optionOrganization?.costCenter;
    this.organizationalUnitFacade.GetAllUnitsDepartment(event.target.value);
    // this.registerForm.controls.organizationalUnitNumber.setValue('');
    // this.registerForm.controls.organizationalUnitNumberName.setValue('');
    // this.registerForm.controls.specificUnit.setValue('');
    // this.registerForm.controls.specificUnitName.setValue('');
  }
  getAllUnitsBranchingFromSpecificUnit(event): void {
    this.registerForm.controls.organizationStructureId.setValue(event.target.value);
    const optionOrganization = this.organizationalUnitFacade.AllUnitsDepartmentSubject$.getValue().find(x => x.id == this.registerForm.value.organizationStructureId);
    // this.registerForm.controls.organizationStructureName.setValue(
    //   this.registerForm.value.organizationStructureId !== '' && this.registerForm.value.organizationStructureId !== null
    //     ? optionOrganization?.name
    //     : ''
    // );

    this.organizationalUnitFacade.GetAllUnitsBranchingFromSpecificUnit(event.target.value);
    this.registerForm.controls.specificUnit.setValue('');
    // this.registerForm.controls.specificUnitName.setValue('');
  }
  selectSpecificUnit(event): void {
    this.registerForm.controls.organizationStructureId.setValue(event.target.value);
    const optionOrganization = this.organizationalUnitFacade.AllUnitsBranchingFromSpecificUnitSubject$.getValue().find(x => x.id == this.registerForm.value.organizationStructureId);
    // this.registerForm.controls.organizationStructureName.setValue(
    //   this.registerForm.value.organizationStructureId !== '' && this.registerForm.value.organizationStructureId !== null
    //     ? optionOrganization?.name
    //     : ''
    // );

  }
  loremText =
    "Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.";

  openDetails(id): void {
    if (!id) return; // Skip blank cells
    if (this.dialog.openDialogs.length > 0) {
      this.dialog.closeAll();
    }
    const dialogRef = this.dialog.open(DialogAttendanceDetailsComponent, {
      width: '1100px',
      height: '750px',
      data: {
        id:id,
      },
      panelClass: 'custom-dialog-container', // Custom CSS class for styling

    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
console.log(result);
        // // Add new time-off to timeOffData
        // const [day, month, year] = result.date.split('/').map(Number);
        // const date = new Date(year, month - 1, day);
        //this.generateCalendar();
        this.cdr.detectChanges();
       }
    });
  }


}
