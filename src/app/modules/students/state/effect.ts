import { Injectable, inject } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { ApiService } from 'src/app/core/service/http.service';

@Injectable()
export class StudentEffects {
  private actions$ = inject(Actions);
  private apiService = inject(ApiService);
}
