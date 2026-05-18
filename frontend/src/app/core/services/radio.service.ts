import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Radio } from '../../shared/models/radio.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RadioService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllRadios(): Observable<Radio[]> {
    return this.http.get<Radio[]>(`${this.apiUrl}/radios`);
  }

  getRadioById(stationuuid: string): Observable<Radio> {
    return this.http.get<Radio>(`${this.apiUrl}/radio/${stationuuid}`);
  }
}