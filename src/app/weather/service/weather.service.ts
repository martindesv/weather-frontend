import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Place } from '../interface/place' // Assuming Place interface is defined

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private baseUrl = 'http://localhost:8081/api/weather'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  getAllPlaces(): Observable<Place[]> {
    return this.http.get<Place[]>(`${this.baseUrl}/place`);
  }
}
