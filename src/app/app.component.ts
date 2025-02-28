import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherComponent } from '../weather/weather.component';
import { RecordComponent } from '../record/record.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WeatherComponent, RecordComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
