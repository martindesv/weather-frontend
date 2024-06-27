import {Component, OnInit} from '@angular/core';
import {WeatherService} from "./service/weather.service";
import {Place} from "./interface/place";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.css'
})

export class WeatherComponent implements OnInit {

  places: Place[] = [];

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.fetchPlaces();
  }

  fetchPlaces(): void {
    this.weatherService.getAllPlaces().subscribe({
      next: (places: Place[]) => {
        this.places = places;
      },
      error: (error) => {
        console.error('Error fetching places:', error);
      }
    });
  }
}
