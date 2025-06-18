import { ChangeDetectionStrategy, Component, EventEmitter, input, Input, NgModule, Output } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { DayAvailability } from '../../../core/interfaces/day-availability.interface';

@Component({
  selector: 'app-calendar',
  imports: [ CommonModule],
  templateUrl: './calendar.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
  days = input.required<DayAvailability[]>();
  selectedDate = input.required<string>();

  @Output() dateSelected = new EventEmitter<any>();

   onDateSelected(date: any) {
    this.dateSelected.emit(date);
  }
}
