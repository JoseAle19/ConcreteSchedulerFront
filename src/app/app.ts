import { Component, LOCALE_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeEs);
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' }, // Configura el locale a español
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'ConcreteSchedulerFront';
}
