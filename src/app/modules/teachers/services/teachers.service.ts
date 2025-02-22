import { Injectable, inject } from '@angular/core';
import { StoreService } from 'src/app/core/service/store.service';
import { TeachersState } from '../state/reducer';
import { Store } from '@ngrx/store';
import { selectTeacherProfile } from '../state/selector';

@Injectable()
export class TeachersService extends StoreService<TeachersState> {
  constructor() {
    const store = inject(Store);

    super(store);
  }

  getTeachersProfile() {
    return this.select(selectTeacherProfile);
  }
}
