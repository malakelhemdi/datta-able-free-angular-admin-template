import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Observable, Subject, merge, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';

@Component({
  selector: 'app-typeahead-input',
  template: `
    <input
      [placeholder]="placeholder"
      type="text"
      class="form-control"
      [ngbTypeahead]="searchFunction"
      (focus)="onFocus($event)"
      (click)="onClick($event)"
      [resultFormatter]="resultFormatter"
      [inputFormatter]="inputFormatter"
      [formControl]="control"
      #instance="ngbTypeahead"
      autocomplete="on"
    />
  `
})
export class TypeaheadInputComponent {
  @Input() placeholder: string = '';
  @Input() control!: any; // Accept AbstractControl (compatible with FormControl)
  @Input() searchHandler!: (term: string) => Observable<any[]>;
  @Input() resultFormatter: (item: any) => string = (item) => item;
  @Input() inputFormatter: (item: any) => string = (item) => item;
  @Output() valueSelected = new EventEmitter<any>();

  @ViewChild('instance', { static: true }) instance: any;

  private focus$ = new Subject<string>();
  private click$ = new Subject<string>();

  ngOnInit() {
    this.instance._valueChanges$.pipe(debounceTime(500), distinctUntilChanged()).subscribe((value) => {
      if (value && typeof value === 'string') {
        this.focus$.next(value);
      }
    });
  }

  get searchFunction(): (text$: Observable<string>) => Observable<any[]> {
    return (text$: Observable<string>) => {
      const debouncedText$ = text$.pipe(debounceTime(500), distinctUntilChanged());
      const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
      const inputFocus$ = this.focus$;

      // Merge sources and invoke searchHandler
      return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(switchMap((term) => this.searchHandler(term)));
    };
  }

  onFocus(event: Event) {
    const target = event.target as HTMLInputElement;
    this.focus$.next(target.value || '');
  }

  onClick(event: Event) {
    const target = event.target as HTMLInputElement;
    this.click$.next(target.value || '');
  }
}
