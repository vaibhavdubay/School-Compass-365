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
  get(url: string, options: HttpOptions = {}) {
    return this.http.get(`${this.api}${url}`, options);
  }
  post(url: string, data: unknown, options: HttpOptions = {}) {
    return this.http.post(`${this.api}${url}`, data, options);
  }
  put(url: string, data: unknown, options: HttpOptions = {}) {
    return this.http.put(`${this.api}${url}`, data, options);
  }
  delete(url: string, options: HttpOptions = {}) {
    return this.http.delete(`${this.api}${url}`, options);
  }
}
