import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  Observable,
  of,
  tap,
} from 'rxjs';
import { City } from '../models/city.model';
import { Info } from '../models/info.model';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'weather',
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent implements OnInit {
  title = 'pulpo-line';
  search = new FormControl('', [Validators.required]);
  cities$: Observable<City[]> = of([]);
  cityInfo$: Observable<Info> = of();

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(
        filter((search) => search !== ''),
        debounceTime(400),
        distinctUntilChanged()
      )
      .subscribe((search) => {
        this._searchCities(search || '');
      });

    this.sharedService.city$.subscribe((city) => {
      this.cityInfo$ = of(JSON.parse(city));
    });
  }

  onCitySelected(citySelected: string): void {
    this.cities$ = of([]);
    this.search.setValue(citySelected, { emitEvent: false });
    this._searchInfo(citySelected);
    this.sharedService.setCity(citySelected);
  }

  private _searchCities(search: string): void {
    if (search !== '') {
      this.cities$ = this.sharedService.getCities(search);
    }
  }

  private _searchInfo(city: string): void {
    this.cityInfo$ = this.sharedService.getInfo(city).pipe(
      tap((cityData) => {
        let citiesSelected: any[] = JSON.parse(
          localStorage.getItem('citiesSelected') || '[]'
        );

        const cityExists = citiesSelected.some(
          (storedCity) => storedCity.location.name === cityData.location.name
        );

        if (!cityExists) {
          citiesSelected.push(cityData);
          localStorage.setItem(
            'citiesSelected',
            JSON.stringify(citiesSelected)
          );
        }
      })
    );
  }
}
