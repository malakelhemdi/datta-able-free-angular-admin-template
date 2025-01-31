import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import {
  optionsBooleanGeneral,
  optionsFamilyDescription,
  optionsFunctionalCategory,
  optionsGenderGeneral
} from '../../../../core/core.interface';
import { JobTitleFacade } from '../job-title.facade';
import { ScientificQualificationsFacade } from '../../../definitions/scientific-qualifications/scientific-qualifications.facade';
import { ClassificationBranchesFacade } from '../../classification/classification-branches.facade';
import { MessageType } from '../../../../shared/shared.interfaces';
import { SharedFacade } from '../../../../shared/shared.facade';
import { map } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

function arabicCharacterValidator(control: AbstractControl): ValidationErrors | null {
  const arabicPattern = /^[\u0600-\u06FF]+$/;
  if (control.value && !arabicPattern.test(control.value)) {
    return { arabicCharacter: true };
  }
  return null;
}
@Component({
  selector: 'app-rewards-types',
  templateUrl: './job-title.component.html',
  styleUrl: './job-title.component.scss'
})
export class JobTitleComponent implements OnInit {
  loadScientificQualifications(page: number, pageSize: number): void {
    this.scientificQualificationsFacade.GetScientificQualifications(page, pageSize);
  }

  onScientificQualificationSelect(event) {
    this.registerForm.controls.scientificQualificationId.setValue(event.id);
  }

  loadJobClassification(page: number, pageSize: number): void {
    this.classificationBranchesFacade.GetJobClassification(page, pageSize);
  }

  loadjobTitles(Page: number, PageSize: number) {
    this.jobTitleFacade.GetJobTitle(Page, PageSize);
  }

  displayedColumns: string[] = ['jobCode', 'description', 'name', 'nameEn', 'scientificQualificationName', 'actions'];

  dataSource = new MatTableDataSource<any>();
  totalCount = 0;
  pageSize = 10;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex; // MatPaginator uses 0-based index, so add 1
    this.pageSize = event.pageSize;
    this.loadjobTitles(this.currentPage + 1, this.pageSize);
  }

  edit: boolean = false;
  filteredJobClassifications$;
  registerForm = this.fb.group({
    id: [''],
    jobCode: ['', Validators.required],
    name: [
      '',
      [
        Validators.required,
        (control: AbstractControl): ValidationErrors | null => {
          const arabicPattern = /^[\u0600-\u06FF\s]+$/;
          return arabicPattern.test(control.value) ? null : { arabicCharacters: true };
        }
      ]
    ],
    nameEn: [
      '',
      [
        Validators.required,
        (control: AbstractControl): ValidationErrors | null => {
          const englishPattern = /^[A-Za-z\s]+$/;
          return englishPattern.test(control.value) ? null : { englishCharacters: true };
        }
      ]
    ],
    description: ['', Validators.required],
    jobClassificationId: ['', Validators.required],
    jobClassificationName: [''],
    jobType: [1],
    // numberPositionsLibyans: [0, Validators.required],
    // numberPositionsForeigners: [0, Validators.required],
    scientificQualificationId: ['', Validators.required],
    scientificQualificationName: [''],
    Notes: this.fb.array([]),
    functionalFamilyId: ['', Validators.required],
    functionalCategory: ['']
  });
  constructor(
    private fb: FormBuilder,
    protected jobTitleFacade: JobTitleFacade,
    protected classificationBranchesFacade: ClassificationBranchesFacade,
    protected sharedFacade: SharedFacade,
    public scientificQualificationsFacade: ScientificQualificationsFacade
  ) {
    this.onSubmit();
    // this.classificationBranchesFacade.GetJobClassification();
    // this.scientificQualificationsFacade.GetScientificQualifications();
  }
  createNote(): FormGroup {
    return this.fb.group({
      text: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.edit = false;
    this.loadJobClassification(1, 10);
    this.loadScientificQualifications(1, 10);
    this.filteredJobClassifications$ = this.classificationBranchesFacade.JobClassificationSubject$;
    this.jobTitleFacade.JobTitleSubject$.subscribe((res) => {
      this.dataSource.data = res.items;
      this.totalCount = res.totalCount;
    });
  }

  loadFunctionalFamily(Page: number, PageSize: number) {
    this.jobTitleFacade.GetFunctionalFamily(Page, PageSize);
  }

  onSubmit(): void {
    this.loadjobTitles(1, 10);
    this.loadFunctionalFamily(1, 10);
    // this.jobTitleFacade.GetFunctionalFamily();
  }
  onDelete(Id: string): void {
    if (confirm('هل أنت متأكد من عملية المسح؟')) {
      this.edit = false;
      this.jobTitleFacade.deleteJobTitle(Id);
      this.registerForm.reset();
    }
  }
  onReset(): void {
    this.edit = false;
    this.registerForm.reset();
    this.registerForm.controls.jobClassificationId.setValue('');
    this.registerForm.controls.functionalCategory.setValue('');

    this.Notes.clear();
    this.registerForm.setErrors(null);
    this.onSubmit();
  }
  onAdd(): void {
    this.registerForm.controls.jobType.setValue(1);
    if (this.registerForm.valid) {
      const optionJobClassification = this.classificationBranchesFacade.JobClassificationSubject$.getValue().items.find(
        (x) => x.id.toString() == this.registerForm.value.jobClassificationId
      );
      this.registerForm.value.jobClassificationName =
        this.registerForm.value.jobClassificationId != '' && this.registerForm.value.jobClassificationId != null
          ? optionJobClassification.name
          : '';
      const optionOrganization = this.scientificQualificationsFacade.ScientificQualificationsSubject$.getValue().items.find(
        (x) => x.id == this.registerForm.value.scientificQualificationId
      );
      this.registerForm.value.scientificQualificationName =
        this.registerForm.value.scientificQualificationId != '' && this.registerForm.value.scientificQualificationId != null
          ? optionOrganization.name
          : '';
      if (this.edit) {
        this.jobTitleFacade.UpdateJobTitle(this.registerForm?.value);
        this.onReset();
      } else {
        this.jobTitleFacade.AddJobTitle(this.registerForm?.value);
        this.onReset();
      }
    } else {
      if (this.registerForm.value.jobCode == '') {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال رمز الوظيفة  ', ['']);
        return;
      } else if (this.registerForm.value.functionalFamilyId == '' || this.registerForm.controls.functionalFamilyId.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء اختر العائلة الوظيفية  ', ['']);
        return;
      } else if (this.registerForm.value.name == '' || this.registerForm.controls.name.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال اسم الوظيفة باللغة العربية', ['']);
        return;
      } else if (this.registerForm.value.nameEn == '' || this.registerForm.controls.nameEn.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخال اسم الوظيفة باللغة الإنجليزية', ['']);
        return;
      } else if (this.registerForm.value.functionalCategory == '' || this.registerForm.controls.functionalCategory.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء اختر تصنيف الوظيفة', ['']);

        return;
      } else if (this.registerForm.value.jobClassificationId == '' || this.registerForm.controls.jobClassificationId.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء اختر الفئة الوظيفية ', ['']);

        return;
      } else if (this.registerForm.value.description == '' || this.registerForm.controls.description.invalid) {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخل وصف الوظيفة', ['']);
        return;
      }
      // else if(this.registerForm.controls.numberPositionsLibyans.invalid ){
      //   this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخل عدد المناصب لليبين', ['']);
      //   return;
      // }
      // else if(this.registerForm.controls.numberPositionsForeigners.invalid ){
      //   this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء ادخل عدد المناصب للأجانب', ['']);
      //   return;
      // }
      else if (this.registerForm.value.scientificQualificationId == '') {
        this.sharedFacade.showMessage(MessageType.warning, 'عفواً، الرجاء اختر المستوى التعليمي', ['']);
        return;
      }
    }
  }
  onEdit(jobTitle: any): void {
    this.registerForm.patchValue(jobTitle);
    // this.registerForm.controls.numberPositionsLibyans.setValue(jobTitle.numberPositionsLibyans);
    this.edit = true;
  }
  filteredJobClassification() {
    this.registerForm.controls.functionalCategory.value != 'C'
      ? (this.filteredJobClassifications$ = this.classificationBranchesFacade.JobClassificationSubject$.pipe(
          map((items) => items.items.filter((item) => item.name.includes(this.registerForm.controls.functionalCategory.value)))
        ))
      : (this.filteredJobClassifications$ = this.classificationBranchesFacade.JobClassificationSubject$.pipe(
          map((items) => items.items.filter((item) => item.name.includes('C') || item.name.includes('D')))
        ));
  }
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
  protected readonly optionsBooleanGeneral = optionsBooleanGeneral;
  protected readonly optionsFunctionalCategory = optionsFunctionalCategory;
  protected readonly optionsFamilyDescription = optionsFamilyDescription;
  protected readonly optionsGenderGeneral = optionsGenderGeneral;
}
