import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { CalendarFilter } from 'src/app/models/calendar-filter';

@Component({
  selector: 'app-filter-option',
  templateUrl: './filter-option.component.html',
  styleUrls: ['./filter-option.component.scss']
})
export class FilterOptionComponent implements OnInit {

  filterForm!: FormGroup;
  options: { name: string, value: string }[] = [
    {
      name: 'Holiday',
      value: 'holidays',
    },
    {
      name: 'Birthday',
      value: 'birthdays'
    },
  ];

  @Output() filterChange$: EventEmitter<CalendarFilter> = new EventEmitter<CalendarFilter>();

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  private buildForm() {
    this.filterForm = this.fb.group({
      birthdays: true,
      holidays: true,
    });
  }

  ngOnInit(): void {
    this.notifyFilterChange(this.filterForm.value);
    this.listenForValueChange();
  }

  private notifyFilterChange(value: object) {
    const include: string[] = this.transformData(value);
    this.filterChange$.next({ include });
  }

  private listenForValueChange() {
    this.filterForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe((value) => this.notifyFilterChange(value));
  }

  private transformData(value: object): string[] {
    return Object.entries(value)
      .filter((data) => data[1])
      .map(data => data[0]);
  }

}
