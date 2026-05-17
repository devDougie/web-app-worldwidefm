import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Radio } from '../../shared/models/radio.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RadioService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getRadiosByBoundingBox(
    north: number,
    south: number,
    east: number,
    west: number,
    limit: number = 100
  ): Observable<Radio[]> {
    const params = new HttpParams()
      .set('north', north)
      .set('south', south)
      .set('east', east)
      .set('west', west)
      .set('limit', limit);

    return this.http.get<Radio[]>(`${this.apiUrl}/radios`, { params });
  }

  getRadioById(stationuuid: string): Observable<Radio> {
    return this.http.get<Radio>(`${this.apiUrl}/radio/${stationuuid}`);
  }
}