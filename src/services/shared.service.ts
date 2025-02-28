import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { City } from '../models/city.model';
import { Info } from '../models/info.model';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private citySource = new BehaviorSubject<string>('');
  city$ = this.citySource.asObservable();

  private key = '7e7e0197a7a54144b39221833252702';
  private apiUrlSearch = `http://api.weatherapi.com/v1/search.json?key=${this.key}&q=`;
  private apiUrlCurrent = `http://api.weatherapi.com/v1/current.json?key=${this.key}&q=`;

  constructor(private http: HttpClient) {}

  getCities(search: string): Observable<City[]> {
    return this.http.get<City[]>(this.apiUrlSearch + search);
  }

  getInfo(city: string): Observable<Info> {
    return this.http.get<Info>(this.apiUrlCurrent + city);
  }

  setCity(city: string) {
    this.citySource.next(city);
  }
}
