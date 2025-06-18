import { CommonModule, DatePipe, NgClass, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, input} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { Reservation } from '../../../core/interfaces/reservations.interface';

@Component({
  selector: 'app-list-reservations',
 imports: [ DatePipe, NgIf, CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule, MatDialogModule ],  templateUrl: './list-reservations.component.html',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListReservationsComponent {
reservations = input.required<Reservation[]>();

}
