import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subject, debounceTime } from 'rxjs';
import { PaginatedData } from '../../shared.interfaces';

@Component({
  selector: 'app-dynamic-dropdown',
  templateUrl: './dynamic-dropdown.component.html',
  styleUrls: ['./dynamic-dropdown.component.scss']
})
export class DynamicDropdownComponent<T> implements OnChanges {
  @Input() fetchData: (page: number, pageSize: number, searchQuery: string) => void;
  @Input() data!: Observable<PaginatedData<T>>;
  @Input() displayKey!: string;
  @Input() pageSize: number = 10;
  @Input() placeholder: string = 'اختر خياراً';
  @Output() optionSelected = new EventEmitter<T>();

  @ViewChild('dropdownMenu', { static: false }) dropdownMenu!: ElementRef;
  items: any[] = [];
  currentPage: number = 1;
  totalCount: number = 0;
  loading: boolean = false;
  selectedOption: T | null = null;

  searchQuery: string = ''; // Track the search query
  private searchSubject = new Subject<string>(); // Debounced search trigger

  constructor() {
    // Handle debounced search
    this.searchSubject.pipe(debounceTime(500)).subscribe((query) => {
      this.searchQuery = query;
      this.currentPage = 1; // Reset pagination on new search
      this.fetchData(this.currentPage, this.pageSize, query); // Fetch filtered data
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.handleData();
    }
  }

  private handleData(): void {
    this.data.subscribe((result: any) => {
      if (this.currentPage === 1) {
        this.items = result.items;
      } else {
        this.items = [...this.items, ...result.items];
      }
      this.totalCount = result.totalCount;
      this.loading = false;
    });
  }

  onScroll(event: Event): void {
    const target = event.target as HTMLElement;
    if (target.scrollTop + target.clientHeight >= target.scrollHeight) {
      if (!this.loading && this.items.length < this.totalCount) {
        this.loading = true;
        this.currentPage++;
        this.fetchData(this.currentPage, this.pageSize, this.searchQuery); // Use current search query
      }
    }
  }

  onSelectionChange(item: T): void {
    this.selectedOption = item;
    this.optionSelected.emit(this.selectedOption);
    this.closeDropdown();
  }

  toggleDropdown(): void {
    const menu = this.dropdownMenu.nativeElement;
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  }

  closeDropdown(): void {
    setTimeout(() => {
      this.dropdownMenu.nativeElement.style.display = 'none';
    }, 150);
  }

  onSearch(query: string): void {
    this.searchSubject.next(query); // Trigger search with debounce
  }
}
