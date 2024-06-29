import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe, DatePipe } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Place } from '../weather/interface/place';
import { WeatherService } from '../weather/service/weather.service';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'place-input',
  templateUrl: 'place-input.component.html',
  styleUrl: 'place-input.component.css',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    DatePipe,
  ],
})
export class PlaceInputComponent implements OnInit {
  myControl = new FormControl('');
  places: Place[] = []

  filteredOptions!: Observable<Place[]>;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.fetchPlaces();
  }

  fetchPlaces(): void {
    this.weatherService.getAllPlaces().subscribe({
      next: (places: Place[]) => {
        this.places = places;

        // Initialize filteredOptions after places are fetched
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );
      },
      error: (error) => {
        console.error('Error fetching places:', error);
      }
    });
  }

  private _filter(value: string): Place[] {
    const filterValue = value.toLowerCase();

    return this.places.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  displayPlace(place: Place): string {
    return place && place.name ? place.name : '';
  }

  /* onSelectionChange(event: any): void {
    const selectedPlaceName = event.option.value;
    this.selectedPlace = this.places.find(place => place.name === selectedPlaceName);
  } */
}
