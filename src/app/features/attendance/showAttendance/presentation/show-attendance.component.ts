import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ShowAttendanceFacade } from '../show-attendance.facade';
import { OrganizationalUnitFacade } from '../../../administrativeAffairs/organizational-unit/organizational-unit.facade';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MessageType } from '../../../../shared/shared.interfaces';
import { DialogAttendanceDetailsComponent } from './dialogAttendance-details/dialogAttendance-details';
import { SharedFacade } from '../../../../shared/shared.facade';

@Component({
  selector: 'show-attendance',
  templateUrl: './show-attendance.component.html',
  styleUrls: ['./show-attendance.component.scss']
})
export class ShowAttendanceComponent implements OnInit {
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;
  directManager;

  registerForm = this.fb.group({
    organizationStructureId: [''],
    // year:['2024', Validators.required],
    // month:[''],
    // employee:[''],
    directManager: [''],
    organizationalUnitNumber: [''],
    specificUnit: ['']
  });
  constructor(
    private dialog: MatDialog,
    protected showAttendanceFacade: ShowAttendanceFacade,
    protected organizationalUnitFacade: OrganizationalUnitFacade,
    protected sharedFacade: SharedFacade,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.showAttendanceFacade.GetEmployeesDetails(this.registerForm.value);
  }
  ngOnInit(): void {
    this.loadEmployees(1, 10);
    const currentYear = new Date().getFullYear();

    for (let year = currentYear; year >= 1900; year--) {
      this.years.push(year);
    }
    this.organizationalUnitFacade.UnitsByDirectManagerSubject$.next([]);
    this.organizationalUnitFacade.AllUnitsBranchingFromSpecificUnitSubject$.next([]);
    this.organizationalUnitFacade.AllUnitsDepartmentSubject$.next([]);
    this.onSubmit();
  }

  years: number[] = [];
  months: string[] = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
  multiCollapsed1 = true;
  multiCollapsed2 = true;

  onSubmit(): void {
    // this.showAttendanceFacade.GetEmployee();
    // this.organizationalUnitFacade.GetOrganizationalUnitsByLevel(0);
    // this.organizationalUnitFacade.GetOrganizationalUnitsByLevel(2);
    this.loadOrganizationalUnitsLevel0(1, 10);
    this.loadOrganizationalUnitsLevel2(1, 10);
  }

  loadEmployees = (page: number, pageSize: number, searchQuery?: string): void => {
    this.showAttendanceFacade.GetEmployee(page, pageSize);
  };

  loadOrganizationalUnitsLevel0(page: number, pageSize: number): void {
    this.getOrganizationalUnitsByLevel(0, page, pageSize);
  }

  loadOrganizationalUnitsLevel2(page: number, pageSize: number): void {
    this.getOrganizationalUnitsByLevel(2, page, pageSize);
  }

  getOrganizationalUnitsByLevel(level: number, page: number, pageSize: number): void {
    this.organizationalUnitFacade.GetOrganizationalUnitsByLevel(page, pageSize, level);
  }

  onOrganizationalUnitsByLevel2Select(event: any): void {
    this.registerForm.controls.organizationStructureId.setValue(event.id);
    this.organizationalUnitFacade.GetAllUnitsDepartment(event.id);
    this.directManager = event.id;
  }

  // GetAllUnitsDepartment(event): void {
  //   this.registerForm.controls.organizationStructureId.setValue(event.target.value);
  //   this.organizationalUnitFacade.GetAllUnitsDepartment(event.target.value);
  // }

  getAllUnitsBranchingFromSpecificUnit(event): void {
    this.registerForm.controls.organizationStructureId.setValue(event.target.value);
    // const optionOrganization = this.organizationalUnitFacade.AllUnitsDepartmentSubject$.getValue().find(
    //   (x) => x.id == this.registerForm.value.organizationStructureId
    // );
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
    const optionOrganization = this.organizationalUnitFacade.AllUnitsBranchingFromSpecificUnitSubject$.getValue().find(
      (x) => x.id == this.registerForm.value.organizationStructureId
    );
    // this.registerForm.controls.organizationStructureName.setValue(
    //   this.registerForm.value.organizationStructureId !== '' && this.registerForm.value.organizationStructureId !== null
    //     ? optionOrganization?.name
    //     : ''
    // );
  }
  onSearch() {
    this.showAttendanceFacade.GetEmployeesDetails(this.registerForm.value);
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
        EmployeeCode: id
      },
      panelClass: 'custom-dialog-container' // Custom CSS class for styling
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.cdr.detectChanges();
        // this.showAttendanceFacade.GetEmployeesDetails(this.registerForm.value);
      }
    });
  }

  uploadFile(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const allowedExtensions = ['xlsx', 'xls'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (fileExtension && allowedExtensions.includes(fileExtension)) {
        // Valid Excel file
        this.showAttendanceFacade.UploadAttendances(file);
      } else {
        // Invalid file type
        this.showNotification('عفواً، excelالرجاء تأكد من ملف على ان يكون   ', '');
        input.value = ''; // Clear the file input
      }
    }
  }
  resetFileInput(input: HTMLInputElement) {
    // Reset the input value by setting it to null
    input.value = '';
  }
  showNotification(title, text) {
    this.sharedFacade.showMessage(MessageType.warning, title, ['']);
  }
}
