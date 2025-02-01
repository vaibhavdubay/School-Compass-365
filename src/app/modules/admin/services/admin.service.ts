import { Injectable, inject } from '@angular/core';
import { StoreService } from 'src/app/core/service/store.service';
import { AdminState } from '../state/reducer';
import { Store } from '@ngrx/store';
import { selectAdminUser, selectClasses } from '../state/selector';
import { adminActions, classes } from '../state/action';
import { filter } from 'rxjs';
import { AdminUser } from '@sc-models/core';

@Injectable()
export class AdminService extends StoreService<AdminState> {
  constructor() {
    const store = inject(Store);

    super(store);
  }

  get adminUser$() {
    return this.select(selectAdminUser).pipe(filter((a) => !!a));
  }
  get classes$() {
    this.dispatch(classes.getAll());
    return this.select(selectClasses).pipe(filter((c) => !!c));
  }
  updateAdminUserProfile(adminUser: AdminUser) {
    this.dispatch(adminActions.updateAdmin({ adminUser }));
  }
}
