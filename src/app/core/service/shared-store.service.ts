import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreService } from 'src/app/core/service/store.service';
import { SharedState } from '../store/reducer';

@Injectable({
  providedIn: 'root',
})
export class SharedStoreService extends StoreService<SharedState> {
  constructor(store: Store) {
    super(store);
  }
}
