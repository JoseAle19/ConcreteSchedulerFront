import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardHeader, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [
    MatCardHeader, MatCardTitle, MatIconModule, MatCardSubtitle
  ],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent { }
