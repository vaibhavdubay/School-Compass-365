import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@sc-environment';
import { HttpOptions } from '@sc-models/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  api = environment.apiUrl;
  get<Res = object>(url: string, options: HttpOptions = {}) {
    return this.http.get<Res>(`${this.api}${url}`, options);
  }
  post<Res = object>(url: string, data: unknown, options: HttpOptions = {}) {
    return this.http.post<Res>(`${this.api}${url}`, data, options);
  }
  put<Res = object>(url: string, data: unknown, options: HttpOptions = {}) {
    return this.http.put<Res>(`${this.api}${url}`, data, options);
  }
  delete<Res = object>(url: string, options: HttpOptions = {}) {
    return this.http.delete<Res>(`${this.api}${url}`, options);
  }
}
