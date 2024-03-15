import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { ApiService } from 'src/app/core/service/http.service';

@Injectable()
export class AdminEffects {
  constructor(private actions$: Actions, private apiService: ApiService) {}
}
