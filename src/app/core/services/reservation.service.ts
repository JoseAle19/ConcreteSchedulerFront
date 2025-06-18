import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DayAvailability } from '../interfaces/day-availability.interface';
import { Observable } from 'rxjs';
import { Slot } from '../interfaces/slot.interface';
import { Reservation } from '../interfaces/reservations.interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  private apiUrl = environment.apiUrl;;

  private http = inject(HttpClient);

  getMonthAvailability(month: string, year: string): Observable<DayAvailability[]> {
    return this.http.get<DayAvailability[]>(`${this.apiUrl}/calendar?month=${month}&year=${year}`);
  }

  getSlotsForDate(date: string): Observable<Slot[]> {
    return this.http.get<Slot[]>(`${this.apiUrl}/calendar/${date}`);
  }

   createReservation(reservation: Reservation): Observable<any> {
    return this.http.post(`${this.apiUrl}/reservations`, reservation);
  }


  getReservationsByIds(ids: string[]) {
    const body = { ids: ids };

    return this.http.post<Reservation[]>(`${this.apiUrl}/reservations/reservations-by-ids`, body);
  }
}
