import { CommonModule, DatePipe, NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DayAvailability } from '../../core/interfaces/day-availability.interface';
import { Slot } from '../../core/interfaces/slot.interface';
import { ReservationService } from '../../core/services/reservation.service';
import { ReservationModalComponent } from '../../shared/components/reservation-modal/reservation-modal.component';


import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Reservation } from '../../core/interfaces/reservations.interface';
import { CalendarComponent } from "./calendar/calendar.component";
import { HeaderComponent } from "./header/header.component";
import { ListReservationsComponent } from "./list-reservations/list-reservations.component";


@Component({
  selector: 'app-home',
  imports: [DatePipe, NgIf, CommonModule, CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule, MatDialogModule, ListReservationsComponent, HeaderComponent, CalendarComponent],
  templateUrl: './home.component.html',
})
export default class HomeComponent implements OnInit {
  constructor(private dialog: MatDialog) { }

  days: DayAvailability[] = [];
  slots: Slot[] = [];
  dateNow = new Date();

  reservations: Reservation[] = [];

  selectedDate: string | null = null;
  reservationService = inject(ReservationService)


  ngOnInit(): void {

    const month = '09';
    const year = '2025';
    this.reservationService.getMonthAvailability(month, year).subscribe({
      next: (data) => this.days = data,
      error: (err) => console.error('Error al cargar fechas:', err),
      complete: () => console.log('Fechas cargadas')
    });
    this.loadReservations()
  }


  onDateSelected(date: string) {
    // dev:limitar a muchas peticiones
    if (this.selectedDate == date) return;
    this.selectedDate = date;
    this.reservationService.getSlotsForDate(date)
      .subscribe(data => this.slots = data);
  }

  isToday(date: string): boolean {
    const today = this.dateNow.toISOString().split('T')[0];
    return date === today;
  }

  openReservationModal(date: string, time: string): void {
    const dialogRef = this.dialog.open(ReservationModalComponent, {
      width: '400px',
      data: { date, time }
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.loadSlotsAgain();
      }
    });
  }

  loadSlotsAgain() {
    this.reservationService.getSlotsForDate(this.selectedDate!)
      .subscribe(data => this.slots = data);
      this.loadReservations();
  }

  loadReservations() {
    const ids = JSON.parse(localStorage.getItem('reservation_ids') || '[]');
    if (ids.length > 0) {
      this.reservationService.getReservationsByIds(ids).subscribe(data => {
        console.log('holaa')
        this.reservations = data;
      });
    }
  }


}
