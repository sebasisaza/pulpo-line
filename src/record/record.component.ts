import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { Info } from '../models/info.model';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'record',
  imports: [CommonModule],
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
