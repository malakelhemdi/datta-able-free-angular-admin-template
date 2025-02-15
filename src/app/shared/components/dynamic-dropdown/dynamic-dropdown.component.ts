import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef,
  forwardRef,
  OnDestroy
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Observable, Subject, Subscription, debounceTime } from 'rxjs';
import { PaginatedData } from '../../shared.interfaces';

@Component({
  selector: 'app-dynamic-dropdown',
  templateUrl: './dynamic-dropdown.component.html',
  styleUrls: ['./dynamic-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DynamicDropdownComponent),
      multi: true
    }
  ]
})
export class DynamicDropdownComponent<T> implements OnChanges, ControlValueAccessor, OnDestroy {
  @Input() fetchData!: (page: number, pageSize: number, searchQuery: string) => void;
  @Input() data!: Observable<PaginatedData<T>>;
  @Input() displayKey!: string;
  @Input() pageSize: number = 10;
  @Input() placeholder: string = 'اختر خياراً';
  @Input() ngClass: any;
  @Input() formControlNameSpecificAccessAttribute: string;
  @Output() optionSelected = new EventEmitter<T>();

  @ViewChild('dropdownMenu', { static: false }) dropdownMenu!: ElementRef;

  private subscriptions: Subscription[] = [];
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  items: any[] = [];
  currentPage: number = 1;
  totalCount: number = 0;
  loading: boolean = false;
  isDisabled: boolean = false;
  searchQuery: string = '';
  selectedOption: T | null = null;

  private searchSubject = new Subject<string>();
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {
    this.subscriptions.push(
      this.searchSubject.pipe(debounceTime(500)).subscribe((query) => {
        this.searchQuery = query;
        this.currentPage = 1;
        this.fetchData(this.currentPage, this.pageSize, query);
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.handleData();
    }
  }

  private handleData(): void {
    this.subscriptions.push(
      this.data.subscribe((result: any) => {
        this.items = this.currentPage === 1 ? result.items : [...this.items, ...result.items];
        this.totalCount = result.totalCount;
        this.loading = false;
        // console.log(this.placeholder, this.totalCount);
      })
    );
  }

  onScroll(event: Event): void {
    const target = event.target as HTMLElement;

    // console.log(target.scrollTop + target.clientHeight);
    // console.log(target.scrollHeight);
    if (target.scrollTop + target.clientHeight + 5 >= target.scrollHeight) {
      if (!this.loading && this.items.length < this.totalCount) {
        this.loading = true;
        this.currentPage++;
        this.fetchData(this.currentPage, this.pageSize, this.searchQuery);
      }
    }
  }

  onSelectionChange(item: T): void {
    if (this.formControlNameSpecificAccessAttribute) {
      this.onChange(item[this.formControlNameSpecificAccessAttribute]); // Notify form control
    } else {
      this.onChange(item); // Notify form control
    }
    this.selectedOption = item;
    this.optionSelected.emit(item);
    this.onTouched();
    this.closeDropdown();
  }

  toggleDropdown(): void {
    if (this.isDisabled) return;
    const menu = this.dropdownMenu.nativeElement;
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  }

  closeDropdown(): void {
    setTimeout(() => {
      this.dropdownMenu.nativeElement.style.display = 'none';
    }, 150);
  }

  onSearch(query: string): void {
    this.searchSubject.next(query);
  }

  // ---- ControlValueAccessor Methods ----
  writeValue(value: any): void {
    this.selectedOption = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
