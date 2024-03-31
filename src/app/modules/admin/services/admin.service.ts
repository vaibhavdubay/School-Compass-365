import { Injectable } from '@angular/core';
import { StoreService } from 'src/app/core/service/store.service';
import { AdminState } from '../state/reducer';
import { Store } from '@ngrx/store';
import { selectAdminUser } from '../state/selector';

@Injectable()
export class AdminService extends StoreService<AdminState> {
  constructor(store: Store) {
    super(store);
  }

  getAdminUser() {
    return this.select(selectAdminUser);
  }
}
