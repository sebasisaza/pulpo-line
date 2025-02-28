import { Component } from '@angular/core';
import { RecordComponent } from '../record/record.component';
import { WeatherComponent } from '../weather/weather.component';

@Component({
  selector: 'app-root',
  imports: [WeatherComponent, RecordComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
