import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizationalUnitFacade } from '../organizational-unit.facade';
import { ClassificationBranchesFacade } from '../../classification/classification-branches.facade';
import { optionsBooleanGeneral, optionsJobClassification } from '../../../../core/core.interface';
import { MessageType } from '../../../../shared/shared.interfaces';
import { SharedFacade } from '../../../../shared/shared.facade';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import getSingleItemFromPaginatedObject from 'src/app/shared/utils/getSingleItemFromPaginatedObject';
import { format } from 'date-fns';

@Component({
  selector: 'app-rewards-types',
  templateUrl: './organizational-unit.component.html',
  styleUrl: './organizational-unit.component.scss'
})
export class OrganizationalUnitComponent implements OnInit {
  displayedColumns: string[] = ['name', 'costCenter', 'parentName', 'classificationsName', 'approvalDate', 'actions'];
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

  loadOrganizationalUnitsLevel0(page: number, pageSize: number): void {
    this.getOrganizationalUnitsByLevel(0, page, pageSize);
  }

  loadOrganizationalUnitsLevel2(page: number, pageSize: number): void {
    this.getOrganizationalUnitsByLevel(2, page, pageSize);
  }

  loadUnitType(page: number, pageSize: number): void {
    this.organizationalUnitFacade.GetUnitType(page, pageSize);
  }

  loadClassifications(page: number, pageSize: number): void {
    this.classificationBranchesFacade.GetClassification(page, pageSize);
  }

  // onOrganizationalUnitSelect(event: any): void {
  //   this.registerForm.controls.organizationStructureTypeId.setValue(event.id);
  // }

  onOrganizationalUnitsByLevel0Select(event: any): void {
    this.getOrganizationalUnitIdNextQuery();
    // this.registerForm.controls.parentId.setValue(event.id);
  }

  // onClassificationsSelect(event: any) {
  //   this.registerForm.controls.classificationId.setValue(event.id);
  // }

  ngOnInit() {
    this.edit = false;
    this.dataSource.paginator = this.paginator;
    this.loadOrganizationalUnits(this.currentPage + 1, this.pageSize);
    this.loadOrganizationalUnitsLevel0(1, 10);
    this.loadOrganizationalUnitsLevel2(1, 10);
    this.loadUnitType(1, 10);
    this.loadClassifications(1, 10);
    this.organizationalUnitFacade.OrganizationalUnitSubject$.subscribe((data) => {
      this.dataSource.data = data.items;
      this.totalCount = data.totalCount;
    });

    this.organizationalUnitFacade.ContentIdNextQuerySubject$.subscribe((data) => {
      console.log(data);
      this.registerForm.controls.number.setValue(data);
    });
  }

  edit: boolean = false;
  registerForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    // classificationId: [null],
    // classificationsName: [''],
    classification: [null],
    number: [{ value: '', disabled: true }],

    // parentId: [null],
    // parentName: [''],
    parent: [null],

    costCenter: ['', [Validators.minLength(4), Validators.maxLength(6)]],
    approvalDate: [''],
    Notes: this.fb.array([]),
    // organizationStructureTypeId: ['', Validators.required],
    organizationStructureType: [null as any, Validators.required],
    isEmployeeAffairs: [false, Validators.required]
  });
  registerFormSearch = this.fb.group({
    number: [''],
    name: ['']
    // parentId: [''],
    // directManager: [null],
    // organizationalUnitNumber: [null],
    // specificUnit: [null],
  });
  constructor(
    private fb: FormBuilder,
    protected organizationalUnitFacade: OrganizationalUnitFacade,
    protected classificationBranchesFacade: ClassificationBranchesFacade,
    protected sharedFacade: SharedFacade
  ) {
    // this.classificationBranchesFacade.GetClassification();
    // this.getOrganizationalUnitsByLevel(0);
    // this.getOrganizationalUnitsByLevel(2);
    this.registerForm.controls.id.setValue('');
    // this.organizationalUnitFacade.GetOrganizationalUnit('');
    // this.organizationalUnitFacade.GetUnitType();
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
    this.registerForm.controls.id.setValue('');
    this.loadOrganizationalUnitsLevel0(1, 10);
    this.loadOrganizationalUnitsLevel2(1, 10);
    this.loadClassifications(1, 10);
    return this.loadOrganizationalUnits(this.currentPage + 1, this.pageSize);
  }
  getOrganizationalUnitsByLevel(level: number, page: number, pageSize: number): void {
    this.organizationalUnitFacade.GetOrganizationalUnitsByLevel(page, pageSize, level);
  }
  onSearch(): void {
    this.registerForm.controls.id.setValue('');
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
    if (this.registerForm.valid) {
      // const optionClass = this.classificationBranchesFacade.ClassificationSubject$.getValue().items.find(
      //   (x) => x.id == this.registerForm.value.classificationId
      // );
      // this.registerForm.value.classificationsName =
      //   this.registerForm.value.classificationId != '' && this.registerForm.value.classificationId != null ? optionClass.name : '';

      // const optionParentName = this.organizationalUnitFacade.OrganizationalUnitsByLevelSubject$.getValue().items.find(
      //   (x) => x.id == this.registerForm.value.parentId
      // );

      // this.registerForm.value.parentName =
      //   this.registerForm.value.parentId != '' && this.registerForm.value.parentId != null ? optionParentName.name : '';

      // const changeName = this.organizationalUnitFacade.UnitTypeSubject$.getValue().items.find(
      //   (x) => x.id == this.registerForm.controls.organizationStructureTypeId.value
      // );

      // this.registerForm.controls.name.setValue(changeName.name + ' ' + this.registerForm.controls.name.value);
      this.registerForm.controls.name.setValue(
        this.registerForm.value.organizationStructureType.name + ' ' + this.registerForm.controls.name.value
      );

      const objectToBeSent = {
        ...this.registerForm?.value,
        classificationId: this.registerForm.value?.classification?.id || null,
        classificationsName: this.registerForm.value?.classification?.name || '',
        parentId: this.registerForm.value?.parent?.id || null,
        parentName: this.registerForm.value?.parent?.name || '',

        organizationStructureTypeId: this.registerForm.value?.organizationStructureType.id
        // organizationStructureTypeName: this.registerForm.value?.organizationStructureType.name,
      };
      console.log(objectToBeSent);

      if (this.edit) {
        this.organizationalUnitFacade.UpdateOrganizationalUnit(objectToBeSent).subscribe(() => {
          this.onReset();
        });
      } else {
        this.organizationalUnitFacade.AddOrganizationalUnit(objectToBeSent).subscribe(() => {
          this.onReset();
        });
      }
    } else {
      if (this.registerForm.value.organizationStructureType == '' || this.registerForm.controls.organizationStructureType.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء اختر نوع الوحدة التنظيمية', ['']);
        return;
      } else if (this.registerForm.value.name == '' || this.registerForm.controls.name.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال اسم الوحدة التنظيمية', ['']);
        return;
      } else if (this.registerForm.value.costCenter == '' || this.registerForm.controls.costCenter.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال مركز التكلفة ويتكون من 4 إلي 6 خانات', ['']);
        return;
      }
    }
  }
  onEdit(unit: any): void {
    // const classification = getSingleItemFromPaginatedObject(
    //   this.classificationBranchesFacade.ClassificationSubject$.getValue(),
    //   unit.classificationId
    // );

    // const parent = getSingleItemFromPaginatedObject(
    //   this.organizationalUnitFacade.OrganizationalUnitsByLevelSubject$.getValue(),
    //   unit.parentId
    // );
    // console.log(this.organizationalUnitFacade.OrganizationalUnitsByLevelSubject$.getValue());
    console.log(unit);
    this.registerForm.patchValue({
      ...unit,
      classification: {
        id: unit?.classificationId || null,
        name: unit?.classificationsName || null
      },
      parent: {
        id: unit?.parentId || null,
        name: unit?.parentName || null
      },
      organizationStructureType: {
        id: unit?.organizationStructureTypeId || null,
        name: unit?.organizationStructureTypeName || null
      },
      approvalDate: format(unit.approvalDate, 'yyyy-MM-dd')
    });
    this.registerForm.controls.number.setValue(unit.number);
    this.edit = true;
  }
  // GetAllUnitsDepartment(): void {
  //   this.registerFormSearch.controls.parentId.setValue(this.registerFormSearch.value?.directManager??'');
  //   this.organizationalUnitFacade.GetAllUnitsDepartment(this.registerFormSearch.value?.directManager?? '');
  //
  // }
  addNote(): void {
    // if(this.secondFormGroup.value.socialStatus == 3){
    const NoteArray = this.registerForm.get('Notes') as FormArray;
    if (NoteArray.length == 0) {
      NoteArray.push(this.createNote());
    }
  }
  removeNote(index: number) {
    this.Notes.removeAt(index);
  }
  get Notes(): FormArray {
    return this.registerForm.get('Notes') as FormArray;
  }
  getControl(control: AbstractControl, controlName: string): AbstractControl | null {
    return control.get(controlName);
  }
  protected readonly optionsJobClassification = optionsJobClassification;
  protected readonly optionsBooleanGeneral = optionsBooleanGeneral;
  protected readonly length = length;
}
