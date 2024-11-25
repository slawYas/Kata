import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../config/api-config';
import {KataResponse} from '../models/kata-response.interface';

@Injectable({
  providedIn: 'root',
})
export class KataService {
  constructor(private readonly http: HttpClient) {}

  getTransformedValue(number: number): Observable<KataResponse> {
    return this.http.get<KataResponse>(`${API_URL}/transform/${number}`);
  }
}
