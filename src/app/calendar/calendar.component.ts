import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  providers: [DatePipe]
})
export class CalendarComponent implements OnInit {
  selectedDate: Date = new Date();
  daysInMonth: Date[] = [];
  currentMonth: number = this.selectedDate.getMonth();
  currentYear: number = this.selectedDate.getFullYear();
  note: string = '';
  buttonText: string = 'Save Note';

  constructor(private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.generateCalendar(this.currentMonth, this.currentYear);
    this.loadNote();
  }

  generateCalendar(month: number, year: number): void {
    const date = new Date(year, month, 1);
    const days = [];
    while (date.getMonth() === month) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    this.daysInMonth = days;
  }

  selectDate(date: Date): void {
    this.selectedDate = date;
    this.loadNote();
  }

  nextMonth(): void {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateCalendar(this.currentMonth, this.currentYear);
  }

  previousMonth(): void {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.generateCalendar(this.currentMonth, this.currentYear);
  }

  saveNote(): void {
    if (typeof window !== 'undefined' && this.selectedDate) {
      localStorage.setItem(this.selectedDate.toDateString(), this.note);
      this.buttonText = 'Edit Note';
    }
  }

  loadNote(): void {
    if (typeof window !== 'undefined' && this.selectedDate) {
      this.note = localStorage.getItem(this.selectedDate.toDateString()) || '';
      this.buttonText = this.note ? 'Edit Note' : 'Save Note';
    }
  }

  onDateChange(event: any): void {
    this.selectDate(event.value);
  }

  getFormattedMonthYear(): string {
    const date = new Date(this.currentYear, this.currentMonth, 1);
    return this.datePipe.transform(date, 'MMMM yyyy') || '';
  }
}
