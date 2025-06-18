import { CommonModule } from '@angular/common';
import { Component, Inject, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Slot } from '../../../core/interfaces/slot.interface';
import { ReservationService } from './../../../core/services/reservation.service';

interface ResponseCreateReservation {
  id: string;
  date: string;
  slot: string;
  name: string;
  email: string;
  phone: string;
}




@Component({
  selector: 'app-reservation-modal',
  imports: [CommonModule, ReactiveFormsModule,
    MatIconModule, MatDialogModule],
  templateUrl: './reservation-modal.component.html'
})
export class ReservationModalComponent {
  form: FormGroup;
  submitted = false;
  reservationConfirmed = false;

  updateSlots = output<Slot[]>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { date: string; time: string },
    private dialogRef: MatDialogRef<ReservationModalComponent>,
    private fb: FormBuilder,
    private ReservationService: ReservationService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  submit(): void {
    this.submitted = true;

    if (this.form.invalid) return;

    const reservation = {
      ...this.form.value,
      date: this.data.date,
      slot: this.data.time
    };

    this.ReservationService.createReservation(reservation).subscribe({
      next: (res:ResponseCreateReservation) => {

         const id = res.id;
        const stored = JSON.parse(localStorage.getItem('reservation_ids') || '[]');
        stored.push(id);
        localStorage.setItem('reservation_ids', JSON.stringify(stored));

        this.reservationConfirmed = true;
      },
      error: (err) => {
        console.error('Error al enviar reserva', err);
      }
    });
  }

  close(): void {
    this.dialogRef.close({ success: this.reservationConfirmed });
  }
}
