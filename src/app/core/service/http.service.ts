import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '@sc-environment';
import { HttpOptions } from '@sc-models/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  api = environment.apiUrl;
  get<Res = object>(url: string, options: HttpOptions = {}) {
    return this.http.get<Res>(`${this.api}${url}`, options);
  }
  post<Res = object>(url: string, data: unknown, options: HttpOptions = {}) {
    return this.http.post<Res>(`${this.api}${url}`, data, options);
  }
  put<Res = object>(url: string, data: unknown, options: HttpOptions = {}) {
    let body = data;
    if(typeof body == 'object' && !Array.isArray(body)) {
      const hasFile = Object.values(body as any).some((v)=> v instanceof File);
      if(hasFile) {
        const formData = new FormData();
        Object.entries(body as any).forEach(([k,v]) => {
          if(v instanceof File) {
            formData.append(k, v);
          } else if(typeof v === 'object') {
            formData.append(k, JSON.stringify(v));
          } else {
            formData.append(k, (v as any).toString());
          }
        })
        body = formData;
      }
    }
    return this.http.put<Res>(`${this.api}${url}`, body, options);
  }
  delete<Res = object>(url: string, options: HttpOptions = {}) {
    return this.http.delete<Res>(`${this.api}${url}`, options);
  }
}
