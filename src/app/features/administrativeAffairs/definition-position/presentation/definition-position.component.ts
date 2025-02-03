import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { optionsBooleanGeneral, optionsJobClassification } from '../../../../core/core.interface';
import { OrganizationalUnitFacade } from '../../organizational-unit/organizational-unit.facade';
import { DefinitionPositionFacade } from '../definition-position.facade';
import { optionsNationalityType } from '../../../definitions/nationalities/nationalities.interface';
import { JobTitleFacade } from '../../job-title/job-title.facade';
import { MessageType } from '../../../../shared/shared.interfaces';
import { SharedFacade } from '../../../../shared/shared.facade';
import { GetJobTitleCommand } from '../../job-title/job-title.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import basePaginatedInitialValue from 'src/app/shared/data/basePaginatedInitialValue';

@Component({
  selector: 'app-rewards-types',
  templateUrl: './definition-position.component.html',
  styleUrl: './definition-position.component.scss'
})
export class DefinitionPositionComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    protected definitionPositionFacade: DefinitionPositionFacade,
    protected organizationalUnitFacade: OrganizationalUnitFacade,
    protected jobTitleFacade: JobTitleFacade,
    protected sharedFacade: SharedFacade
  ) {}

  displayedColumns: string[] = [
    'positionCode',
    'jobCode',
    'jobTitleName',
    'locationName',
    'organizationStructureName',
    'positionType',
    'approvalDate',
    'actions'
  ];

  dataSource = new MatTableDataSource<any>();
  totalCount = 0;
  pageSize = 10;
  currentPage = 0;

  currentPositionCode = '';
  currentJobTitleId = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex; // MatPaginator uses 0-based index, so add 1
    this.pageSize = event.pageSize;
    this.loadPositions(this.currentPage + 1, this.pageSize, this.currentPositionCode, this.currentJobTitleId);
  }

  loadOrganizationalUnitsLevel2(page: number, pageSize: number): void {
    this.getOrganizationalUnitsByLevel(2, page, pageSize);
  }
  loadOrganizationalUnitsLevel0(page: number, pageSize: number): void {
    this.getOrganizationalUnitsByLevel(0, page, pageSize);
  }

  loadLocations(page: number, pageSize: number): void {
    this.definitionPositionFacade.GetLocations(page, pageSize);
  }

  getOrganizationalUnitsByLevel(level: number, page: number, pageSize: number): void {
    this.organizationalUnitFacade.GetOrganizationalUnitsByLevel(page, pageSize, level);
  }

  onOrganizationalUnitsByLevel02elect(event) {
    // this.registerForm.get('directManager').setValue(event.id);
    this.directManager = event.id;
    this.GetAllUnitsDepartment();
  }

  onLocationSelect(event) {}

  loadPositions(page: number, pageSize: number, PositionCode: string, JobTitleId: string) {
    this.definitionPositionFacade.GetPosition(page, pageSize, PositionCode, JobTitleId);
  }

  directManager;

  edit: boolean = false;
  isChecked: boolean = false;
  haveAdmin: boolean = false;
  costCenter: string = '';
  allPositions: any[] = []; // Store all positions
  filteredPositions: any[] = []; // Store filtered positions

  filteredJobTitles: GetJobTitleCommand[] = [];
  private allJobTitles: GetJobTitleCommand[] = [];
  showDropdown = false;
  searchTerm = '';

  registerForm = this.fb.group({
    id: [''],
    positionCode: ['', Validators.required],
    jobTitleId: [null, Validators.required],
    jobTitleName: [''],
    locationId: ['', Validators.required],
    locationName: [''],
    name: [{ value: '', disabled: true }],
    nameEn: [{ value: '', disabled: true }],
    organizationStructureId: ['', Validators.required],
    organizationStructureName: [''],
    positionType: ['', Validators.required],
    positionTypeName: [''],

    directManager: [''],
    directManagerName: [''],
    organizationalUnitNumber: [''],
    organizationalUnitNumberName: [''],
    specificUnit: [''],
    specificUnitName: [''],
    isAdmin: [false],
    outsideStaffing: [false],
    typePositionNationality: [false],
    approvalDate: [''],
    Notes: this.fb.array([])
    // costCenterCode:['', Validators.required],
  });
  registerFormSearch = this.fb.group({
    PositionCode: [''],
    JobTitleId: ['']
  });

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.edit = false;
    this.organizationalUnitFacade.UnitsByDirectManagerSubject$.next([]);
    this.organizationalUnitFacade.AllUnitsBranchingFromSpecificUnitSubject$.next(basePaginatedInitialValue);
    this.organizationalUnitFacade.AllUnitsDepartmentSubject$.next(basePaginatedInitialValue);
    this.loadOrganizationalUnitsLevel0(1, 10);
    this.loadOrganizationalUnitsLevel2(1, 10);
    this.loadjobTitles(1, 10);
    this.loadLocations(1, 10);
    this.loadPositions(this.currentPage + 1, this.pageSize, '', '');
    this.definitionPositionFacade.PositionSubject$.subscribe((data) => {
      this.dataSource.data = data.items;
      this.totalCount = data.totalCount;
    });
    // this.definitionPositionFacade.GetPosition('', '');
  }

  loadjobTitles(Page: number, PageSize: number, searchQuery?: string) {
    this.jobTitleFacade.GetJobTitle(Page, PageSize, searchQuery);
  }

  // onJobTitleSelect(event) {
  //   this.registerForm.controls.jobTitleId.setValue(event.id);
  // }

  createNote(): FormGroup {
    return this.fb.group({
      text: ['', Validators.required]
    });
  }

  filterPositions($event): void {
    if ($event.target.checked) {
      this.filteredPositions = this.definitionPositionFacade.PositionSubject$.getValue().items.filter((item) => item.outsideStaffing);
    } else {
      this.filteredPositions = [];
    }
  }
  onSearch(): void {
    this.registerForm.controls.id.setValue('');
    if (this.registerFormSearch.value.PositionCode != '' || this.registerFormSearch.value.JobTitleId != '') {
      const optionJobTitleName = this.jobTitleFacade.JobTitleSubject$.getValue().items.find(
        (x) => x.jobCode == this.registerFormSearch.value.JobTitleId
      );

      this.currentPositionCode = this.registerFormSearch.value.PositionCode;
      this.currentJobTitleId = optionJobTitleName ? optionJobTitleName.id : this.registerFormSearch.value.JobTitleId;
      this.loadPositions(1, 10, this.currentPositionCode, this.currentJobTitleId);
      // this.definitionPositionFacade.GetPosition(
      //   this.registerFormSearch.value.PositionCode,
      //   optionJobTitleName ? optionJobTitleName.id : this.registerFormSearch.value.JobTitleId
      // );
      // this.definitionPositionFacade.GetPosition(this.registerFormSearch.value.PositionCode, this.registerFormSearch.value.JobTitleId);
      // this.definitionPositionFacade.GetPosition(this.registerFormSearch.value.PositionCode, this.registerFormSearch.value.JobTitleId).subscribe((positions) => {
      //   this.allPositions = positions;
      //   this.filteredPositions = positions; // Initialize with all positions
      // });
    } else {
      this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال رقم الوظيفة أو رمز الوظيفة  ', ['']);
      return;
    }
  }

  onDelete(Id: string): void {
    if (confirm('هل أنت متأكد من عملية المسح؟')) {
      this.definitionPositionFacade.deletePosition(Id).subscribe(() => {
        this.edit = false;
        this.registerForm.reset();
        this.loadPositions(this.currentPage + 1, this.pageSize, this.currentPositionCode, this.currentJobTitleId);
      });
    }
  }
  onReset(): void {
    this.edit = false;
    this.currentJobTitleId = '';
    this.currentPositionCode = '';
    this.registerForm.reset();
    this.registerForm.setErrors(null);
    this.registerFormSearch.reset();
    this.registerFormSearch.setErrors(null);
    this.organizationalUnitFacade.UnitsByDirectManagerSubject$.next([]);
    this.organizationalUnitFacade.AllUnitsBranchingFromSpecificUnitSubject$.next(basePaginatedInitialValue);
    this.organizationalUnitFacade.AllUnitsDepartmentSubject$.next(basePaginatedInitialValue);
    //this.jobTitleFacade.GetJobTitle();
    this.loadPositions(this.currentPage + 1, this.pageSize, this.currentPositionCode, this.currentJobTitleId);

    this.costCenter = '';
    this.isChecked = false;
    this.Notes.clear();
    // this.onSubmit();
  }
  onAdd(): void {
    console.log(this.registerForm.value);

    this.registerForm.value.isAdmin == null ? this.registerForm.controls.isAdmin.setValue(false) : '';
    this.registerForm.value.outsideStaffing == null ? this.registerForm.controls.outsideStaffing.setValue(false) : '';
    this.registerForm.value.typePositionNationality == null ? this.registerForm.controls.typePositionNationality.setValue(false) : '';
    if (this.registerForm.valid) {
      const optionJobTitleName = this.jobTitleFacade.JobTitleSubject$.getValue().items.find(
        (x) => x.id == this.registerForm.value.jobTitleId
      );
      this.registerForm.value.jobTitleName =
        this.registerForm.value.jobTitleId != '' && this.registerForm.value.jobTitleId != null ? optionJobTitleName.name : '';
      this.registerForm.value.positionTypeName = this.optionsNationalityType.find(
        (option) => option.value.toString() == this.registerForm.value.positionType
      )?.label;
      const optionPosition = this.definitionPositionFacade.locationsSubject$
        .getValue()
        .items.find((x) => x.id.toString() == this.registerForm.value.locationId);
      this.registerForm.value.locationName =
        this.registerForm.value.locationId != '' && this.registerForm.value.locationId != null ? optionPosition.name : '';

      if (this.edit) {
        this.definitionPositionFacade.UpdatePosition(this.registerForm?.value).subscribe(() => {
          this.onReset();
        });
      } else {
        this.definitionPositionFacade.AddPosition(this.registerForm?.value).subscribe(() => {
          this.onReset();
        });
      }
    } else {
      // else if(this.registerForm.value.costCenterCode  == '' || this.registerForm.controls.costCenterCode.invalid ){
      //   this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخل رمز مركز التكلفة', ['']);
      //   return;
      // }
      if (this.registerForm.value.positionCode == '' || this.registerForm.controls.positionCode.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخل رقم الوظيفة', ['']);
        return;
      } else if (this.registerForm.value.organizationStructureId == '' || this.registerForm.controls.organizationStructureId.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء اختر الوحدة التنظيمية', ['']);
        return;
      } else if (
        this.registerForm.value.locationId == '' ||
        this.registerForm.value.locationId == null ||
        this.registerForm.controls.locationId.invalid
      ) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال رمز الموقع - اسم الموقع', ['']);
        return;
      } else if (
        this.registerForm.value.jobTitleId == '' ||
        this.registerForm.value.jobTitleId == null ||
        this.registerForm.controls.jobTitleId.invalid
      ) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال رمز الوظيفة  ', ['']);
        return;
      } else if (
        this.registerForm.value.positionType == '' ||
        this.registerForm.value.positionType == null ||
        this.registerForm.controls.positionType.invalid
      ) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء اختر نوع الوظيفة', ['']);
        return;
      }
    }
  }
  onEdit(jobTitle: any): void {
    this.registerForm.patchValue(jobTitle);
    this.registerForm.value.positionTypeName = this.optionsNationalityType.find(
      (option) => option.value.toString() == this.registerForm.value.positionType
    )?.label;
    const JobTitleName = this.jobTitleFacade.JobTitleSubject$.getValue().items.find((x) => x.id == jobTitle.jobTitleId);
    this.registerForm.controls.name.setValue(JobTitleName.name);
    this.registerForm.controls.nameEn.setValue(JobTitleName.nameEn);
    this.edit = true;
  }
  getJobTitleId(item): void {
    this.searchTerm = item.jobCode;
    this.registerForm.controls.jobTitleId.setValue(item.id); // Set the form control value to the ID
    this.showDropdown = false;
    this.registerForm.controls.name.setValue('');
    this.registerForm.controls.nameEn.setValue('');
    if (this.registerForm.value.jobTitleId != '') {
      // const JobTitleName = this.jobTitleFacade.JobTitleSubject$.getValue().find(x => x.id == this.registerForm.value.jobTitleId);
      this.registerForm.controls.name.setValue(item.name);
      this.registerForm.controls.nameEn.setValue(item.nameEn);
      this.haveAdmin = item.haveAdmin;
      this.showDropdown = false;
    }
  }

  hideDropdown(event) {
    let spicaialJobTitles = this.allJobTitles.filter((item) => item.jobCode.toLowerCase() == event.target.value.toLowerCase());
    // if(this.allJobTitles.length != 0 && spicaialJobTitles != undefined){
    //  const vv = spicaialJobTitles ? '' :  spicaialJobTitles[0].id.toString();
    //   this.registerForm.controls.jobTitleId.setValue( vv);
    //   this.getJobTitleId(spicaialJobTitles);
    // }
    setTimeout(() => {
      this.showDropdown = false; // Delay to allow click event to register
    }, 200);
    // if(this.filteredJobTitles.length <= 0  ){
    if (this.searchTerm == '') {
      this.registerForm.controls.jobTitleId.setValue(null);
      this.registerForm.controls.name.setValue('');
      this.registerForm.controls.nameEn.setValue('');
      //  this.sharedFacade.showMessage(MessageType.warning, 'عفواً، خطأ في رمز الوظيفة', ['']);
    }
    if (this.filteredJobTitles.length <= 0) {
      this.sharedFacade.showMessage(MessageType.warning, 'عفواً، خطأ في رمز الوظيفة', ['']);
    }
  }

  loadOrganizationalUnit(Page: number, PageSize: number) {
    this.organizationalUnitFacade.GetAllUnitsDepartment(Page, PageSize, this.directManager);
  }

  GetAllUnitsDepartment(): void {
    this.registerForm.controls.organizationStructureId.setValue(this.registerForm.value?.directManager ?? '');
    const optionOrganization = this.organizationalUnitFacade.OrganizationalUnitsByLevel2Subject$.getValue().items.find(
      (x) => x.id == this.registerForm.value.organizationStructureId
    );
    // this.registerForm.value.organizationStructureName =  this.registerForm.value.organizationStructureId != '' && this.registerForm.value.organizationStructureId != null ?   optionOrganization.name: '';
    this.registerForm.controls.organizationStructureName.setValue(
      this.registerForm.value.organizationStructureId !== '' && this.registerForm.value.organizationStructureId !== null
        ? optionOrganization?.name
        : ''
    );

    this.costCenter = optionOrganization?.costCenter;
    this.loadOrganizationalUnit(1, 10);
    // this.organizationalUnitFacade.GetAllUnitsDepartment(this.registerForm.value?.directManager ?? '');
    this.registerForm.controls.organizationalUnitNumber.setValue('');
    this.registerForm.controls.organizationalUnitNumberName.setValue('');
    this.registerForm.controls.specificUnit.setValue('');
    this.registerForm.controls.specificUnitName.setValue('');
  }

  loadAllUnitsBranchingFromSpecificUnit(Page: number, PageSize: number) {
    this.organizationalUnitFacade.GetAllUnitsBranchingFromSpecificUnit(Page, PageSize, this.registerForm.value?.organizationalUnitNumber);
  }

  getAllUnitsBranchingFromSpecificUnit(): void {
    this.registerForm.controls.organizationStructureId.setValue(this.registerForm.value?.organizationalUnitNumber ?? '');
    const optionOrganization = this.organizationalUnitFacade.AllUnitsDepartmentSubject$.getValue().items.find(
      (x) => x.id == this.registerForm.value.organizationStructureId
    );
    // this.registerForm.value.organizationStructureName =  this.registerForm.value.organizationStructureId != '' && this.registerForm.value.organizationStructureId != null ?   optionOrganization.name: '';
    this.registerForm.controls.organizationStructureName.setValue(
      this.registerForm.value.organizationStructureId !== '' && this.registerForm.value.organizationStructureId !== null
        ? optionOrganization?.name
        : ''
    );

    // this.organizationalUnitFacade.GetAllUnitsBranchingFromSpecificUnit(this.registerForm.value?.organizationalUnitNumber);
    this.loadAllUnitsBranchingFromSpecificUnit(1, 10);
    this.registerForm.controls.specificUnit.setValue('');
    this.registerForm.controls.specificUnitName.setValue('');
  }
  toggleCheckbox() {
    this.isChecked = !this.isChecked;
  }
  addNote(): void {
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
  onLocationIdSelect(event) {
    this.registerForm.get('locationId').setValue(event.id);
  }
  selectSpecificUnit(event: any): void {
    this.registerForm.get('specificUnit').setValue(event.id);
    this.registerForm.controls.organizationStructureId.setValue(this.registerForm.value?.specificUnit ?? '');
    const optionOrganization = this.organizationalUnitFacade.AllUnitsBranchingFromSpecificUnitSubject$.getValue().items.find(
      (x) => x.id == this.registerForm.value.organizationStructureId
    );
    // this.registerForm.value.organizationStructureName =  this.registerForm.value.organizationStructureId != '' && this.registerForm.value.organizationStructureId != null ?   optionOrganization.name: '';
    this.registerForm.controls.organizationStructureName.setValue(
      this.registerForm.value.organizationStructureId !== '' && this.registerForm.value.organizationStructureId !== null
        ? optionOrganization?.name
        : ''
    );
  }
  getControl(control: AbstractControl, controlName: string): AbstractControl | null {
    return control.get(controlName);
  }
  // onSearchJobTitles(searchTerm) {
  //   // Filter job titles based on the search term
  //   this.filteredJobTitles = this.allJobTitles.filter(item =>
  //     item.jobCode.toLowerCase().includes(searchTerm.target.value.toLowerCase())
  //   );
  //   this.showDropdown = this.filteredJobTitles.length > 0;
  // }
  onSearchJobTitles(event: any) {
    // this.registerForm.controls.jobTitleId.setValue(null);
    // this.registerForm.controls.name.setValue('');
    // this.registerForm.controls.nameEn.setValue('');
    // HERE
    // this.searchTerm = '';
    // const searchTerm = event.target.value.toLowerCase();
    // this.filteredJobTitles = this.allJobTitles.filter((item) => item.jobCode.toLowerCase().includes(searchTerm));
    // HERE
    // console.log(this.filteredJobTitles[0].jobCode.toLowerCase() == event.target.value.toLowerCase())
    // console.log('Event' + event)
    // if(this.filteredJobTitles.length != 0 && this.filteredJobTitles[0].jobCode.toLowerCase() == event.target.value.toLowerCase()){
    //   this.getJobTitleId(this.filteredJobTitles[0]);
    // }
  }
  getJobCode() {
    // Get the job code based on the selected job title ID
    const selectedId = this.registerForm.controls.jobTitleId.value;
    const selectedItem = this.filteredJobTitles.find((item) => item.id === selectedId);
    return selectedItem ? selectedItem.jobCode : ''; // Return the job code or an empty string
  }

  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter((it) => {
      return it.toLocaleLowerCase().includes(searchText);
    });
  }
  protected readonly optionsJobClassification = optionsJobClassification;
  protected readonly optionsBooleanGeneral = optionsBooleanGeneral;
  protected readonly optionsNationalityType = optionsNationalityType;

  onSetJobTitle($event) {
    this.registerForm.controls.name.setValue($event.name);
    this.registerForm.controls.nameEn.setValue($event.nameEn);
  }
}
