import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizationalUnitFacade } from '../../../organizational-unit/organizational-unit.facade';
import { ClassificationBranchesFacade } from '../../../classification/classification-branches.facade';
import { SharedFacade } from '../../../../../shared/shared.facade';
import { MessageType } from '../../../../../shared/shared.interfaces';
import { format } from 'date-fns';
import { SequenceManagementFacade } from '../../sequence-management.facade';

@Component({
  selector: 'app-sequence-management',
  templateUrl: './sequence-management.component.html',
  styleUrl: './sequence-management.component.scss'
})
export class SequenceManagementComponent implements OnInit {
  displayedColumns: string[] = ['name', 'from', 'to'];
  dataSource = new MatTableDataSource<any>();
  totalCount = 0;
  pageSize = 10;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex; // MatPaginator uses 0-based index, so add 1
    this.pageSize = event.pageSize;
    this.loadOrganizationalUnits(this.currentPage + 1, this.pageSize);
  }

  loadOrganizationalUnits(page: number, pageSize: number) {
    return this.organizationalUnitFacade.GetOrganizationalUnit(page, pageSize, '');
  }

  loadOrganizationalUnitsLevel0(page: number, pageSize: number, search = ''): void {
    this.getOrganizationalUnitsByLevel(0, page, pageSize, search);
  }

  loadOrganizationalUnitsLevel2(page: number, pageSize: number): void {
    this.getOrganizationalUnitsByLevel(2, page, pageSize);
  }


  ngOnInit() {
    this.edit = false;
    this.dataSource.paginator = this.paginator;
    this.loadOrganizationalUnitsLevel0(1, 10);
    this.sequenceManagementFacade.getJobSequenceSubject$.subscribe((data) => {
      this.dataSource.data = data.items;
      this.totalCount = data.totalCount;
    });
    this.sequenceManagementFacade.getJobSequence(1,10)
  }

  edit: boolean = false;
  registerForm = this.fb.group({
    from: [''],
    to: ['', Validators.required],
    parent: [null]
  });
  registerFormSearch = this.fb.group({
    number: [''],
    name: ['']
  });

  constructor(
    private fb: FormBuilder,
    protected organizationalUnitFacade: OrganizationalUnitFacade,
    protected sequenceManagementFacade: SequenceManagementFacade,
    protected sharedFacade: SharedFacade
  ) {


  }

  createNote(): FormGroup {
    return this.fb.group({
      text: ['', Validators.required]
    });
  }

  onSubmit() {
    // this.classificationBranchesFacade.GetJobClassification();
    // this.classificationBranchesFacade.GetClassification();
    // this.getOrganizationalUnitsByLevel(0);
    // this.getOrganizationalUnitsByLevel(2);
    // this.organizationalUnitFacade.GetOrganizationalUnit('');
    this.loadOrganizationalUnitsLevel0(1, 10);
    this.loadOrganizationalUnitsLevel2(1, 10);
    return this.loadOrganizationalUnits(this.currentPage + 1, this.pageSize);
  }

  getOrganizationalUnitsByLevel(level: number, page: number, pageSize: number, Name = ''): void {
    this.organizationalUnitFacade.GetOrganizationalUnitsByLevel(page, pageSize, level, Name);
  }

  onSearch(): void {
    // if ((this.registerFormSearch.value.parentId == null )&& (this.registerFormSearch.value.name ==  null )&& (this.registerFormSearch.value.number == '' )){
    if (this.registerFormSearch.value.name == null && this.registerFormSearch.value.number == '') {
      this.onSubmit();
    } else {
      // this.organizationalUnitFacade.filterOrganizationalUnits(this.registerFormSearch.value?.parentId?? null,this.registerFormSearch.value?.name?? null,this.registerFormSearch.value?.number?? '');
      this.organizationalUnitFacade.filterOrganizationalUnits(
        1,
        10,
        null,
        this.registerFormSearch.value?.name ?? null,
        null,
        this.registerFormSearch.value?.number ?? ''
      );
    }
  }

  getOrganizationalUnitIdNextQuery(): void {
    if (this.registerForm.value?.parent) {
      this.organizationalUnitFacade.GetOrganizationalUnitIdNextQuery(this.registerForm.value?.parent.id);
    }
    // this.registerForm.controls.number.setValue(this.organizationalUnitFacade.ContentIdNextQuerySubject$.getValue());
  }

  // getAllUnitsBranchingFromSpecificUnit(): void {
  //   this.registerFormSearch.controls.parentId.setValue(this.registerFormSearch.value?.organizationalUnitNumber??'');
  //   this.organizationalUnitFacade.GetAllUnitsBranchingFromSpecificUnit(this.registerFormSearch.value?.organizationalUnitNumber);
  // }
  // selectSpecificUnit(): void {
  //   this.registerFormSearch.controls.parentId.setValue(this.registerFormSearch.value?.specificUnit??'');
  // }
  onDelete(Id: string): void {
    if (confirm('هل أنت متأكد من عملية المسح؟')) {
      this.organizationalUnitFacade.deleteOrganizationalUnit(Id).subscribe(() => {
        this.edit = false;
        this.registerForm.reset();
        this.loadOrganizationalUnits(this.currentPage + 1, this.pageSize);
      });
    }
  }

  onReset() {
    this.edit = false;
    this.registerForm.reset();
    this.registerForm.setErrors(null);
    this.registerFormSearch.reset();
    this.registerFormSearch.setErrors(null);
    // this.organizationalUnitFacade.UnitsByDirectManagerSubject$.next([]);
    // this.organizationalUnitFacade.AllUnitsBranchingFromSpecificUnitSubject$.next([]);
    // this.organizationalUnitFacade.AllUnitsDepartmentSubject$.next([]);
    return this.onSubmit();
  }

  onAdd(): void {
    console.log(this.registerForm);
    if (this.registerForm.valid) {

      const objectToBeSent = {
        ...this.registerForm?.value,
        organizationStructureId: this.registerForm.value?.parent?.id || null,
        from: this.registerForm.value?.from ,
        to: this.registerForm.value?.to
      };

      this.sequenceManagementFacade.addJobSequence(objectToBeSent).subscribe(() => {
        this.onReset();
      });
    }
  }

  // onEdit(unit: any): void {
  //   // const classification = getSingleItemFromPaginatedObject(
  //   //   this.classificationBranchesFacade.ClassificationSubject$.getValue(),
  //   //   unit.classificationId
  //   // );
  //
  //   // const parent = getSingleItemFromPaginatedObject(
  //   //   this.organizationalUnitFacade.OrganizationalUnitsByLevelSubject$.getValue(),
  //   //   unit.parentId
  //   // );
  //   // console.log(this.organizationalUnitFacade.OrganizationalUnitsByLevelSubject$.getValue());
  //   this.registerForm.patchValue({
  //     ...unit,
  //     classification: {
  //       id: unit?.classificationId || null,
  //       name: unit?.classificationsName || null
  //     },
  //     parent: {
  //       id: unit?.parentId || null,
  //       name: unit?.parentName || null
  //     },
  //     organizationStructureType: {
  //       id: unit?.organizationStructureTypeId || null,
  //       name: unit?.organizationStructureTypeName || null
  //     },
  //     approvalDate: format(unit.approvalDate, 'yyyy-MM-dd')
  //   });
  //   this.registerForm.controls.number.setValue(unit.number);
  //   this.edit = true;
  // }
  // GetAllUnitsDepartment(): void {
  //   this.registerFormSearch.controls.parentId.setValue(this.registerFormSearch.value?.directManager??'');
  //   this.organizationalUnitFacade.GetAllUnitsDepartment(this.registerFormSearch.value?.directManager?? '');
  //

}
