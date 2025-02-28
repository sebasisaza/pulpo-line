import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { Info } from '../models/info.model';
import { delay } from 'rxjs';

@Component({
  selector: 'record',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './record.component.html',
  styleUrl: './record.component.scss',
})
export class RecordComponent implements OnInit {
  citiesRecord: Info[] = [];

  constructor(private sharedService: SharedService) {}

  ngOnInit(): void {
    this.sharedService.city$.pipe(delay(900)).subscribe(() => {
      this.citiesRecord = JSON.parse(
        localStorage.getItem('citiesSelected') || '[]'
      );
    });
  }

  onSelectRecordCity(citySelected: Info): void {
    const info = JSON.stringify(citySelected);
    this.sharedService.setCity(info);
  }
}
